import express from "express";
import {
  getUserDetails,
  login,
  logout,
  register,
  updateUser,
  uploadAvatar,
} from "../controllers/User.controllers.js";
import AuthMiddleware from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", AuthMiddleware, logout);
userRouter.put(
  "/upload-avatar",
  AuthMiddleware,
  upload.single("avatar"),
  uploadAvatar
);
userRouter.post("/getuser", AuthMiddleware, getUserDetails);

userRouter.put("/update", AuthMiddleware, updateUser);

export default userRouter;
