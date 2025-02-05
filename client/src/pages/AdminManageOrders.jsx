import { useEffect, useState } from "react";
import Axios from "../utils/Axios.jsx";
import { toast } from "react-hot-toast";
import { SummaryApi } from "../common/SummaryApi.jsx";

export default function CheckOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await Axios(SummaryApi.getOrders);
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateOrderStatus,
        url: `${SummaryApi.updateOrderStatus.url}/${orderId}`,
        data: { status: newStatus },
      });

      if (response.data.success) {
        toast.success("Order status updated!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  return (
    <div className="p-6 bg-pink-100 h-full">
      <h2 className="text-2xl font-bold text-black mb-6">Manage Orders</h2>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-black text-white">
              <th className="p-2">Customer Name</th>
              <th className="p-2">Order Date</th>
              <th className="p-2">Items</th>
              <th className="p-2">Total Price</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="p-2">{order.customerName}</td>
                <td className="p-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">
                  <ul>
                    {order.orderItems.map((item, index) => (
                      <li key={index}>
                        {item.name} (x{item.quantity}) -{" "}
                        {formatPrice(item.price * item.quantity)}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-2">{formatPrice(order.totalPrice)}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">
                  <select
                    className="border px-2 py-1 rounded"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
