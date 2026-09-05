"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function JournalClient({ articles }: { articles: any[] }) {
  // Use the first article as featured if available, else fallback
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const gridArticles = articles.length > 0 ? articles.slice(1) : [];

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
        {featuredArticle ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-32 group cursor-pointer"
          >
            <div className="relative w-full h-[60vh] md:h-[80vh] rounded-sm overflow-hidden mb-12 bg-[#F2F0EB] dark:bg-[#2A2A2A]">
              <Image 
                src={featuredArticle.image_url || "/Luxury_clinical_skincare_researc.jpeg"}
                alt={featuredArticle.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4 md:p-8 transition-transform duration-[2s] group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 max-w-5xl mx-auto">
              <div>
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-stone-500 mb-4 block">Editorial Feature</span>
                <h2 className="font-serif font-light text-4xl md:text-6xl group-hover:text-stone-500 transition-colors">{featuredArticle.title}</h2>
              </div>
              <p className="font-sans font-light text-stone-600 dark:text-stone-400 max-w-sm text-base leading-relaxed">
                {featuredArticle.content?.substring(0, 150) || "Read the full editorial feature in our journal section."}...
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="mb-32 py-20 text-center border border-dashed border-stone-300 dark:border-stone-700 rounded-lg">
             <p className="text-stone-500 font-sans tracking-widest text-sm uppercase">Journal Entries Coming Soon</p>
          </div>
        )}

        {/* Article Grid */}
        {gridArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12 lg:gap-x-16">
            {gridArticles.map((article: any, i: number) => (
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
                    src={article.image_url || "/placeholder-image.jpg"}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-medium">{article.category}</span>
                  <span className="font-sans text-[10px] tracking-[0.1em] text-stone-500">
                    {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <h3 className="font-serif text-3xl font-light mb-4 group-hover:text-stone-500 transition-colors line-clamp-2 leading-snug">{article.title}</h3>
                <p className="font-sans font-light text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3">
                  {article.content?.substring(0, 120)}...
                </p>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
