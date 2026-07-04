"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ingredients = [
  {
    id: "niacinamide",
    name: "Niacinamide Elixir",
    image: "/images/niacinamide_texture.png",
    description: "Flawless cellular barrier repair. Visibly reduces pores, evens skin tone, and provides a deeply luminous finish.",
    clinical: "Clinically proven to increase ceramide synthesis by 34% in 14 days."
  },
  {
    id: "ectoin",
    name: "Ectoin Crystals",
    image: "/images/ectoin_crystals.png",
    description: "The ultimate environmental protector. Binds water molecules to create a defensive hydro-shield around skin cells.",
    clinical: "100% cellular protection against UVA radiation and pollution stressors."
  },
  {
    id: "pearl",
    name: "Crushed Pearl Extract",
    image: "/images/pearl_extract.png",
    description: "Sourced from the deep sea, finely milled to deliver an ethereal, high-end glow while stimulating collagen.",
    clinical: "Accelerates epidermal regeneration by 20% for unparalleled luminosity."
  }
];

export default function IngredientShowcase() {
  const [activeId, setActiveId] = useState(ingredients[0].id);

  const activeIngredient = ingredients.find(i => i.id === activeId);

  return (
    <section className="relative w-full min-h-screen bg-[#FCFCFC] py-32 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#FCFCFC] to-[#FDFBF7]" />
      
      <div className="relative z-10 text-center mb-16">
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#1A1A1A]/40 font-bold mb-4 block">The Formula</span>
        <h2 className="font-serif text-5xl md:text-7xl font-light text-[#0A0A0A]">Scientific Elegance</h2>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Interactive Image Display */}
        <div className="flex-1 w-full relative aspect-square md:aspect-[4/3] lg:aspect-square overflow-hidden bg-[#FDFBF7] shadow-2xl rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIngredient?.id}
              src={activeIngredient?.image}
              alt={activeIngredient?.name}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          {/* Glass Overlay for Text */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/40 backdrop-blur-xl border border-white/50 p-6 rounded-xl">
             <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${activeIngredient?.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="font-serif text-2xl text-[#0A0A0A] mb-2">{activeIngredient?.name}</p>
                  <p className="font-sans text-xs uppercase tracking-widest text-[#D4AF37] mb-2">Clinical Results</p>
                  <p className="font-sans text-sm font-light text-[#1A1A1A]/70">{activeIngredient?.clinical}</p>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>

        {/* Selection Menu */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
          {ingredients.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className="group text-left relative py-6 border-b border-[#1A1A1A]/10 transition-colors"
            >
              <h3 className={`font-serif text-3xl transition-colors duration-500 ${activeId === item.id ? "text-[#0A0A0A]" : "text-[#1A1A1A]/30 group-hover:text-[#1A1A1A]/60"}`}>
                {item.name}
              </h3>
              
              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mt-4"
                  >
                    <p className="font-sans font-light text-[#1A1A1A]/70 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Active Indicator */}
              {activeId === item.id && (
                <motion.div
                  layoutId="activeIngredient"
                  className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
