"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SciencePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  const { scrollYProgress: contentScroll } = useScroll();
  const yImage1 = useTransform(contentScroll, [0, 1], ["-15%", "15%"]);
  const yImage2 = useTransform(contentScroll, [0, 1], ["15%", "-15%"]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Reveal data grid items sequentially
    const dataItems = gsap.utils.toArray(".data-item");
    gsap.fromTo(
      dataItems,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: dataRef.current,
          start: "top 80%"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-[#F8F7F5] dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F8F7F5] transition-colors duration-700 overflow-x-hidden pb-32">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#E1DCD3] via-[#EAE6DF] to-[#D8D1C5] dark:from-[#1C1C1C] dark:to-[#0A0A0A]">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8F7F5] dark:to-[#0A0A0A] z-10" />
          
          {/* Premium Cellular Geometry SVG Background */}
          <div className="absolute inset-0 z-0 opacity-100 flex items-center justify-center pointer-events-none">
            <svg className="w-[200%] h-[200%] md:w-[120%] md:h-[120%] max-w-[1400px] text-[#3A2F29] dark:text-[#F8F7F5]" viewBox="0 0 100 100" fill="none">
              <defs>
                <linearGradient id="luxuryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D1A68D" />
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="100%" stopColor="#D1A68D" />
                </linearGradient>
                <style>
                  {`
                    @keyframes rotateSlow { 100% { transform: rotate(360deg); } }
                    @keyframes rotateReverse { 100% { transform: rotate(-360deg); } }
                    @keyframes pulseGlow { 0%, 100% { opacity: 0.6; stroke-width: 0.3; } 50% { opacity: 1; stroke-width: 0.5; } }
                    .ring1 { transform-origin: 50% 50%; animation: rotateSlow 40s linear infinite; }
                    .ring2 { transform-origin: 50% 50%; animation: rotateReverse 60s linear infinite; }
                    .core { animation: pulseGlow 8s ease-in-out infinite; }
                  `}
                </style>
              </defs>
              
              {/* Central Cellular Core */}
              <circle cx="50" cy="50" r="15" stroke="url(#luxuryGrad)" className="core" strokeDasharray="1 3" />
              <circle cx="50" cy="50" r="5" fill="url(#luxuryGrad)" opacity="0.3" className="core" />
              
              {/* Orbiting Ring 1 */}
              <g className="ring1">
                <circle cx="50" cy="50" r="28" stroke="url(#luxuryGrad)" strokeWidth="0.2" opacity="0.8" />
                <circle cx="50" cy="22" r="2.5" fill="currentColor" opacity="1" />
                <circle cx="26" cy="64" r="1.5" fill="#D1A68D" opacity="1" />
                <circle cx="74" cy="64" r="3" fill="currentColor" opacity="0.9" />
                {/* Hexagon Molecule 1 */}
                <path d="M50,16 L54,19 L54,25 L50,28 L46,25 L46,19 Z" stroke="currentColor" strokeWidth="0.3" opacity="0.9" />
              </g>

              {/* Orbiting Ring 2 */}
              <g className="ring2">
                <circle cx="50" cy="50" r="42" stroke="url(#luxuryGrad)" strokeWidth="0.2" opacity="0.6" />
                <circle cx="85" cy="28" r="1.5" fill="#D1A68D" opacity="1" />
                <circle cx="15" cy="72" r="2.5" fill="currentColor" opacity="1" />
                <circle cx="50" cy="92" r="2" fill="#D1A68D" opacity="0.8" />
                {/* Hexagon Molecule 2 */}
                <path d="M85,22 L89,25 L89,31 L85,34 L81,31 L81,25 Z" stroke="#D1A68D" strokeWidth="0.3" opacity="0.8" />
              </g>

              {/* Interconnecting Communication Lines */}
              <path d="M50,50 L50,22" stroke="url(#luxuryGrad)" strokeWidth="0.2" opacity="0.5" className="ring1" />
              <path d="M50,50 L85,28" stroke="url(#luxuryGrad)" strokeWidth="0.2" opacity="0.5" className="ring2" />
              <path d="M50,50 L15,72" stroke="url(#luxuryGrad)" strokeWidth="0.2" opacity="0.5" className="ring2" />
            </svg>
          </div>
        </motion.div>
        
        <div className="relative z-10 text-center px-6 mt-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-sans text-[10px] uppercase tracking-[0.4em] font-medium text-stone-500 mb-6 block"
          >
            The Framework
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-serif font-light text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8"
          >
            Cellular <br />
            <span className="italic text-stone-500">Architecture.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-sans font-light text-base md:text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed"
          >
            We engineer formulations that communicate directly with your cellular structure, orchestrating profound biological repair and permanent visible transformation.
          </motion.p>
        </div>
      </section>

      {/* R&D Deep Dive Section 1: Liposomal Delivery */}
      <section className="py-32 px-6 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative aspect-square bg-[#F2F0EB] dark:bg-[#2A2A2A] rounded-sm overflow-hidden"
          >
            <motion.div style={{ y: yImage1 }} className="absolute inset-0 -top-[20%] -bottom-[20%]">
              <Image 
                src="/niacinamide_matrix.png"
                alt="Liposomal Delivery"
                fill
                className="object-cover opacity-90"
              />
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2"
          >
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4 block">Bio-Availability</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-8">Liposomal <br/><span className="italic">Encapsulation.</span></h2>
            <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Active ingredients are only effective if they reach their target. We employ advanced liposomal encapsulation technology to protect fragile molecules like peptides and antioxidants from oxidation and enzymatic degradation on the skin's surface.
            </p>
            <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed">
              These microscopic lipid spheres fuse with your cellular membranes, delivering the active payload directly into the dermis where structural collagen and elastin are synthesized, ensuring maximum bio-availability and zero surface irritation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* R&D Deep Dive Section 2: Cellular Turnover */}
      <section className="py-32 px-6 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative aspect-[4/3] bg-[#F2F0EB] dark:bg-[#2A2A2A] rounded-sm overflow-hidden"
          >
            <motion.div style={{ y: yImage2 }} className="absolute inset-0 -top-[20%] -bottom-[20%]">
              <Image 
                src="/lipid_barrier.png"
                alt="Cellular Turnover"
                fill
                className="object-cover opacity-90"
              />
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2"
          >
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4 block">Regeneration</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-8">Optimized <br/><span className="italic">Turnover.</span></h2>
            <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              As we age, the natural shedding of dead skin cells slows, leading to a compromised barrier and a dull, uneven complexion. Traditional exfoliation forces this process, causing micro-trauma and inflammation.
            </p>
            <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed">
              QuilCeuticals utilizes biomimetic enzymes and mild polyhydroxy acids (PHAs) that dissolve the desmosomes (cellular glue) without disrupting the acid mantle. This gently accelerates cellular turnover, revealing the pristine, luminous skin beneath while maintaining absolute barrier integrity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* R&D Deep Dive Section 3: Microbiome Shield */}
      <section className="py-32 px-6 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative aspect-square bg-[#F2F0EB] dark:bg-[#2A2A2A] rounded-sm overflow-hidden"
          >
            <motion.div style={{ y: yImage1 }} className="absolute inset-0 -top-[20%] -bottom-[20%]">
              <Image 
                src="/images/cellular_cleansing_gel.png"
                alt="Microbiome Shield"
                fill
                className="object-cover opacity-90"
              />
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2"
          >
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4 block">Defense Mechanics</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-8">The Microbiome <br/><span className="italic">Shield.</span></h2>
            <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              A compromised micro-flora is the genesis of pathogenic aging. Environmental aggressors disrupt the skin's natural acidic mantle, leading to chronic inflammation and cellular stress.
            </p>
            <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed">
              Our proprietary Pre/Probiotic complex fortifies this invisible first line of defense. By feeding beneficial bacteria and creating a hostile environment for pathogens, we ensure your skin's immune response remains vigilant and perfectly balanced.
            </p>
          </motion.div>
        </div>
      </section>

      {/* R&D Deep Dive Section 4: Epigenetic Regulation */}
      <section className="py-32 px-6 lg:px-24 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 relative aspect-[4/3] bg-[#F2F0EB] dark:bg-[#2A2A2A] rounded-sm overflow-hidden"
          >
            <motion.div style={{ y: yImage2 }} className="absolute inset-0 -top-[20%] -bottom-[20%]">
              <Image 
                src="/images/ectoin_crystals.png"
                alt="Epigenetic Regulation"
                fill
                className="object-cover opacity-90"
              />
            </motion.div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2"
          >
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4 block">DNA Integrity</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-8">Epigenetic <br/><span className="italic">Regulation.</span></h2>
            <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              Your cellular youth codes are under constant threat from oxidative stress and UV radiation, which mutate DNA and degrade protein synthesis over time.
            </p>
            <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed">
              We utilize medical-grade extremolytes—specifically high-concentration Ectoin—which forms a hydration shell around cellular structures. This effectively halts environmental DNA damage and regulates expression, permanently extending cellular longevity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Data Visualization Grid */}
      <section ref={dataRef} className="py-32 px-6 lg:px-24 bg-white dark:bg-[#2A2A2A] border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">Clinical Efficacy</h2>
            <p className="font-sans font-light text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
              Results measured through instrumental analysis and double-blind clinical trials over a 12-week period.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="data-item p-8 border border-stone-200 dark:border-stone-700 rounded-sm">
              <span className="font-serif text-5xl text-[#1C1C1C] dark:text-[#F8F7F5] block mb-4">400%</span>
              <p className="font-sans text-sm text-stone-600 dark:text-stone-400">Increase in intracellular hydration retention within 24 hours.</p>
            </div>
            <div className="data-item p-8 border border-stone-200 dark:border-stone-700 rounded-sm">
              <span className="font-serif text-5xl text-[#1C1C1C] dark:text-[#F8F7F5] block mb-4">-48%</span>
              <p className="font-sans text-sm text-stone-600 dark:text-stone-400">Reduction in transepidermal water loss (TEWL) after 14 days.</p>
            </div>
            <div className="data-item p-8 border border-stone-200 dark:border-stone-700 rounded-sm">
              <span className="font-serif text-5xl text-[#1C1C1C] dark:text-[#F8F7F5] block mb-4">+35%</span>
              <p className="font-sans text-sm text-stone-600 dark:text-stone-400">Improvement in dermal density and collagen fiber organization.</p>
            </div>
            <div className="data-item p-8 border border-stone-200 dark:border-stone-700 rounded-sm">
              <span className="font-serif text-5xl text-[#1C1C1C] dark:text-[#F8F7F5] block mb-4">0%</span>
              <p className="font-sans text-sm text-stone-600 dark:text-stone-400">Incidence of barrier disruption or inflammatory response.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
