'use client';

import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Login to Pasaley</h1>
        <button
          onClick={() => signIn('google')}
          className="bg-blue-500 text-white p-4 rounded-full flex items-center justify-center space-x-3 mx-auto"
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
          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
}
