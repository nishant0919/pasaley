'use client';

import { useState } from 'react';
import { FaSave, FaPen, FaTimes, FaUpload, FaTrash } from 'react-icons/fa';

const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export default function AdminCustomization() {
  const [activeTab, setActiveTab] = useState('branding');
  const [branding, setBranding] = useState({
    primaryColor: '#000000',
    fontFamily: 'Arial, sans-serif',
    brandName: '',
    brandLogo: '',
    brandFavicon: '',
    currency: 'USD',
  });

  const [components, setComponents] = useState({
    topBarText: '',
    navbarStyle: 'basic',
    footerStyle: 'dark',
    bodyStyle: 'default',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);
  const [modalValue, setModalValue] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  function openModal(field, type = 'branding') {
    setModalField({ field, type });
    const val = type === 'branding' ? branding[field] : components[field];
    setModalValue(val);
    setPreviewImage(null);
    setModalOpen(true);
  }

  function saveModal() {
    if (modalField.type === 'branding') {
      setBranding((prev) => ({ ...prev, [modalField.field]: modalValue }));
    } else {
      setComponents((prev) => ({ ...prev, [modalField.field]: modalValue }));
    }
    closeModal();
  }

  function closeModal() {
    setModalOpen(false);
    setModalField(null);
    setPreviewImage(null);
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data?.data?.url) {
        setModalValue(data.data.url);
        setPreviewImage(data.data.url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  function renderModalInput() {
    if (!modalField) return null;
    const { field, type } = modalField;

    const commonClasses = "w-full p-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-700 text-black dark:text-white";

    if (field === 'primaryColor') {
      return (
        <input
          type="color"
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
          className="w-20 h-10 cursor-pointer"
          autoFocus
        />
      );
    }

    if (field === 'fontFamily' && type === 'branding') {
      return (
        <select
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
          className={commonClasses}
        >
          <option value="Arial, sans-serif">Arial</option>
          <option value="'Times New Roman', serif">Times New Roman</option>
          <option value="'Courier New', monospace">Courier New</option>
          <option value="'Georgia', serif">Georgia</option>
          <option value="'Roboto', sans-serif">Roboto</option>
        </select>
      );
    }

    if (
      ['navbarStyle', 'footerStyle', 'bodyStyle'].includes(field) &&
      type === 'components'
    ) {
      const options = {
        navbarStyle: [
          { value: 'centeredLogo', label: 'Navbar with Centered Logo' },
          { value: 'withCategories', label: 'Navbar with Categories' },
          { value: 'basic', label: 'Basic Navbar' },
        ],
        footerStyle: [
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'minimal', label: 'Minimal' },
        ],
        bodyStyle: [
          { value: 'default', label: 'Default' },
          { value: 'boxed', label: 'Boxed' },
          { value: 'wide', label: 'Wide' },
        ],
      }[field];

      return (
        <select
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
          className={commonClasses}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (['brandLogo', 'brandFavicon'].includes(field) && type === 'branding') {
      return (
        <div className="space-y-4">
          {previewImage || modalValue ? (
            <div className="relative w-24 h-24">
              <img
                src={previewImage || modalValue}
                alt="preview"
                className="w-full h-full object-contain border rounded"
              />
              <button
                onClick={() => {
                  setModalValue('');
                  setPreviewImage(null);
                }}
                className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full shadow"
                type="button"
              >
                <FaTrash size={12} />
              </button>
            </div>
          ) : null}
          <label className="flex items-center gap-2 cursor-pointer text-blue-600 hover:underline">
            <FaUpload />
            <span>{isUploading ? 'Uploading...' : 'Add Image'}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      );
    }

    return (
      <input
        type="text"
        value={modalValue}
        onChange={(e) => setModalValue(e.target.value)}
        className={commonClasses}
      />
    );
  }

  function renderImagePreview(field) {
    const url = branding[field];
    if (!url) return null;
    const size = field === 'brandLogo' ? 64 : 40;
    return (
      <img
        src={url}
        alt={field}
        className="rounded border border-gray-300 dark:border-gray-700"
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    );
  }

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Customizations</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b border-gray-300 dark:border-gray-700">
        {['branding', 'components'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-semibold ${
              activeTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await fetch('/api/admin/customizations', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ branding, components }),
            });
            const data = await res.json();
            if (data.success) {
              alert('Settings saved successfully!');
            } else {
              alert('Error saving settings: ' + (data.error || 'Unknown error'));
            }
          } catch (err) {
            console.error('Saving settings failed:', err);
            alert('Server error while saving settings.');
          }
        }}
        className="max-w-full space-y-4"
      >
        {activeTab === 'branding' && (
          <div className="border rounded border-gray-300 dark:border-gray-700 divide-y">
            {[
              ['Brand Name', 'brandName'],
              ['Primary Color', 'primaryColor'],
              ['Font Family', 'fontFamily'],
              ['Brand Logo', 'brandLogo'],
              ['Brand Favicon', 'brandFavicon'],
              ['Currency', 'currency'],
            ].map(([label, key]) => (
              <div key={key} className="flex justify-between items-center p-4">
                <label className="font-semibold">{label}</label>
                <div className="flex items-center gap-4">
                  {['brandLogo', 'brandFavicon'].includes(key)
                    ? renderImagePreview(key) || (
                        <span className="italic text-gray-500">Not set</span>
                      )
                    : branding[key] || (
                        <span className="italic text-gray-500">Not set</span>
                      )}
                  <button
                    type="button"
                    onClick={() => openModal(key, 'branding')}
                    className="p-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
                  >
                    <FaPen />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'components' && (
          <div className="border rounded border-gray-300 dark:border-gray-700 divide-y">
            {[
              ['Top Bar Text', 'topBarText'],
              ['Navbar Style', 'navbarStyle'],
              ['Footer Style', 'footerStyle'],
              ['Body Style', 'bodyStyle'],
            ].map(([label, key]) => (
              <div key={key} className="flex justify-between items-center p-4">
                <label className="font-semibold">{label}</label>
                <div className="flex items-center gap-4">
                  <span className="capitalize">
                    {components[key]?.replace(/([A-Z])/g, ' $1') || (
                      <span className="italic text-gray-500">Not set</span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => openModal(key, 'components')}
                    className="p-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 dark:hover:bg-blue-900"
                  >
                    <FaPen />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700"
        >
          <FaSave className="inline mr-2" />
          Save Changes
        </button>
      </form>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-red-600"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold mb-4 capitalize">
              Edit {modalField?.field.replace(/([A-Z])/g, ' $1')}
            </h2>

            <div className="mb-4">{renderModalInput()}</div>

            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={saveModal}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
