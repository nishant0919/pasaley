// app/store-builder/page.jsx
import Link from 'next/link';
import { templates } from './templates';  // Import the templates list

export default function StoreBuilder() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to Store Builder</h1>
      <p className="mb-8">Choose a template to get started:</p>

      <div className="grid grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md hover:scale-105 transition-all">
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-xl">{template.name}</h3>
            <Link href={`/store-builder/${template.id}`} passHref>
              <button className="bg-blue-600 text-white p-2 rounded-full mt-4 hover:bg-blue-500 transition-all">
                Choose this template
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
