import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavbarBase from "../components/NavbarBase";
import IntroPage from "../components/IntroPage";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import toast from "react-hot-toast";
export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });
      if (response.error) {
        toast.message(response.data.message);
      }
      if (response.data.success) {
        const token = response.data.data.accessToken;
        localStorage.setItem("token", token);
        localStorage.setItem("role", response.data.role);
        toast.success(response.data.message);
        setData({
          email: "",
          password: "",
        });

        navigate("/");
      }
    } catch (err) {
      console.log("Error in Login.jsx", err);
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="">
      <div className="md:min-h-[25rem] min-h-[15rem] bg-[#fbf5e2]">
        {/* Navbar */}
        <NavbarBase />
        {/* Login | Register Section */}
        <IntroPage heading="Login | Register" heading2="Home" />
      </div>

      {/* Login Page */}
      <div className="max-w-md mx-auto bg-white p-8 my-20 shadow-2xl shadow-black rounded-lg">
        <h4 className="text-2xl font-semibold text-[#243a6e] mb-6 text-center">
          Login
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Email Address*
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#243a6e]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#243a6e]"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-3 text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <a href="#" className="text-black hover:underline">
              Forgotten password?
            </a>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="text-black font-medium mb-1">
              Don't have an Account?
            </label>
            <Link className="text-black font-medium mb-1" to="/register">
              Register Account
            </Link>
          </div>

          {/* Login Button */}
          <div className="mt-6">
            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-[#1b2b54] transition-all duration-300">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
