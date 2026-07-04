export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-40 pb-32 px-6 lg:px-12 bg-[#fcfcfc] dark:bg-[#050505] transition-colors duration-1000">
      <div className="max-w-[800px] mx-auto w-full">
        <h1 className="text-3xl md:text-5xl font-serif font-thin text-stone-900 dark:text-white tracking-widest mb-16 uppercase">
          Privacy <br/> <span className="italic text-luxury-gradient">Architecture.</span>
        </h1>

        <div className="flex flex-col gap-12 text-[13px] md:text-[14px] text-stone-500 dark:text-white/70 font-light leading-relaxed tracking-wide">
          <p className="font-serif italic text-lg text-stone-600 dark:text-white/80">
            At QuilCeuticals, discretion is the cornerstone of true luxury. We guard your data with the same clinical precision with which we formulate our serums.
          </p>
          
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#D4AF37] mb-4">Information Synthesis</h3>
            <p>
              We collect only the essential metrics required to fulfill your orders and elevate your experience. This includes your contact protocols, shipping coordinates, and encrypted payment markers when you engage with our digital platform.
            </p>
          </div>
          
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#D4AF37] mb-4">Application & Utility</h3>
            <p>
              Your data is strictly utilized to process transactions, curate personalized clinical recommendations, and inform you of rare product drops and scientific breakthroughs. We do not engage in the indiscriminate bartering of your personal information.
            </p>
          </div>
          
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#D4AF37] mb-4">Security Infrastructure</h3>
            <p>
              Our digital perimeter is fortified with state-of-the-art cryptographic protocols. Financial telemetry is instantly vaulted by our premier payment processing partners and never remains resident on QuilCeuticals servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
