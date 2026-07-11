"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

const MolecularBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#1C1C1C] dark:bg-[#0A0A0A]">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(209, 166, 141, 0.15)" />
            <stop offset="100%" stopColor="rgba(209, 166, 141, 0)" />
          </radialGradient>
          <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
        </defs>
        
        {/* Animated Molecular Nodes */}
        <motion.circle fill="url(#glow1)" r="300"
          animate={{ cx: [100, 400, 100], cy: [200, 600, 200] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle fill="url(#glow2)" r="400"
          animate={{ cx: [900, 500, 900], cy: [800, 300, 800] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle fill="url(#glow1)" r="250"
          animate={{ cx: [500, 800, 500], cy: [100, 400, 100] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Connecting network lines */}
        <motion.path 
          stroke="rgba(209, 166, 141, 0.2)" 
          strokeWidth="1.5" 
          fill="none" 
          animate={{ d: ["M 100 200 L 500 100 L 900 800", "M 400 600 L 800 400 L 500 300", "M 100 200 L 500 100 L 900 800"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.path 
          stroke="rgba(255, 255, 255, 0.15)" 
          strokeWidth="1" 
          fill="none" 
          animate={{ d: ["M 500 100 L 900 800 L 100 200", "M 800 400 L 500 300 L 400 600", "M 500 100 L 900 800 L 100 200"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
};

export default function ScienceMechanism() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={containerRef} className="relative w-full py-16 md:py-20 bg-[#1C1C1C] dark:bg-[#0A0A0A] transition-colors duration-700 overflow-hidden">
      
      {/* Animated Cellular Background */}
      <MolecularBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
          <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#D1A68D] font-medium block mb-4">
            Proprietary Architecture
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl font-light text-[#F8F7F5] mb-6"
          >
            The Science of Quilbiotics™
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans font-light text-sm md:text-base text-stone-300 dark:text-stone-400 max-w-3xl leading-relaxed"
          >
            Our proven results are powered by Quilbiotics™ – a proprietary blend of high-grade extremolytes, cellular reconstructing lipids, and high-performing peptides – backed by exhaustive research, innovation, and clinical study.
          </motion.p>
                {/* Compact 3-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full mb-12 h-auto md:h-[350px] items-center">
          
          {/* Step 1 */}
          <motion.div
            style={{ y: y1 }}
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group"
          >
            <span className="font-serif text-6xl font-light text-white/5 absolute -top-4 -right-2 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110">
              1
            </span>
            <h3 className="font-sans text-xl font-medium text-[#F8F7F5] mb-4 relative z-10">Cellular Communication</h3>
            <p className="font-sans font-light text-sm text-stone-400 leading-relaxed relative z-10">
              <span className="font-medium text-stone-200">Quilbiotics™</span> improves skin cell communication and reinforces the epidermal barrier, creating the optimal environment for continuous renewal and visible rejuvenation.
            </p>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            style={{ y: y2 }}
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group"
          >
            <span className="font-serif text-6xl font-light text-white/5 absolute -top-4 -right-2 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110">
              2
            </span>
            <h3 className="font-sans text-xl font-medium text-[#F8F7F5] mb-4 relative z-10">Adaptive Reconstruction</h3>
            <p className="font-sans font-light text-sm text-stone-400 leading-relaxed relative z-10">
              <span className="font-medium text-stone-200">Quilbiotics™</span> turns potent base formulations into smarter, adaptive skincare proven to address individualized concerns – repairing environmental damage and locking in absolute hydration.
            </p>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            style={{ y: y3 }}
            className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group"
          >
             <span className="font-serif text-6xl font-light text-white/5 absolute -top-4 -right-2 pointer-events-none select-none transition-transform duration-500 group-hover:scale-110">
              3
            </span>
            <h3 className="font-sans text-xl font-medium text-[#F8F7F5] mb-4 relative z-10">Deep-Tissue Vitality</h3>
            <p className="font-sans font-light text-sm text-stone-400 leading-relaxed relative z-10">
              <span className="font-medium text-stone-200">Quilbiotics™</span> supports the skin's overall structural integrity, resulting in a complexion that feels fundamentally healthier, firmer, and reflects genuine luminosity from within.
            </p>
          </motion.div>

        </div>

        </div>

        <div className="flex justify-center relative z-10">
          <Link href="/science" className="bg-[#D1A68D] hover:bg-[#C19880] text-white font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] py-4 px-10 text-center transition-colors inline-block rounded-sm">
            HOW QUILBIOTICS™ TECHNOLOGY WORKS
          </Link>
        </div>

      </div>
    </section>
  );
}
