'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [storeName, setStoreName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [template, setTemplate] = useState('classic-grid');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleContactChange = (e) => {
    const input = e.target.value;

    // Allow only numbers and max 10 digits
    if (/^\d{0,10}$/.test(input)) {
      setContactNumber(input);
    } else {
      alert('Only numbers allowed, max 10 digits.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/complete-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: session.user.email,
        storeName,
        contactNumber,
        template,
      }),
    });

    setLoading(false);
    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Failed to save data. Please try again.');
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 text-center">
          Complete Your Store Info
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Store Name"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />
          <input
            type="text"
            placeholder="Contact Number (only digits, max 10)"
            value={contactNumber}
            onChange={handleContactChange}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            required
          />

          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            <option value="classic-grid">Classic Grid</option>
            <option value="modern-cards">Modern Cards</option>
            <option value="minimalist">Minimalist</option>
          </select>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-3 rounded-md transition"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
