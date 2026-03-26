'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { useState, useEffect } from "react";

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] },
  }),
};

export default function ReadingPlanPage() {
  const router = useRouter();
  const { childName, direction, updateDirection } = useOnboarding();

  const handleContinue = () => {
    updateDirection(1);
    router.push("/guarantee");
  };

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-6 font-quicksand">
      {/* Header */}
      <header className="w-full max-w-[450px] flex items-center justify-center py-6 relative shrink-0">
        <button 
          className="absolute left-0 text-white flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors" 
          onClick={handleBack}
          aria-label="Back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <img src="/VlQPe_m3.webp" alt="Reading.com" className="h-6 object-contain brightness-0 invert" />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[430px] flex flex-col items-center pt-2"
      >
        <h1 className="text-[24px] font-bold text-white text-center mb-6 leading-tight px-4">
          {childName || 'abhisksej'}&apos;s Reading Plan
        </h1>

        {/* Graph Card */}
        <div className="w-full bg-[#3a2c6d] rounded-3xl p-6 shadow-2xl mb-4 relative overflow-hidden">
          <div className="text-center mb-4">
            <h2 className="text-[18px] font-bold text-white mb-1">Based on 3-4 Lessons per week</h2>
            <p className="text-[16px] text-white/80 leading-relaxed px-4">
              You can expect {childName || 'abhisksej'} to reach <span className="text-[#FBA0FF] font-bold">a 2nd-grade reading level</span> within 6 months
            </p>
          </div>

          {/* SVG Graph */}
          <div className="w-full aspect-[4/3] relative">
            <svg viewBox="0 0 340 240" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#82E9FF" />
                  <stop offset="100%" stopColor="#D55CFF" />
                </linearGradient>
              </defs>

              {/* Grid Lines (Delay 0.2s) - 5 Lines to match goal */}
              {[50, 90, 130, 170, 210].map((y, i) => (
                <motion.line
                  key={y}
                  x1="0" y1={y} x2="340" y2={y}
                  stroke="white" strokeWidth="2" strokeOpacity="0.4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                />
              ))}

              {/* Start State (Delay 0.6s) */}
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {/* Dashed Line */}
                <line x1="40" y1="170" x2="40" y2="210" stroke="#82E9FF" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.6" />
                {/* Dot */}
                <circle cx="40" cy="170" r="7" fill="#82E9FF" />
                {/* Badge - Moved up by 10px */}
                <rect x="10" y="125" width="85" height="30" rx="10" fill="#82E9FF" />
                <text x="52.5" y="145" textAnchor="middle" fill="white" className="text-[12px] font-bold">Current level</text>
                {/* Label */}
                <text x="40" y="235" textAnchor="middle" fill="#82E9FF" className="text-[14px] font-bold opacity-90">Today</text>
              </motion.g>

              {/* Curve Drawing (Delay 1.0s) */}
              <motion.path
                d="M 40 170 C 130 170, 250 160, 300 50"
                fill="transparent"
                stroke="url(#curveGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.0, duration: 1.2, ease: "easeOut" }}
              />

              {/* End State (Delay 2.2s) */}
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.5 }}
              >
                {/* Dashed Line */}
                <line x1="300" y1="50" x2="300" y2="210" stroke="#D55CFF" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.6" />
                {/* Dot */}
                <circle cx="300" cy="50" r="7" fill="#D55CFF" />
                {/* Badge - Moved up by 10px */}
                <rect x="220" y="-10" width="110" height="46" rx="12" fill="#D55CFF" />
                <text x="275" y="8" textAnchor="middle" fill="white" className="text-[12px] font-bold">2nd-grade</text>
                <text x="275" y="24" textAnchor="middle" fill="white" className="text-[12px] font-bold">reading level</text>
                {/* Label */}
                <text x="300" y="235" textAnchor="middle" fill="#D55CFF" className="text-[14px] font-bold">Up to 6 months</text>
              </motion.g>
            </svg>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-[16px] text-white/70 text-start leading-relaxed px-4 mb-20 font-medium">
          Reading.com includes <span className="font-bold text-[#CABFFE]">up to 99 lessons</span> — and the placement test makes sure your child starts at the right point (not necessarily Lesson 1).
        </p>

      </motion.main>

      {/* Continue Button */}
      <motion.div
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="fixed bottom-0 w-full max-w-[480px] px-8 z-50 pb-3 pt-2"
      >
        <motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 bg-[#D55CFF] text-white rounded-full text-[18px] font-bold transition-all shadow-xl shadow-purple-950/20"
          onClick={handleContinue}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
