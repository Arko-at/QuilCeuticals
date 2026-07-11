"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProductStory() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle internal parallax for the image
  const yImage = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  // Subtle parallax for the text
  const yText = useTransform(scrollYProgress, [0, 1], ["10%", "-5%"]);

  return (
    <section ref={containerRef} className="w-full bg-[#F8F7F5] dark:bg-[#1C1C1C] transition-colors duration-700 pt-12 pb-32 px-6 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left: Image with Parallax */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 relative aspect-[4/5] bg-[#F2F0EB] dark:bg-[#2A2A2A] rounded-sm overflow-hidden"
        >
          <motion.div style={{ y: yImage }} className="absolute inset-0 -top-[15%] -bottom-[15%] overflow-hidden flex items-center justify-center bg-[#F2F0EB] dark:bg-[#2A2A2A]">
            <iframe
              src="https://www.youtube.com/embed/oc-xwDRNOHI?autoplay=1&mute=1&loop=1&playlist=oc-xwDRNOHI&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0"
              allow="autoplay; encrypted-media"
              className="w-[250%] h-[200%] pointer-events-none"
            />
            <motion.div 
              initial={{ opacity: 1 }} 
              animate={{ opacity: 0 }} 
              transition={{ delay: 2, duration: 1 }} 
              className="absolute inset-0 bg-[#F2F0EB] dark:bg-[#2A2A2A] pointer-events-none z-10" 
            />
          </motion.div>
        </motion.div>

        {/* Right: Copy */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div
            style={{ y: yText }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-medium text-stone-500 mb-6 block">
              The Philosophy
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-[#1C1C1C] dark:text-[#F8F7F5] leading-[1.1] mb-8">
              A commitment to <br className="hidden md:block" />
              <span className="italic text-stone-500">absolute purity.</span>
            </h2>
            <p className="font-sans font-light text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8">
              We do not compromise. Every ingredient is sourced at the peak of its potency, processed using medical-grade extraction techniques, and formulated to seamlessly integrate with your skin's natural architecture.
            </p>
            <p className="font-sans font-light text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-12">
              The result is an unparalleled experience that bridges the gap between clinical efficacy and pure luxury.
            </p>
            
            <Link href="/journey" className="group flex items-center justify-center bg-[#1C1C1C] dark:bg-[#F8F7F5] text-white dark:text-[#1C1C1C] px-8 py-4 rounded-full hover:opacity-90 transition-opacity w-max">
              <span className="font-sans text-xs tracking-widest uppercase font-medium">Read Our Story</span>
            </Link>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
