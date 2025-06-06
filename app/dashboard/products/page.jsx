'use client';
import { useState } from 'react';
import ProductForm from '@/components/dashboard/ProductForm';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <ProductForm onProductAdd={(newProduct) => setProducts([...products, newProduct])} />
      <ul className="mt-6 space-y-2">
        {products.map((product, i) => (
          <li key={i} className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
