'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import {
  FaHome, FaStore, FaUsers, FaTags, FaBox, FaUserAlt,
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
      setIsMobile(window.innerWidth < 768);
      setIsSidebarOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md text-white"
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white h-screen fixed top-0 left-0 transition-all duration-300 z-40
          ${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} 
          md:w-64 md:block`}
      >
        <div className="p-6 h-full flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-center mb-4">Admin Panel</h2>

          {/* User Info */}
          {session?.user && (
            <div className="flex items-center gap-4 p-3 rounded-lg border border-gray-700">
              <img
                src={session.user.image || '/default-profile.jpg'}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold truncate">{session.user.name}</p>
                <p className="text-sm text-gray-400 truncate">{session.user.email}</p>
              </div>
            </div>
          )}

          {/* Nav Links */}
          <ul className="space-y-2 flex-1 overflow-y-auto">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-md transition 
                    ${pathname === link.href ? 'bg-gray-700 font-semibold' : 'hover:bg-gray-700'}`}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span className="truncate">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme Toggle Button */}
          <div className="pt-4 border-t border-gray-700">
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile */}
      {isSidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
