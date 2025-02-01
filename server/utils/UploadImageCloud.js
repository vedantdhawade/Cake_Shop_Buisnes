import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLODINARY_CLOUD_NAME,
  api_key: process.env.CLODINARY_API_KEY,
  api_secret: process.env.CLODINARY_API_SECRET_KEY,
});

export const uploadImageClodinary = async (image) => {
  try {
    if (!image) {
      throw new Error("No image provided");
    }

    const buffer = image.buffer || Buffer.from(await image.arrayBuffer());

    const uploadImage = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "CakeShop" },
        (error, uploadResult) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return reject(error); // Properly reject on error
          }
          resolve(uploadResult);
        }
      );

      uploadStream.end(buffer); // Ensure stream ends correctly
    });

    return uploadImage;
  } catch (error) {
    console.error("Upload image error:", error);
    throw error; // Throw error so caller can handle it
  }
};

export default uploadImageClodinary;
