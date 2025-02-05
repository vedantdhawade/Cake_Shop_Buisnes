import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Accepted", "Dispatched", "Delivered"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update order status" });
  }
};

export const addOrder = async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      address,
      orderItems,
      totalPrice,
      status,
    } = req.body;

    // Validate required fields
    if (
      !customerName ||
      !email ||
      !phone ||
      !address ||
      !orderItems ||
      !totalPrice
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: customerName, email, phone, address, orderItems, or totalPrice",
      });
    }

    // Validate orderItems (it should be an array of objects)
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "orderItems should be a non-empty array",
      });
    }

    // Create a new order
    const newOrder = new Order({
      customerName,
      email,
      phone,
      address,
      orderItems,
      totalPrice,
      status: status || "Pending", // Default status is Pending
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order added successfully",
      data: savedOrder,
    });
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add order",
    });
  }
};
