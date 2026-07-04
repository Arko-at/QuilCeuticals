"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Parallax for the images
      gsap.to(img1Ref.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(img2Ref.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveal
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[120vh] bg-[#0A0A0A] overflow-hidden flex flex-col justify-center py-32 px-6 lg:px-24">
      
      <div className="absolute inset-0 bg-luxury-gradient opacity-20 pointer-events-none" />

      <h2 ref={titleRef} className="font-serif font-thin text-5xl md:text-7xl lg:text-9xl text-[#FCFCFC] text-center mb-32 relative z-20">
        THE APOTHECARY
      </h2>

      <div className="relative w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32">
        
        {/* Product 1 */}
        <div className="relative flex flex-col items-center">
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#1A1A1A] rounded-sm group">
            <div ref={img1Ref} className="absolute inset-[-20%] w-[140%] h-[140%]">
              <Image 
                src="/images/the_catalyst_serum.png" 
                alt="The Catalyst Serum" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center text-center">
            <h3 className="font-serif text-3xl font-light text-[#D4AF37] mb-2">The Catalyst Serum</h3>
            <p className="font-sans font-light text-[#EAE6DF]/60 uppercase tracking-[0.2em] text-xs mb-6">Niacinamide & Ectoin</p>
            <Link href="/shop/the-catalyst-serum" className="group flex items-center gap-4 text-[#FCFCFC] border-b border-transparent hover:border-[#D4AF37] transition-colors pb-1">
              <span className="font-sans text-sm tracking-widest uppercase">Discover</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2 text-[#D4AF37]" />
            </Link>
          </div>
        </div>

        {/* Product 2 - Offset */}
        <div className="relative flex flex-col items-center md:mt-48">
          <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#1A1A1A] rounded-sm group">
            <div ref={img2Ref} className="absolute inset-[-20%] w-[140%] h-[140%]">
              <Image 
                src="/images/luminous_pearl_cream.png" 
                alt="Luminous Pearl Cream" 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
              />
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center text-center">
            <h3 className="font-serif text-3xl font-light text-[#D4AF37] mb-2">Luminous Pearl Cream</h3>
            <p className="font-sans font-light text-[#EAE6DF]/60 uppercase tracking-[0.2em] text-xs mb-6">Deep Tissue Radiance</p>
            <Link href="/shop/luminous-pearl-cream" className="group flex items-center gap-4 text-[#FCFCFC] border-b border-transparent hover:border-[#D4AF37] transition-colors pb-1">
              <span className="font-sans text-sm tracking-widest uppercase">Discover</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2 text-[#D4AF37]" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
