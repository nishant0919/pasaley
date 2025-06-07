"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trash2, X } from "lucide-react";

const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", imageUrl: "" });
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  // Disable body scroll when modal open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [showModal]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/category");
    const data = await res.json();
    setCategories(data);
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploading(false);

    if (data.success) {
      setFormData((prev) => ({ ...prev, imageUrl: data.data.url }));
      setPreview(data.data.url);
    } else {
      alert("Image upload failed");
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ name: "", imageUrl: "" });
    setPreview(null);
    setShowModal(false);
    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await fetch("/api/category", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchCategories();
  };

  return (
    <div className="p-4 sm:p-8 bg-[#111827] min-h-screen text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Categories</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 px-5 py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base w-full sm:w-auto text-center"
        >
          + Add Category
        </button>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto bg-[#1f2937] rounded-md shadow-lg">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="p-3 sm:p-4 min-w-[64px]">Image</th>
              <th className="p-3 sm:p-4 min-w-[120px]">Name</th>
              <th className="p-3 sm:p-4 min-w-[120px]">Created At</th>
              <th className="p-3 sm:p-4 min-w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat._id}
                className="border-t border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="p-2 sm:p-4">
                  <img
                    src={cat.imageUrl}
                    alt="category"
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-md object-cover border border-gray-600"
                  />
                </td>
                <td className="p-2 sm:p-4 text-sm sm:text-base">{cat.name}</td>
                <td className="p-2 sm:p-4 text-sm sm:text-base">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 sm:p-4">
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="text-red-400 hover:text-red-600 flex items-center gap-1 text-sm sm:text-base"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <div className="relative bg-[#1f2937] p-6 rounded-lg w-full max-w-md mx-auto">
            {/* Close Modal */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-white">Add Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full p-2 bg-gray-700 rounded-md text-white placeholder-gray-400"
                required
              />

              {!preview && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadImage}
                  className="w-full p-2 bg-gray-700 rounded-md text-white cursor-pointer file:mr-3 file:py-1 file:px-2 file:border-none file:bg-blue-600 file:text-white"
                  required
                />
              )}

              {uploading && (
                <p className="text-sm text-gray-400">Uploading image...</p>
              )}

              {preview && (
                <div className="relative w-full h-40 rounded-md overflow-hidden border border-gray-600">
                  <img
                    src={preview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 rounded-full p-1 text-white hover:bg-red-600 transition"
                    aria-label="Remove selected image"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={uploading || !formData.name || !formData.imageUrl}
                className="w-full bg-green-500 py-2 rounded-md hover:bg-green-600 transition disabled:opacity-50"
              >
                Save Category
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}
