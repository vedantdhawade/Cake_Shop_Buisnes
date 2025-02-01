import User from "../models/UserSchema.js";
import bcryptjs from "bcryptjs";
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
