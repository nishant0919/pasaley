'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import Link from 'next/link';
import {
  FaStore, FaBox, FaUsers, FaShoppingCart,
  FaChartLine, FaTags, FaCog
} from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import LoadingScreen from '../LoadingScreen';

export default function AdminHome() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      window.location.href = '/login';
    }
  }, [status]);

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      className="min-h-screen w-full p-4 bg-white text-black dark:bg-gray-900 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
            Welcome back, {session?.user?.name || "Admin"} 👋
          </p>
        </div>
        <img
          src={session?.user?.image || '/default-profile.jpg'}
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600"
        />
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StatCard title="Total Stores" value="15" icon={<FaStore size={32} />} color="text-purple-600 dark:text-purple-400" />
        <StatCard title="Products" value="320" icon={<FaBox size={32} />} color="text-yellow-600 dark:text-yellow-400" />
        <StatCard title="Customers" value="1200" icon={<FaUsers size={32} />} color="text-green-600 dark:text-green-400" />
        <StatCard title="Orders" value="530" icon={<FaShoppingCart size={32} />} color="text-red-600 dark:text-red-400" />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <QuickLink href="/admin/store" title="Manage Stores" icon={<FaStore />} />
        <QuickLink href="/admin/products" title="Manage Products" icon={<FaBox />} />
        <QuickLink href="/admin/customers" title="Manage Customers" icon={<FaUsers />} />
        <QuickLink href="/admin/orders" title="View Orders" icon={<FaShoppingCart />} />
        <QuickLink href="/admin/categories" title="Categories" icon={<FaTags />} />
        <QuickLink href="/admin/customizations" title="Settings" icon={<FaCog />} />
      </motion.div>

      <motion.div
        className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Analytics Overview</h2>
          <FaChartLine className="text-blue-600 dark:text-blue-400" size={28} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">Revenue This Month</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">$12,400</p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-xl flex flex-col">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">New Customers</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">320</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip contentStyle={{ backgroundColor: '#222', borderRadius: '10px' }} />
              <Line type="monotone" dataKey="revenue" stroke="#4ade80" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </motion.div>
    </motion.div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-700 transition">
      <div>
        <p className="text-gray-700 dark:text-gray-400 text-sm">{title}</p>
        <h3 className="text-3xl font-bold mt-1 text-black dark:text-white">{value}</h3>
      </div>
      <div className={`text-4xl ${color}`}>
        {icon}
      </div>
    </div>
  );
}

function QuickLink({ href, title, icon }) {
  return (
    <Link href={href} className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 p-6 rounded-2xl flex gap-4 items-center transition">
      <div className="text-blue-600 dark:text-blue-400 text-3xl">{icon}</div>
      <div className="text-lg font-semibold text-black dark:text-white">{title}</div>
    </Link>
  );
}

const chartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 7000 },
  { name: 'May', revenue: 6500 },
  { name: 'Jun', revenue: 9000 },
  { name: 'Jul', revenue: 8500 },
];
