import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
  const [activeTab, setActiveTab] = useState("updateProfile");
  const navigate = useNavigate();
  return (
    <div className="flex h-screen bg-pink-200">
      {/* Sidebar */}
      <div className="w-1/4 bg-pink-100 shadow-lg p-5">
        <h2 className="text-xl font-bold mb-4 border border-black  hidden md:block p-4 rounded-md">
          <Link to={"updateprofile"}>Manage Account</Link>
        </h2>
        <ul className="space-y-3">
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "updateProfile"
                ? "bg-pink-400 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("updateProfile");
              navigate("updateprofile");
            }}
          >
            Update Profile
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "trackOrder"
                ? "bg-pink-400 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("trackOrder");
              navigate("trackorder");
            }}
          >
            Track Order
          </li>
          <li
            className={`cursor-pointer p-2 rounded ${
              activeTab === "workshops"
                ? "bg-pink-400 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab("workshops");
              navigate("workshop");
            }}
          >
            Workshops
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

export default UserLayout;
