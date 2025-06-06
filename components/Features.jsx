'use client';

import { motion } from 'framer-motion';

const features = [
  { 
    title: 'Customizable Templates', 
    description: 'Choose from a variety of professionally designed templates and make them your own with our easy-to-use editor.',
    icon: '🎨'
  },
  { 
    title: 'Easy Drag & Drop', 
    description: 'Build your pages with simple drag & drop functionality. No coding required.',
    icon: '✋'
  },
  { 
    title: 'Mobile Ready', 
    description: 'All templates are fully responsive and work perfectly on phones, tablets, and desktops.',
    icon: '📱'
  },
  { 
    title: 'SEO Optimized', 
    description: 'Built-in SEO tools help your store rank higher in search results.',
    icon: '🔍'
  },
  { 
    title: 'Secure Payments', 
    description: 'Integrate with popular payment gateways to accept payments securely.',
    icon: '🔒'
  },
  { 
    title: 'Analytics Dashboard', 
    description: 'Track your performance with detailed analytics and reports.',
    icon: '📊'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-800 text-center">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl font-bold mb-4 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Powerful Features
        </motion.h2>
        
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Everything you need to build and grow your online business
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              variants={itemVariants}
            >
              <div className="text-4xl mb-6 mx-auto bg-blue-50 dark:bg-blue-900 text-blue-500 dark:text-blue-300 w-16 h-16 flex items-center justify-center rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;