import { useState, useEffect } from "react";
import Axios from "../utils/Axios";
import { FaSearch } from "react-icons/fa";
import IntroPage from "../components/IntroPage";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await Axios.get("/api/blog/get-blog");
      setBlogs(response.data.data);
    };
    fetchBlogs();
  }, []);

  const handleBlogclick = (blog) => {
    navigate(`/blogs/${blog._id}`);
  };
  return (
    <div className="container mx-auto p-6 text-dark-navy bg-[#fbf5e2]">
      <IntroPage heading={"Blogs"} heading2={"Cake Blogs"} />
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gold">Our Blog</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search blog posts..."
            className="w-64 p-2 border rounded-lg pl-10"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
        </div>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-scroll max-h-[600px] gap-6">
        {blogs
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by latest
          .filter((blog) =>
            blog.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((blog) => (
            <div
              key={blog._id}
              className="border rounded-lg p-4 shadow-md"
              onClick={() => handleBlogclick(blog)}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-3 text-dark-navy">
                {blog.title}
              </h2>
              <p className="text-gray-600 mt-2">
                {blog.body.split(".").slice(0, 1).join(".") + "."}
              </p>

              <button className="mt-3 bg-navy-blue text-blue-800 px-4 py-2 rounded-lg">
                Read More
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogPage;
