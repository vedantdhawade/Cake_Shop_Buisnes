import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import userRouter from "./routers/user.route.js";
import CategoryRouter from "./routers/category.route.js";
import productRouter from "./routers/product.route.js";
import cookieParser from "cookie-parser";
import uploadimage from "./routers/UploadImage.js";
import BlogRouter from "./routers/Blog.route.js";
import OrderRouter from "./routers/Orders.route.js";
import Workshoprouter from "./routers/Workshop.route.js";
import feedbackrouter from "./routers/feedback.route.js";
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/file", uploadimage);
app.use("/api/blog", BlogRouter);
app.use("/api/order", OrderRouter);
app.use("/api/workshop", Workshoprouter);
app.use("/api/feedback", feedbackrouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1); // Exit the process with failure
  });
