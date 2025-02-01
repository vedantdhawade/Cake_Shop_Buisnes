import { FaShippingFast, FaCreditCard, FaUndo } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import {
  FaPaypal,
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#002D62] text-white py-10">
      {/* Top Section */}
      <div className="container mx-auto px-5 flex justify-between md:grid-cols-3 gap-6 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <FaShippingFast className="text-4xl text-[#FFB300] mb-2" />
          <h3 className="font-semibold text-lg">Free Shipping</h3>
          <p className="text-sm">Capped at $39 per order</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <FaCreditCard className="text-4xl text-[#FFB300] mb-2" />
          <h3 className="font-semibold text-lg">Card Payments</h3>
          <p className="text-sm">12 Months Installments</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <FaUndo className="text-4xl text-[#FFB300] mb-2" />
          <h3 className="font-semibold text-lg">Easy Returns</h3>
          <p className="text-sm">Shop With Confidence</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-10 mt-10">
        {/* Contact Us */}
        <div>
          <h3 className="font-bold text-lg mb-3">CONTACT US</h3>
          <p className="text-sm">
            If you have any questions, please contact us at demo@example.com
          </p>
          <div className="flex items-center mt-3">
            <MdLocationOn className="text-xl text-[#FFB300] mr-2" />
            <p className="text-sm">Your address goes here. 123, Address.</p>
          </div>
          <div className="flex items-center mt-3">
            <MdPhone className="text-xl text-[#FFB300] mr-2" />
            <p className="text-sm">+ 0 123 456 789</p>
          </div>
        </div>

        {/* Information Links */}
        <div>
          <h3 className="font-bold text-lg mb-3">INFORMATION</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Delivery Information</li>
            <li>Privacy Policy</li>
            <li>Sales</li>
            <li>Terms & Conditions</li>
            <li>Shipping Policy</li>
            <li>EMI Payment</li>
          </ul>
        </div>

        {/* Account Links */}
        <div>
          <h3 className="font-bold text-lg mb-3">ACCOUNT</h3>
          <ul className="space-y-2 text-sm">
            <li>My Account</li>
            <li>My Orders</li>
            <li>Returns</li>
            <li>Shipping</li>
            <li>Wishlist</li>
            <li>How Does It Work</li>
            <li>Merchant Sign Up</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold text-lg mb-3">NEWSLETTER</h3>
          <p className="text-sm">
            If you have any questions, please contact us at Send Us an Email
          </p>
          <div className="flex mt-3">
            <input
              type="email"
              placeholder="Email Address"
              className="p-2 flex-1 text-black bg-white rounded-l-md"
            />
            <button className="bg-[#FFB300] px-4 rounded-r-md">→</button>
          </div>
          <div className="flex space-x-3 mt-4">
            <FaPaypal className="text-2xl" />
            <FaCcVisa className="text-2xl" />
            <FaCcMastercard className="text-2xl" />
            <FaCcDiscover className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm mt-10 border-t border-gray-600 pt-5">
        © 2025 Bucker. Made with ❤️ By Vedant
      </div>
    </footer>
  );
}
