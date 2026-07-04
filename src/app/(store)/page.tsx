import Hero from "@/components/home/Hero";
import VideoFeature from "@/components/home/VideoFeature";
import ProductStory from "@/components/home/ProductStory";
import InteractiveSkinJourney from "@/components/home/InteractiveSkinJourney";
import ProductSpotlight from "@/components/home/ProductSpotlight";
import Journal from "@/components/home/Journal";
import Reviews from "@/components/home/Reviews";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="w-full relative bg-[#0A0A0A]">
      <Hero />
      <VideoFeature />
      <ProductStory />
      <ProductSpotlight />
      <InteractiveSkinJourney />
      <Reviews />
      <Journal />
      <FAQ />
    </div>
  );
}
