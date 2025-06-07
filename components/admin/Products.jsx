"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Trash2, Edit3 } from "lucide-react";

function Loading() {
  return (
    <div className="flex justify-center items-center py-4">
      <svg
        className="animate-spin h-8 w-8 text-green-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
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
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showModal]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    try {
      const res = await fetch("/api/category");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      alert("Failed to fetch categories");
    }
    setLoading(false);
  }

  async function fetchProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/product");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      alert("Failed to fetch products");
    }
    setLoading(false);
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setFormData({ ...formData, images: [...formData.images, ...urls] });
  };

  const removeImageAtIndex = (idx) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sellingPrice || !formData.category) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct
        ? `/api/product/${editingProduct._id}`
        : "/api/product";

      const bodyData = {
        ...formData,
        sellingPrice: parseFloat(formData.sellingPrice),
        crossedPrice: formData.crossedPrice
          ? parseFloat(formData.crossedPrice)
          : undefined,
        costPrice: formData.costPrice ? parseFloat(formData.costPrice) : undefined,
        quantity: parseInt(formData.quantity),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      if (!res.ok) throw new Error("Request failed");

      setShowModal(false);
      setEditingProduct(null);
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

      fetchProducts();
    } catch (error) {
      alert("Failed to save product");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchProducts();
    } catch (error) {
      alert("Failed to delete product");
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      sellingPrice: product.sellingPrice?.toString() || "",
      crossedPrice: product.crossedPrice?.toString() || "",
      costPrice: product.costPrice?.toString() || "",
      quantity: product.quantity?.toString() || "",
      weight: product.weight || "",
      category: product.category?._id || "",
      images: product.images || [],
    });
    setShowModal(true);
  };

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
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
            setShowModal(true);
          }}
          className="bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700 w-full sm:w-auto text-white"
        >
          + Add New Product
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400 text-lg">
          No products available.
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-100 dark:bg-gray-800 rounded-md shadow-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="text-left text-gray-700 dark:text-gray-300 border-b border-gray-300 dark:border-gray-700">
                <th className="p-4 min-w-[70px]">Image</th>
                <th className="p-4 min-w-[150px]">Name</th>
                <th className="p-4 min-w-[120px]">Category</th>
                <th className="p-4 min-w-[110px]">Selling Price</th>
                <th className="p-4 min-w-[80px]">Inventory</th>
                <th className="p-4 min-w-[130px]">Created At</th>
                <th className="p-4 min-w-[120px]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-4">
                    <img
                      src={product.images?.[0] || "/no-image.png"}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-4 truncate max-w-[150px]">{product.name}</td>
                  <td className="p-4">{product.category?.name || "N/A"}</td>
                  <td className="p-4">${product.sellingPrice?.toFixed(2)}</td>
                  <td className="p-4">{product.quantity}</td>
                  <td className="p-4">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                      aria-label="Edit product"
                    >
                      <Edit3 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800"
                      aria-label="Delete product"
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
      )}

      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.85 }}
            className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative shadow-lg"
          >
            <button
              aria-label="Close modal"
              onClick={() => {
                setShowModal(false);
                setEditingProduct(null);
              }}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-black dark:text-white"
                required
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-black dark:text-white resize-none"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Selling Price"
                  value={formData.sellingPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, sellingPrice: e.target.value })
                  }
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-black dark:text-white"
                  required
                />

                <input
                  type="number"
                  step="0.01"
                  placeholder="Crossed Price"
                  value={formData.crossedPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, crossedPrice: e.target.value })
                  }
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-black dark:text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  step="0.01"
                  placeholder="Cost Price"
                  value={formData.costPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, costPrice: e.target.value })
                  }
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-black dark:text-white"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-black dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Weight (e.g. 500g)"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-black dark:text-white"
                />
              </div>

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-black dark:text-white"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <div>
                <label
                  htmlFor="imageUpload"
                  className="cursor-pointer inline-block mb-2 text-blue-600 hover:text-blue-800"
                >
                  + Add Images
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="flex flex-wrap gap-3 mt-2 max-h-36 overflow-auto">
                  {formData.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-20 h-20 rounded-md overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`Preview ${idx + 1}`}
                        className="object-cover w-full h-full"
                      />
                      <button
                        type="button"
                        onClick={() => removeImageAtIndex(idx)}
                        className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white hover:bg-opacity-80"
                        aria-label="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : editingProduct ? "Update Product" : "Save Product"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
