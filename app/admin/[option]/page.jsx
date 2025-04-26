'use client';

import React from 'react';
import OptionFile from './OptionFile';

function Page({ params }) {
  const { option } = params;

  const validOptions = [
    'home',
    'store',
    'users',
    'category',
    'products',
    'customers',
    'orders',
    'analytics',
    'customizations',
    'questions'
  ];

  if (!validOptions.includes(option)) {
    return <div className="w-full text-center p-6">404 | Page Not Found</div>;
  }

  return <OptionFile option={option} />;
}

export default Page;
