'use client';

import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ProgressBar from "@/components/ProgressBar";
import { useImagePreload } from "@/hooks/useImagePreload";

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

export default function AgeSelection() {
  const { selectedAge, setSelectedAge, direction, updateDirection } = useOnboarding();
  const router = useRouter();
  const isReady = useImagePreload(["/VlQPe_m3.webp", "/TKhB_Tsn.webp"]);

  const ages = [
    "Under 3", "3", "3 ½",
    "4", "4 ½", "5",
    "6", "7", "8+"
  ];

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
    updateDirection(1); // Moving forward
    router.push("/research");
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <header className="w-full max-w-[480px] flex flex-col items-center pt-8 pb-0 px-5 relative shrink-0">
        <div className="w-full relative flex items-center justify-center mb-4">
          <img src="/VlQPe_m3.webp" alt="Reading.com" className="h-6 object-contain" />
        </div>
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[480px] px-5 pb-16 flex flex-col items-center"
      >
        <h1 className="text-[24px] font-bold mb-4 text-center text-black">
          <span className="text-[#5032F5]">How old</span> is your child?
        </h1>

        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          {ages.map((age) => (
            <motion.button
              key={age}
              whileTap={{ scale: 0.98 }}
              className={`h-[70px] rounded-lg text-[16px] font-semibold flex items-center justify-center transition-all duration-200 border border-solid ${
                selectedAge === age 
                  ? 'bg-white text-[#5032F5] border-[#221750] border-1 shadow-sm' 
                  : 'bg-white text-[#5032F5] border-[#e2e8f0]'
              }`}
              onClick={() => handleAgeSelect(age)}
            >
              {age}
            </motion.button>
          ))}
        </div>

        <div className="bg-[#FFF0FB] border border-[#FBA0FF] rounded-[20px] py-2 px-2 mb-2 text-center w-full">
          <p className="text-[#000000] text-[12px] font-medium">
            Tip: You can add more profiles later (up to 3 children)
          </p>
        </div>

        <div className="w-full flex justify-center mb-4">
          <img src="/TKhB_Tsn.webp" className="w-full max-w-[380px] object-contain" alt="Awards and Certifications" />
        </div>

        <div className="flex flex-col items-center text-center w-full">
          <div className="text-[#F19A2C] text-[16px] mb-1 tracking-[2px]">★★★★★</div>
          <p className="text-[14px] font-semibold text-black tracking-[0.5px] uppercase">5-STAR REVIEWS</p>
          <p className="text-[14px] font-semibold text-black tracking-[0.5px] uppercase">FROM 20,000+ PARENTS & TEACHERS</p>
        </div>
      </motion.main>
    </div>
  );
}
