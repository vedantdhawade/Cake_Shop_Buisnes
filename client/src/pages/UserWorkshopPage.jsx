import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import toast from "react-hot-toast";
import NavbarBase from "../components/NavbarBase";

const UserWorkshopPage = () => {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getworkshop,
        });

        if (response.data) {
          setWorkshops(response.data);
        } else {
          toast.error("Failed to load workshops");
        }
      } catch (error) {
        console.error("Error fetching workshops:", error);
        toast.error("Error fetching workshops");
      }
    };

    fetchWorkshops();
  }, []);

  const handleJoin = (name) => {
    alert(`Joined workshop: ${name}`);
  };

  return (
    <div>
      <NavbarBase />
      <div className="min-h-screen bg-[#fefce8] p-6">
        <h1 className="text-3xl font-bold text-black mb-6">Workshops</h1>

        {/* Workshop Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.length > 0 ? (
            workshops.map((workshop) => (
              <div
                key={workshop._id}
                className="bg-black text-white p-6 rounded-lg shadow-lg"
              >
                <h2 className="text-xl font-semibold text-pink-400">
                  {workshop.name}
                </h2>
                <p className="text-gray-300">Time: {workshop.time}</p>
                <button
                  onClick={() => handleJoin(workshop.name)}
                  className="mt-4 px-4 py-2 bg-pink-400 text-black font-bold rounded-md hover:bg-pink-500 transition duration-300"
                >
                  Join Workshop
                </button>
              </div>
            ))
          ) : (
            <p className="text-black text-lg">No workshops available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserWorkshopPage;
