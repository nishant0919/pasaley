// app/store-builder/SectionEditor.jsx

'use client';

export default function SectionEditor({ section, onChange }) {
  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-xl mb-4">{section.name}</h3>
      <textarea
        value={section.content}
        onChange={(e) => onChange(section.id, e.target.value)}
        className="p-2 w-full rounded-lg border"
        placeholder={`Edit ${section.name} content...`}
      />
    </div>
  );
}
