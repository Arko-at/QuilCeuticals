"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skinTypes = [
  { id: "dry", label: "Dry & Dehydrated" },
  { id: "oily", label: "Oily & Congested" },
  { id: "sensitive", label: "Sensitive & Reactive" },
  { id: "aging", label: "Fine Lines & Aging" }
];

export default function InteractiveSkinJourney() {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedType(id);
    setTimeout(() => setStep(2), 500); // Smooth transition to step 2
  };

  return (
    <section className="relative w-full py-32 bg-[#0A0A0A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37] rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FCFCFC] rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center min-h-[500px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold mb-4">Diagnostics</span>
              <h2 className="font-serif text-4xl md:text-6xl font-light text-[#FCFCFC] mb-12">
                What is your primary <br/> cellular concern?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                {skinTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleSelect(type.id)}
                    className={`p-6 border transition-all duration-500 backdrop-blur-md rounded-xl
                      ${selectedType === type.id 
                        ? "border-[#D4AF37] bg-[#D4AF37]/10" 
                        : "border-[#1A1A1A] bg-white/5 hover:border-[#FCFCFC]/30 hover:bg-white/10"
                      }`}
                  >
                    <span className="font-sans text-sm tracking-widest uppercase text-[#FCFCFC]">{type.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-bold mb-4">The Prescription</span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-[#FCFCFC] mb-8">
                Your bespoke regimen <br/> has been formulated.
              </h2>
              
              <div className="p-8 border border-[#1A1A1A] bg-white/5 backdrop-blur-xl rounded-2xl max-w-lg w-full">
                <div className="w-full h-48 bg-[#1A1A1A] rounded-lg mb-6 overflow-hidden relative">
                   {/* Placeholder for dynamic product image based on selection */}
                   <img src="/images/niacinamide_texture.png" alt="Prescription" className="w-full h-full object-cover opacity-60 mix-blend-screen" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                   <div className="absolute bottom-4 left-4">
                     <p className="font-sans text-[10px] uppercase tracking-widest text-[#D4AF37]">Phase 1</p>
                     <p className="font-serif text-2xl text-[#FCFCFC]">The Catalyst Serum</p>
                   </div>
                </div>
                <p className="font-sans font-light text-sm text-[#FCFCFC]/70 mb-8 leading-relaxed">
                  Based on your diagnostic profile, we recommend starting with our high-potency serum engineered to target {selectedType} skin by immediately reinforcing the epidermal barrier.
                </p>
                
                <button className="w-full py-4 bg-[#FCFCFC] text-[#0A0A0A] font-sans text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#FCFCFC] transition-colors duration-500 rounded-lg">
                  Shop The Regimen
                </button>
                <button 
                  onClick={() => { setStep(1); setSelectedType(null); }}
                  className="w-full mt-4 py-2 text-[#FCFCFC]/50 font-sans text-[10px] uppercase tracking-widest hover:text-[#FCFCFC] transition-colors"
                >
                  Retake Diagnostic
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
