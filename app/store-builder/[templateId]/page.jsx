'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function TemplatePage({ params }) {
  const { templateId } = params;
  const [storeName, setStoreName] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    const data = {
      templateId,
      storeName,
      createdAt: new Date(),
    };

    const res = await fetch('/api/save-template', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    setSaving(false);

    if (result.success) {
      alert('Template saved!');
      router.push('/dashboard');
    } else {
      alert('Save failed: ' + result.error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8">
        <h1 className="text-3xl font-bold mb-4">Customizing: {templateId}</h1>

        <input
          type="text"
          placeholder="Store Name"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="p-2 border rounded w-full max-w-md mb-4"
        />

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-500 transition-all"
        >
          {saving ? 'Saving...' : 'Save Store'}
        </button>
      </div>
    </>
  );
}
