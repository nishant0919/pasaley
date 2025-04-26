'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Correct import for usePathname
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname(); // Get the current path
  const [showNavbar, setShowNavbar] = useState(true);

  // Hide Navbar on `/admin` and its sub-paths
  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [pathname]);

  if (!showNavbar) return null; // Don't render Navbar if the condition is met

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">StoreBuilder</Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-white">Home</Link>
          {session ? (
            <>
              <Link href="/dashboard" className="text-white">Dashboard</Link>
              <button onClick={() => signOut()} className="text-white">Logout</button>
            </>
          ) : (
            <button onClick={() => signIn('google')} className="text-white">Login</button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
