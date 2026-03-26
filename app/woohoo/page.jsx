'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";

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

export default function EmailEntry() {
  const router = useRouter();
  const { parentEmail, setParentEmail, direction, updateDirection } = useOnboarding();
  const [email, setEmail] = useState(parentEmail || "");

  const handleContinue = () => {
    if (email.includes('@')) {
      setParentEmail(email);
      updateDirection(1);
      // Route to next step
      router.push("/child-name"); 
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white md:px-6 font-quicksand overflow-x-hidden">
      {/* Header */}
      <header className="w-full max-w-[450px] flex justify-center py-6">
        <img src="/VlQPe_m3.webp" alt="Reading.com" className="h-6 object-contain" />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[430px] flex flex-col items-center pt-8"
      >
        <h1 className="text-[24px] font-bold text-[#221750] text-center mb-6 leading-tight px-4">
          Enter your email to get started with a personalized reading plan
        </h1>

        {/* Email Input */}
        <div className="w-full px-4 mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full h-14 px-3 rounded-xl border-2 border-[#000] bg-[#F5F9FF]/30 outline-none focus:border-[#a2a2a2] transition-all text-[16px] font-medium text-[#221750] placeholder:text-slate-400 shadow-sm"
          />
        </div>

        {/* Continue Button */}
        <div className="w-full px-4 mb-8">
          <motion.button
            whileTap={email.includes('@') ? { scale: 0.98 } : {}}
            disabled={!email.includes('@')}
            className={`w-full h-14 bg-[#5032F5] text-white rounded-full text-[18px] font-bold transition-all shadow-md ${
              !email.includes('@') ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:brightness-105'
            }`}
            onClick={handleContinue}
          >
            Continue
          </motion.button>
        </div>

        {/* Privacy Note */}
        <div className="w-full px-8 text-center mb-8">
          <p className="text-[14px] text-slate-700 font-medium leading-relaxed">
            We respect your privacy and never spam. Please read our{" "}
            <a href="#" className="underline text-[#5032F5]">Privacy Policy</a>{" "}
            to understand how we use your data.
          </p>
        </div>

        {/* Social Proof Footer */}
        <div className="w-full flex flex-col items-center mt-auto pb-10">
          <img 
            src="/Join.webp" 
            alt="Parents joining" 
            className="h-10 object-contain mb-3"
          />
          <p className="text-[14px] text-center text-[#221750] font-medium leading-tight px-24 italic opacity-80">
            Join <span className="font-bold">more than 2.5 million parents</span> teaching their kids to read!
          </p>
        </div>
      </motion.main>
    </div>
  );
}
