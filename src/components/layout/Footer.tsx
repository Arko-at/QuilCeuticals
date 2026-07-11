"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Lock, ShieldCheck, Mail } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio") || pathname.startsWith("/admin") || pathname === "/checkout" || pathname.startsWith("/shop/")) {
    return null;
  }

  return (
    <footer className="relative bg-[#0F0F0F] text-[#F8F7F5] mt-auto">
      
      {/* High-end Value Props Bar */}
      <div className="bg-[#1C1C1C] py-5 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 text-center">
          <div className="flex items-center gap-3">
            <Lock size={14} strokeWidth={1.5} className="text-stone-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-stone-300">Encrypted Checkout</span>
          </div>
          <div className="hidden sm:block w-[1px] h-3 bg-white/20" />
          <div className="flex items-center gap-3">
            <ShieldCheck size={14} strokeWidth={1.5} className="text-stone-400" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-stone-300">Clinical Efficacy Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-24 md:py-32 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Newsletter Section */}
        <div className="md:col-span-5 flex flex-col">
          <h2 className="font-serif font-thin text-4xl text-white tracking-tight mb-4">
            Join the <span className="italic">Protocol.</span>
          </h2>
          <p className="font-sans font-light text-stone-400 text-sm leading-relaxed mb-8 max-w-md">
            Subscribe to receive exclusive access to our newest formulations, clinical research, and editorial insights.
          </p>
          <form className="w-full relative" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-transparent border-b border-white/20 py-4 pl-0 pr-12 outline-none focus:border-white transition-colors text-white placeholder:text-white/30 font-light"
              required
            />
            <button 
              type="submit" 
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-stone-400 hover:text-white transition-colors"
              aria-label="Subscribe"
            >
              <ArrowRight size={20} strokeWidth={1} />
            </button>
          </form>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
          <div className="flex flex-col gap-6">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 mb-2">Shop</h3>
            <Link href="/shop" className="font-sans font-light text-sm text-stone-300 hover:text-white transition-colors">All Products</Link>
            <Link href="/shop/the-catalyst-serum" className="font-sans font-light text-sm text-stone-300 hover:text-white transition-colors">The Catalyst Serum</Link>
            <Link href="/shop/luminous-pearl-cream" className="font-sans font-light text-sm text-stone-300 hover:text-white transition-colors">Luminous Pearl Cream</Link>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 mb-2">Discover</h3>
            <Link href="/science" className="font-sans font-light text-sm text-stone-300 hover:text-white transition-colors">The Science</Link>
            <Link href="/journey" className="font-sans font-light text-sm text-stone-300 hover:text-white transition-colors">Skin Journey</Link>
            <Link href="/journal" className="font-sans font-light text-sm text-stone-300 hover:text-white transition-colors">The Journal</Link>
            <Link href="/about" className="font-sans font-light text-sm text-stone-300 hover:text-white transition-colors">About Us</Link>
          </div>
          <div className="flex flex-col gap-6">
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-stone-500 mb-2">Support</h3>
            <Link href="/contact" className="font-sans font-light text-sm text-stone-300 hover:text-white transition-colors">Contact Us</Link>
            <Link href="/faq" className="font-sans font-light text-sm text-stone-300 hover:text-white transition-colors">FAQ</Link>
            <Link href="/shipping" className="font-sans font-light text-sm text-stone-300 hover:text-white transition-colors">Shipping & Returns</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="relative h-8 w-32 shrink-0">
            <Image
              src="/logo.png"
              alt="QuilCeuticals Logo"
              fill
              className="object-contain object-left invert opacity-80"
              sizes="128px"
            />
          </Link>

          <div className="flex items-center gap-6 text-stone-400">
            <a href="https://instagram.com" className="text-[10px] uppercase tracking-widest hover:text-white transition-colors" aria-label="Instagram">Instagram</a>
            <a href="https://facebook.com" className="text-[10px] uppercase tracking-widest hover:text-white transition-colors" aria-label="Facebook">Facebook</a>
            <a href="https://twitter.com" className="text-[10px] uppercase tracking-widest hover:text-white transition-colors" aria-label="Twitter">Twitter</a>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-[10px] uppercase tracking-widest font-light text-stone-500">
            <p>© {new Date().getFullYear()} QUILCEUTICALS. All Rights Reserved.</p>
            <div className="hidden md:block w-[1px] h-3 bg-white/20" />
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
