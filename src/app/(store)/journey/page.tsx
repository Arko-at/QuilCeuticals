"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

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

      // Background Parallax
      gsap.fromTo(".gallery-bg",
        { y: -80 },
        {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: ".gallery-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // Foreground Parallax (Moves at a different speed)
      gsap.fromTo(".gallery-img",
        { y: 50 },
        {
          y: -50,
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
    <div ref={containerRef} className="min-h-screen bg-stone-50 dark:bg-[#050505] pt-32 pb-48 text-stone-900 dark:text-white overflow-hidden relative transition-colors duration-1000">

      {/* Background Fluid Mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 mix-blend-multiply dark:mix-blend-screen">
        <motion.div
          animate={{ scale: [1, 1.2, 1], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-1/4 w-[80vw] h-[80vh] bg-[#B76E79] rounded-full blur-[140px] opacity-30"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 relative z-10">

        {/* Header Section */}
        <div className="mb-32 text-center">
          <h1 className="font-serif font-thin text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-8">
            The Skin <span className="italic text-luxury-gradient">Journey.</span>
          </h1>
          <p className="font-sans font-thin text-base md:text-lg text-stone-600 dark:text-[#F9F9F9] leading-loose tracking-[0.1em] max-w-xl mx-auto">
            True transformation takes time. Here is the timeline of what you can expect as your cellular barrier reconstructs.
          </p>
        </div>

        {/* Interactive Timeline */}
        <div ref={timelineRef} className="relative border-l border-stone-200 dark:border-white/20 pl-8 md:pl-16 ml-4 md:ml-8 py-12">

          {/* Animated fill line */}
          <div className="timeline-line-fill absolute top-0 bottom-0 left-[-1px] w-[2px] bg-luxury-gradient origin-top scale-y-0" />

          {/* Step 1 */}
          <div className="journey-step mb-24 relative">
            <div className="absolute -left-[42px] md:-left-[74px] top-1 w-5 h-5 rounded-full bg-white dark:bg-black border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
            <h3 className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase font-thin text-luxury-gradient mb-2">Phase 1: Week 1-2</h3>
            <h2 className="font-serif font-thin text-3xl md:text-5xl mb-4">Cellular Awakening</h2>
            <p className="font-sans font-light text-stone-600 dark:text-white/80 leading-relaxed text-sm md:text-base max-w-lg">
              Active ingredients penetrate the stratum corneum. You will notice immediate hydration and a subtle, radiant glow as the skin's surface is refined.
            </p>
          </div>

          {/* Step 2 */}
          <div className="journey-step mb-24 relative">
            <div className="absolute -left-[42px] md:-left-[74px] top-1 w-5 h-5 rounded-full bg-white dark:bg-black border-2 border-[#B76E79]" />
            <h3 className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase font-thin text-[#B76E79] mb-2">Phase 2: Week 3-6</h3>
            <h2 className="font-serif font-thin text-3xl md:text-5xl mb-4">Barrier Repair</h2>
            <p className="font-sans font-light text-stone-600 dark:text-white/80 leading-relaxed text-sm md:text-base max-w-lg">
              Ectoin and niacinamide begin to repair micro-tears in the lipid barrier. Redness and sensitivity dramatically decrease. Skin feels significantly firmer and more resilient.
            </p>
          </div>

          {/* Step 3 */}
          <div className="journey-step mb-24 relative">
            <div className="absolute -left-[42px] md:-left-[74px] top-1 w-5 h-5 rounded-full bg-white dark:bg-black border-2 border-stone-300 dark:border-white" />
            <h3 className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase font-thin text-stone-400 dark:text-white/60 mb-2">Phase 3: Week 8+</h3>
            <h2 className="font-serif font-thin text-3xl md:text-5xl mb-4">Complete Rejuvenation</h2>
            <p className="font-sans font-light text-stone-600 dark:text-white/80 leading-relaxed text-sm md:text-base max-w-lg">
              Collagen synthesis peaks. Fine lines are visibly reduced, and the skin reaches an optimal state of homeostasis, maintaining a permanent clinical glow.
            </p>
          </div>

        </div>
      </div>

      {/* Modern Unique Premium Gallery Section */}
      <div className="gallery-section relative w-full pt-32 pb-48 px-6 lg:px-12 flex flex-col items-center justify-center">

        {/* The Transparent Image with GSAP Parallax */}
        <div className="relative w-full max-w-5xl h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden mb-16 border border-stone-200 dark:border-white/10 shadow-2xl">
          {/* Parallax Background */}
          <div className="gallery-bg absolute inset-0 -top-32 -bottom-32 w-full z-0">
            <img
              src="/QuilCeuticals%20Gallery-prallax-bg.png"
              alt="Gallery Background"
              className="w-full h-full object-cover opacity-90 dark:opacity-70"
            />
            {/* Overlay to ensure text readability if needed, or just tone down the bg */}
            <div className="absolute inset-0 bg-stone-900/10 dark:bg-black/30 mix-blend-overlay" />
          </div>

          {/* Parallax Foreground Image */}
          <div className="gallery-img absolute inset-0 -top-12 -bottom-12 w-full z-10 drop-shadow-2xl">
            <img
              src="/QUILCEUTICALS_gallary.png"
              alt="QuilCeuticals Gallery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Text over gallery area */}
        <div className="text-center max-w-2xl relative z-10">
          <h2 className="font-serif font-thin text-3xl md:text-5xl text-stone-900 dark:text-white mb-6 tracking-tight">
            The Alchemy of <br /> <span className="italic text-luxury-gradient">Perfection.</span>
          </h2>
          <p className="font-sans font-thin text-stone-600 dark:text-white/80 leading-loose tracking-[0.15em] text-sm md:text-base">
            Every drop is a testament to uncompromising quality. We source the rarest extremolytes and synthesize them in state-of-the-art facilities to ensure maximum purity and efficacy.
          </p>
        </div>
      </div>

    </div>
  );
}
