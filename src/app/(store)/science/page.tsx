"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

export default function SciencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Parallax Image
      gsap.fromTo(
        imageRef.current,
        { y: -50 },
        {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Fade in text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-stone-50 dark:bg-[#050505] text-stone-900 dark:text-white transition-colors duration-1000 overflow-x-hidden">
      
      {/* Header Section */}
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-24 md:mb-48">
          <h1 className="font-serif font-thin text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight mb-8">
            Cellular <br />
            <span className="italic text-luxury-gradient">Architecture.</span>
          </h1>
          <p className="font-sans font-thin text-lg md:text-xl text-stone-600 dark:text-[#F9F9F9] leading-loose tracking-[0.1em] max-w-2xl">
            We don't just treat the surface. QuilCeuticals formulations are engineered to penetrate the lipid barrier, rewriting the skin's cellular memory and promoting profound, lasting regeneration.
          </p>
        </div>

        {/* Ectoin Barrier Shield (Parallax Image Section) */}
        <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-3xl mb-24 border border-stone-200 dark:border-white/10">
          <div ref={imageRef} className="absolute inset-0 -top-24 -bottom-24">
            <Image
              src="/ectoin_barrier_shield.png"
              alt="Ectoin Cellular Shield"
              fill
              className="object-cover opacity-80 mix-blend-multiply dark:mix-blend-screen"
            />
          </div>
          {/* Glassmorphic Info Card */}
          <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 max-w-md p-8 bg-white/60 dark:bg-black/40 backdrop-blur-md border border-stone-200/50 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-none">
            <h3 className="font-serif text-2xl md:text-3xl mb-4 text-stone-900 dark:text-white">Ectoin Barrier Shield</h3>
            <p className="font-sans font-light text-sm md:text-base leading-relaxed text-stone-600 dark:text-white/80">
              A highly potent extremolyte that protects cellular membranes from environmental stress and deeply hydrates the dermis.
            </p>
          </div>
        </div>

        {/* Niacinamide Matrix (New Section) */}
        <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden rounded-3xl mb-24 border border-stone-200 dark:border-white/10 flex flex-col items-end justify-center px-8 md:px-16">
          <div className="absolute inset-0 z-0">
            <Image
              src="/niacinamide_matrix.png"
              alt="Niacinamide Matrix"
              fill
              className="object-cover opacity-60 mix-blend-multiply dark:mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-stone-50/90 dark:to-black/80" />
          </div>
          
          <div className="relative z-10 max-w-lg text-right">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-luxury-gradient mb-4 block">Structural Reinforcement</span>
            <h3 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900 dark:text-white">The Niacinamide <br/> <span className="italic">Matrix.</span></h3>
            <p className="font-sans font-light text-sm md:text-base leading-relaxed text-stone-600 dark:text-white/80">
              Operating at the cellular level, our proprietary niacinamide matrix stimulates ceramide synthesis, dramatically improving structural integrity and minimizing transepidermal water loss.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Parallax Background Section */}
      <div className="relative w-full h-[150vh] overflow-hidden">
        {/* The fixed background image */}
        <div 
          className="absolute inset-0 w-full h-full bg-fixed bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/Fixxed-parallax-bg-section.png')" }}
        />
        <div className="absolute inset-0 bg-stone-50/20 dark:bg-[#050505]/40" />

        {/* Scrolling text over the fixed bg */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <div ref={textRef} className="bg-white/30 dark:bg-black/40 backdrop-blur-xl border border-white/20 p-12 md:p-24 rounded-3xl shadow-2xl max-w-4xl">
            <h2 className="font-serif font-thin text-4xl md:text-6xl text-stone-900 dark:text-white mb-8">
              Clinical Efficacy. <br /> Pure Luxury.
            </h2>
            <p className="font-sans font-light text-lg md:text-2xl text-stone-800 dark:text-white/90 leading-relaxed tracking-wide">
              The science of skin optimization requires precision. Our active complexes are stabilized at exact pH levels to ensure maximum bio-availability.
            </p>
            <div className="w-[1px] h-24 bg-luxury-gradient mx-auto mt-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
