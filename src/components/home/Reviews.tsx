"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Jenkins",
    verified: true,
    text: "The Cellular Matrix serum completely transformed my barrier. After years of rosacea, my skin is finally calm and luminous.",
    rating: 5,
    product: "The Catalyst Serum"
  },
  {
    id: 2,
    name: "Michael Chen",
    verified: true,
    text: "Unbelievable texture. It absorbs instantly but leaves this incredible, lasting hydration. Truly medical grade.",
    rating: 5,
    product: "Deep Dermis Hydrator"
  },
  {
    id: 3,
    name: "Emma Sterling",
    verified: true,
    text: "You can feel the pearl extract working. My complexion looks like glass. The finest skincare investment I've made.",
    rating: 5,
    product: "Luminous Pearl Cream"
  }
];

export default function Reviews() {
  return (
    <section className="relative w-full py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('/images/obsidian_glass.png')] bg-cover bg-center opacity-20 mix-blend-screen" />
      
      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold mb-4 block">Clinical Efficacy</span>
          <h2 className="font-serif text-5xl md:text-6xl font-light text-[#FCFCFC]">Proven Results</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative group hover:bg-white/10 transition-colors duration-500"
            >
              <div className="flex items-center gap-1 mb-6 text-[#D4AF37]">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              
              <p className="font-serif text-lg text-[#FCFCFC] font-light leading-relaxed mb-8">
                "{review.text}"
              </p>
              
              <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-auto">
                <div>
                  <p className="font-sans text-sm text-[#FCFCFC]">{review.name}</p>
                  {review.verified && (
                    <span className="text-[9px] uppercase tracking-widest text-[#EAE6DF]/50">Verified Purchase</span>
                  )}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]">{review.product}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
