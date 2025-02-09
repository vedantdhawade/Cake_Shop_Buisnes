import { useEffect, useState } from "react";
import Axios from "../utils/Axios";

const WorkshopPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null); // For modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await Axios.get("/api/workshops");
        setWorkshops(response.data);
      } catch (error) {
        console.error("Error fetching workshops:", error);
      }
    };

    fetchWorkshops();
  }, []);

  const openModal = (workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWorkshop(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">
        Available Workshops
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <div
            key={workshop._id}
            className="bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:shadow-xl transition"
            onClick={() => openModal(workshop)}
          >
            <h3 className="text-lg font-bold">{workshop.name}</h3>
            <p className="text-gray-500">{workshop.details}</p>
            <p className="text-pink-600 font-semibold">Time: {workshop.time}</p>
          </div>
        ))}
      </div>

      {/* Workshop Details Modal */}
      {isModalOpen && selectedWorkshop && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold text-pink-600">
              {selectedWorkshop.name}
            </h2>
            <p className="text-gray-700 mt-2">{selectedWorkshop.details}</p>
            <p className="text-gray-600 mt-1">Time: {selectedWorkshop.time}</p>

            {selectedWorkshop.link ? (
              <a
                href={selectedWorkshop.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
              >
                Join Workshop
              </a>
            ) : (
              <p className="text-red-500 mt-4">No join link available yet.</p>
            )}

            <button
              className="mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopPage;
