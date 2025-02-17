import express from "express";
import {
  addOrder,
  getOrders,
  trackorder,
  updateOrderStatus,
} from "../controllers/orderController.js";

const OrderRouter = express.Router();

OrderRouter.get("/orders", getOrders);
OrderRouter.put("/update", updateOrderStatus);
OrderRouter.post("/track", trackorder);
OrderRouter.post("/add-Order", addOrder);

export default OrderRouter;
