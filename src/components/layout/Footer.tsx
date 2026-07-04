"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import clsx from "clsx";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio") || pathname.startsWith("/admin") || pathname === "/checkout" || pathname.startsWith("/shop/")) {
    return null;
  }

  return (
    <footer className="relative bg-[#fcfcfc] dark:bg-[#050505] mt-auto transition-colors duration-1000">
      
      {/* High-end Value Props Bar */}
      <div className="bg-stone-100 dark:bg-black py-4 px-6 transition-colors duration-1000 border-t border-b border-stone-200 dark:border-white/5">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-center">
          <div className="flex items-center gap-3 text-stone-900 dark:text-white">
            <Lock size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
            <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-stone-600 dark:text-white/70">Encrypted Checkout</span>
          </div>
          <div className="hidden sm:block w-[1px] h-3 bg-stone-300 dark:bg-white/20" />
          <div className="flex items-center gap-3 text-stone-900 dark:text-white">
            <ShieldCheck size={14} strokeWidth={1.5} className="text-[#D4AF37]" />
            <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-stone-600 dark:text-white/70">Clinical Efficacy Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-stone-200 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-24 md:py-32 flex flex-col items-center text-center">
          <h2 className="font-serif font-thin text-4xl md:text-6xl text-stone-900 dark:text-white tracking-tight mb-6">
            Join the <span className="italic text-luxury-gradient">Protocol.</span>
          </h2>
          <p className="font-sans font-light text-stone-500 dark:text-white/60 max-w-md text-sm md:text-base leading-relaxed mb-12">
            Subscribe to receive exclusive access to our newest formulations, clinical research, and editorial insights.
          </p>
          
          <form className="w-full max-w-lg relative" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-transparent border-b border-stone-300 dark:border-white/20 py-4 pl-4 pr-12 outline-none focus:border-stone-900 dark:focus:border-white transition-colors text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-white/30 font-light"
              required
            />
            <button 
              type="submit" 
              className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight size={20} strokeWidth={1} />
            </button>
          </form>
        </div>
      </div>

      {/* Horizontal Links & Copyright */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          <Link href="/" className="relative h-10 w-32 shrink-0">
            <Image
              src="/logo.png"
              alt="QuilCeuticals Logo"
              fill
              className="object-contain object-left dark:invert opacity-80 transition-all duration-1000"
              sizes="128px"
            />
          </Link>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            <Link href="/shop" className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 dark:text-white/60 hover:text-stone-900 dark:hover:text-white transition-colors">Shop</Link>
            <Link href="/science" className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 dark:text-white/60 hover:text-stone-900 dark:hover:text-white transition-colors">Science</Link>
            <Link href="/journal" className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 dark:text-white/60 hover:text-stone-900 dark:hover:text-white transition-colors">Journal</Link>
            <Link href="/contact" className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 dark:text-white/60 hover:text-stone-900 dark:hover:text-white transition-colors">Client Services</Link>
          </div>
          
          <div className="flex items-center gap-6 shrink-0">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 dark:text-white/60 hover:text-stone-900 dark:hover:text-white transition-colors">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 dark:text-white/60 hover:text-stone-900 dark:hover:text-white transition-colors">TikTok</a>
          </div>

        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-light text-stone-400 dark:text-white/30 pt-8 border-t border-stone-200 dark:border-white/10 transition-colors duration-1000">
          <p>© {new Date().getFullYear()} QUILCEUTICALS. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-600 dark:hover:text-white/70 transition-colors">Privacy Architecture</Link>
            <span>Global Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
