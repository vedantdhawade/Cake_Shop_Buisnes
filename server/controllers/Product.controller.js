import Productmodel from "../models/ProductSchema.js";

// Add Product controller
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      rating,
      price,
      discount,
      size,
      category,
      image,
    } = req.body;
    const product = new Productmodel({
      name,
      description,
      rating,
      discount,
      price,
      size,
      category,
      image,
    });
    const newProduct = await product.save();
    if (!newProduct) {
      return res.status(400).json({
        message: "Product not Created",
        error: true,
        success: false,
      });
    }
    return res.status(201).json({
      message: "Product Created Successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Error in Add Prouct ", error);
  }
};

// Get Products Controller

export const getProducts = async (req, res) => {
  try {
    const data = await Productmodel.find();
    if (!data) {
      return res.status(400).json({
        message: "Internal Server Error",
        success: false,
        error: true,
      });
    }
    return res.status(200).json({
      message: "Product Data Fetched",
      success: true,
      error: false,
      data: data,
    });
  } catch (error) {
    console.log("Error fetching produts : ", error);
  }
};

// Update Products Controller ?
export const updateProduct = async (req, res) => {
  try {
    const { name, description, rating, price, size, category, image, id } =
      req.body;

    const updatedProduct = await Productmodel.findByIdAndUpdate(
      id,
      { name, description, rating, price, size, category, image },
      { new: true } // Returns the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product Updated Successfully",
      success: true,
      error: false,
      updatedProduct,
    });
  } catch (error) {
    console.log("Error in Update Product", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

// Controller for delete product

export const deleteProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await Productmodel.findByIdAndDelete({ id });
    if (!data) {
      return res.status(400).json({
        message: "No product deleted",
        success: false,
        error: true,
      });
    }
    return res.status(200).json({
      message: "Product deleted Successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.log("Error in Delete Product Controller : ", error);
  }
};
