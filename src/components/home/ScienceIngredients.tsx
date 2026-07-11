"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ingredients = [
  {
    bgText: "peptides",
    tag: "for the face cream",
    title: "PEPTIDE-LIPID COMPLEX",
    subtitle: "Cellular Rejuvenation",
    description: "Engineered to rebuild the facial epidermis, visibly reducing fine lines while locking in absolute hydration.",
    image: "/images/niacinamide_texture.png"
  },
  {
    bgText: "shea",
    tag: "for the body lotion",
    title: "NIACINAMIDE & SHEA",
    subtitle: "Barrier Support",
    description: "A nutrient-rich matrix that intensely hydrates and smooths the body's texture, supporting natural renewal.",
    image: "/images/pearl_extract.png"
  },
  {
    bgText: "marine",
    tag: "for the body wash",
    title: "MARINE EXTREMOLYTES",
    subtitle: "Gentle Purification",
    description: "A revitalizing, sulfate-free cleanse that purifies without stripping, leaving the skin perfectly prepped.",
    image: "/images/ectoin_crystals.png"
  }
];

export default function ScienceIngredients() {
  return (
    <section className="w-full bg-[#F8F7F5] dark:bg-[#1C1C1C] transition-colors duration-700 py-32 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        <div className="flex flex-col items-center text-center mb-24">
          <span className="font-sans text-[10px] uppercase tracking-[0.4em] font-medium text-stone-500 mb-6 block">
            The Science
          </span>
          <h2 className="font-serif font-light text-5xl md:text-6xl text-[#1C1C1C] dark:text-[#F8F7F5] max-w-2xl">
            Clinically Proven. <br className="hidden md:block" />
            <span className="italic text-stone-500">Botanically Sourced.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {ingredients.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group"
            >
              {/* Rhode-style Card */}
              <div className="w-full relative bg-[#F2F0EB] dark:bg-[#222222] rounded-xl overflow-hidden pt-32 pb-8 px-6 mb-6 transition-colors duration-700 flex flex-col justify-end min-h-[400px]">
                
                {/* Massive Background Text */}
                <div className="absolute top-6 left-0 right-0 z-0 px-6">
                  <span className="font-sans font-black text-4xl lg:text-5xl xl:text-[3.5rem] tracking-tighter text-[#E5E3DB] dark:text-[#2A2A2A] select-none break-words leading-none">
                    {item.bgText}
                  </span>
                </div>

                {/* Pill Tag */}
                <div className="absolute top-6 right-6 z-20">
                  <span className="bg-[#5A5A5A] text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                    {item.tag}
                  </span>
                </div>

                {/* Image */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pt-16">
                  <div className="relative w-48 h-48 md:w-56 md:h-56">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill 
                      className="object-cover mix-blend-multiply dark:mix-blend-screen opacity-90 group-hover:scale-105 transition-transform duration-700 rounded-full"
                    />
                  </div>
                </div>

                {/* Bottom Card Info (Rhode Style) */}
                <div className="relative z-20 mt-auto pt-4 border-t border-[#E5E3DB] dark:border-[#333] flex justify-between items-end w-full">
                  <div>
                    <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-[#1C1C1C] dark:text-[#F8F7F5] mb-1">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-stone-500">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description Below Card */}
              <p className="font-sans font-light text-sm text-stone-600 dark:text-stone-400 leading-relaxed px-2">
                {item.description}
              </p>
              
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
