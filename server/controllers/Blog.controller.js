import BlogModel from "../models/BlogSchema.js";

export const AddBlog = async (req, res) => {
  try {
    const { image, title, body } = req.body;
    const data = new BlogModel({
      image,
      title,
      body,
    });
    const newblog = await data.save();
    if (!newblog) {
      return res.status(400).json({
        message: "No blog added",
        success: false,
        error: true,
      });
    } else {
      return res.status(200).json({
        message: "Blog Added Successfully",
        error: false,
        success: true,
      });
    }
  } catch (error) {
    console.log("Error im Blog add controller :", error);
  }
};

export const getBlogs = async (req, res) => {
  try {
    const data = await BlogModel.find();
    if (!data) {
      return res.status(400).json({
        message: "error in fetching blogs",
        success: false,
        error: true,
      });
    } else {
      return res.status(200).json({
        message: "fetch blogs",
        success: true,
        error: false,
        data: data,
      });
    }
  } catch (error) {
    console.log("Error in GetBlogs : ", error);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await BlogModel.findByIdAndDelete(id);
    if (data) {
      return res.status(200).json({
        message: "Blog Deleted Successfully",
        success: true,
        error: false,
      });
    }

    return res.status(400).json({
      message: "Failed Deleting Blog",
      success: false,
      error: true,
    });
  } catch (error) {
    console.log("Error In Delete Blog controller :", error);
  }
};
