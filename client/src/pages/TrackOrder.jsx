import { useState } from "react";
import { SummaryApi } from "../common/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
const TrackOrder = () => {
  const [id, setid] = useState("");
  const [status, setstatus] = useState("");
  const handleTrackclick = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.trackOrder,
        data: {
          id: id,
        },
      });
      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        setstatus(response.data.data);
      }
    } catch (error) {
      console.log("Error in track order :", error);
    }
  };

  return (
    <div className="p-5 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Track Order</h2>
      <p>Check the status of your orders here.</p>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={id}
        onChange={(e) => {
          setid(e.target.value);
        }}
        className="w-full p-2 border rounded mt-2"
      />
      <button
        onClick={handleTrackclick}
        className="bg-blue-500 text-white p-2 rounded w-full mt-3"
      >
        Track
      </button>
      <div className="p-4 w-screen">Order Status :- {status || "Null"}</div>
    </div>
  );
};

export default TrackOrder;
