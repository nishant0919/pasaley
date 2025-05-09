'use client';

import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from '@/components/AdminSidebar';

import Category from '@/components/Admin/Category';

import Home from '@/components/Admin/Home';
import Store from '@/components/Admin/Store';
import Users from '@/components/Admin/Users';
import Products from '@/components/Admin/Products';
import Customers from '@/components/Admin/Customers';
import Orders from '@/components/Admin/Orders';
import Analytics from '@/components/Admin/Analytics';
import Customizations from '@/components/Admin/Customizations';

function OptionFile({ option }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

 
 

  const renderComponent = () => {
    switch (option) {
      case 'home':
        return <Home />;
      case 'store':
        return <Store />;
      case 'users':
        return <Users />;
      case 'category':
        return <Category />;
      case 'products':
        return <Products />;
      case 'customers':
        return <Customers />;
      case 'orders':
        return <Orders />;
      case 'analytics':
        return <Analytics />;
      case 'customizations':
        return <Customizations />;
      case 'questions':
        return <Questions />;
      default:
        return <div>Invalid Option</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-30 bg-gray-700 p-2 rounded"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} />

      {/* Divider */}
      <div className="hidden md:block w-px bg-gray-700" />

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto ml-0 md:ml-64">
        {renderComponent()}
      </div>
    </div>
  );
}

export default OptionFile;
