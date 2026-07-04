"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingBag, User, Sun, Moon, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store";
import SearchOverlay from "../search/SearchOverlay";
import { useTheme } from "next-themes";
import { subscribeNewsletter } from "@/app/admin/actions";

const mainLinks = [
  { name: "Shop", href: "/shop" },
  { name: "Science", href: "/science" },
  { name: "Skin Journey", href: "/journey" },
  { name: "Journal", href: "/journal" },
  { name: "About", href: "/about" },
  { name: "Account", href: "/account" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isStudio = pathname.startsWith("/studio");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMouseActive, setIsMouseActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, setIsOpen: setCartOpen } = useCartStore();
  const { theme, setTheme } = useTheme();

  const [subEmail, setSubEmail] = useState("");
  const [subPhone, setSubPhone] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subPhone) return;
    setSubStatus("loading");
    const res = await subscribeNewsletter(subEmail, subPhone);
    if (res.error) {
      setSubStatus("error");
    } else {
      setSubStatus("success");
      setSubEmail("");
      setSubPhone("");
      setTimeout(() => setSubStatus("idle"), 3000);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Mouse activity timer for cinematic homepage header
  useEffect(() => {
    if (!isHome) return;

    let inactivityTimer: NodeJS.Timeout;

    const handleMouseMove = () => {
      setIsMouseActive(true);

      clearTimeout(inactivityTimer);

      // Auto-hide after 2.5 seconds of no movement
      inactivityTimer = setTimeout(() => {
        setIsMouseActive(false);
      }, 2500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    handleMouseMove();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(inactivityTimer);
    };
  }, [isHome]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  if (isStudio || pathname.startsWith("/admin")) return null;

  if (pathname === "/checkout") {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505] py-6 border-b border-white/10 transition-colors duration-1000">
        <div className="w-full px-6 flex justify-center">
          <Link href="/" className="relative h-12 w-48 sm:h-16 sm:w-64 transition-all duration-1000">
            <Image src="/logo.png" alt="QuilCeuticals Logo" fill className="object-contain" sizes="(max-width: 640px) 192px, 256px" priority />
          </Link>
        </div>
      </header>
    );
  }

  // Removing explicit variants objects to avoid strict TS inferences,
  // we'll apply them directly.

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
          isScrolled
            ? "bg-gradient-to-b from-white/95 to-stone-50/90 dark:from-[#050505]/95 dark:to-[#0A0A0A]/90 backdrop-blur-xl py-4 border-b border-stone-200/50 dark:border-white/10"
            : (isHome ? "bg-transparent py-8" : "bg-gradient-to-b from-stone-50 to-stone-50 dark:from-[#050505] dark:to-[#050505] py-6 border-b border-stone-200/50 dark:border-white/5"),
          isHome && !isMouseActive && !isScrolled && !isMenuOpen && !isSearchOpen
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100 pointer-events-auto"
        )}
      >
        <div className="w-full px-4 sm:px-6 lg:px-12 grid grid-cols-3 items-center">
          
          {/* Left: Custom Animated Menu Icon */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={clsx(
                "group flex items-center gap-3 transition-all duration-300 hover:opacity-50 z-[60]",
                (isHome && !isScrolled && !isMenuOpen) ? "text-white" : "text-stone-900 dark:text-white"
              )}
              aria-label="Toggle menu"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Top Line */}
                <span className={clsx(
                  "absolute w-6 h-[1px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  (isHome && !isScrolled && !isMenuOpen) ? "bg-white" : "bg-stone-900 dark:bg-white",
                  isMenuOpen ? "rotate-45" : "-translate-y-1.5"
                )} />
                {/* Bottom Line */}
                <span className={clsx(
                  "absolute w-6 h-[1px] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  (isHome && !isScrolled && !isMenuOpen) ? "bg-white" : "bg-stone-900 dark:bg-white",
                  isMenuOpen ? "-rotate-45" : "translate-y-1.5"
                )} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-light hidden sm:block">
                {isMenuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>

          {/* Center: Logo */}
          <div className={clsx(
            "flex justify-center z-[60] pointer-events-none",
            (isHome && !isScrolled) ? "invert" : "dark:invert"
          )}>
            <Link
              href="/"
              className={clsx(
                "relative transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center flex items-center justify-center pointer-events-auto",
                (!isHome && isScrolled)
                  ? "h-10 w-10 sm:h-12 sm:w-12" // Icon size on scroll
                  : (isHome && isScrolled)
                    ? "h-8 w-32 sm:h-10 sm:w-40" // Smallest full logo on scroll (Home)
                    : isHome
                      ? "h-14 w-56 sm:h-20 sm:w-72" // Large on home page
                      : "h-10 w-40 sm:h-12 sm:w-48" // Medium on store/other pages
              )}
            >
              {/* Main Full Logo */}
              <Image
                src="/logo.png"
                alt="QuilCeuticals Logo"
                fill
                className={clsx(
                  "object-contain transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  (!isHome && isScrolled) ? "opacity-0 scale-90 blur-sm pointer-events-none" : "opacity-100 scale-100 blur-0"
                )}
                sizes="(max-width: 640px) 224px, 288px"
                priority
              />

              {/* Icon / Scroll Logo */}
              {!isHome && (
                <Image
                  src="/favicon.png"
                  alt="QuilCeuticals Icon"
                  fill
                  className={clsx(
                    "object-contain transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] absolute inset-0",
                    isScrolled ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-110 blur-sm pointer-events-none"
                  )}
                  sizes="(max-width: 640px) 48px, 48px"
                  priority
                />
              )}
            </Link>
          </div>

          {/* Right: Tools */}
          <div className={clsx(
            "flex items-center justify-end gap-2 md:gap-4 transition-colors duration-700 z-[60]",
            (isHome && !isScrolled && !isMenuOpen) ? "text-white" : "text-stone-900 dark:text-white"
          )}>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => {setIsSearchOpen(true); setIsMenuOpen(false);}}
                className="p-2 transition-opacity duration-300 hover:opacity-50"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <Link
                href="/account"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 transition-opacity duration-300 hover:opacity-50"
                aria-label="Account"
              >
                <User size={18} strokeWidth={1.5} />
              </Link>
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => {setIsSearchOpen(true); setIsMenuOpen(false);}}
              className="md:hidden p-2 transition-opacity duration-300 hover:opacity-50"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            <button
              onClick={() => {setCartOpen(true); setIsMenuOpen(false);}}
              className="flex items-center gap-1.5 relative p-2 transition-opacity duration-300 hover:opacity-50"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="text-[10px] items-center justify-center font-light tracking-widest mt-0.5">
                ({cartCount})
              </span>
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Premium Glassmorphic Left-Side Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dark Overlay over the rest of the screen */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 bg-[#050505]/60 backdrop-blur-[2px] z-[55]"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* The Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 w-[85vw] sm:w-[400px] bg-[#0A0A0A]/95 backdrop-blur-3xl z-[65] border-r border-white/10 flex flex-col pt-32 pb-12 px-12 overflow-y-auto shadow-[30px_0_100px_rgba(0,0,0,0.8)]"
            >
              {/* Subtle Gradient Accent in Sidebar */}
              <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#D4AF37]/5 to-transparent pointer-events-none opacity-50 mix-blend-screen" />

              <div className="flex flex-col h-full relative z-10">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-luxury-gradient mb-12 block">Navigation</span>
                
                {/* Typographic Links */}
                <motion.nav 
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                    }
                  }}
                  className="flex flex-col gap-6"
                >
                  {mainLinks.map((link) => (
                    <motion.div 
                      key={link.name} 
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block font-serif font-thin text-3xl sm:text-4xl text-white/90 hover:text-white hover:translate-x-2 hover:italic transition-all duration-500 tracking-wide"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                {/* Footer Utilities */}
                <div className="mt-auto pt-16 border-t border-white/10 flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="text-[10px] uppercase tracking-[0.2em] font-light text-white/50 hover:text-white transition-colors">Client Services</Link>
                    <Link href="/privacy" onClick={() => setIsMenuOpen(false)} className="text-[10px] uppercase tracking-[0.2em] font-light text-white/50 hover:text-white transition-colors">Legal & Privacy</Link>
                  </div>

                  {/* Theme Toggle Button */}
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-light text-white/50 hover:text-white transition-colors pt-4"
                  >
                    {mounted && (theme === "dark" ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />)}
                    <span>{mounted && (theme === "dark" ? "Light Mode" : "Dark Mode")}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
