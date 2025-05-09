'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { FaHome, FaStore, FaUsers, FaTags, FaBox, FaUserAlt, FaShoppingCart, FaChartLine, FaCog, FaBars, FaTimes } from 'react-icons/fa';

export default function AdminSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize(); // Initial check
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
        <div className="p-6 h-full flex flex-col">
          {/* Sidebar Header */}
          <h2 className="text-2xl font-bold text-center mb-6">Admin</h2>

          {/* User Info */}
          {session?.user && (
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={session.user.image || '/default-profile.jpg'}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{session.user.name}</p>
                <p className="text-sm">{session.user.email}</p>
              </div>
            </div>
          )}

          <hr className="border-gray-700 mb-4" />

          {/* Sidebar Links */}
          <ul className="space-y-2 flex-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
                    ${pathname === link.href ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
                  onClick={() => isMobile && setIsSidebarOpen(false)}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}