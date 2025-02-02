const TrackOrder = () => {
  return (
    <div className="p-5 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Track Order</h2>
      <p>Check the status of your orders here.</p>
      <input
        type="text"
        placeholder="Enter Order ID"
        className="w-full p-2 border rounded mt-2"
      />
      <button className="bg-blue-500 text-white p-2 rounded w-full mt-3">
        Track
      </button>
    </div>
  );
};

export default TrackOrder;
