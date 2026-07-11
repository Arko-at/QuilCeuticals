"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProductSpotlight() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for the internal images
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 lg:px-24 bg-[#F8F7F5] dark:bg-[#1C1C1C] transition-colors duration-700 overflow-hidden">
      
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
        <div>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#D1A68D] mb-4 block font-bold">The Regimen</span>
          <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C] dark:text-[#F8F7F5]">
            Just Your Skin.
          </h2>
        </div>
        
        <div className="flex flex-col items-start md:items-end max-w-lg">
          <p className="font-sans font-light text-sm md:text-base text-stone-600 dark:text-stone-400 leading-relaxed mb-6 md:text-right">
            Meticulously formulated to empower your skin's innate healing architecture. Our foundational 3-step regimen—Face Cream, Body Lotion, and Body Wash—addresses the root causes of cellular decline.
          </p>
          <Link href="/shop" className="group flex items-center gap-3 text-[#1C1C1C] dark:text-[#F8F7F5] hover:opacity-70 transition-opacity whitespace-nowrap border-b border-stone-200 dark:border-stone-700 pb-1">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold">Explore The Collection</span>
          </Link>
        </div>
      </div>

      {/* Alternating Zigzag Layout */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-24 lg:gap-32">
        
        {/* Product 1: The Face Cream */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 group">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-5/12"
            style={{ y: y1 }}
          >
            <Link href="/shop/the-face-cream" className="block w-full relative overflow-hidden rounded-sm transition-colors duration-700 shadow-xl group bg-stone-100 dark:bg-stone-900">
                <Image 
                  src="/Quil-faceCream/Quil-faceCream.jpg" 
                  alt="The Face Cream" 
                  width={800}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <Image 
                  src="/Quil-faceCream/Quil-faceCream-Hover.jpg" 
                  alt="The Face Cream Texture" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover absolute inset-0 z-10 transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-7/12 flex flex-col justify-center"
          >
            <span className="font-sans font-light text-stone-500 uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 block">
              Deep Cellular Rejuvenation
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-[#1C1C1C] dark:text-[#F8F7F5] mb-6">
              The Face Cream
            </h3>
            <p className="font-sans font-light text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8 max-w-xl">
              Clinically engineered to target the root causes of epidermal decline. Our signature Face Cream utilizes the proprietary Peptide-Lipid Complex to reconstruct cellular barriers, deeply hydrating while visibly reducing fine lines and fatigue. A singular solution for complete facial rejuvenation.
            </p>
            <div className="flex items-center gap-8">
              <span className="font-sans text-lg font-medium text-[#1C1C1C] dark:text-[#F8F7F5]">$265</span>
              <Link href="/shop/the-face-cream" className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#D1A68D] hover:text-[#C19880] transition-colors border-b border-[#D1A68D] hover:border-[#C19880] pb-1">
                Discover More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Product 2: The Body Lotion */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24 group">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-4/12"
            style={{ y: y2 }}
          >
            <Link href="/shop/the-body-lotion" className="block w-full relative overflow-hidden rounded-sm transition-colors duration-700 shadow-xl group bg-stone-100 dark:bg-stone-900">
                <Image 
                  src="/Quil-lotion/Quil-lotion.jpg" 
                  alt="The Body Lotion" 
                  width={800}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-105"
                />
                <Image 
                  src="/Quil-lotion/Quil-lotion-hover.jpg" 
                  alt="The Body Lotion Texture" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover absolute inset-0 z-10 transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-8/12 flex flex-col justify-center items-start md:items-end text-left md:text-right"
          >
            <span className="font-sans font-light text-stone-500 uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 block">
              Barrier Support & Firming
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-[#1C1C1C] dark:text-[#F8F7F5] mb-6">
              The Body Lotion
            </h3>
            <p className="font-sans font-light text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8 max-w-xl">
              Extend the power of cellular healing to your entire body. This rich, fast-absorbing lotion combines clinical-grade Niacinamide with potent botanicals to instantly soothe, firm, and restore skin’s natural elasticity, leaving it flawlessly smooth and resilient.
            </p>
            <div className="flex items-center gap-8 flex-row-reverse md:flex-row">
              <span className="font-sans text-lg font-medium text-[#1C1C1C] dark:text-[#F8F7F5]">$105</span>
              <Link href="/shop/the-body-lotion" className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#D1A68D] hover:text-[#C19880] transition-colors border-b border-[#D1A68D] hover:border-[#C19880] pb-1">
                Discover More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Product 3: The Body Wash */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 group">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-5/12"
          >
            <Link href="/shop/the-body-wash" className="block w-full relative aspect-[4/5] bg-[#EFECE7] dark:bg-[#2A2A2A] overflow-hidden rounded-sm transition-colors duration-700 shadow-xl">
              <motion.div style={{ y: y3 }} className="absolute inset-0 -top-[15%] -bottom-[15%]">
                <Image 
                  src="/regimen_architecture.png" 
                  alt="The Body Wash" 
                  fill 
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </motion.div>
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-7/12 flex flex-col justify-center"
          >
            <span className="font-sans font-light text-stone-500 uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 block">
              Purifying Molecular Cleanse
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-[#1C1C1C] dark:text-[#F8F7F5] mb-6">
              The Body Wash
            </h3>
            <p className="font-sans font-light text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8 max-w-xl">
              A transformative, sulfate-free cleanse. Powered by Marine Extremolytes, this purifying wash gently removes impurities without stripping your skin’s delicate microbiome. It perfectly preps your body’s canvas to receive and lock in deep hydration.
            </p>
            <div className="flex items-center gap-8">
              <span className="font-sans text-lg font-medium text-[#1C1C1C] dark:text-[#F8F7F5]">$55</span>
              <Link href="/shop/the-body-wash" className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#D1A68D] hover:text-[#C19880] transition-colors border-b border-[#D1A68D] hover:border-[#C19880] pb-1">
                Discover More
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
