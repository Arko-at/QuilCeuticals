"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const articles = [
  {
    id: 1,
    title: "The Ectoin Revolution",
    category: "Ingredients",
    date: "Oct 24, 2026",
    image: "/journal_ectoin_revolution.png",
    excerpt: "How a microscopic extremolyte discovered in salt lakes is changing the landscape of modern clinical skincare by locking in moisture at a cellular level."
  },
  {
    id: 2,
    title: "Mastering the Lipid Barrier",
    category: "Skin Health",
    date: "Oct 12, 2026",
    image: "/lipid_barrier.png",
    excerpt: "Why true hydration is about retention, not just application. A deep dive into barrier health, ceramides, and preventing transepidermal water loss."
  },
  {
    id: 3,
    title: "The Architecture of a Regimen",
    category: "Application",
    date: "Sep 28, 2026",
    image: "/regimen_architecture.png",
    excerpt: "Layering active ingredients for maximum bioavailability and absorption. Why the order in which you apply your skincare matters."
  },
  {
    id: 4,
    title: "Navigating the Acid Mantle",
    category: "Skin Health",
    date: "Sep 15, 2026",
    image: "/images/niacinamide_texture.png",
    excerpt: "Understanding the pH of your skin and why alkaline cleansers are quietly destroying your natural defense mechanisms."
  },
  {
    id: 5,
    title: "Peptides: The Cellular Messengers",
    category: "Ingredients",
    date: "Sep 02, 2026",
    image: "/QUILCEUTICALS-product.jpeg",
    excerpt: "How biomimetic peptides signal your skin to produce more collagen and elastin, acting as the ultimate anti-aging tool."
  }
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F5] dark:bg-[#1C1C1C] text-[#1C1C1C] dark:text-[#F8F7F5] transition-colors duration-700 pb-32 overflow-x-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-32">
        
        {/* Header */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-stone-200 dark:border-stone-800 pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="font-serif font-light text-5xl md:text-7xl lg:text-8xl tracking-tight"
          >
            The <br />
            <span className="italic text-stone-500">Journal.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-sans font-light text-sm md:text-base tracking-[0.2em] uppercase text-stone-500 max-w-xs text-right mt-8 md:mt-0"
          >
            Insights, research, and editorials on the future of clinical luxury.
          </motion.p>
        </div>

        {/* Featured Article */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-32 group cursor-pointer"
        >
          <div className="relative w-full h-[60vh] md:h-[80vh] rounded-sm overflow-hidden mb-12 bg-[#F2F0EB] dark:bg-[#2A2A2A]">
            <Image 
              src="/Luxury_clinical_skincare_researc.jpeg"
              alt="Featured Article"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4 md:p-8 transition-transform duration-[2s] group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 max-w-5xl mx-auto">
            <div>
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4 block">Editorial Feature</span>
              <h2 className="font-serif font-light text-4xl md:text-6xl group-hover:text-stone-500 transition-colors">The Aesthetics of <br/> Clinical Precision.</h2>
            </div>
            <p className="font-sans font-light text-stone-600 dark:text-stone-400 max-w-sm text-base leading-relaxed">
              Why medical-grade skincare doesn't have to look medical. Exploring the intersection of high design, minimalist philosophy, and potent biochemistry.
            </p>
          </div>
        </motion.div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12 lg:gap-x-16">
          {articles.map((article, i) => (
            <motion.div 
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: (i % 3) * 0.2, duration: 1 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden mb-8 bg-[#F2F0EB] dark:bg-[#2A2A2A]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium">{article.category}</span>
                <span className="font-sans text-[10px] tracking-[0.1em] text-stone-500">{article.date}</span>
              </div>
              <h3 className="font-serif text-3xl font-light mb-4 group-hover:text-stone-500 transition-colors line-clamp-2 leading-snug">{article.title}</h3>
              <p className="font-sans font-light text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
