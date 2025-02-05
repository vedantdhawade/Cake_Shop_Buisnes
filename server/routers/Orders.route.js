import express from "express";
import {
  addOrder,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const OrderRouter = express.Router();

OrderRouter.get("/orders", getOrders);
OrderRouter.put("/orders/:orderId", updateOrderStatus);
OrderRouter.post("/add-order", addOrder);

export default OrderRouter;
