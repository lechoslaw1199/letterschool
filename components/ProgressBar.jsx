'use client';

import { motion } from "framer-motion";

export default function ProgressBar({ progress }) {
  return (
    <div className="w-full h-[4px] bg-[#E1DCFE] relative mb-4 mt-4 overflow-hidden rounded-full">
      <motion.div 
        className="absolute left-0 top-0 h-full bg-[#CF5DFE]"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
