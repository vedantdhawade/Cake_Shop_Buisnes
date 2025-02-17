import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios.jsx";
import { useNavigate } from "react-router-dom";
import { SummaryApi } from "../common/SummaryApi.jsx";
import NavbarBase from "../components/NavbarBase.jsx";
import { motion } from "framer-motion";
import axios from "axios";
import { FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";

const Home = () => {
  const categories = [
    {
      name: "Pastry",
      image:
        "https://template.hasthemes.com/bucker/bucker/assets/img/others/services1.png",
      description: "Delicious pastries made fresh every day.",
    },
    {
      name: "Breakfast",
      image:
        "https://template.hasthemes.com/bucker/bucker/assets/img/others/services2.png",
      description: "Start your day with a healthy breakfast.",
    },
    {
      name: "Coffee Cake",
      image:
        "https://template.hasthemes.com/bucker/bucker/assets/img/others/services3.png",
      description: "Aromatic coffee to energize your day.",
    },

    {
      name: "Bread Toast",
      image:
        "https://template.hasthemes.com/bucker/bucker/assets/img/others/services4.png",
      description: "Crispy and delicious bread toast.",
    },
  ];
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [user, setuser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/blog/getlatest-blog") // Adjust backend URL
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
    fetch("http://localhost:5000/api/product/latest-product") // Update with your API
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      setToken(false);
    } else {
      setToken(true);
    }
  }, [token]);

  const getUser = async () => {
    if (!token) {
      navigate("/login");
    } else {
      const response = await Axios({
        ...SummaryApi.getUser,
        data: {
          token: token,
        },
      });
      setuser(response.data.data);
    }
  };

  return (
    <div>
      <div className="md:min-h-[25rem] min-h-[15rem] bg-[#fbf5e2]">
        {/* Navbar */}
        <NavbarBase />
        <div className="bg-pink-50 min-h-screen">
          {/* Banner Section */}
          <div className="relative flex items-center justify-between px-12 py-16 bg-yellow-50">
            <div className="max-w-lg">
              <span className="text-[#2b4174] font-bold text-3xl px-3 py-1 rounded-md">
                <span className="text-[#fc7c7c]">70%</span> Sale Off
              </span>
              <h1 className="text-4xl font-bold text-black mt-4">
                Quality Products <br /> Bakery Items
              </h1>
              <button
                onClick={() => {
                  navigate("shop");
                }}
                className="relative overflow-hidden my-4 px-6 py-3 text-white bg-[#fc7c7c] font-bold rounded-lg transition-all duration-500 group"
              >
                <span className="relative z-10">Shop Now</span>
                <span className="absolute left-0 top-0 w-0 h-full bg-[#2b4174] transition-all duration-500 group-hover:w-full"></span>
              </button>
            </div>
            <img
              src="https://template.hasthemes.com/bucker/bucker/assets/img/bg/hero-banner-shape.png"
              alt="Bakery Items"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Categories Section */}
          <div className="py-12 px-10">
            <h2 className="text-3xl font-bold text-center text-black mb-6">
              Our Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div
                  onClick={() => {
                    navigate("shop");
                  }}
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-lg text-center transform transition-all hover:scale-105"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <h3 className="text-xl font-bold mt-4 text-black">
                    {category.name}
                  </h3>
                  <p className="text-gray-700 mt-2">{category.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CARD SECTION  */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-12">
            {/* First Card */}
            <div
              className="relative bg-cover bg-center h-auto rounded-xl flex flex-col justify-center items-start text-white px-8"
              style={{
                backgroundImage:
                  "url('https://template.hasthemes.com/bucker/bucker/assets/img/bg/banner1.png')",
              }}
            >
              <h3 className="text-lg  px-3 py-1 rounded-lg text-[#2b4174] font-extrabold">
                <span className="text-[#fc7c7c]"> 70% </span> Sale Off
              </h3>
              <h2 className="text-3xl text-black font-extrabold mt-2">
                Best Quality <br /> Products
              </h2>
              <button
                onClick={() => {
                  navigate("shop");
                }}
                className="relative overflow-hidden mt-4 px-6 py-3 bg-[#fc7c7c] font-bold rounded-lg transition-all duration-500 group"
              >
                <span className="relative z-10 text-white">Shop Now</span>
                <span className="absolute left-0 top-0 w-0 h-full bg-[#2b4174] transition-all duration-500 group-hover:w-full"></span>
              </button>
            </div>

            {/* Second Card */}
            <div
              className="relative bg-cover bg-center h-64 rounded-xl flex flex-col justify-center items-start text-white px-8"
              style={{
                backgroundImage:
                  "url('https://template.hasthemes.com/bucker/bucker/assets/img/bg/banner2.png')",
              }}
            >
              <h3 className="text-lg  px-3 py-1 rounded-lg text-[#2b4174] font-extrabold">
                <span className="text-[#fc7c7c]"> 25% </span> Sale Off
              </h3>
              <h2 className="text-3xl text-black font-extrabold mt-2">
                Hot & Spicy <br /> Pastry
              </h2>
              <button
                onClick={() => {
                  navigate("shop");
                }}
                className="relative overflow-hidden mt-4 px-6 py-3 bg-[#fc7c7c] font-bold rounded-lg transition-all duration-500 group"
              >
                <span className="relative z-10 text-white">Shop Now</span>
                <span className="absolute left-0 top-0 w-0 h-full bg-[#2b4174] transition-all duration-500 group-hover:w-full"></span>
              </button>
            </div>
          </div>

          {/* NEW PRODUCTS  */}
          <section className="container mx-auto my-12 px-4">
            <h2 className="text-center text-4xl font-bold mb-8 text-gray-900 font-playfair">
              New Products
            </h2>
            <div className="flex flex-wrap justify-center gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="w-72 bg-white shadow-lg rounded-2xl overflow-hidden transition-all duration-300 relative group"
                >
                  {/* Product Image with Hover Effect */}
                  <div className="h-56 overflow-hidden relative">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Hover Buttons (Hidden by default, slide up on hover) */}
                    <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 group-hover:bottom-4 transition-all duration-300">
                      <button
                        onClick={() => {
                          navigate("shop");
                        }}
                        className="p-2 bg-white shadow-md rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300"
                      >
                        <FaShoppingCart size={18} />
                      </button>
                      <button
                        onClick={() => {
                          navigate("shop");
                        }}
                        className="p-2 bg-white shadow-md rounded-md hover:bg-red-500 hover:text-white transition-all duration-300"
                      >
                        <FaHeart size={18} />
                      </button>
                      <button
                        onClick={() => {
                          navigate("shop");
                        }}
                        className="p-2 bg-white shadow-md rounded-md hover:bg-green-500 hover:text-white transition-all duration-300"
                      >
                        <FaEye size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold font-playfair text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-lg text-gray-600">${product.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* BLOG SECTION  */}
          <section className="py-20 px-6 bg-white">
            <h2 className="text-4xl font-bold text-center mb-6">Latest Blog</h2>
            <p className="text-center text-gray-600 mb-12">
              Stay updated with our latest articles and insights.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  className="relative rounded-xl overflow-hidden shadow-lg bg-white"
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mt-3">{blog.title}</h3>
                    <p className="text-gray-500 mt-2 text-sm line-clamp-3">
                      {blog.body.slice(0, 100)}...
                    </p>
                    <button
                      onClick={() => {
                        navigate("/blogs/allblog");
                      }}
                      className="absolute bottom-4 right-4 bg-white border-2 border-[#fc7c7c] p-3 rounded-full shadow-md hover:bg-[#fc7c7c] hover:text-white transition"
                    >
                      →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
