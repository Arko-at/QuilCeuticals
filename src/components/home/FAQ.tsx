"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search } from "lucide-react";

const faqs = [
  {
    question: "Are QuilCeuticals formulations safe for sensitive skin?",
    answer: "Yes. Every product undergoes rigorous dermatological testing. We formulate without common irritants, using bio-compatible actives like Ectoin to specifically target and soothe inflammation."
  },
  {
    question: "How long until I see clinical results?",
    answer: "While immediate hydration and luminosity are visible upon first application, cellular turnover takes approximately 28 days. Optimal results and barrier repair are typically observed after 4-6 weeks of consistent use."
  },
  {
    question: "Are your ingredients ethically sourced?",
    answer: "Absolutely. Our Pearl Extract is sustainably harvested, and all our botanical extracts are sourced through fair-trade partnerships ensuring both environmental and social responsibility."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we offer global shipping. All international orders are dispatched via priority encrypted logistics to ensure the formulations arrive in pristine condition."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full py-32 bg-[#FCFCFC] text-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#1A1A1A]/40 font-bold mb-4 block">Concierge</span>
          <h2 className="font-serif text-5xl md:text-6xl font-light">Client Services</h2>
        </div>

        <div className="relative mb-12">
          <input 
            type="text" 
            placeholder="Search our knowledge base..." 
            className="w-full bg-[#FDFBF7] border border-[#1A1A1A]/10 rounded-full py-4 px-6 pl-12 font-sans text-sm outline-none focus:border-[#D4AF37] transition-colors"
          />
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border-b border-[#1A1A1A]/10 pb-4"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex items-center justify-between py-4 text-left group"
              >
                <span className={`font-serif text-xl transition-colors duration-300 ${activeIndex === idx ? "text-[#0A0A0A]" : "text-[#1A1A1A]/70 group-hover:text-[#0A0A0A]"}`}>
                  {faq.question}
                </span>
                <span className="text-[#1A1A1A]/40 group-hover:text-[#D4AF37] transition-colors">
                  {activeIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="font-sans font-light text-[#1A1A1A]/70 pb-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
