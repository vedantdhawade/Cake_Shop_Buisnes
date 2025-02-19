import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";

const stripePromise = loadStripe("public-key");
const CheckoutForm = ({ userId, cartItems, totalPrice, userAddress }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      console.log(userId, cartItems, totalPrice, userAddress);
      const response = await Axios({
        ...SummaryApi.PlaceOrder,
        data: {
          customerName: userId,
          address: userAddress,
          orderItems: cartItems,
          totalPrice: totalPrice,
        },
      });
      if (!response) {
        toast.error("Try Again Later");
      } else {
        toast.success("Order Placed");
        alert(`Your orderId is :- ${response.data.id}`);
        navigate("/feedback");
      }
    } catch (error) {
      console.log("Error in Checkout : ", error);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handlePayment}
      className="bg-white p-6 shadow-md rounded-lg"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Payment Details
      </h3>
      <CardElement className="border p-2 rounded mb-4" />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        {`Pay ₹${totalPrice}`}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const user = useSelector((state) => state.user);
  const [userAddress, setUserAddress] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getcart,
          data: { userId: user._id },
        });
        setCartItems(response.data.cartItems);
      } catch (error) {
        console.error("Error fetching checkout details:", error);
      }
    };

    fetchDetails();
    console.log(cartItems);
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h2>

        {/* Address Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Shipping Address
          </h3>

          <input
            type="text"
            required
            placeholder="Enter your address"
            className="w-full p-2 border rounded mt-2"
            onChange={(e) => {
              setUserAddress(e.target.value);
            }}
          />
        </div>

        {/* Cart Items Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
          <div className="mt-2 space-y-3">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between border-b py-2">
                <span className="text-gray-700">{item.productname}</span>
                <span className="text-gray-800 font-semibold">
                  ₹{item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Price */}
        <div className="flex justify-between text-lg font-bold border-t pt-4">
          <span>Total</span>
          <span>₹{totalPrice}</span>
        </div>

        {/* Stripe Payment */}
        <Elements stripe={stripePromise}>
          <CheckoutForm
            userId={user.firstname}
            cartItems={cartItems}
            totalPrice={totalPrice}
            userAddress={userAddress}
          />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;
