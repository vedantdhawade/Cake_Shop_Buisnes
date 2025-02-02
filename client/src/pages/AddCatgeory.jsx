import { useState } from "react";
import uploadImage from "../utils/uploadimage.js";
import { toast } from "react-hot-toast";
import Axios from "../utils/Axios.jsx";
import { SummaryApi } from "../common/SummaryApi.jsx";

export default function AdminCategory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState({
    name: "",
    image: "",
  });
  const [allCategories, setAllCategories] = useState([
    { _id: "1", name: "Cakes", image: "" },
    { _id: "2", name: "Pastries", image: "" },
  ]);
  const [currentCategory, setCurrentCategory] = useState({
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setLoading(true);
    const response = await uploadImage(image);
    if (response.data.success) {
      toast.success(response.data.message);
      setCategories((prev) => ({ ...prev, image: response.data.url }));
      console.log(categories);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleAddCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: categories,
      });
      if (response.data.success) {
        setCategories({
          name: "",
          image: "",
        });
        setIsModalOpen(false);
      }
      toast.error(response.data.message);
    } catch (error) {
      console.log("Error At Add categories :", error);
    }
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleUpdateCategory = () => {
    setAllCategories(
      allCategories.map((cat) =>
        cat._id === currentCategory._id ? currentCategory : cat
      )
    );
    setCurrentCategory({ name: "", image: "" });
    setIsModalOpen(false);
    setIsEditing(false);
  };

  const handleDeleteCategory = (id) => {
    setAllCategories(allCategories.filter((category) => category._id !== id));
  };

  return (
    <div className="p-6 bg-pink-100 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Add Category</h2>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsEditing(false);
            setCurrentCategory({ name: "", image: "" });
          }}
          className="bg-black text-pink-300  px-2 py-1 md:px-4 md:py-2 rounded"
        >
          + Add Category
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-black"
            >
              ✖
            </button>
            <h3 className="text-lg font-bold text-black mb-4">
              {isEditing ? "Edit Category" : "New Category"}
            </h3>
            <input
              required="true"
              type="text"
              placeholder="Category Name"
              className="w-full border px-3 py-2 mb-4"
              value={categories.name}
              onChange={(e) =>
                setCategories({ ...categories, name: e.target.value })
              }
            />
            <input
              type="file"
              className="w-full border px-3 py-2 mb-4"
              onChange={handleFileChange}
            />
            <button
              disabled={loading}
              onClick={isEditing ? handleUpdateCategory : handleAddCategory}
              className="w-full bg-black text-pink-300 py-2 rounded"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}

      <table className="w-full bg-white rounded shadow-md text-black">
        <thead>
          <tr className="border-b bg-pink-200">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Image</th>
            <th className="py-2 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allCategories.map((category) => (
            <tr key={category._id} className="border-b">
              <td className="py-2 px-4">{category.name}</td>
              <td className="py-2 px-4">
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-12 w-12 object-cover"
                  />
                )}
              </td>
              <td className="py-2 px-4 text-right">
                <button
                  className="text-blue-500 px-2"
                  onClick={() => handleEditCategory(category)}
                >
                  ✎
                </button>
                <button
                  className="text-red-500 px-2"
                  onClick={() => handleDeleteCategory(category._id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
