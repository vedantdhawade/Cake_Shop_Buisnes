import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminLayout = () => {
  const user = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("Add Category");
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-pink-200">
      {/* Sidebar */}
      <div className="w-1/4  bg-pink-100 shadow-lg p-5">
        <h2 className="text-xl font-bold mb-4 border border-black  hidden md:block p-4 rounded-md">
          <Link to={"dashboard"}>Admin Dashboard</Link>
        </h2>
        <ul className="space-y-3">
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "Add Category"
                ? "bg-pink-400 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("Add Category");
              navigate("addcategory");
            }}
          >
            Add Category
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "Add Products"
                ? "bg-pink-400 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("Add Products");
              navigate("addproducts");
            }}
          >
            Add Products
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "Add Blogs"
                ? "bg-pink-400 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("Add Blogs");
              navigate("addblogs");
            }}
          >
            Add Blogs
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "workshops"
                ? "bg-pink-400 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("workshops");
            }}
          >
            Schedule Workshops
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "Check Orders"
                ? "bg-pink-400 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("Check Orders");
              navigate("manageorders");
            }}
          >
            Check Orders
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "Feedback"
                ? "bg-pink-400 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("Feedback");
            }}
          >
            Feedback
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="w-3/4 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
