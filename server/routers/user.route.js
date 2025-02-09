import express from "express";
import {
  addToCart,
  getCartItems,
  getUserDetails,
  login,
  logout,
  register,
  removeFromCart,
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

userRouter.post("/add-to-cart", addToCart);

userRouter.post("/getcart", AuthMiddleware, getCartItems);

userRouter.delete("/deleteCart", AuthMiddleware, removeFromCart);

export default userRouter;
