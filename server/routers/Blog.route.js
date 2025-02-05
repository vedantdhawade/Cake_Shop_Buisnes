import express from "express";
import {
  AddBlog,
  deleteBlog,
  getBlogs,
} from "../controllers/Blog.controller.js";
const BlogRouter = express.Router();

BlogRouter.post("/add-blog", AddBlog);
BlogRouter.get("/get-blog", getBlogs);
BlogRouter.delete("/delete-blog", deleteBlog);

export default BlogRouter;
