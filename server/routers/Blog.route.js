import express from "express";
import {
  AddBlog,
  deleteBlog,
  getBlogs,
  getLatestblog,
} from "../controllers/Blog.controller.js";
const BlogRouter = express.Router();

BlogRouter.post("/add-blog", AddBlog);
BlogRouter.get("/get-blog", getBlogs);
BlogRouter.delete("/delete-blog", deleteBlog);
BlogRouter.get("/getlatest-blog", getLatestblog);

export default BlogRouter;
