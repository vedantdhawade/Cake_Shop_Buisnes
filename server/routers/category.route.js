import express from "express";
import {
  addCategory,
  deleteCategory,
  getcategories,
  updateCategory,
} from "../controllers/Category.controller.js";

const CategoryRouter = express.Router();

CategoryRouter.post("/add-category", addCategory);
CategoryRouter.put("/update-category", updateCategory);
CategoryRouter.delete("/delete-category", deleteCategory);
CategoryRouter.get("/getcategory", getcategories);

export default CategoryRouter;
