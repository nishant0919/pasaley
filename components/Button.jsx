'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Button = ({ href, label, variant = 'primary', size = 'md', className = '' }) => {
  // Button style variants
  const variants = {
    primary: 'bg-yellow-500 hover:bg-yellow-400 text-gray-900',
    secondary: 'bg-blue-600 hover:bg-blue-500 text-white',
    outline: 'bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900',
    dark: 'bg-gray-800 hover:bg-gray-700 text-white',
  };
  
  // Button size variants
  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-lg',
    lg: 'py-4 px-8 text-xl',
  };
  
  const buttonClass = `${variants[variant]} ${sizes[size]} rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${className}`;
  
  return (
    <Link href={href}>
      <motion.button 
        className={buttonClass}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {label}
      </motion.button>
    </Link>
  );
}

export default Button;