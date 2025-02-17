import { useState, useEffect } from "react";
import Axios from "../utils/Axios";
import { SummaryApi } from "../common/SummaryApi";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import IntroPage from "../components/IntroPage";
import NavbarBase from "../components/NavbarBase";
import CartSidebar from "../components/CartComponent";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [sizeFilter, setSizeFilter] = useState("");
  const [priceRange, setPriceRange] = useState([10, 1000]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [ratings, setRatings] = useState({});
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await Axios({ ...SummaryApi.getProducts });
      setProducts(response.data.data);
    };
    fetchProducts();
  }, []);

  const handleRating = (productId, rating) => {
    setRatings((prevRatings) => ({ ...prevRatings, [productId]: rating }));
    console.log(`Product ${productId} rated:`, rating);
  };
  const handleAddToCart = async (product) => {
    try {
      const response = await Axios.post("/api/user/add-to-cart", {
        id: user._id, // The logged-in user's ID
        productname: product.name,
        price: product.price,
      });

      if (response.status === 200) {
        toast.success("Item Added To Cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Please Login");
      navigate("/login");
    }
  };

  return (
    <div>
      <NavbarBase />
      <div className="container mx-auto p-4 bg-[#fbf5e2]">
        <div>
          <a href="/shop">
            <IntroPage heading="Products" heading2={"Shop"} />
          </a>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar Filters */}
          <div className="w-full md:w-1/4 p-4 rounded-lg border border-pink-300">
            <h2 className="text-lg font-bold">FILTER</h2>
            <div className="mt-4">
              <h3 className="font-semibold">FILTER BY SIZE</h3>
              {["Small", "Medium", "Large"].map((size) => (
                <label key={size} className=" mt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-5 h-5"
                    value={size.toLowerCase()}
                    onChange={(e) => setSizeFilter(e.target.value)}
                  />
                  {size}
                </label>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">FILTER BY PRICE</h3>
              <input
                type="range"
                min="10"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([10, e.target.value])}
                className="w-full"
              />
              <p>
                Price: ${priceRange[0]} - ${priceRange[1]}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            {/* Search & Sort */}
            <div className="flex justify-between mb-4 ">
              <input
                type="text"
                placeholder="Search Products..."
                className="w-2/3 p-2 border border-pink-300 rounded-lg  "
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="p-2 border border-pink-300 rounded-lg"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Sort By</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
            {/* Products List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-scroll max-h-[650px] p-2 border border-pink-300 rounded-lg">
              {products
                .filter(
                  (product) =>
                    (!sizeFilter || product.size === sizeFilter) &&
                    product.price >= priceRange[0] &&
                    product.price <= priceRange[1] &&
                    product.name.toLowerCase().includes(search.toLowerCase())
                )
                .sort((a, b) =>
                  sortOrder === "low-high"
                    ? a.price - b.price
                    : sortOrder === "high-low"
                    ? b.price - a.price
                    : 0
                )
                .map((product) => (
                  <div
                    key={product._id}
                    className="border border-pink-300 p-4 rounded-lg relative"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="text-lg font-semibold mt-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="font-bold mt-2">${product.price}</p>

                    {/* Rating System */}
                    <div className="flex mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer text-2xl transition-colors duration-300 ${
                            ratings[product._id] >= star
                              ? "text-yellow-400"
                              : "text-gray-500"
                          }`}
                          onClick={() => handleRating(product._id, star)}
                        />
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between items-center mt-3">
                      <button
                        className="bg-gray-700 text-white p-2 rounded-lg flex items-center gap-2"
                        onClick={() => handleAddToCart(product)}
                      >
                        <FaShoppingCart /> Add to Cart
                      </button>
                      <button className="text-red-500 text-2xl">
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {isCartOpen && (
        <CartSidebar cartItems={cart} onClose={() => setIsCartOpen(false)} />
      )}
    </div>
  );
};

export default ProductsPage;
