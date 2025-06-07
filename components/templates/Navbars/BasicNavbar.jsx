'use client';

import Link from 'next/link';

export default function BasicNavbar({ logoUrl, brandName }) {
  return (
    <nav className="bg-gray-50 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 py-2 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <a className="inline-flex items-center space-x-2">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={brandName || 'Logo'}
                className="h-6 w-auto object-contain"
              />
            ) : (
              <span className="font-semibold text-base">{brandName || 'Brand'}</span>
            )}
          </a>
        </Link>

        <div>
          <Link href="/about">
            <a className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1 rounded">About</a>
          </Link>
          <Link href="/contact">
            <a className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1 rounded">Contact</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
