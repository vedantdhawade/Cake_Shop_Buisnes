import React from "react";

const FeedbackPage = () => {
  // Static Feedback Data (Replace with API data later)
  const feedbacks = [
    {
      id: 1,
      name: "John Doe",
      message: "Great service! Loved the experience.",
      date: "2025-02-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "The UI is very user-friendly.",
      date: "2025-02-14",
    },
    {
      id: 3,
      name: "Alice Brown",
      message: "Fast and efficient support. Thanks!",
      date: "2025-02-13",
    },
    {
      id: 4,
      name: "Bob Williams",
      message: "Can improve the navigation flow.",
      date: "2025-02-12",
    },
    {
      id: 5,
      name: "Charlie Davis",
      message: "Awesome experience, will use again!",
      date: "2025-02-11",
    },
    {
      id: 6,
      name: "Emily Clark",
      message: "The website performance is top-notch.",
      date: "2025-02-10",
    },
  ];

  return (
    <div className="h-full bg-white p-6">
      <h1 className="text-3xl font-bold text-black mb-4">
        Admin Feedback Panel
      </h1>

      {/* Scrollable Feedback List */}
      <div className="mt-4 space-y-3 h-[514px] overflow-y-auto border border-gray-300 rounded-lg p-2">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-black text-white p-4 rounded-lg shadow-md"
          >
            <h3 className="text-pink-400 font-semibold">{feedback.name}</h3>
            <p className="text-gray-300">{feedback.message}</p>
            <span className="text-sm text-gray-500">{feedback.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
