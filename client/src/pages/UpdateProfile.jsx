const UpdateProfile = () => {
  return (
    <div className="p-5 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-500 text-white p-2 rounded w-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
