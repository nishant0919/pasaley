'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Templates', href: '/templates' },
      { name: 'Integrations', href: '/integrations' }
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' }
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Support', href: '/support' },
      { name: 'API', href: '/api' }
    ],
    legal: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Security', href: '/security' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', href: '#' },
    { name: 'Twitter', icon: 'fab fa-twitter', href: '#' },
    { name: 'Instagram', icon: 'fab fa-instagram', href: '#' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', href: '#' }
  ];

  return (
    <motion.footer 
      className="bg-gray-800 dark:bg-gray-900 text-white py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">StoreBuilder</Link>
            <p className="text-gray-400 mb-6 max-w-md">Create beautiful online stores with no coding required. Start selling your products online today.</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  className="bg-gray-700 hover:bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label={social.name}
                >
                  <i className={social.icon}></i>
                  {/* Replace with actual icons or use text alternatives */}
                  {social.name.charAt(0)}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2025 StoreBuilder. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {footerLinks.legal.map((link, idx) => (
              <Link key={idx} href={link.href} className="text-gray-400 hover:text-white transition-colors duration-300">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;