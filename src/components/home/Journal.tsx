"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const categories = ["All", "Science", "Hydration", "Ingredients"];

const articles = [
  {
    id: 1,
    title: "The Cellular Matrix: How Ectoin Defends Your Skin",
    category: "Science",
    image: "/images/ectoin_crystals.png",
    size: "large",
    readTime: "4 min read",
    author: "Dr. Elena Rostova"
  },
  {
    id: 2,
    title: "Deep Dermis Hydration: Beyond Surface Level",
    category: "Hydration",
    image: "/images/obsidian_glass.png",
    size: "small",
    readTime: "3 min read",
    author: "QuilCeuticals Lab"
  },
  {
    id: 3,
    title: "Pearl Extract: The Science of Luminosity",
    category: "Ingredients",
    image: "/images/pearl_extract.png",
    size: "small",
    readTime: "5 min read",
    author: "Dr. Julian Vance"
  },
  {
    id: 4,
    title: "The Ultimate Guide to Niacinamide Concentrations",
    category: "Ingredients",
    image: "/images/niacinamide_texture.png",
    size: "medium",
    readTime: "6 min read",
    author: "QuilCeuticals Lab"
  },
];

export default function Journal() {
  const [activeFilter, setActiveFilter] = useState("All");
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y3 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  const filteredArticles = articles.filter(
    (article) => activeFilter === "All" || article.category === activeFilter
  );

  return (
    <section ref={containerRef} className="relative w-full bg-[#F8F7F5] dark:bg-[#1C1C1C] transition-colors duration-700 py-16 lg:py-20 px-6 lg:px-24 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-stone-200 dark:border-stone-800 pb-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-stone-500 block mb-4">The Journal</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C] dark:text-[#F8F7F5] font-light">Medical Insights</h2>
          </div>
          
          <div className="flex flex-wrap gap-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`text-[10px] uppercase tracking-widest transition-colors duration-500 relative pb-2 ${
                  activeFilter === category ? "text-[#1C1C1C] dark:text-[#F8F7F5] font-medium" : "text-stone-400 hover:text-[#1C1C1C] dark:hover:text-[#F8F7F5]"
                }`}
              >
                {category}
                {activeFilter === category && (
                  <motion.div
                    layoutId="journalFilter"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#1C1C1C] dark:bg-[#F8F7F5]"
                  />
                )}
              </button>
            ))}
          </div>
        </header>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article, index) => {
              const parallaxY = index % 3 === 0 ? y1 : index % 3 === 1 ? y2 : y3;
              
              return (
              <motion.article
                layout
                style={{ y: parallaxY }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                key={article.id}
                className={`relative group overflow-hidden bg-[#F2F2F2] dark:bg-[#1A1A1A] rounded-sm cursor-pointer ${
                  article.size === "large" ? "md:col-span-2 md:row-span-2" :
                  article.size === "medium" ? "md:col-span-2 md:row-span-1" :
                  "md:col-span-1 md:row-span-1"
                }`}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-screen opacity-80 transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-sm text-[9px] uppercase tracking-widest text-white border border-white/10">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/70 text-[10px] font-sans">
                      <Clock size={12} /> {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className={`font-serif text-white font-light mb-4 ${article.size === "large" ? "text-3xl md:text-5xl" : "text-2xl"}`}>
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="font-sans text-xs text-white/70">By {article.author}</span>
                    <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </motion.article>
            )})}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
