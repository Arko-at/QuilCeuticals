"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "The Cellular Matrix serum completely transformed my barrier. After years of rosacea, my skin is finally calm and luminous. I honestly want to cover my whole body in this stuff. I love it.",
    author: "SARAH J"
  },
  {
    id: 2,
    text: "Unbelievable texture. It absorbs instantly but leaves this incredible, lasting hydration. Truly medical grade. This is by far the best product I've ever used.",
    author: "MICHAEL C"
  },
  {
    id: 3,
    text: "You can feel the pearl extract working. My complexion looks like glass. The finest skincare investment I've made. My skin looks incredible.",
    author: "EMMA S"
  }
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Fade in a darker/accent overlay color as you scroll through the section
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Slowly move the SVG curves up for a parallax effect
  const svgY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-16 lg:py-20 flex justify-center border-t border-stone-200 dark:border-stone-900 bg-[#F8F7F5] dark:bg-[#1C1C1C] transition-colors duration-700 overflow-hidden"
    >
      {/* Scroll-reactive color overlay */}
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[#EFECE7] dark:bg-[#0A0A0A] transition-colors duration-700 pointer-events-none" 
      />

      {/* Clean elegant SVG Parallax */}
      <motion.div 
        style={{ y: svgY }} 
        className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-10 pointer-events-none flex items-center justify-center"
      >
        <svg width="150%" height="150%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path d="M -200 300 Q 250 100 500 300 T 1200 300" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1C1C1C] dark:text-[#F8F7F5]" />
          <path d="M -200 500 Q 250 300 500 500 T 1200 500" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1C1C1C] dark:text-[#F8F7F5]" />
          <path d="M -200 700 Q 250 500 500 700 T 1200 700" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#1C1C1C] dark:text-[#F8F7F5]" />
        </svg>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center lg:text-left flex flex-col items-center lg:items-start min-h-[250px] w-full">
        {/* Large Quote Icon */}
        <div className="text-[#1C1C1C] dark:text-[#F8F7F5] font-serif text-6xl md:text-8xl leading-none mb-6 h-12 flex items-end">
          “
        </div>

        <div className="relative w-full h-[180px] md:h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center lg:items-start w-full"
            >
              <p className="font-sans font-light text-sm md:text-base text-stone-600 dark:text-stone-300 leading-relaxed mb-8 max-w-2xl text-center lg:text-left">
                {testimonials[currentIndex].text}
              </p>
              <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#D1A68D]">
                — {testimonials[currentIndex].author}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dashes Indicator */}
        <div className="flex gap-4 mt-12 justify-center lg:justify-start w-full lg:w-auto">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-[2px] transition-all duration-300 ${idx === currentIndex ? "w-8 bg-[#1C1C1C] dark:bg-[#F8F7F5]" : "w-6 bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-500"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
