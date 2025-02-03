import CategoryModel from "../models/CategorySchema.js";

// Add Category
export const addCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const category = new CategoryModel({
      name,
      image,
    });
    const newcategory = await category.save();
    if (newcategory) {
      return res.status(201).json({
        message: "Category created Successfully",
        success: true,
        error: false,
      });
    }
    return res.status(400).json({
      message: "Category not Created",
      error: true,
      success: false,
      data: newcategory,
    });
  } catch (error) {
    console.log("Error in addCategory ", error);
  }
};

// Update Category

export const updateCategory = async (req, res) => {
  try {
    const { name, id, image } = req.body;

    // Find the category
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(401).json({
        message: "Category not found",
        success: false,
        error: true,
      });
    }

    // Update the category
    const data = await CategoryModel.findByIdAndUpdate(
      id,
      { name: name },
      { image: image }
    );
    if (data) {
      return res.status(200).json({
        message: "Category updated successfully",
        success: true,
        error: false,
      });
    }

    // If update failed
    return res.status(400).json({
      message: "Category not updated",
      error: true,
      success: false,
    });
  } catch (error) {
    console.log("Error in updateCategory:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  const { id } = req.body;
  try {
    const category = await CategoryModel.findById(id);
    if (!category) {
      return res.status(401).json({
        message: " Not category found",
        error: true,
        success: false,
      });
    }
    const data = await CategoryModel.findByIdAndDelete(id);
    if (data) {
      return res.status(200).json({
        message: "Category deleted successfully",
        success: true,
        error: false,
      });
    }
  } catch (error) {
    console.log("Error in deleteCategory : ", error);
  }
};

export const getcategories = async (req, res) => {
  try {
    const data = await CategoryModel.find();
    return res.status(200).json({
      message: "Categories Data",
      success: true,
      error: false,
      data: data,
    });
  } catch (error) {
    console.log("Error in get Categories : ", error);
  }
};
