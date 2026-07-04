"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const textLeftRef = useRef<HTMLDivElement>(null);
  const textRightRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  const windowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const canvas = canvasRef.current;
    const windowContainer = windowRef.current;
    if (!canvas || !windowContainer) return;
    
    const context = canvas.getContext("2d");
    if (!context) return;

    const frameCount = 240;
    const currentFrame = (index: number) => 
      `/Luxury_skincare_product_commercial_frames/frame_${(index + 1).toString().padStart(3, '0')}.png`;

    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 0 };
    
    // Preload images
    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
          render();
        }
      };
      images.push(img);
    }

    const render = () => {
      if (images[imageSeq.frame]) {
        // Sync canvas internal resolution with its physical layout size
        const { clientWidth, clientHeight } = windowContainer;
        if (canvas.width !== clientWidth || canvas.height !== clientHeight) {
           canvas.width = clientWidth;
           canvas.height = clientHeight;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate image aspect ratio and scaling to "cover" the canvas center
        const img = images[imageSeq.frame];
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio); // Use Math.max for cover (fill the window)
        
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;  

        context.drawImage(img, 0,0, img.width, img.height,
                          centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    };

    // Use ResizeObserver to detect when the windowContainer changes size (via GSAP or resize)
    const resizeObserver = new ResizeObserver(() => {
      render();
    });
    resizeObserver.observe(windowContainer);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Extended scroll duration for the complex reveal
          scrub: 1,
          pin: true,
        },
      });

      // 1. Text fades out elegantly (Asymmetric layout fades in different directions)
      tl.to(textLeftRef.current, { x: "-10vw", opacity: 0, duration: 1 }, 0)
        .to(textRightRef.current, { x: "10vw", opacity: 0, duration: 1 }, 0)
        .to(scrollIndicatorRef.current, { opacity: 0, y: 50, duration: 0.5 }, 0);
        
      // 2. Window rises from bottom and expands
      tl.fromTo(windowContainer, 
        { 
          y: "60vh", 
          width: "40vw", 
          height: "30vh",
          borderRadius: "32px",
          opacity: 0,
        }, 
        { 
          y: "0vh", 
          width: "80vw", 
          height: "75vh",
          borderRadius: "16px",
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut"
        }, 0.2); // Starts slightly after text fading begins

      // 3. Scrub through the image sequence synchronously with the window expansion
      tl.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: 1.5,
        onUpdate: render
      }, 0.2); 

    }, containerRef);
    
    return () => {
      ctx.revert();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden z-10 flex flex-col items-center justify-center">
      
      {/* 
        VIBRANT FLUID MESH BACKGROUND 
        Overlapping, highly saturated orbs using mix-blend-screen to create intense, premium liquid colors.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-90 mix-blend-screen">
        {/* Rose Gold Orb */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            x: ["-20%", "10%", "-20%"],
            y: ["-10%", "20%", "-10%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[80vw] h-[80vh] bg-[#B76E79] rounded-full blur-[140px] opacity-60"
        />
        {/* Violet / Deep Plum Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: ["10%", "-20%", "10%"],
            y: ["20%", "-20%", "20%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-[90vw] h-[90vh] bg-[#2B0F4C] rounded-full blur-[160px] opacity-70"
        />
        {/* Champagne Gold Center Orb */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#D4AF37] rounded-full blur-[180px] opacity-50"
        />
      </div>
      
      {/* 
        EDITORIAL ASYMMETRIC TYPOGRAPHY 
        Removed mix-blend-overlay for better readability. Using explicit gradients.
      */}
      <div className="absolute inset-0 z-20 flex flex-col md:flex-row items-center justify-between px-6 md:px-20 pointer-events-auto">
        
        {/* Left Side: Massive Hook */}
        <div ref={textLeftRef} className="flex-1 w-full flex flex-col justify-center mt-32 md:mt-0">
          <h1 className="font-serif font-thin text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-[#FCFCFC] tracking-tight drop-shadow-2xl">
            The Science <br />
            <span className="italic text-luxury-gradient font-normal">of Ageless</span> <br />
            Beauty.
          </h1>
        </div>

        {/* Right Side: E-commerce Awareness Copy */}
        <div ref={textRightRef} className="flex-1 w-full flex flex-col items-start md:items-end text-left md:text-right mt-16 md:mt-48">
          <p className="font-sans font-thin text-base md:text-xl text-[#F9F9F9] leading-loose tracking-[0.1em] max-w-lg drop-shadow-lg mb-10">
            Medical-grade formulations engineered to reconstruct your cellular barrier. We bridge the gap between clinical efficacy and <span className="text-luxury-gradient font-light">pure luxury</span>.
          </p>
          <Link href="/shop" className="group flex items-center gap-4 text-white border-b border-white/30 hover:border-white transition-colors pb-2">
            <span className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase font-thin">Discover The Collection</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2 font-thin" />
          </Link>
        </div>

      </div>

      {/* Scroll-driven Canvas Sequence inside the Expanding Window */}
      <div 
        ref={windowRef} 
        className="absolute z-30 flex items-center justify-center overflow-hidden border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-md opacity-0 pointer-events-none"
        style={{
          width: "40vw",
          height: "30vh",
          transform: "translateY(60vh)",
          borderRadius: "32px"
        }}
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />
        
        {/* Loading Indicator */}
        {!imagesLoaded && (
          <div className="absolute font-sans text-xs tracking-[0.5em] text-[#D4AF37] uppercase bg-[#0A0A0A]/80 px-4 py-2 rounded-full backdrop-blur-md">
            Loading Experience...
          </div>
        )}
      </div>
      
      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-[#F9F9F9]/80 pointer-events-none z-20">
        <span className="font-sans text-[9px] uppercase tracking-[0.4em] mb-4 font-bold">Scroll to reveal</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37] to-transparent opacity-80" />
      </div>

    </div>
  );
}
