"use client";

import { useState, useEffect } from "react";
import { Search, ShoppingBag, User, ChevronDown, Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/lib/store";
import SearchOverlay from "../search/SearchOverlay";
import { useTheme } from "next-themes";

const megaMenuContent = {
  Shop: {
    title: "Discover the Collection",
    image: "/QuilCeutic_mega_menu.jpeg",
    links: [
      { name: "All Products", href: "/shop" },
      { name: "The Catalyst Serum", href: "/shop/the-catalyst-serum" },
      { name: "Luminous Pearl Cream", href: "/shop/luminous-pearl-cream" },
      { name: "Ectoin Barrier Shield", href: "/shop/ectoin-barrier-shield" },
    ]
  },
  Science: {
    title: "The Clinical Framework",
    image: "/images/ectoin_crystals.png",
    links: [
      { name: "Our Ingredients", href: "/science" },
      { name: "The Skin Journey", href: "/journey" },
      { name: "Clinical Trials", href: "/science#trials" },
    ]
  }
};

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isStudio = pathname.startsWith("/studio") || pathname.startsWith("/admin");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const { items, setIsOpen: setCartOpen } = useCartStore();
  const { theme, setTheme } = useTheme();

  const announcements = [
    "Complimentary shipping on all orders over $150.",
    "Discover the new Luminous Pearl Cream.",
    "Exclusive: Join QuilCeuticals Studio for benefits."
  ];

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (isStudio) return null;
  if (pathname === "/checkout") return null;

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const isDarkHeader = isHome && !isScrolled && !activeMenu;
  const headerBg = activeMenu 
    ? "bg-[#F8F7F5] dark:bg-[#1C1C1C] border-b border-stone-200 dark:border-stone-800" 
    : isScrolled
      ? "bg-[#F8F7F5]/95 dark:bg-[#1C1C1C]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800"
      : isHome 
        ? "bg-transparent border-b border-transparent"
        : "bg-[#F8F7F5] dark:bg-[#1C1C1C] border-b border-stone-200 dark:border-stone-800";

  const textColor = isDarkHeader ? "text-white" : "text-[#1C1C1C] dark:text-[#F8F7F5]";

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out flex flex-col",
          headerBg
        )}
        onMouseLeave={() => setActiveMenu(null)}
      >
        {/* Announcement Bar */}
        <div 
          className={clsx(
            "w-full bg-[#1C1C1C]/40 dark:bg-white/40 backdrop-blur-md text-[#F8F7F5] dark:text-[#1C1C1C] flex justify-center items-center overflow-hidden transition-all duration-500 relative",
            isScrolled || activeMenu ? "h-0 opacity-0" : "h-8 opacity-100"
          )}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={announcementIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute font-sans text-[9px] md:text-[10px] uppercase tracking-widest font-medium text-center px-4"
            >
              {announcements[announcementIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className={clsx(
          "w-full px-6 lg:px-16 flex items-center justify-between transition-all duration-500",
          isScrolled ? "py-3" : isHome ? "py-6" : "py-4"
        )}>
          
          {/* Left: Mobile Menu Toggle & Desktop Navigation */}
          <div className="flex-1 flex items-center lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={clsx("transition-colors duration-300", textColor)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 flex-1">
            {["Shop", "Science", "Journal", "About"].map((item) => (
              <div
                key={item}
                className="relative py-4"
                onMouseEnter={() => {
                  if (item === "Shop" || item === "Science") {
                    setActiveMenu(item);
                  } else {
                    setActiveMenu(null);
                  }
                }}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  className={clsx(
                    "text-[11px] uppercase tracking-widest font-medium transition-colors duration-300 flex items-center gap-1",
                    textColor,
                    activeMenu === item ? "opacity-100" : "opacity-80 hover:opacity-100"
                  )}
                >
                  {item}
                  {(item === "Shop" || item === "Science") && (
                    <ChevronDown size={12} className={clsx("transition-transform duration-300", activeMenu === item ? "rotate-180" : "")} />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Center: Logo */}
          <div className="flex-1 flex justify-center">
            <Link 
              href="/" 
              className={clsx(
                "relative transition-all duration-500 flex items-center justify-center",
                isScrolled ? "h-8 w-8 sm:h-10 sm:w-10" : "h-8 w-40 sm:h-10 sm:w-56"
              )} 
              onClick={() => setActiveMenu(null)}
            >
              <Image
                src={isScrolled ? "/favicon.png" : "/logo.png"}
                alt="QuilCeuticals"
                fill
                sizes="(max-width: 640px) 160px, 224px"
                className={clsx(
                  "object-contain transition-all duration-500",
                  isDarkHeader ? "invert" : "dark:invert"
                )}
                priority
              />
            </Link>
          </div>

          {/* Right: Tools */}
          <div className="flex-1 flex items-center justify-end gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className={clsx("transition-opacity duration-300 hover:opacity-50", textColor)}
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link
              href="/account"
              className={clsx("hidden lg:block transition-opacity duration-300 hover:opacity-50", textColor)}
            >
              <User size={18} strokeWidth={1.5} />
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={clsx("hidden lg:block transition-opacity duration-300 hover:opacity-50", textColor)}
            >
              {mounted && (theme === "dark" ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />)}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className={clsx("flex items-center gap-1.5 transition-opacity duration-300 hover:opacity-50", textColor)}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="text-[10px] font-medium tracking-widest mt-0.5">({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeMenu && megaMenuContent[activeMenu as keyof typeof megaMenuContent] && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 w-full bg-[#F8F7F5] dark:bg-[#1C1C1C] border-b border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden"
              onMouseEnter={() => setActiveMenu(activeMenu)}
            >
              {megaMenuContent[activeMenu as keyof typeof megaMenuContent] && (
                <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 flex gap-12">
                  <div className="w-1/3">
                    <h3 className="font-serif text-2xl text-[#1C1C1C] dark:text-[#F8F7F5] mb-6">
                      {megaMenuContent[activeMenu as keyof typeof megaMenuContent].title}
                    </h3>
                    <ul className="space-y-4">
                      {megaMenuContent[activeMenu as keyof typeof megaMenuContent].links.map((link) => (
                        <li key={link.name}>
                          <Link
                            href={link.href}
                            className="text-sm font-sans text-stone-600 dark:text-stone-400 hover:text-[#1C1C1C] dark:hover:text-[#F8F7F5] transition-colors duration-300 flex items-center gap-2 group"
                            onClick={() => setActiveMenu(null)}
                          >
                            <span className="h-[1px] w-0 bg-[#1C1C1C] dark:bg-[#F8F7F5] transition-all duration-300 group-hover:w-4" />
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-2/3 relative h-[300px] rounded-sm overflow-hidden bg-stone-100 dark:bg-[#2A2A2A]">
                    <Image
                      src={megaMenuContent[activeMenu as keyof typeof megaMenuContent].image}
                      alt={activeMenu}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-contain p-4 transition-transform duration-1000 hover:scale-105"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute top-full left-0 w-full bg-[#F8F7F5] dark:bg-[#1C1C1C] overflow-y-auto lg:hidden"
            >
              <div className="flex flex-col p-6 gap-6">
                {["Shop", "Science", "Journal", "About"].map((item) => (
                  <div key={item} className="flex flex-col border-b border-stone-200 dark:border-stone-800 pb-4">
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="font-serif text-2xl text-[#1C1C1C] dark:text-[#F8F7F5]"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                    {(item === "Shop" || item === "Science") && (
                      <div className="mt-4 flex flex-row gap-4 items-center">
                        <div className="relative w-1/3 aspect-square max-h-32 rounded-sm overflow-hidden bg-[#F2F0EB] dark:bg-[#2A2A2A]">
                          <Image
                            src={megaMenuContent[item as keyof typeof megaMenuContent]?.image}
                            alt={item}
                            fill
                            sizes="(max-width: 1024px) 33vw, 50vw"
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 flex flex-col gap-3 pl-4 border-l border-stone-300 dark:border-stone-700">
                          {megaMenuContent[item as keyof typeof megaMenuContent]?.links.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              className="font-sans text-sm text-stone-600 dark:text-stone-400"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
