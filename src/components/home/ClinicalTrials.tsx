"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const trialData = [
  {
    id: 1,
    productName: "The Face Cream",
    image: "/Quil-faceCream/Quil-faceCream.jpg",
    stats: [
      { percentage: "98%", text: "agree skin feels firmer, more resilient, and visibly plumped" },
      { percentage: "95%", text: "agree redness and irritation are visibly calmed" },
      { percentage: "92%", text: "agree tone and texture of skin is visibly improved after use" }
    ],
    link: "/shop/the-face-cream"
  },
  {
    id: 2,
    productName: "The Body Lotion",
    image: "/Quil-lotion/Quil-lotion.jpg",
    stats: [
      { percentage: "99%", text: "agree skin feels instantly hydrated with a healthy, radiant glow" },
      { percentage: "96%", text: "agree deep hydration is maintained throughout the day" },
      { percentage: "94%", text: "agree the body's skin texture feels significantly smoother" }
    ],
    link: "/shop/the-body-lotion"
  },
  {
    id: 3,
    productName: "The Body Wash",
    image: "/regimen_architecture.png",
    stats: [
      { percentage: "100%", text: "agree skin feels perfectly cleansed without feeling stripped" },
      { percentage: "98%", text: "agree skin feels softer and more receptive to hydration" },
      { percentage: "95%", text: "agree overall skin health and vitality is visibly restored" }
    ],
    link: "/shop/the-body-wash"
  }
];

export default function ClinicalTrials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="w-full py-32 bg-[#F8F7F5] dark:bg-[#1C1C1C] transition-colors duration-700 border-t border-stone-200 dark:border-stone-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#D1A68D] font-bold block mb-4">
            DIVE INTO THE EVIDENCE
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#1C1C1C] dark:text-[#F8F7F5]">
            Clinical and User Trials
          </h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-6 md:gap-12 mb-16 border-b border-stone-300 dark:border-stone-800 pb-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
          {trialData.map((item, index) => (
            <button 
              key={item.id} 
              onClick={() => setCurrentIndex(index)}
              className={`font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase pb-4 relative transition-colors ${currentIndex === index ? "text-[#1C1C1C] dark:text-[#F8F7F5] font-bold" : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"}`}
            >
              {item.productName}
              {currentIndex === index && (
                <motion.div layoutId="trialTab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C1C1C] dark:bg-[#F8F7F5]" />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Canvas */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 w-full min-h-[500px]"
          >
            {/* Left Stats (Stats 0 and 1) */}
            <div className="w-full lg:w-1/4 flex flex-row lg:flex-col justify-around lg:justify-center gap-8 lg:gap-24 text-center lg:text-right order-2 lg:order-1">
              <div className="flex-1">
                <h4 className="font-serif text-5xl md:text-7xl font-light text-[#1C1C1C] dark:text-[#F8F7F5] mb-2 md:mb-4 tracking-tighter">
                  {trialData[currentIndex].stats[0].percentage}
                </h4>
                <p className="font-sans font-light text-xs md:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-[200px] mx-auto lg:ml-auto lg:mr-0">
                  {trialData[currentIndex].stats[0].text}
                </p>
              </div>
              <div className="flex-1">
                <h4 className="font-serif text-5xl md:text-7xl font-light text-[#1C1C1C] dark:text-[#F8F7F5] mb-2 md:mb-4 tracking-tighter">
                  {trialData[currentIndex].stats[1].percentage}
                </h4>
                <p className="font-sans font-light text-xs md:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-[200px] mx-auto lg:ml-auto lg:mr-0">
                  {trialData[currentIndex].stats[1].text}
                </p>
              </div>
            </div>

            {/* Center Image (Uncropped) */}
            <div className="w-full lg:w-2/4 relative h-[300px] md:h-[500px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2">
              <Image 
                src={trialData[currentIndex].image}
                alt={trialData[currentIndex].productName}
                fill
                className="object-contain p-4 md:p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Right Stat (Stat 2 + Actions) */}
            <div className="w-full lg:w-1/4 flex flex-col justify-center gap-12 lg:gap-24 text-center lg:text-left order-3">
              <div>
                <h4 className="font-serif text-5xl md:text-7xl font-light text-[#1C1C1C] dark:text-[#F8F7F5] mb-2 md:mb-4 tracking-tighter">
                  {trialData[currentIndex].stats[2].percentage}
                </h4>
                <p className="font-sans font-light text-xs md:text-sm text-stone-600 dark:text-stone-400 leading-relaxed max-w-[200px] mx-auto lg:mr-auto lg:ml-0">
                  {trialData[currentIndex].stats[2].text}
                </p>
              </div>
              
              <div className="flex flex-col items-center lg:items-start gap-6 mt-4 lg:mt-0">
                <Link href={trialData[currentIndex].link} className="bg-[#D1A68D] hover:bg-[#C19880] text-white font-sans text-[10px] font-bold uppercase tracking-[0.2em] py-4 px-10 text-center transition-colors rounded-sm w-full md:w-auto">
                  View Full Study
                </Link>
                <Link href={trialData[currentIndex].link} className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#1C1C1C] dark:text-[#F8F7F5] border-b border-[#1C1C1C] dark:border-stone-500 pb-1 hover:opacity-60 transition-opacity">
                  Discover Product
                </Link>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
