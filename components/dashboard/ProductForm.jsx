// components/dashboard/ProductForm.jsx
'use client';
import { useState } from 'react';

export default function ProductForm({ onProductAdd }) {
  const [form, setForm] = useState({ name: '', price: '', description: '', imageUrl: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { ...form, price: parseFloat(form.price), createdAt: new Date() };
    onProductAdd(newProduct); // Later post to API
    setForm({ name: '', price: '', description: '', imageUrl: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input className="w-full p-2" placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <input className="w-full p-2" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
      <textarea className="w-full p-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input className="w-full p-2" placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Product</button>
    </form>
  );
}
