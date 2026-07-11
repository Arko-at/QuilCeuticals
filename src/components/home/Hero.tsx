"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    id: 1,
    type: "image",
    src: "/qulibiotics-1st-screen.jpeg",
    title: "Just Your Skin.",
    subtitle: "Reconstruct your cellular barrier."
  },
  {
    id: 2,
    type: "youtube",
    src: "https://www.youtube.com/embed/IKSqjC_Vprc?autoplay=1&mute=1&loop=1&playlist=IKSqjC_Vprc&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1",
    title: "Clinical Perfection.",
    subtitle: "Reconstruct your cellular barrier."
  },
  {
    id: 3,
    type: "image",
    src: "/Fixxed-parallax-bg-section.png",
    title: "Absolute Purity.",
    subtitle: "Formulated for the top 1%."
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-[#0A0A0A]">
        <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.1 }}
            transition={{ duration: 15, ease: "linear" }}
            className="w-full h-full"
          >
            {slides[currentSlide].type === "video" ? (
              <video
                src={slides[currentSlide].src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : slides[currentSlide].type === "youtube" ? (
              <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black">
                <iframe
                  src={slides[currentSlide].src + "&iv_load_policy=3&disablekb=1&fs=0"}
                  allow="autoplay; encrypted-media"
                  className="w-[200vw] h-[200vh] md:w-[150vw] md:h-[150vh] pointer-events-none"
                />
                <motion.div 
                  initial={{ opacity: 1 }} 
                  animate={{ opacity: 0 }} 
                  transition={{ delay: 2, duration: 1 }} 
                  className="absolute inset-0 bg-black pointer-events-none z-10" 
                />
              </div>
            ) : (
              <img
                src={slides[currentSlide].src}
                alt="Slide"
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
          {/* Dark Overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium text-stone-300 mb-6 block">
              The New Standard
            </span>
            <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-9xl text-white tracking-tight mb-8 drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            <p className="font-sans font-light text-base md:text-xl text-stone-200 leading-relaxed max-w-lg mb-12 drop-shadow-md">
              {slides[currentSlide].subtitle}
            </p>
            
            <Link 
              href="/shop" 
              className="group flex items-center justify-center bg-white text-[#1C1C1C] px-8 py-4 rounded-full hover:bg-stone-200 transition-colors pointer-events-auto"
            >
              <span className="font-sans text-xs uppercase tracking-widest font-medium">Explore Collection</span>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Controls (Dots) */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-12 h-[2px] transition-all duration-500 ${
              index === currentSlide ? "bg-white" : "bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      </section>
      
      {/* Spacer to push subsequent content below the fixed hero */}
      <div className="w-full h-screen pointer-events-none" />
    </>
  );
}
