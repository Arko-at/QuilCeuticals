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
    <section className="relative w-full py-32 bg-white dark:bg-[#1C1C1C] border-y border-stone-200 dark:border-stone-800 transition-colors duration-700 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-24">
        <div className="text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-medium mb-4 block">
            Clinical Efficacy
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-[#1C1C1C] dark:text-[#F8F7F5]">
            Proven Results
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col p-8 bg-[#F8F7F5] dark:bg-[#2A2A2A] rounded-sm transition-colors duration-700"
            >
              <div className="flex items-center gap-1 mb-6 text-[#1C1C1C] dark:text-[#F8F7F5]">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              
              <p className="font-serif text-lg text-[#1C1C1C] dark:text-[#F8F7F5] font-light leading-relaxed mb-8 flex-1">
                "{review.text}"
              </p>
              
              <div className="flex items-center justify-between border-t border-stone-200 dark:border-stone-700 pt-6">
                <div>
                  <p className="font-sans text-sm text-[#1C1C1C] dark:text-[#F8F7F5] font-medium">{review.name}</p>
                  {review.verified && (
                    <span className="text-[9px] uppercase tracking-widest text-stone-500">Verified Purchase</span>
                  )}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-stone-500">{review.product}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
