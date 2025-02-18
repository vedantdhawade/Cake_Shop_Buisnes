import { useState } from "react";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import toast from "react-hot-toast";
const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.addfeedback,
        data: formData,
      });
      if (response.data.success) {
        toast.success("Feedback Submitted Successfully ");
        setFormData({
          name: "",
          message: "",
        });
      }
    } catch (error) {
      console.log("Error in Feedback Form :", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-screen">
      <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="message"
          placeholder="Enter your feedback"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded h-24 resize-none"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
