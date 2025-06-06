'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const plans = [
  { 
    name: 'Basic', 
    price: '$19/mo', 
    desc: 'Perfect for beginners and small businesses.',
    features: [
      'Up to 100 products',
      'Basic templates',
      'Standard support',
      'Basic analytics',
      'Custom domain'
    ],
    recommended: false,
    btnText: 'Get Started'
  },
  { 
    name: 'Pro', 
    price: '$49/mo', 
    desc: 'Ideal for growing businesses.',
    features: [
      'Up to 1,000 products',
      'Premium templates',
      'Priority support',
      'Advanced analytics',
      'SEO tools',
      'Multiple payment options'
    ],
    recommended: true,
    btnText: 'Try Pro'
  },
  { 
    name: 'Enterprise', 
    price: '$99/mo', 
    desc: 'For established businesses with high volume sales.',
    features: [
      'Unlimited products',
      'Custom templates',
      '24/7 support',
      'Advanced analytics',
      'API access',
      'Multiple payment options',
      'Dedicated account manager'
    ],
    recommended: false,
    btnText: 'Contact Us'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-blue-50 dark:bg-gray-900 text-center">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl font-bold mb-4 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Simple, Transparent Pricing
        </motion.h2>
        
        <motion.p
          className="text-xl text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Choose the plan that's right for your business
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx} 
              className={`relative rounded-2xl shadow-xl overflow-hidden ${
                plan.recommended 
                  ? 'bg-white dark:bg-blue-900 ring-4 ring-blue-500 transform scale-105 lg:scale-110 z-10' 
                  : 'bg-white dark:bg-gray-800'
              }`}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-semibold">
                  RECOMMENDED
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{plan.name}</h3>
                <p className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">{plan.price}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-8">{plan.desc}</p>
                
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href="/auth/signin">
                  <button 
                    className={`w-full py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 ${
                      plan.recommended 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white'
                    }`}
                  >
                    {plan.btnText}
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.p
          className="mt-12 text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          All plans include a 14-day free trial. No credit card required.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;