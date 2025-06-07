'use client';

import Link from 'next/link';

export default function CenteredLogoNavbar({ logoUrl, brandName }) {
  return (
    <nav className="bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700 py-3">
      <div className="container mx-auto flex justify-center">
        <Link href="/">
          <a className="inline-flex items-center space-x-2">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={brandName || 'Logo'}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span className="font-bold text-xl">{brandName || 'Brand'}</span>
            )}
          </a>
        </Link>
      </div>
    </nav>
  );
}
