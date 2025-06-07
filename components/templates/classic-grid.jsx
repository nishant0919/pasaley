'use client';

import { useState, useEffect } from 'react';
import BasicNavbar from './Navbar/BasicNavbar';

export default function ClassicGrid({ store }) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const catRes = await fetch('/api/category');
        const cats = await catRes.json();
        setCategories(cats);

        const prodRes = await fetch('/api/product');
        const prods = await prodRes.json();
        setProducts(prods);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <BasicNavbar store={store} />

      <header className="max-w-7xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
          Welcome to {store.storeName || 'My Store'}
        </h1>
        <p className="text-gray-700 dark:text-gray-300">
          Contact: {store.contactNumber || 'N/A'}
        </p>
      </header>

      {categories.length > 0 && (
        <section className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Categories
          </h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex-grow min-w-[150px] text-center"
              >
                {cat.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className="max-w-7xl mx-auto p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <img
                  src={product.image || '/placeholder.png'}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                    {product.name}
                  </h3>
                  <p className="text-indigo-600 font-bold mt-2">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="max-w-7xl mx-auto p-6 text-center text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} {store.storeName || 'My Store'}. All rights reserved.
      </footer>
    </div>
  );
}
