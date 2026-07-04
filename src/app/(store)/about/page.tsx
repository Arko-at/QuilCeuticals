"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.to(parallaxRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-stone-50 dark:bg-[#050505] text-stone-900 dark:text-white overflow-hidden transition-colors duration-1000">
      
      {/* Hero Parallax */}
      <div className="relative w-full h-screen overflow-hidden">
        <div ref={parallaxRef} className="absolute inset-0 -top-[20%] h-[140%]">
          <Image
            src="/Product_logo_for-parallax-bg.jpeg"
            alt="QuilCeuticals About"
            fill
            className="object-cover opacity-80 mix-blend-multiply dark:mix-blend-screen"
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-stone-50/40 to-stone-50 dark:via-[#050505]/40 dark:to-[#050505]" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-serif font-thin text-7xl md:text-9xl tracking-tight mb-6 mix-blend-multiply dark:mix-blend-overlay text-stone-900 dark:text-white">
            Our <span className="italic text-luxury-gradient">Philosophy.</span>
          </h1>
          <p className="font-sans font-thin text-base md:text-xl tracking-[0.2em] uppercase text-stone-700 dark:text-white/80">
            Formulated in the lab. Designed for the vanity.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-32 md:py-48 text-center">
        <h2 className="font-serif font-thin text-4xl md:text-6xl mb-12 leading-snug">
          We believe that clinical efficacy should never compromise on luxury.
        </h2>
        <p className="font-sans font-light text-stone-600 dark:text-[#F9F9F9] leading-loose text-lg md:text-xl tracking-[0.05em] max-w-2xl mx-auto opacity-80">
          QuilCeuticals was founded on a singular premise: to bridge the gap between rigorous, scientifically-proven dermatological treatments and the sensorial, premium experience of high-end beauty. Every formulation is a precise architectural balance of active extremolytes, engineered to reconstruct the skin's cellular barrier while delivering an unparalleled tactile experience.
        </p>

        <div className="mt-32">
          <div className="w-[1px] h-32 bg-gradient-to-b from-[#D4AF37] to-transparent mx-auto opacity-50" />
        </div>
      </div>

    </div>
  );
}
