import User from "../models/UserSchema.js";
import bcryptjs from "bcryptjs";

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
    res.status(200).json({
      message: "User Logged in Successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Login Error : ", error);
  }
};
