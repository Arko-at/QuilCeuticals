"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    id: 1,
    type: "image",
    src: "/QUILCEUTICALS-PRODUCT-IMAGES/face-cream-bannerbg.jpeg",
    title: "Just Your Skin™",
    subtitle: "The Face Cream. Support your cellular barrier."
  },
  {
    id: 2,
    type: "image",
    src: "/QUILCEUTICALS-PRODUCT-IMAGES/lotion-bannerbg.jpeg",
    title: "Clinical Perfection.",
    subtitle: "The Body Lotion. Face-level thinking for body skin."
  },
  {
    id: 3,
    type: "image",
    src: "/QUILCEUTICALS-PRODUCT-IMAGES/body-cleanser-bannerbg.jpeg",
    title: "Absolute Purity.",
    subtitle: "The Cleanser. Gentle purification without stripping."
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
          {/* Gradient Overlay for text readability on left, clear product on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 md:via-black/20 to-transparent z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-start px-6 md:px-24 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start max-w-xl pl-6 md:pl-10 border-l border-white/20"
          >
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium text-stone-300 mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-stone-300 block"></span>
              The SKIN INSURED ™ Standard
            </span>
            <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-8 drop-shadow-lg text-left leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="font-sans font-light text-base md:text-xl text-stone-200 leading-relaxed max-w-md mb-12 drop-shadow-md text-left">
              {slides[currentSlide].subtitle}
            </p>
            
            <Link 
              href="/shop" 
              className="relative inline-flex items-center justify-center px-10 py-5 border-t border-b border-white/80 text-white overflow-hidden group pointer-events-auto transition-colors duration-500"
            >
              <span className="relative z-10 font-sans text-[10px] uppercase tracking-[0.3em] font-medium transition-colors duration-500 group-hover:text-black">
                Explore Collection
              </span>
              <div className="absolute inset-0 bg-white origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 z-0" />
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
