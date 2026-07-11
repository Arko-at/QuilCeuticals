import Hero from "@/components/home/Hero";
import ProductStory from "@/components/home/ProductStory";
import ProductSpotlight from "@/components/home/ProductSpotlight";
import ScienceIngredients from "@/components/home/ScienceIngredients";
import Journal from "@/components/home/Journal";
import ClinicalTrials from "@/components/home/ClinicalTrials";
import ScienceMechanism from "@/components/home/ScienceMechanism";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="w-full relative transition-colors duration-700">
      <Hero />
      <div className="relative z-10 bg-[#F8F7F5] dark:bg-[#1C1C1C] w-full">
        <ProductSpotlight />
        <ProductStory />
        <ScienceIngredients />
        <TestimonialCarousel />
        <ClinicalTrials />
        <ScienceMechanism />
        <Journal />
        <FAQ />
      </div>
    </div>
  );
}
