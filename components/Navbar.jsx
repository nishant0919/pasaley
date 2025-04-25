'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">StoreBuilder</Link>
        <div className="flex items-center space-x-4">
          <Link href="/features" className="text-white">Home</Link>
        <Link href="#features" className="text-white hover:text-gray-200">Features</Link>
        <Link href="#pricing" className="text-white hover:text-gray-200">Pricing</Link>
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
