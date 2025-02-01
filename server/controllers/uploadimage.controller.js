import uploadImageClodinary from "../utils/UploadImageCloud.js";

export const uploadimage = async (req, res) => {
  const file = req.file;
  try {
    const response = await uploadImageClodinary(file);

    res.status(200).json({
      error: false,
      success: true,
      message: "Image Uploaded Successfully",
      url: response.url,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      success: false,
      message: error.message,
    });
  }
};
