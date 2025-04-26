'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  FaHome, FaStore, FaUsers, FaTags, FaBox,
  FaUserAlt, FaShoppingCart, FaChartLine, FaCog
} from 'react-icons/fa';

export default function AdminSidebar({ isOpen = true, onClose }) {
  const { data: session } = useSession();

  return (
    <aside className={`bg-gray-800 text-white p-6 w-[25vw] h-screen space-y-6 z-20 transition-transform
      ${isOpen ? 'block' : 'hidden'} md:block fixed md:relative top-0 left-0 `}>
      
      <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>

      {session?.user && (
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={session.user.image || '/default-profile.jpg'}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{session.user.name}</p>
            <p className="text-sm">{session.user.email}</p>
          </div>
        </div>
      )}

      <hr className="border-gray-700" />

      <ul className="space-y-4 mt-4">
        <li>
          <Link href="/admin/home" className="flex items-center space-x-3 hover:text-gray-400">
            <FaHome />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/store" className="flex items-center space-x-3 hover:text-gray-400">
            <FaStore />
            <span>Store</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/users" className="flex items-center space-x-3 hover:text-gray-400">
            <FaUsers />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/categories" className="flex items-center space-x-3 hover:text-gray-400">
            <FaTags />
            <span>Categories</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/products" className="flex items-center space-x-3 hover:text-gray-400">
            <FaBox />
            <span>Products</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/customers" className="flex items-center space-x-3 hover:text-gray-400">
            <FaUserAlt />
            <span>Customers</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/orders" className="flex items-center space-x-3 hover:text-gray-400">
            <FaShoppingCart />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/analytics" className="flex items-center space-x-3 hover:text-gray-400">
            <FaChartLine />
            <span>Analytics</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/customizations" className="flex items-center space-x-3 hover:text-gray-400">
            <FaCog />
            <span>Customizations</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
