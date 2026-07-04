import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CurrencyInit from "@/components/CurrencyInit";
import SmoothScroller from "@/components/layout/SmoothScroller";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quilceuticals.vercel.app"),
  title: {
    template: "%s | QuilCeuticals",
    default: "QuilCeuticals | Next-Gen Skincare",
  },
  description: "An ultra-premium, top-1% luxury educational skincare platform. Science-backed, flawless engineering.",
  openGraph: {
    title: "QuilCeuticals | Next-Gen Skincare",
    description: "An ultra-premium, top-1% luxury educational skincare platform. Science-backed, flawless engineering.",
    url: "https://quilceuticals.vercel.app",
    siteName: "QuilCeuticals",
    images: [{ url: "https://quilceuticals.vercel.app/Logo-for-screen-share.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuilCeuticals",
    description: "An ultra-premium, top-1% luxury educational skincare platform. Science-backed, flawless engineering.",
    images: ["https://quilceuticals.vercel.app/Logo-for-screen-share.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "QuilCeuticals",
    "url": "https://quilceuticals.vercel.app",
    "logo": "https://quilceuticals.vercel.app/logo.png",
    "description": "An ultra-premium, top-1% luxury educational skincare platform. Science-backed, flawless engineering."
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#F9F9F9] dark:bg-[#111111] text-[#111111] dark:text-[#F9F9F9] font-sans font-light tracking-[0.015em] selection:bg-[#111111] selection:text-[#F9F9F9] dark:selection:bg-[#F9F9F9] dark:selection:text-[#111111] transition-colors duration-700 ease-in-out"
        suppressHydrationWarning
      >
        <SmoothScroller>
          <CurrencyInit />
          {children}
        </SmoothScroller>
      </body>
    </html>
  );
}
