import express from "express";
import {
  addProduct,
  deleteProduct,
  getlatestProducts,
  getProducts,
  updateProduct,
} from "../controllers/Product.controller.js";
const productRouter = express.Router();

productRouter.post("/add-product", addProduct);
productRouter.get("/get-product", getProducts);
productRouter.put("/update-product", updateProduct);
productRouter.delete("/delete-product", deleteProduct);
productRouter.get("/latest-product", getlatestProducts);

export default productRouter;
