import User from "../models/UserSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import generatedAccessToken from "../utils/generateAccesstoken.js";
import uploadImageClodinary from "../utils/UploadImageCloud.js";
// Controller for register user
export const register = async (req, res) => {
  const { firstname, lastname, email, password, confirmpassword } = req.body;
  try {
    if (!firstname || !lastname || !email || !password || !confirmpassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
        success: false,
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newuser = await User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      confirmpassword: hashedPassword,
    });

    const newusers = await newuser.save();
    res.status(201).json({
      message: "User Registered Successfully",
      success: true,
      error: false,
      user: newusers,
    });

    if (!newusers) {
      res.status(400).json({
        message: "No User Created !!",
        success: false,
        error: true,
      });
    }
  } catch (error) {
    console.log("Register Error : ", error);
  }
};

// Controller for Login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({
        message: "All fields are required",
        success: false,
        error: true,
      });
    }
    const user = await User.findOne({
      email,
    });
    if (!user) {
      res.status(400).json({
        message: "Email Does not exists",
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcryptjs.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Check your password",
        error: true,
        success: false,
      });
    }
    const accessToken = await generatedAccessToken(user._id);

    const updateUser = await User.findByIdAndUpdate(user?._id, {
      last_login_date: new Date(),
    });

    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accessToken, cookiesOption);

    return res.json({
      message: "Login successfully",
      error: false,
      success: true,
      data: {
        accessToken,
      },
      role: user.role,
    });
  } catch (error) {
    console.log("Login Error : ", error);
  }
};

// Controller for logout user

export const logout = async (req, res) => {
  try {
    const userid = req.userId; //middleware
    const cookiesOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookiesOption);

    return res.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

// Controller for upload avatar

export async function uploadAvatar(request, response) {
  try {
    const userId = request.userId; // auth middlware
    const image = request.file; // multer middleware

    const upload = await uploadImageClodinary(image);

    const updateUser = await User.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return response.json({
      message: "upload profile",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Controller for update user

export const updateUser = async (req, res) => {
  try {
    const userid = req.userId; // Get it from auth middleware
    const { firstname, lastname, email, password } = req.body;

    // Check if user exists
    const user = await User.findById(userid);
    if (!user) {
      return res.status(404).json({
        error: true,
        status: false,
        message: "User not found",
      });
    }

    // Initialize hashpassword variable
    let hashpassword = "";

    // If a new password is provided, hash it
    if (password) {
      const salt = await bcryptjs.genSalt(10); // Ensure you're awaiting this properly
      hashpassword = await bcryptjs.hash(password, salt); // Pass the salt as the second argument
    }

    // Update user fields if provided
    const updatedUserData = {
      ...(firstname && { firstname }),
      ...(lastname && { lastname }),
      ...(email && { email }),
      ...(password && { password: hashpassword }),
    };

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userid, updatedUserData, {
      new: true,
    });

    // Return a success response
    res.status(200).json({
      error: false,
      status: true,
      message: "User details updated successfully",
      data: updatedUser, // Send the updated user data if necessary
    });
  } catch (error) {
    console.log("Eroor in Update User : ", error);
  }
};

// get User details using token
export const getUserDetails = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWTKEY);
    if (!decoded) {
      return res.status(500).json({
        message: "Error Getting User Data",
        success: false,
        error: true,
      });
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        sucess: false,
      });
    }
    return res.status(200).json({
      message: "User Data",
      success: true,
      error: false,
      data: user,
    });
  } catch (error) {
    console.log("Error in getUserDetails :", error);
  }
};

export const addToCart = async (req, res) => {
  try {
    const { id, productname, price } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          shopping_cart: {
            productname,
            price,
          },
        },
      },
      { new: true } // Returns the updated document
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error in Add to Cart Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).populate("shopping_cart");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ cartItems: user.shopping_cart });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productname, userId } = req.body; // Get product name from request

    if (!productname) {
      return res.status(400).json({ message: "Product name is required" });
    }

    // Remove item based on product name
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { shopping_cart: { productname } } }, // Pulls item matching productname
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Item removed from cart",
      cart: updatedUser.shopping_cart,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Failed to remove item" });
  }
};
