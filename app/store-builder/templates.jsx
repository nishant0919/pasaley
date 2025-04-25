// app/store-builder/templates.jsx
import Link from 'next/link';

export const templates = [
  {
    id: 'template1',
    name: 'Modern Store',
    image: 'https://static.vecteezy.com/system/resources/previews/026/827/158/original/store-isolated-with-white-background-png.png'
  },
  {
    id: 'template2',
    name: 'Classic Store',
    image: 'https://cdn-icons-png.flaticon.com/512/75/75802.png'
  },
  {
    id: 'template3',
    name: 'Minimalist Store',
    image: 'https://img.pikbest.com/origin/09/30/03/50npIkbEsTctf.png!bw700'
  }
];

export default function Templates() {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Choose a Template</h2>
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
