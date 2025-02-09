import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";

const stripePromise = loadStripe("your-public-key-here"); // Replace with your Stripe public key

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
      // Create Payment Intent
      const { data } = await Axios.post("/api/payment/create-payment-intent", {
        amount: totalPrice * 100,
      });

      // Confirm Payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          alert("Payment Successful! Order Placed.");
          navigate("/orders"); // Redirect to orders page
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
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
        {loading ? "Processing..." : `Pay ₹${totalPrice}`}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const user = useSelector((state) => state.user);

  const [cartItems, setCartItems] = useState([]);
  const [userAddress, setUserAddress] = useState(
    "A-02 , Amruth Apt Sec-76 , plot - 12 , 41209"
  );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getcart,
          data: { userId: user._id },
        });
        setCartItems(response.data.cartItems);

        setUserAddress("A-504,ananwhfuih");
      } catch (error) {
        console.error("Error fetching checkout details:", error);
      }
    };

    fetchDetails();
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
          {userAddress ? (
            <p className="text-gray-600 mt-2">{userAddress}</p>
          ) : (
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full p-2 border rounded mt-2"
              onChange={(e) => setUserAddress(e.target.value)}
            />
          )}
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
            userId={user._id}
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
