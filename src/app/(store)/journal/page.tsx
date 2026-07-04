"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function JournalPage() {
  const articles = [
    {
      id: 1,
      title: "The Ectoin Revolution",
      category: "Ingredients",
      date: "Oct 24, 2026",
      image: "/journal_ectoin_revolution.png",
      excerpt: "How a microscopic extremolyte is changing the landscape of modern clinical skincare."
    },
    {
      id: 2,
      title: "Mastering the Lipid Barrier",
      category: "Skin Health",
      date: "Oct 12, 2026",
      image: "/lipid_barrier.png",
      excerpt: "Why true hydration is about retention, not just application. A deep dive into barrier health."
    },
    {
      id: 3,
      title: "The Architecture of a Regimen",
      category: "Application",
      date: "Sep 28, 2026",
      image: "/regimen_architecture.png",
      excerpt: "Layering active ingredients for maximum bioavailability and absorption."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#050505] pt-32 pb-32 text-stone-900 dark:text-white transition-colors duration-1000">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-stone-200 dark:border-white/10 pb-12">
          <h1 className="font-serif font-thin text-6xl md:text-8xl tracking-tight">
            The <br />
            <span className="italic text-luxury-gradient">Journal.</span>
          </h1>
          <p className="font-sans font-thin text-sm md:text-base tracking-[0.2em] uppercase text-stone-500 dark:text-white/60 max-w-xs text-right mt-8 md:mt-0">
            Insights, research, and editorials on the future of clinical luxury.
          </p>
        </div>

        {/* Featured Article */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-32 group cursor-pointer"
        >
          <div className="relative w-full h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden mb-8 border border-stone-200 dark:border-white/10">
            <Image
              src="/journal_featured_precision.png"
              alt="Featured Article"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-white/10 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-luxury-gradient mb-4 block">Editorial Feature</span>
              <h2 className="font-serif font-thin text-4xl md:text-6xl group-hover:text-stone-600 dark:group-hover:text-white/80 transition-colors">The Aesthetics of <br/> Clinical Precision.</h2>
            </div>
            <p className="font-sans font-light text-stone-600 dark:text-white/60 max-w-sm text-sm leading-relaxed">
              Why medical-grade skincare doesn't have to look medical. Exploring the intersection of high design and potent biochemistry.
            </p>
          </div>
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {articles.map((article, i) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.8 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 border border-stone-200 dark:border-white/5">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]">{article.category}</span>
                <span className="font-sans text-[10px] tracking-[0.1em] text-stone-400 dark:text-white/40">{article.date}</span>
              </div>
              <h3 className="font-serif text-2xl mb-3 group-hover:text-luxury-gradient transition-colors">{article.title}</h3>
              <p className="font-sans font-light text-sm text-stone-600 dark:text-white/60 leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
