'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      const res = await fetch('/api/stores');
      const data = await res.json();
      setStores(data);
    };
    if (status === 'authenticated') fetchStores();
  }, [status]);

  const handleDelete = async (id) => {
    await fetch(`/api/stores/${id}`, { method: 'DELETE' });
    setStores(stores.filter((store) => store._id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 dark:text-white">
        <h1 className="text-2xl font-bold mb-4">Your Stores</h1>
        <div className="space-y-4">
          {stores.length === 0 && <p>No stores found.</p>}
          {stores.map((store) => (
            <div key={store._id} className="p-4 border dark:border-gray-700 rounded-lg shadow-sm flex justify-between items-center bg-white dark:bg-gray-800">
              <div>
                <h2 className="font-bold">{store.storeName || 'Untitled Store'}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Template: {store.templateId}</p>
              </div>
              <div className="flex space-x-2">
                <Link href={`/store-builder/${store.templateId}`}>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500">Edit</button>
                </Link>
                <button onClick={() => handleDelete(store._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
