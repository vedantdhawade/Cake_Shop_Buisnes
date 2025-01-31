import express from "express";
import {
  addCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/Category.controller.js";

const CategoryRouter = express.Router();

CategoryRouter.post("/add-category", addCategory);
CategoryRouter.put("/update-category", updateCategory);
CategoryRouter.delete("/delete-category", deleteCategory);

export default CategoryRouter;
