'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import {
  FaHome, FaUsers, FaTags, FaBox, FaUserAlt,
  FaShoppingCart, FaChartLine, FaCog, FaBars, FaTimes
} from 'react-icons/fa';
import ThemeToggle from '../ThemeToggle';

export default function AdminSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const links = [
    { href: '/admin/home', label: 'Home', icon: <FaHome /> },
    { href: '/admin/users', label: 'Users', icon: <FaUsers /> },
    { href: '/admin/categories', label: 'Categories', icon: <FaTags /> },
    { href: '/admin/products', label: 'Products', icon: <FaBox /> },
    { href: '/admin/customers', label: 'Customers', icon: <FaUserAlt /> },
    { href: '/admin/orders', label: 'Orders', icon: <FaShoppingCart /> },
    { href: '/admin/analytics', label: 'Analytics', icon: <FaChartLine /> },
    { href: '/admin/customizations', label: 'Customizations', icon: <FaCog /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 dark:bg-gray-800 rounded-md text-gray-900 dark:text-white shadow-md"
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 z-40
        ${isSidebarOpen ? 'w-64' : 'w-16'} md:block`}
      >
        <div className="h-full flex flex-col p-4 overflow-hidden">
          {/* Header */}
          <h2 className={`text-xl font-bold text-center mb-4 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
            Admin Panel
          </h2>

          {/* User Info */}
          {session?.user && (
            <div className={`flex items-center gap-3 p-3 mb-4 rounded transition-all duration-300
              ${isSidebarOpen ? 'flex bg-gray-300 dark:bg-gray-700' : 'flex-col items-center bg-gray-300 dark:bg-gray-700'}`}>
              <img
                src={session.user.image || '/default-profile.jpg'}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border border-gray-400 dark:border-gray-600"
              />
              {isSidebarOpen && (
                <div className="overflow-hidden">
                  <p className="font-semibold truncate">{session.user.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{session.user.email}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation Links */}
          <ul className="space-y-2 flex-1 overflow-y-auto">
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition
                    ${pathname === link.href ? 'bg-gray-400 dark:bg-gray-700 font-semibold' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}
                    ${isSidebarOpen ? 'justify-start' : 'justify-center'}
                    text-gray-900 dark:text-gray-100`}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                >
                  <span className="text-lg">{link.icon}</span>
                  {isSidebarOpen && <span className="truncate">{link.label}</span>}
                </Link>
              </li>
            ))}
          </ul>

          {/* Footer Section */}
          <div className={`pt-4 border-t border-gray-400 dark:border-gray-700 mt-4 flex flex-col gap-2 
            ${isSidebarOpen ? 'items-start' : 'items-center'}`}>
            <ThemeToggle collapsed={!isSidebarOpen} />
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 w-full justify-center md:justify-start text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
              {isSidebarOpen && 'Sign Out'}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}
    </>
  );
}
