import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
} from "../controllers/Product.controller.js";
const productRouter = express.Router();

productRouter.post("/add-product", addProduct);
productRouter.get("/get-product", getProducts);
productRouter.put("/update-product", updateProduct);

export default productRouter;
