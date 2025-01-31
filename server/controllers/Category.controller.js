import CategoryModel from "../models/CategorySchema.js";

// Add Category
export const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const category = new CategoryModel({
      name,
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
    });
  } catch (error) {
    console.log("Error in addCategory ", error);
  }
};

// Update Category

export const updateCategory = async (req, res) => {
  try {
    const { name, id } = req.body;

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
      { new: true }
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
      });
    }
  } catch (error) {
    console.log("Error in deleteCategory : ", error);
  }
};
