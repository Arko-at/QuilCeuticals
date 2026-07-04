"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

export default function ProductStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    let ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        }
      });

      // Initially show first image, hide others
      gsap.set(img2Ref.current, { opacity: 0, scale: 1.1 });
      gsap.set(img3Ref.current, { opacity: 0, scale: 1.1 });
      
      gsap.set(text2Ref.current, { opacity: 0, y: 50 });
      gsap.set(text3Ref.current, { opacity: 0, y: 50 });

      // Transition to Section 2 (Pearl)
      tl.to(text1Ref.current, { opacity: 0, y: -50, duration: 1 }, 0)
        .to(img1Ref.current, { opacity: 0, scale: 0.9, duration: 1 }, 0)
        .to(img2Ref.current, { opacity: 1, scale: 1, duration: 1 }, 0.5)
        .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 }, 0.5);

      // Transition to Section 3 (Ectoin)
      tl.to(text2Ref.current, { opacity: 0, y: -50, duration: 1 }, 2)
        .to(img2Ref.current, { opacity: 0, scale: 0.9, duration: 1 }, 2)
        .to(img3Ref.current, { opacity: 1, scale: 1, duration: 1 }, 2.5)
        .to(text3Ref.current, { opacity: 1, y: 0, duration: 1 }, 2.5);

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#FDFBF7] dark:bg-[#0A0A0A] overflow-hidden flex items-center transition-colors duration-1000">
      
      {/* Left Side: Macro Images (Pinned Center) */}
      <div className="absolute left-0 top-0 w-full md:w-1/2 h-full flex items-center justify-center bg-[#EAE6DF] dark:bg-[#111111]">
        
        {/* Img 1: Niacinamide */}
        <div ref={img1Ref} className="absolute inset-0 w-full h-full">
          <Image src="/images/niacinamide_texture.png" alt="Niacinamide Texture" fill className="object-cover mix-blend-multiply dark:mix-blend-screen opacity-80" />
        </div>
        
        {/* Img 2: Pearl */}
        <div ref={img2Ref} className="absolute inset-0 w-full h-full">
          <Image src="/images/pearl_extract.png" alt="Pearl Extract" fill className="object-cover mix-blend-multiply dark:mix-blend-screen opacity-80" />
        </div>
        
        {/* Img 3: Ectoin */}
        <div ref={img3Ref} className="absolute inset-0 w-full h-full">
          <Image src="/images/ectoin_crystals.png" alt="Ectoin Crystals" fill className="object-cover mix-blend-multiply dark:mix-blend-screen opacity-80" />
        </div>
        
      </div>

      {/* Right Side: Scrollytelling Text */}
      <div className="absolute right-0 top-0 w-full md:w-1/2 h-full flex items-center px-8 md:px-24 pointer-events-none">
        
        <div className="relative w-full h-[50vh]">
          
          {/* Text 1 */}
          <div ref={text1Ref} className="absolute inset-0 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D4AF37] mb-6">Phase I: Reconstruction</span>
            <h2 className="font-serif text-5xl md:text-7xl font-thin text-[#111111] dark:text-[#FCFCFC] leading-tight mb-6">
              Niacinamide
            </h2>
            <p className="font-sans font-light text-lg text-[#333] dark:text-[#CCC] leading-relaxed max-w-md">
              We extract absolute purity. Our clinical-grade Niacinamide reconstructs the cellular barrier, rewriting the structural integrity of your dermis.
            </p>
          </div>

          {/* Text 2 */}
          <div ref={text2Ref} className="absolute inset-0 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D4AF37] mb-6">Phase II: Luminosity</span>
            <h2 className="font-serif text-5xl md:text-7xl font-thin text-[#111111] dark:text-[#FCFCFC] leading-tight mb-6">
              Pearl Extract
            </h2>
            <p className="font-sans font-light text-lg text-[#333] dark:text-[#CCC] leading-relaxed max-w-md">
              Milled to a microscopic precision. It refracts light from within, replacing artificial highlights with genuine, deep-tissue radiance.
            </p>
          </div>

          {/* Text 3 */}
          <div ref={text3Ref} className="absolute inset-0 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D4AF37] mb-6">Phase III: Defense</span>
            <h2 className="font-serif text-5xl md:text-7xl font-thin text-[#111111] dark:text-[#FCFCFC] leading-tight mb-6">
              Ectoin
            </h2>
            <p className="font-sans font-light text-lg text-[#333] dark:text-[#CCC] leading-relaxed max-w-md">
              Nature’s ultimate extremolyte. It binds hydration at a molecular level, forming an impenetrable, weightless shield against environmental decay.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
