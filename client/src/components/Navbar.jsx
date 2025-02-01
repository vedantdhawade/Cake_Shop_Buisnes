import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const storedToken = localStorage.getItem("token");
  useEffect(() => {
    // Get the token from localStorage when the component mounts

    // Set token based on the retrieved value
    if (!storedToken) {
      setToken(false);
    } else {
      setToken(true);
    }
  }, [token, storedToken]); // Empty dependency array to run only on mount
  return (
    <nav className="bg-[#243a6e] text-white py-4 px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center w-full">
        {/* Left Side */}
        <p className="text-md text-center sm:text-left hidden lg:block">
          World Wide Completely Free Returns and Free Shipping
        </p>

        {/* Right Side */}
        <div className="flex flex-col sm:flex-row sm:gap-6 items-center text-md mt-2 sm:mt-0">
          <p className="cursor-pointer">+1 234 567 890</p>
          <span className="hidden sm:block text-pink-400">|</span>
          <p className="hover:text-pink-400 cursor-pointer">
            support@example.com
          </p>
          <span className="hidden sm:block text-pink-400">|</span>

          {/* Account Section with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onClick={() => setIsOpen(!isOpen)}
          >
            <p className="hover:text-pink-400 cursor-pointer flex items-center">
              My Account
            </p>

            {/* Dropdown Menu with Smooth Transition */}
            <div
              className={`absolute right-0 mt-2 w-40 bg-white text-black shadow-lg overflow-hidden  transition-all duration-300 ease-in-out ${
                isOpen
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-2 scale-95 pointer-events-none"
              }`}
            >
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                My Account
              </a>
              {token ? (
                <Link
                  to={"login"}
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    localStorage.removeItem("token");
                    setToken(null);
                  }}
                >
                  logout
                </Link>
              ) : (
                <Link
                  to={"login"}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Login
                </Link>
              )}
              <a href="#" className="block px-4 py-2 hover:bg-gray-200">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
