import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa"; // Import delete icon

const AddWorkshop = () => {
  const [open, setOpen] = useState(false);
  const [workshopdata, setWorkshopdata] = useState([]);
  const [workshop, setWorkshop] = useState({
    name: "",
    details: "",
    time: "",
    link: "",
  });

  // Fetch Workshops
  useEffect(() => {
    const getWorkshop = async () => {
      try {
        const response = await Axios({ ...SummaryApi.getworkshop });
        if (response) {
          setWorkshopdata(response.data);
        } else {
          toast.error("Cannot Fetch Workshop");
        }
      } catch (error) {
        console.log("Error In Get Workshop ", error);
      }
    };
    getWorkshop();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setWorkshop({ ...workshop, [e.target.name]: e.target.value });
  };

  // Add Workshop
  const handleSubmit = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.addworkshop,
        data: workshop,
      });
      if (!response.data.success) {
        toast.error("Workshop Failed To Add");
      } else {
        toast.success("Workshop Added Successfully");
        setWorkshopdata([...workshopdata, response.data.workshop]); // Update list
      }
      setOpen(false);
      setWorkshop({ name: "", details: "", time: "", link: "" });
    } catch (error) {
      console.error("Error adding workshop:", error);
      alert("Failed to add workshop!");
    }
  };

  // Delete Workshop
  const handleDelete = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteworkshop,
        data: {
          id: id,
        },
      });
      if (!response) {
        toast.error("Failed to delete workshop");
      } else {
        toast.success("Workshop Deleted");
        setWorkshopdata(workshopdata.filter((workshop) => workshop._id !== id)); // Remove from UI
      }
    } catch (error) {
      console.error("Error deleting workshop:", error);
      alert("Failed to delete workshop!");
    }
  };

  return (
    <div className="bg-white p-4">
      {/* Header and Add Workshop Button */}

      <div className="flex justify-between p-2">
        <h1 className="text-2xl font-bold">Add Workshop</h1>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2  bg-black text-pink-400 rounded-md"
        >
          Add Workshop
        </button>

        {/* Workshop List */}
      </div>
      <div className="w-full border-l h-[520px] p-4 overflow-y-auto">
        <ul className="space-y-2">
          {workshopdata.length > 0 ? (
            workshopdata.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
              >
                <span className="text-gray-800">{item.name}</span>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No workshops available</p>
          )}
        </ul>
      </div>
      {/* Modal for Adding Workshop */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Workshop</h2>
            <input
              type="text"
              name="name"
              placeholder="Workshop Name"
              value={workshop.name}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="details"
              placeholder="Details"
              value={workshop.details}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="time"
              placeholder="Time"
              value={workshop.time}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="link"
              placeholder="Workshop Link"
              value={workshop.link}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Add
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddWorkshop;
