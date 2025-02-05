import { useEffect, useState } from "react";
import uploadImage from "../utils/uploadimage.js";
import { toast } from "react-hot-toast";
import Axios from "../utils/Axios.jsx";
import { SummaryApi } from "../common/SummaryApi.jsx";

export default function AddBlog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setreload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState({
    title: "",
    image: "",
    body: "",
  });
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, [reload]);

  const fetchBlogs = async () => {
    try {
      const response = await Axios(SummaryApi.getBlogs);
      setBlogs(response.data.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteBlog,
        data: {
          id: id,
        },
      });
      if (response.data.success) {
        return toast.success(response.data.message);
        setreload(true);
      }
      return toast.error(response.data.message);
    } catch (error) {
      console.log("Error in delete Blog : ", error);
    }
  };

  const handleFileChange = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setLoading(true);
    const response = await uploadImage(image);
    if (response.data.success) {
      toast.success(response.data.message);
      setBlog((prev) => ({ ...prev, image: response.data.url }));
    }
    setLoading(false);
  };

  const handleAddBlog = async () => {
    try {
      const response = await Axios({ ...SummaryApi.addBlog, data: blog });
      if (response.data.success) {
        setBlog({ title: "", image: "", body: "" });
        setIsModalOpen(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log("Error adding blog:", error);
    }
  };

  return (
    <div className="p-6 bg-pink-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Manage Blogs</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-pink-300 px-4 py-2 rounded"
        >
          + Add Blog
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[600px] relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-black"
            >
              ✖
            </button>
            <h3 className="text-lg font-bold text-black mb-4">New Blog</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Blog Title"
                className="border px-3 py-2"
                value={blog.title}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
              />
              <input
                type="file"
                className="border px-3 py-2"
                onChange={handleFileChange}
              />
              <textarea
                placeholder="Blog Content"
                className="border px-3 py-2 h-40"
                value={blog.body}
                onChange={(e) => setBlog({ ...blog, body: e.target.value })}
              />
            </div>
            <button
              disabled={loading}
              onClick={handleAddBlog}
              className="w-full bg-black text-pink-300 py-2 rounded mt-4"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="p-6 bg-pink-100 h-[500px] overflow-y-auto">
        <h2 className="text-3xl font-bold text-black mb-6">
          Cake Making Blogs
        </h2>
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex bg-white shadow-lg rounded-lg p-4"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-40 h-40 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-xl font-bold text-black">{blog.title}</h3>
                <p className="text-gray-700 mt-2">
                  {blog.body.length > 100
                    ? blog.body.substring(0, 100) + "..."
                    : blog.body}
                </p>
                <button className="mt-3 text-blue-500 hover:underline">
                  Read More
                </button>
                <button
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded ml-4"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
