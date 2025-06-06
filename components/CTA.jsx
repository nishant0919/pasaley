'use client';

import { motion } from 'framer-motion';
import Button from './Button';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Online Store?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of successful entrepreneurs who built their business with StoreBuilder.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              href="/auth/signin" 
              label="Start Building Now" 
              variant="primary" 
              size="lg"
            />
            <Button 
              href="/templates" 
              label="Browse Templates" 
              variant="outline" 
              size="lg"
            />
          </div>
          
          <p className="mt-8 text-blue-200 text-sm">No credit card required • 14-day free trial</p>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;