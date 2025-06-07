'use client';

import { useState } from 'react';
import { FaSave, FaPen, FaTimes } from 'react-icons/fa';

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
    navbarStyle: 'light',
    footerStyle: 'dark',
    bodyStyle: 'default',
  });

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalField, setModalField] = useState(null);
  const [modalValue, setModalValue] = useState('');

  // Open modal for a field
  function openModal(field, type = 'branding') {
    setModalField({ field, type });
    let val = '';
    if (type === 'branding') val = branding[field];
    else if (type === 'components') val = components[field];
    setModalValue(val);
    setModalOpen(true);
  }

  // Save modal changes
  function saveModal() {
    if (modalField.type === 'branding') {
      setBranding((prev) => ({ ...prev, [modalField.field]: modalValue }));
    } else if (modalField.type === 'components') {
      setComponents((prev) => ({ ...prev, [modalField.field]: modalValue }));
    }
    setModalOpen(false);
    setModalField(null);
  }

  // Handle branding changes inline (for file inputs)
  const handleFileChange = (e, target) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (target === 'logo') {
          setBranding((prev) => ({ ...prev, brandLogo: reader.result }));
        } else if (target === 'favicon') {
          setBranding((prev) => ({ ...prev, brandFavicon: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Modal input rendering based on field
  function renderModalInput() {
    if (!modalField) return null;
    const { field, type } = modalField;

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
          className="w-full p-2 border border-gray-300 rounded"
          autoFocus
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
      let options = [];
      if (field === 'navbarStyle') {
        options = ['light', 'dark', 'colored'];
      } else if (field === 'footerStyle') {
        options = ['light', 'dark', 'minimal'];
      } else if (field === 'bodyStyle') {
        options = ['default', 'boxed', 'wide'];
      }
      return (
        <select
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          autoFocus
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
      );
    }

    if (['brandLogo', 'brandFavicon'].includes(field) && type === 'branding') {
      return (
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => setModalValue(reader.result);
              reader.readAsDataURL(file);
            }
          }}
          autoFocus
        />
      );
    }

    // Default input is text
    return (
      <input
        type="text"
        value={modalValue}
        onChange={(e) => setModalValue(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        autoFocus
      />
    );
  }

  // Helper to display file image preview in form
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
        <button
          onClick={() => setActiveTab('branding')}
          className={`pb-2 font-semibold ${
            activeTab === 'branding'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Branding
        </button>
        <button
          onClick={() => setActiveTab('components')}
          className={`pb-2 font-semibold ${
            activeTab === 'components'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Components
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert('Settings saved (demo)');
        }}
        className="max-w-full"
      >
        {activeTab === 'branding' && (
          <div className="w-full border border-gray-300 dark:border-gray-700 rounded">
            {/* Brand Name */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700 w-full">
              <label
                htmlFor="brandName"
                className="font-semibold text-gray-900 dark:text-white"
              >
                Brand Name
              </label>
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium">
                  {branding.brandName || (
                    <span className="italic text-gray-500">Not set</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => openModal('brandName', 'branding')}
                  className="p-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none"
                  aria-label="Edit Brand Name"
                >
                  <FaPen />
                </button>
              </div>
            </div>

            {/* Primary Color */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <label className="font-semibold text-gray-900 dark:text-white">
                Primary Color
              </label>
              <div className="flex items-center gap-4">
                <div
                  className="w-8 h-8 rounded border border-gray-400"
                  style={{ backgroundColor: branding.primaryColor }}
                />
                <button
                  type="button"
                  onClick={() => openModal('primaryColor', 'branding')}
                  className="p-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none"
                  aria-label="Edit Primary Color"
                >
                  <FaPen />
                </button>
              </div>
            </div>

            {/* Font Family */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <label className="font-semibold text-gray-900 dark:text-white">
                Font Family
              </label>
              <div className="flex items-center gap-4">
                <span>{branding.fontFamily}</span>
                <button
                  type="button"
                  onClick={() => openModal('fontFamily', 'branding')}
                  className="p-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none"
                  aria-label="Edit Font Family"
                >
                  <FaPen />
                </button>
              </div>
            </div>

            {/* Brand Logo */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <label className="font-semibold text-gray-900 dark:text-white">
                Brand Logo
              </label>
              <div className="flex items-center gap-4">
                {renderImagePreview('brandLogo') || (
                  <span className="italic text-gray-500">Not set</span>
                )}
                <button
                  type="button"
                  onClick={() => openModal('brandLogo', 'branding')}
                  className="p-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none"
                  aria-label="Edit Brand Logo"
                >
                  <FaPen />
                </button>
              </div>
            </div>

            {/* Brand Favicon */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <label className="font-semibold text-gray-900 dark:text-white">
                Brand Favicon
              </label>
              <div className="flex items-center gap-4">
                {renderImagePreview('brandFavicon') || (
                  <span className="italic text-gray-500">Not set</span>
                )}
                <button
                  type="button"
                  onClick={() => openModal('brandFavicon', 'branding')}
                  className="p-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none"
                  aria-label="Edit Brand Favicon"
                >
                  <FaPen />
                </button>
              </div>
            </div>

            {/* Currency */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <label className="font-semibold text-gray-900 dark:text-white">
                Currency
              </label>
              <div className="flex items-center gap-4">
                <span>{branding.currency}</span>
                <button
                  type="button"
                  onClick={() => openModal('currency', 'branding')}
                  className="p-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none"
                  aria-label="Edit Currency"
                >
                  <FaPen />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'components' && (
          <div className="w-full border border-gray-300 dark:border-gray-700 rounded">
            {/* Top Bar Text */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <label className="font-semibold text-gray-900 dark:text-white">
                Top Bar Text
              </label>
              <div className="flex items-center gap-4">
                <span>
                  {components.topBarText || (
                    <span className="italic text-gray-500">Not set</span>
                  )}
                </span>
                <button
                  type="button"
                  onClick={() => openModal('topBarText', 'components')}
                  className="p-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none"
                  aria-label="Edit Top Bar Text"
                >
                  <FaPen />
                </button>
              </div>
            </div>

            {/* Navbar Style */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <label className="font-semibold text-gray-900 dark:text-white">
                Navbar Style
              </label>
              <div className="flex items-center gap-4">
                <span>{components.navbarStyle}</span>
                <button
                  type="button"
                  onClick={() => openModal('navbarStyle', 'components')}
                  className="p-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none"
                  aria-label="Edit Navbar Style"
                >
                  <FaPen />
                </button>
              </div>
            </div>

            {/* Footer Style */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <label className="font-semibold text-gray-900 dark:text-white">
                Footer Style
              </label>
              <div className="flex items-center gap-4">
                <span>{components.footerStyle}</span>
                <button
                  type="button"
                  onClick={() => openModal('footerStyle', 'components')}
                  className="p-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none"
                  aria-label="Edit Footer Style"
                >
                  <FaPen />
                </button>
              </div>
            </div>

            {/* Body Style */}
            <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
              <label className="font-semibold text-gray-900 dark:text-white">
                Body Style
              </label>
              <div className="flex items-center gap-4">
                <span>{components.bodyStyle}</span>
                <button
                  type="button"
                  onClick={() => openModal('bodyStyle', 'components')}
                  className="p-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 focus:outline-none"
                  aria-label="Edit Body Style"
                >
                  <FaPen />
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="mt-8 bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 focus:outline-none"
        >
          <FaSave className="inline mr-2" />
          Save Changes
        </button>
      </form>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-700 dark:text-gray-300 hover:text-red-600 focus:outline-none"
              aria-label="Close Modal"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold mb-4">
              Edit{' '}
              {modalField
                ? modalField.field
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, (str) => str.toUpperCase())
                : ''}
            </h2>

            <div className="mb-4">{renderModalInput()}</div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={saveModal}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
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
