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
    <div ref={containerRef} className="min-h-screen bg-[#F8F7F5] dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F8F7F5] overflow-hidden transition-colors duration-700 pb-32">
      
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8F7F5]/40 to-[#F8F7F5] dark:via-[#1C1C1C]/40 dark:to-[#1C1C1C]" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 mix-blend-multiply dark:mix-blend-overlay text-[#1C1C1C] dark:text-[#F8F7F5]">
            Our <span className="italic text-stone-500">Philosophy.</span>
          </h1>
          <p className="font-sans font-medium text-xs md:text-sm tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400">
            Formulated in the lab. Designed for the vanity.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-32 md:py-48 text-center relative z-10">
        <h2 className="font-serif font-light text-4xl md:text-5xl mb-12 leading-snug">
          We believe that clinical efficacy should never compromise on luxury.
        </h2>
        <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed text-base md:text-lg tracking-wide max-w-2xl mx-auto">
          QuilCeuticals was founded on a singular premise: to bridge the gap between rigorous, scientifically-proven dermatological treatments and the sensorial, premium experience of high-end beauty. Every formulation is a precise architectural balance of active extremolytes, engineered to reconstruct the skin's cellular barrier while delivering an unparalleled tactile experience.
        </p>

        <div className="mt-24">
          <div className="w-[1px] h-32 bg-stone-300 dark:bg-stone-700 mx-auto" />
        </div>
      </div>

    </div>
  );
}
