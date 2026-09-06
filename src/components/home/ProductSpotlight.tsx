"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProductSpotlight({ products = [] }: { products?: any[] }) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for the internal images
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const faceCreamPrice = products.find((p) => p.slug === "the-face-cream")?.price || 114;
  const bodyLotionPrice = products.find((p) => p.slug === "the-body-lotion")?.price || 65;
  const cleanserPrice = products.find((p) => p.slug === "the-cleanser")?.price || 50;

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 lg:px-24 bg-[#F8F7F5] dark:bg-[#1C1C1C] transition-colors duration-700 overflow-hidden">

      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
        <div>
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#D1A68D] mb-4 block font-bold">The Regimen</span>
          <h2 className="font-serif font-light text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C] dark:text-[#F8F7F5]">
            Just Your Skin™.
          </h2>
        </div>

        <div className="flex flex-col items-start md:items-end max-w-lg">
          <p className="font-sans font-light text-sm md:text-base text-stone-600 dark:text-stone-400 leading-relaxed mb-6 md:text-right">
            Meticulously formulated to support your skin's innate barrier architecture. Our foundational 4-step regimen—Cleanser, Lightweight Gel Serum, Face Cream, and Body Lotion—respects the skin rather than overwhelming it.
          </p>
          <Link href="/shop" className="group flex items-center gap-3 text-[#1C1C1C] dark:text-[#F8F7F5] hover:opacity-70 transition-opacity whitespace-nowrap border-b border-stone-200 dark:border-stone-700 pb-1">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold">Explore The Collection</span>
          </Link>
        </div>
      </div>

      {/* Alternating Zigzag Layout */}
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-24 lg:gap-32">

        {/* Product 1: The Face Cream */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 group">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-5/12"
            style={{ y: y1 }}
          >
            <Link href="/shop/the-face-cream" className="block w-full relative aspect-[4/5] group">
              <Image
                src="/QUILCEUTICALS-PRODUCT-IMAGES/Face-cream-jar.jpeg"
                alt="QuilCeuticals Face Cream"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain mix-blend-multiply p-0 md:p-2 transition-all duration-1000 group-hover:opacity-0 group-hover:scale-105"
              />
              <Image
                src="/QUILCEUTICALS-PRODUCT-IMAGES/face-cream-withPack.jpeg"
                alt="QuilCeuticals Face Cream Packaging"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain mix-blend-multiply p-0 md:p-2 absolute inset-0 z-10 transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:scale-105"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-7/12 flex flex-col justify-center"
          >
            <span className="font-sans font-light text-stone-500 uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 block">
              Purposeful Hydration & Support
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-[#1C1C1C] dark:text-[#F8F7F5] mb-6">
              The Face Cream
            </h3>
            <p className="font-sans font-light text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8 max-w-xl">
              A sophisticated daily face cream that supports the skin rather than overwhelming it. Featuring targeted 4% Niacinamide, Ectoin, and Ceramides to deeply hydrate, protect the barrier, and provide a healthy luminous appearance without relying on unnecessary viral trends. Just Your Skin™.
            </p>
            <div className="flex items-center gap-8">
              <span className="font-sans text-lg font-medium text-[#1C1C1C] dark:text-[#F8F7F5]">${faceCreamPrice}</span>
              <Link href="/shop/the-face-cream" className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#D1A68D] hover:text-[#C19880] transition-colors border-b border-[#D1A68D] hover:border-[#C19880] pb-1">
                Discover More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Product 2: The Body Lotion */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24 group">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-4/12"
            style={{ y: y2 }}
          >
            <Link href="/shop/the-body-lotion" className="block w-full relative aspect-[4/5] group">
              <Image
                src="/QUILCEUTICALS-PRODUCT-IMAGES/BODY-LOTION.png"
                alt="QuilCeuticals Body Lotion"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain mix-blend-multiply p-0 md:p-2 transition-all duration-1000 group-hover:opacity-0 group-hover:scale-105"
              />
              <Image
                src="/QUILCEUTICALS-PRODUCT-IMAGES/BODY-LOTION-PACK.png"
                alt="QuilCeuticals Body Lotion Packaging"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain mix-blend-multiply p-0 md:p-2 absolute inset-0 z-10 transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:scale-105"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-8/12 flex flex-col justify-center items-start md:items-end text-left md:text-right"
          >
            <span className="font-sans font-light text-stone-500 uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 block">
              Face-Level Thinking for Body Skin
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-[#1C1C1C] dark:text-[#F8F7F5] mb-6">
              The Body Lotion
            </h3>
            <p className="font-sans font-light text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8 max-w-xl">
              Your body is skin too. Extend the philosophy of sophisticated skincare into daily body care. This barrier-conscious lotion combines 3% Niacinamide with purposeful actives to moisturize, condition, and support healthy-looking skin beyond mere temporary softness.
            </p>
            <div className="flex items-center gap-8 flex-row-reverse md:flex-row">
              <span className="font-sans text-lg font-medium text-[#1C1C1C] dark:text-[#F8F7F5]">${bodyLotionPrice}</span>
              <Link href="/shop/the-body-lotion" className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#D1A68D] hover:text-[#C19880] transition-colors border-b border-[#D1A68D] hover:border-[#C19880] pb-1">
                Discover More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Product 3: The Body Wash */}
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 group">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-5/12"
          >
            <Link href="/shop/the-cleanser" className="block w-full relative aspect-[4/5] group">
              <Image
                src="/QUILCEUTICALS-PRODUCT-IMAGES/BODY-CLEANER.jpeg"
                alt="QuilCeuticals Cleanser"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain mix-blend-multiply p-0 md:p-2 transition-all duration-1000 group-hover:opacity-0 group-hover:scale-105"
              />
              <Image
                src="/QUILCEUTICALS-PRODUCT-IMAGES/BODY-CLEANSER-PACK.jpeg"
                alt="QuilCeuticals Cleanser Packaging"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-contain mix-blend-multiply p-0 md:p-2 absolute inset-0 z-10 transition-all duration-1000 opacity-0 group-hover:opacity-100 group-hover:scale-105"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full md:w-7/12 flex flex-col justify-center"
          >
            <span className="font-sans font-light text-stone-500 uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 block">
              Barrier-Conscious Care
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-[#1C1C1C] dark:text-[#F8F7F5] mb-6">
              The Cleanser
            </h3>
            <p className="font-sans font-light text-base md:text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-8 max-w-xl">
              Cleanse your skin. Don't fight it. A premium cleansing experience that removes what the skin doesn't need without treating the skin itself as the problem. Effective, purposeful cleansing that respects the barrier and perfectly prepares your canvas for the steps that follow.
            </p>
            <div className="flex items-center gap-8">
              <span className="font-sans text-lg font-medium text-[#1C1C1C] dark:text-[#F8F7F5]">${cleanserPrice}</span>
              <Link href="/shop/the-cleanser" className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[#D1A68D] hover:text-[#C19880] transition-colors border-b border-[#D1A68D] hover:border-[#C19880] pb-1">
                Discover More
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
