'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center p-6 max-w-md w-full">
        <h1 className="text-4xl font-extrabold mb-8">Login to Pasaley</h1>
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white p-4 rounded-full flex items-center justify-center space-x-3 mx-auto w-full max-w-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-6h2v6zm0-8h-2V7h2v1z" />
          </svg>
          <span className="text-lg font-semibold">Login with Google</span>
        </button>
      </div>
    </div>
  );
}
