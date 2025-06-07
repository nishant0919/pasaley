'use client'

import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#111827]">
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
        <motion.p
          className="text-lg font-semibold text-white"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{
            y: { repeat: Infinity, repeatType: 'loop', duration: 1, ease: 'easeInOut', repeatDelay: 0.3 },
          }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  )
}
