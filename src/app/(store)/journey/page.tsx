"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";

const clinicalResults = [
  { metric: "98%", label: "Observed increased cellular hydration after 7 days" },
  { metric: "92%", label: "Reported visible reduction in micro-tears and redness" },
  { metric: "85%", label: "Experienced a complete restoration of the lipid barrier within 4 weeks" }
];

export default function SkinJourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const steps = gsap.utils.toArray(".journey-step");

    let ctx = gsap.context(() => {
      // Pin the timeline line and fill it as you scroll
      gsap.to(".timeline-line-fill", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      // Fade in each step
      steps.forEach((step: any) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 75%",
            },
          }
        );
      });

      // Simple Parallax for Gallery
      gsap.fromTo(".gallery-bg",
        { y: -30 },
        {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: ".gallery-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F7F5] dark:bg-[#1C1C1C] pt-32 pb-48 text-[#1C1C1C] dark:text-[#F8F7F5] overflow-hidden transition-colors duration-700">

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 lg:px-16 pt-20 mb-32 text-center">
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-medium text-stone-500 mb-6 block">
          The Progression
        </span>
        <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-8">
          The Skin <span className="italic text-stone-500">Journey.</span>
        </h1>
        <p className="font-sans font-light text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl mx-auto">
          True transformation requires patience and precision. Here is the clinical timeline of what you can expect as your cellular barrier reconstructs.
        </p>
      </div>

      {/* Interactive Timeline */}
      <div className="max-w-5xl mx-auto px-6 lg:px-16">
        <div ref={timelineRef} className="relative border-l border-stone-300 dark:border-stone-700 pl-10 md:pl-20 py-12 ml-4 md:ml-10">
          
          {/* Animated fill line */}
          <div className="timeline-line-fill absolute top-0 bottom-0 left-[-1px] w-[2px] bg-[#1C1C1C] dark:bg-white origin-top scale-y-0" />

          {/* Phase 1 */}
          <div className="journey-step mb-32 relative">
            <div className="absolute -left-[45px] md:-left-[85px] top-2 w-3 h-3 rounded-full bg-[#1C1C1C] dark:bg-white ring-4 ring-[#F8F7F5] dark:ring-[#1C1C1C]" />
            <h3 className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold text-stone-500 mb-4">Phase 1: Week 1-2</h3>
            <h2 className="font-serif font-light text-3xl md:text-5xl mb-6">Cellular Awakening</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base max-w-lg">
                Active ingredients penetrate the stratum corneum. You will notice immediate hydration and a subtle, radiant glow as the skin's surface is refined and purged of impurities.
              </p>
              <div className="relative w-full md:w-64 h-48 bg-[#F2F0EB] dark:bg-[#2A2A2A] rounded-sm overflow-hidden shrink-0">
                <Image src="/images/niacinamide_texture.png" alt="Cellular Awakening" fill className="object-cover mix-blend-multiply dark:mix-blend-screen opacity-80" />
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="journey-step mb-32 relative">
            <div className="absolute -left-[45px] md:-left-[85px] top-2 w-3 h-3 rounded-full bg-[#1C1C1C] dark:bg-white ring-4 ring-[#F8F7F5] dark:ring-[#1C1C1C]" />
            <h3 className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold text-stone-500 mb-4">Phase 2: Week 3-6</h3>
            <h2 className="font-serif font-light text-3xl md:text-5xl mb-6">Barrier Repair</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base max-w-lg">
                Ectoin and niacinamide begin to repair micro-tears in the lipid barrier. Redness and sensitivity dramatically decrease. Skin feels significantly firmer and more resilient to environmental stressors.
              </p>
              <div className="relative w-full md:w-64 h-48 bg-[#F2F0EB] dark:bg-[#2A2A2A] rounded-sm overflow-hidden shrink-0">
                <Image src="/images/ectoin_crystals.png" alt="Barrier Repair" fill className="object-cover mix-blend-multiply dark:mix-blend-screen opacity-80" />
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="journey-step mb-16 relative">
            <div className="absolute -left-[45px] md:-left-[85px] top-2 w-3 h-3 rounded-full bg-[#1C1C1C] dark:bg-white ring-4 ring-[#F8F7F5] dark:ring-[#1C1C1C]" />
            <h3 className="font-sans text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold text-stone-500 mb-4">Phase 3: Week 8+</h3>
            <h2 className="font-serif font-light text-3xl md:text-5xl mb-6">Complete Rejuvenation</h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base max-w-lg">
                Collagen synthesis peaks. Fine lines are visibly reduced, and the skin reaches an optimal state of homeostasis, maintaining a permanent clinical glow and robust defense system.
              </p>
              <div className="relative w-full md:w-64 h-48 bg-[#F2F0EB] dark:bg-[#2A2A2A] rounded-sm overflow-hidden shrink-0">
                <Image src="/images/obsidian_glass.png" alt="Complete Rejuvenation" fill className="object-cover mix-blend-multiply dark:mix-blend-screen opacity-80" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Clinical Trials Section (New Content) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-32 border-t border-stone-200 dark:border-stone-800 mt-20">
        <div className="text-center mb-20">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-medium text-stone-500 mb-6 block">
            Independent Studies
          </span>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-[#1C1C1C] dark:text-[#F8F7F5]">
            The Trial Results
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clinicalResults.map((result, idx) => (
            <div key={idx} className="bg-white dark:bg-[#2A2A2A] p-12 rounded-sm shadow-sm flex flex-col items-center text-center">
              <h3 className="font-serif font-light text-6xl text-[#1C1C1C] dark:text-[#F8F7F5] mb-6">{result.metric}</h3>
              <p className="font-sans font-light text-stone-600 dark:text-stone-400 text-sm leading-relaxed">{result.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="gallery-section relative w-full pt-20 pb-32 px-6 lg:px-16 flex flex-col items-center justify-center border-t border-stone-200 dark:border-stone-800">
        <div className="relative w-full max-w-5xl h-[50vh] md:h-[70vh] rounded-sm overflow-hidden mb-16 bg-[#111]">
          <div className="gallery-bg absolute inset-0 -top-32 -bottom-32 w-full z-0">
            <Image
              src="/Fixxed-parallax-bg-section.png"
              alt="Gallery Background"
              fill
              className="object-cover opacity-80"
            />
          </div>
        </div>
        <div className="text-center max-w-2xl">
          <h2 className="font-serif font-light text-3xl md:text-5xl text-[#1C1C1C] dark:text-[#F8F7F5] mb-6">
            The Alchemy of <span className="italic text-stone-500">Perfection.</span>
          </h2>
          <p className="font-sans font-light text-stone-600 dark:text-stone-400 leading-relaxed text-sm md:text-base">
            Every drop is a testament to uncompromising quality. We source the rarest extremolytes and synthesize them in state-of-the-art facilities to ensure maximum purity and efficacy.
          </p>
        </div>
      </div>

    </div>
  );
}
