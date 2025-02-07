import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";

const DetailedBlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await Axios({
          ...SummaryApi.getsingleblog,
          data: { id },
        });
        console.log(response.data.data);
        setBlog(response.data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]); // Add id as a dependency

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found!</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Link to="/blogs/allblog" className="mb-4 text-blue-500">
        Back to Blogs
      </Link>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-60 object-cover rounded-md"
      />
      <h2 className="text-2xl font-bold mt-4">{blog.title}</h2>
      <p className="text-gray-700 mt-2">{blog.body}</p>
    </div>
  );
};

export default DetailedBlogPage;
