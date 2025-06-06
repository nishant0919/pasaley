'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-gray-800 dark:to-gray-700 text-white py-28 text-center relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        className="absolute top-20 left-20 w-20 h-20 rounded-full bg-yellow-400 opacity-20"
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut" 
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-40 w-32 h-32 rounded-full bg-purple-500 opacity-20"
        animate={{ 
          y: [0, -40, 0],
          x: [0, 20, 0]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut" 
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h1 
          className="text-5xl md:text-6xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Create Your Custom Website <span className="text-yellow-400">in Minutes</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          No coding skills required. Start selling your products online today.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/auth/signin">
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-full hover:bg-yellow-300 text-lg font-bold shadow-lg transition-all duration-300">
              Get Started
            </button>
          </Link>
        </motion.div>
        
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <img 
            src="/api/placeholder/800/450" 
            alt="Platform Preview" 
            className="rounded-lg shadow-2xl mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;