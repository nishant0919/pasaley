"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sellingPrice: "",
    crossedPrice: "",
    costPrice: "",
    quantity: "",
    weight: "",
    category: "",
    images: [],
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("/api/product");
    const data = await res.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/category");
    const data = await res.json();
    setCategories(data);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: urls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        sellingPrice: parseFloat(formData.sellingPrice),
        crossedPrice: formData.crossedPrice ? parseFloat(formData.crossedPrice) : undefined,
        costPrice: formData.costPrice ? parseFloat(formData.costPrice) : undefined,
        quantity: parseInt(formData.quantity),
      }),
    });
    setFormData({
      name: "",
      description: "",
      sellingPrice: "",
      crossedPrice: "",
      costPrice: "",
      quantity: "",
      weight: "",
      category: "",
      images: [],
    });
    setShowModal(false);
    fetchProducts();
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700"
        >
          + Add New Product
        </button>
      </div>

      <div className="overflow-x-auto bg-gray-800 rounded-md shadow-lg">
        <table className="min-w-full">
          <thead>
            <tr className="text-left">
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Selling Price</th>
              <th className="p-4">Inventory</th>
              <th className="p-4">Created At</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-gray-700">
                <td className="p-4">
                  <img src={product.images?.[0]} alt="" className="h-12 w-12 object-cover rounded-md" />
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category?.name}</td>
                <td className="p-4">${product.sellingPrice}</td>
                <td className="p-4">{product.quantity}</td>
                <td className="p-4">{new Date(product.createdAt).toLocaleDateString()}</td>
                <td className="p-4 space-x-2">
                  <button className="text-blue-400 hover:text-blue-600">Edit</button>
                  <button className="text-red-400 hover:text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center"
        >
          <div className="bg-gray-800 p-6 rounded-lg w-96 overflow-y-auto max-h-screen">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded-md"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded-md"
              />
              <input
                type="number"
                placeholder="Selling Price (required)"
                value={formData.sellingPrice}
                onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded-md"
                required
              />
              <input
                type="number"
                placeholder="Crossed Price (optional)"
                value={formData.crossedPrice}
                onChange={(e) => setFormData({ ...formData, crossedPrice: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded-md"
              />
              <input
                type="number"
                placeholder="Cost Price (optional)"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded-md"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded-md"
              />
              <input
                type="text"
                placeholder="Weight (e.g., 500g)"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded-md"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 bg-gray-700 rounded-md"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 bg-gray-700 rounded-md"
              />
              <div className="flex flex-wrap gap-2">
                {formData.images.map((img, idx) => (
                  <img key={idx} src={img} className="h-16 w-16 object-cover rounded-md" />
                ))}
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 py-2 rounded-md hover:bg-green-600"
              >
                Save Product
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}
