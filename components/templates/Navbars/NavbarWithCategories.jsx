'use client';

import Link from 'next/link';

export default function NavbarWithCategories({ logoUrl, brandName, categories = [] }) {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link href="/">
          <a className="inline-flex items-center space-x-2">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={brandName || 'Logo'}
                className="h-8 w-auto object-contain"
              />
            ) : (
              <span className="font-bold text-lg">{brandName || 'Brand'}</span>
            )}
          </a>
        </Link>

        <ul className="flex space-x-6 text-gray-700 dark:text-gray-300 font-medium">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <li key={cat}>
                <Link href={`/category/${cat.toLowerCase()}`}>
                  <a className="hover:text-blue-600 dark:hover:text-blue-400">{cat}</a>
                </Link>
              </li>
            ))
          ) : (
            <li className="italic text-gray-400">No categories</li>
          )}
        </ul>
      </div>
    </nav>
  );
}
