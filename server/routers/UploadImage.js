import { Router } from "express";
import { uploadimage } from "../controllers/uploadimage.controller.js";
import AuthMiddleware from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = Router();

router.post("/upload", AuthMiddleware, upload.single("image"), uploadimage);

export default router;
