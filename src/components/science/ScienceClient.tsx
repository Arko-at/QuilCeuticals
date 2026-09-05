"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";

export default function ScienceClient({ ingredients, skinConcerns }: { ingredients: any[], skinConcerns: any[] }) {
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
    if (dataItems.length > 0) {
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
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-[#F8F7F5] dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F8F7F5] transition-colors duration-700 overflow-x-hidden pb-32">
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5F3EF] via-[#FFFFFF] to-[#EAE6DF] dark:from-[#1C1C1C] dark:to-[#0A0A0A]">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F8F7F5] dark:to-[#0A0A0A] z-10" />
          
          {/* Premium Cellular Geometry SVG Background */}
          <div className="absolute inset-0 z-0 opacity-100 flex items-center justify-center pointer-events-none">
            <svg className="w-[200%] h-[200%] md:w-[120%] md:h-[120%] max-w-[1400px] text-[#8A7363] dark:text-[#F8F7F5]" viewBox="0 0 100 100" fill="none">
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
              
              <circle cx="50" cy="50" r="15" stroke="url(#luxuryGrad)" className="core" strokeDasharray="1 3" />
              <circle cx="50" cy="50" r="5" fill="url(#luxuryGrad)" opacity="0.3" className="core" />
              
              <g className="ring1">
                <circle cx="50" cy="50" r="28" stroke="url(#luxuryGrad)" strokeWidth="0.2" opacity="0.8" />
                <circle cx="50" cy="22" r="2.5" fill="currentColor" opacity="1" />
                <circle cx="26" cy="64" r="1.5" fill="#D1A68D" opacity="1" />
                <circle cx="74" cy="64" r="3" fill="currentColor" opacity="0.9" />
                <path d="M50,16 L54,19 L54,25 L50,28 L46,25 L46,19 Z" stroke="currentColor" strokeWidth="0.3" opacity="0.9" />
              </g>

              <g className="ring2">
                <circle cx="50" cy="50" r="42" stroke="url(#luxuryGrad)" strokeWidth="0.2" opacity="0.6" />
                <circle cx="85" cy="28" r="1.5" fill="#D1A68D" opacity="1" />
                <circle cx="15" cy="72" r="2.5" fill="currentColor" opacity="1" />
                <circle cx="50" cy="92" r="2" fill="#D1A68D" opacity="0.8" />
                <path d="M85,22 L89,25 L89,31 L85,34 L81,31 L81,25 Z" stroke="#D1A68D" strokeWidth="0.3" opacity="0.8" />
              </g>

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

      {/* Dynamic Ingredients Section */}
      {ingredients.map((ingredient, i) => {
        const isReversed = i % 2 !== 0;
        const animationX = isReversed ? 50 : -50;

        return (
          <section key={ingredient.id} className="py-32 px-6 lg:px-24 max-w-7xl mx-auto">
            <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-24 items-center`}>
              <motion.div 
                initial={{ opacity: 0, x: animationX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-1/2 relative aspect-square bg-[#F2F0EB] dark:bg-[#2A2A2A] rounded-sm overflow-hidden"
              >
                <motion.div style={{ y: isReversed ? yImage2 : yImage1 }} className="absolute inset-0 -top-[20%] -bottom-[20%]">
                  <Image 
                    src={ingredient.image_url || "/luxury-placeholder.jpg"}
                    alt={ingredient.name}
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
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4 block">Key Ingredient</span>
                <h2 className="font-serif text-4xl md:text-5xl font-light mb-8">{ingredient.name}</h2>
                <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed mb-6 whitespace-pre-wrap">
                  {ingredient.clinical_description}
                </p>
                {ingredient.benefits && (
                  <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-wrap">
                    {ingredient.benefits}
                  </p>
                )}
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* Clinical Data & Precision Grid */}
      <section ref={dataRef} className="py-32 px-6 lg:px-24 bg-white dark:bg-[#111]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4 block">Clinical Protocol</span>
            <h2 className="font-serif text-4xl md:text-5xl font-light">The Mechanisms <br/><span className="italic text-stone-500">of Change.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 border-t border-stone-200 dark:border-stone-800 pt-16">
            
            <div className="data-item">
              <span className="font-serif text-3xl font-light text-[#D1A68D] block mb-4">01</span>
              <h3 className="font-sans text-sm tracking-[0.1em] uppercase font-bold mb-4">Cellular Renewal</h3>
              <p className="font-sans font-light text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                By accelerating the skin’s natural turnover cycle through targeted peptide chains, we prompt the shedding of degraded cells, revealing an instantly luminous and structurally sound surface.
              </p>
            </div>

            <div className="data-item">
              <span className="font-serif text-3xl font-light text-[#D1A68D] block mb-4">02</span>
              <h3 className="font-sans text-sm tracking-[0.1em] uppercase font-bold mb-4">Barrier Synthesis</h3>
              <p className="font-sans font-light text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                A compromised barrier cannot retain hydration. Our bio-identical lipid complex actively repairs the stratum corneum, creating an impermeable shield against transepidermal water loss.
              </p>
            </div>

            <div className="data-item">
              <span className="font-serif text-3xl font-light text-[#D1A68D] block mb-4">03</span>
              <h3 className="font-sans text-sm tracking-[0.1em] uppercase font-bold mb-4">Dermal Remodeling</h3>
              <p className="font-sans font-light text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Rebuilding the architectural matrix of the skin. Ectoin and targeted growth factors stimulate collagen and elastin production, physically altering the skin’s density and restoring youthful tension.
              </p>
            </div>

          </div>
          
          <div className="mt-32 text-center">
             <Link 
                href="/shop" 
                className="btn-animated"
              >
                <span>Shop The Regimen</span>
              </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
