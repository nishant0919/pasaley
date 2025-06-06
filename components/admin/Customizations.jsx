'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaUpload, FaPalette, FaFont } from 'react-icons/fa';

export default function Customizations() {
  const { data: session } = useSession();
  const [storeSettings, setStoreSettings] = useState({
    storeName: '',
    logoUrl: '',
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
    fontFamily: 'Arial, sans-serif',
  });

  useEffect(() => {
    if (!session) {
      window.location.href = '/login';
    }
  }, [session]);

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await fetch('/api/store/settings');
      if (response.ok) {
        const data = await response.json();
        setStoreSettings(data);
      } else {
        console.error('Error fetching store settings');
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStoreSettings({ ...storeSettings, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoreSettings({ ...storeSettings, logoUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/store/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storeSettings),
    });

    if (response.ok) {
      alert('Settings saved successfully!');
    } else {
      alert('Failed to save settings.');
    }
  };

  return (
    <motion.div
      className="bg-gray-900 min-h-screen w-full text-white p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Store Customization</h1>
          <p className="text-gray-400 mt-1 text-sm">Customize your store's appearance and settings.</p>
        </div>
        <img
          src={session?.user?.image || '/default-profile.jpg'}
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-gray-600"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-semibold">Store Name</label>
          <input
            type="text"
            name="storeName"
            value={storeSettings.storeName}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold">Logo Upload</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
              id="logo-upload"
            />
            <label htmlFor="logo-upload" className="cursor-pointer text-blue-400 flex items-center gap-2">
              <FaUpload /> Upload Logo
            </label>
            {storeSettings.logoUrl && (
              <img src={storeSettings.logoUrl} alt="Logo Preview" className="w-16 h-16 rounded-full" />
            )}
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold">Primary Color</label>
          <input
            type="color"
            name="primaryColor"
            value={storeSettings.primaryColor}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold">Secondary Color</label>
          <input
            type="color"
            name="secondaryColor"
            value={storeSettings.secondaryColor}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-lg font-semibold">Font Style</label>
          <select
            name="fontFamily"
            value={storeSettings.fontFamily}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-700"
          >
            <option value="Arial, sans-serif">Arial</option>
            <option value="'Times New Roman', serif">Times New Roman</option>
            <option value="'Courier New', monospace">Courier New</option>
            <option value="'Georgia', serif">Georgia</option>
            <option value="'Roboto', sans-serif">Roboto</option>
          </select>
        </div>

        <div className="flex justify-end gap-6">
          <button
            type="submit"
            className="bg-green-500 text-white p-3 rounded-md flex items-center gap-2 hover:bg-green-600"
          >
            <FaSave /> Save Settings
          </button>
        </div>
      </form>
    </motion.div>
  );
}
