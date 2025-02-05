import { useEffect, useState } from "react";
import uploadImage from "../utils/uploadimage.js";
import { toast } from "react-hot-toast";
import Axios from "../utils/Axios.jsx";
import { SummaryApi } from "../common/SummaryApi.jsx";

export default function AdminProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState({
    name: "",
    image: "",
    description: "",
    category: "",
    rating: "",
    price: "",
    discount: "",
    size: "",
  });
  const [updateProduct, setUpdateProduct] = useState({
    id: "",
    name: "",
    image: "",
    description: "",
    category: "",
    rating: "",
    price: "",
    discount: "",
    size: "",
  });
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
    getCategories();
  }, [reload]);

  const getProducts = async () => {
    try {
      const response = await Axios(SummaryApi.getProducts);
      setAllProducts(response.data.data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await Axios(SummaryApi.getcategories);
      setAllCategories(response.data.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const handleEditProduct = (product) => {
    setUpdateProduct({ ...product, category: product.category?._id || "" });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateProduct = async () => {
    console.log("Updated Product:", updateProduct);
    const response = await Axios({
      ...SummaryApi.updateProduct,
      data: updateProduct,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      setIsUpdateModalOpen(false);
      setReload(true);
    }
    toast.error(response.data.message);
    setIsUpdateModalOpen(false);
  };

  const handleDeleteProduct = async (id) => {
    try {
      console.log(id);
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: {
          id: id,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error in delete product", error);
    }
  };

  return (
    <div className="p-6 bg-pink-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Manage Products</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
          }}
          className="bg-black text-pink-300 px-4 py-2 rounded"
        >
          + Add Product
        </button>
      </div>

      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[600px] relative">
            <button
              onClick={() => setIsUpdateModalOpen(false)}
              className="absolute top-2 right-2 text-black"
            >
              ✖
            </button>
            <h3 className="text-lg font-bold text-black mb-4">
              Update Product
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                className="border px-3 py-2"
                value={updateProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="border px-3 py-2"
                value={updateProduct.description}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    description: e.target.value,
                  })
                }
              />
              <select
                className="border px-3 py-2"
                value={updateProduct.category || ""}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    category: e.target.value,
                  })
                }
              >
                <option value="">Select Category</option>
                {allCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Rating"
                className="border px-3 py-2"
                value={updateProduct.rating}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, rating: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Price"
                className="border px-3 py-2"
                value={updateProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, price: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Discount"
                className="border px-3 py-2"
                value={updateProduct.discount}
                onChange={(e) =>
                  setUpdateProduct({
                    ...updateProduct,
                    discount: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Size"
                className="border px-3 py-2"
                value={updateProduct.size}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, size: e.target.value })
                }
              />
            </div>
            <button
              className="w-full bg-black text-pink-300 py-2 rounded mt-4"
              onClick={handleUpdateProduct}
            >
              Update
            </button>
          </div>
        </div>
      )}
      <div className="w-full max-h-[400px] overflow-y-auto bg-white rounded shadow-md text-black">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-pink-200">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Rating</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Discount</th>
              <th className="py-2 px-4 text-left">Size</th>
              <th className="py-2 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 object-cover"
                    />
                  )}
                </td>
                <td className="py-2 px-4">{product.description}</td>
                <td className="py-2 px-4">{product.category?.name}</td>
                <td className="py-2 px-4">{product.rating}</td>
                <td className="py-2 px-4">${product.price}</td>
                <td className="py-2 px-4">{product.discount}%</td>
                <td className="py-2 px-4">{product.size}</td>
                <td className="py-2 px-4 text-right">
                  <button
                    className="text-blue-500 px-2"
                    onClick={() => handleEditProduct(product)}
                  >
                    ✎
                  </button>
                  <button
                    className="text-red-500 px-2"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
