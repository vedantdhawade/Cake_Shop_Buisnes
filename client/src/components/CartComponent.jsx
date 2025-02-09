import { useEffect, useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // For navigation
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";

const CartSidebar = ({ userId, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigation

  // Fetch cart items from the database
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getcart,
          data: { userId },
        });

        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchCartItems();
  }, [userId]);

  // Remove item from cart
  const handleRemoveFromCart = async (productname) => {
    try {
      await Axios({
        ...SummaryApi.deletecart,
        data: { userId, productname },
      });

      // Update UI by filtering out removed item
      setCartItems(
        cartItems.filter((item) => item.productname !== productname)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 z-50 overflow-y-auto border-l rounded-l-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-pink-600">Shopping Cart</h2>
        <button
          onClick={onClose}
          className="text-xl text-gray-700 hover:text-red-500"
        >
          <FaTimes />
        </button>
      </div>

      {loading ? (
        <p>Loading cart items...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="border-b py-3 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800 font-medium">{item.productname}</p>
                <p className="text-pink-600 font-bold">₹{item.price}</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveFromCart(item.productname)}
              >
                <FaTrash />
              </button>
            </div>
          ))}

          {/* Total Price Section */}
          <div className="mt-4">
            <p className="text-lg font-bold text-gray-800">
              Total: <span className="text-pink-600">₹{totalPrice}</span>
            </p>
          </div>

          {/* Place Order Button */}
          <button
            className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/checkout")}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default CartSidebar;
