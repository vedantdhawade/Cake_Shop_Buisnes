import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";

const FeedbackPage = () => {
  const [feedbacks, setfeedbacks] = useState([]);

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getfeedbacks,
        });
        setfeedbacks(response.data.data);
      } catch (error) {
        console.log("Error while getting the feedback :", error);
      }
    };
    getFeedbacks();
  }, []); // Added dependency array to prevent infinite re-renders

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="h-full bg-white p-6">
      <h1 className="text-3xl font-bold text-black mb-4">
        Admin Feedback Panel
      </h1>

      {/* Scrollable Feedback List */}
      <div className="mt-4 space-y-3 h-[514px] overflow-y-auto border border-gray-300 rounded-lg p-2">
        {feedbacks.map((feedback) => (
          <div
            key={feedback._id}
            className="bg-black text-white p-4 rounded-lg shadow-md"
          >
            <h3 className="text-pink-400 font-semibold">{feedback.name}</h3>
            <p className="text-gray-300">{feedback.message}</p>
            <span className="text-sm text-gray-500">
              {formatDate(feedback.createdAt)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
