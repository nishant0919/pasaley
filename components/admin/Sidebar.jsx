'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { FaHome, FaStore, FaUsers, FaTags, FaBox, FaUserAlt, FaShoppingCart, FaChartLine, FaCog, FaBars } from 'react-icons/fa';

export default function AdminSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname(); // Get the current route

  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Controls sidebar visibility on mobile
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
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar on mobile
  };

  return (
    <div className="flex">
      {/* Hamburger Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="md:hidden p-4 text-white"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white p-6 h-screen fixed top-0 left-0 transition-all duration-300 
          ${isSidebarOpen ? 'w-[20vw]' : 'w-16'} 
          md:w-[20vw] md:block`}
      >
        {/* Sidebar Header */}
        <h2 className="text-2xl font-bold text-center mb-6 md:hidden">{/* For mobile view */} Admin</h2>

        {/* User Info */}
        {session?.user && (
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={session.user.image || '/default-profile.jpg'}
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="hidden md:block">
              <p className="font-semibold">{session.user.name}</p>
              <p className="text-sm">{session.user.email}</p>
            </div>
          </div>
        )}

        <hr className="border-gray-700 mb-4" />

        {/* Sidebar Links */}
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
                  ${pathname === link.href ? 'bg-gray-700 font-bold' : 'hover:bg-gray-700'}`}
              >
                {link.icon}
                <span className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
