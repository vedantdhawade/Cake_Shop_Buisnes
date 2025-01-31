import Productmodel from "../models/ProductSchema.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, rating, price, size, category, image } =
      req.body;
    const product = new Productmodel({
      name,
      description,
      rating,
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
