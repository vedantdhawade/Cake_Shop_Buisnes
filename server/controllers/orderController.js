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
    const { status, orderId } = req.body;

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
  const { customerName, address, orderItems, totalPrice } = req.body;
  try {
    const data = new Order({
      customerName,
      address,
      orderItems,
      totalPrice,
    });
    const newOrder = await data.save();
    if (!newOrder) {
      return res.status(400).json({
        message: "No Order Placed",
        success: false,
        error: true,
      });
    } else {
      return res.status(200).json({
        message: "Order Placed",
        success: true,
        error: false,
        id: newOrder._id,
      });
    }
  } catch (error) {
    console.log("Error in add Products : ", error);
  }
};

export const trackorder = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await Order.findById(id);
    if (!data) {
      return res.status(400).json({
        message: "Invalid OrderId",
        success: false,
        error: true,
      });
    } else {
      return res.status(200).json({
        message: "Order Tracked",
        success: true,
        error: false,
        data: data.status,
      });
    }
  } catch (error) {
    console.log("Error in track order Controller : ", error);
  }
};
