import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";

const NavbarBase = () => {
  // State to manage mobile menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md px-6 sm:px-12 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <Link to={"/"} className="hidden lg:block">
          <div className="bg-[#243a6e] text-white px-6 py-3 rounded-b-lg flex items-center">
            <span className="text-2xl font-bold ">Cake Delights</span>
            <span className="text-pink-400 text-3xl ml-2">👨‍🍳</span>
          </div>
        </Link>
      </div>

      {/* Menu (Desktop) */}
      <ul className="hidden md:flex gap-6 text-gray-800 font-medium">
        <li className="hover:text-pink-400 cursor-pointer">HOME</li>
        <li className="hover:text-pink-400 cursor-pointer">ABOUT</li>
        <li className="hover:text-pink-400 cursor-pointer">PAGES</li>
        <li className="hover:text-pink-400 cursor-pointer">SHOP</li>
        <li className="hover:text-pink-400 cursor-pointer">BLOG</li>
        <li className="hover:text-pink-400 cursor-pointer">CONTACT</li>
      </ul>

      {/* Icons */}
      <div className="flex gap-4 items-center">
        <span className="text-xl hover:text-pink-400 cursor-pointer ">
          <CiSearch size={25} />
        </span>
        <span className="text-xl hover:text-pink-400 cursor-pointer ">
          <CiHeart size={25} />
        </span>

        <span className="text-xl hover:text-pink-400 ">
          <CiShoppingCart size={29} />
        </span>

        {/* Hamburger Menu Icon for Mobile */}
        <span
          className="text-md hover:text-pink-400 block lg:hidden"
          onClick={toggleMobileMenu}
        >
          <AiOutlineBars size={25} />
        </span>
      </div>

      {/* Mobile Slider Menu */}
      <div
        className={`lg:hidden fixed inset-0 bg-gray-800 bg-opacity-60 z-50 transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={toggleMobileMenu}
      >
        <div
          className="bg-white w-full h-full p-4 shadow-lg"
          onClick={(e) => e.stopPropagation()} // Prevent closing menu when clicking inside
        >
          <ul className="flex flex-col gap-6 text-gray-800 font-medium">
            <li
              className="hover:text-pink-400 cursor-pointer bg-pink-300 p-2 rounded-2xl flex justify-center"
              onClick={toggleMobileMenu}
            >
              Close
            </li>
            <li
              className="hover:text-pink-400 cursor-pointer flex justify-center"
              onClick={toggleMobileMenu}
            >
              HOME
            </li>
            <li
              className="hover:text-pink-400 cursor-pointer flex justify-center"
              onClick={toggleMobileMenu}
            >
              ABOUT
            </li>
            <li
              className="hover:text-pink-400 cursor-pointer flex justify-center"
              onClick={toggleMobileMenu}
            >
              PAGES
            </li>
            <li
              className="relative cursor-pointer flex justify-center"
              onClick={toggleMobileMenu}
            >
              SHOP
            </li>
            <li
              className="hover:text-pink-400 cursor-pointer flex justify-center"
              onClick={toggleMobileMenu}
            >
              BLOG
            </li>
            <li
              className="hover:text-pink-400 cursor-pointer flex justify-center"
              onClick={toggleMobileMenu}
            >
              CONTACT
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarBase;
