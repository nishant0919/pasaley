"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", imageUrl: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/category");
    const data = await res.json();
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/category", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ name: "", imageUrl: "" });
    setShowModal(false);
    fetchCategories();
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Categories</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700"
        >
          + Add New Category
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-md shadow-lg">
        <table className="min-w-full">
          <thead>
            <tr className="text-left">
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id} className="border-t border-gray-700">
                <td className="p-4">
                  <img src={cat.imageUrl} alt="category" className="h-12 w-12 rounded-md object-cover" />
                </td>
                <td className="p-4">{cat.name}</td>
                <td className="p-4">{new Date(cat.createdAt).toLocaleDateString()}</td>
                <td className="p-4">
                  <button className="text-red-400 hover:text-red-600">Delete</button>
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
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
        >
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Category Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded-md"
              />
              <input
                type="text"
                placeholder="Image URL (upload in imgbb)"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded-md"
              />
              <button
                type="submit"
                className="w-full bg-green-500 py-2 rounded-md hover:bg-green-600"
              >
                Save
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}
