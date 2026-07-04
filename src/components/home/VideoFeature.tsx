"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import clsx from "clsx";

export default function VideoFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Autoplay handler via IntersectionObserver to respect browser policies
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play().catch(() => {});
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-[120vh] bg-[#0A0A0A] flex items-center justify-center overflow-hidden py-24">
      <motion.div 
        style={{ scale, opacity }}
        className="relative w-[90%] md:w-[80%] h-[80vh] md:h-[90vh] rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.05)] border border-white/5"
      >
        {/* Parallax Video */}
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <video
            ref={videoRef}
            src="/QUILCEUTICALS-product-vdo.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          />
          {/* Gradient Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
        </motion.div>

        {/* Floating Text Over Video */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl pointer-events-auto"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-4 block">
              The Application
            </span>
            <h2 className="font-serif font-thin text-5xl md:text-7xl text-white tracking-tight leading-[0.9] mb-6">
              Sensorial <br />
              <span className="font-semibold italic text-white/90">Elegance.</span>
            </h2>
            <p className="font-sans font-thin text-sm md:text-base text-white/80 tracking-[0.2em] leading-loose max-w-lg">
              Experience the profound tactile difference of cellular reconstruction. Formulated to melt seamlessly into the lipid barrier.
            </p>
          </motion.div>
        </div>

        {/* Sound Toggle Button */}
        <button
          onClick={toggleMute}
          className="absolute top-8 right-8 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 pointer-events-auto"
          aria-label="Toggle Sound"
        >
          {isMuted ? <VolumeX size={18} strokeWidth={1.5} /> : <Volume2 size={18} strokeWidth={1.5} />}
        </button>

      </motion.div>
    </section>
  );
}
