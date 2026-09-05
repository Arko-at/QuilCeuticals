import { getIngredients, getSkinConcerns } from "@/app/admin/actions";
import ScienceClient from "@/components/science/ScienceClient";

export const dynamic = "force-dynamic";

export default async function SciencePage() {
  let dbIngredients = [];
  let dbSkinConcerns = [];
  
  try {
    const ingRes = await getIngredients();
    if (ingRes) dbIngredients = ingRes;
    
    const scRes = await getSkinConcerns();
    if (scRes) dbSkinConcerns = scRes;
  } catch (error) {
    console.error("Failed to fetch science data:", error);
  }

  // Fallback data if nothing is in the database yet
  const ingredients = dbIngredients.length > 0 ? dbIngredients : [
    {
      id: "1",
      name: "Niacinamide at 4%",
      slug: "niacinamide-4",
      image_url: "/niacinamide_matrix.png",
      clinical_description: "A foundational element in our barrier-conscious philosophy. Niacinamide is targeted precisely at 4% to optimally support the appearance of an even complexion and a healthy, resilient skin barrier.",
      benefits: "We focus on purposeful science. This concentration provides maximum efficacy without the unnecessary sensitization that often accompanies aggressive, trend-driven high-percentage formulations."
    },
    {
      id: "2",
      name: "Ceramides & Squalane",
      slug: "ceramides-squalane",
      image_url: "/lipid_barrier.png",
      clinical_description: "Healthy-looking skin begins with supporting its fundamental barrier. Our formulation rejects the simplistic “just moisturize it” approach to facial care by utilizing biomimetic Ceramides.",
      benefits: "Paired with Squalane, this complex provides profound emollience and supports absolute softness, delivering deep hydration without defining the product as a conventional heavy cream."
    },
    {
      id: "3",
      name: "Bifida Ferment Lysate",
      slug: "bifida-ferment",
      image_url: "/images/microbiome_shield.jpg",
      clinical_description: "Our microbiome-conscious formulation directly supports QuilCeuticals' broader PRE + POST BIOTIC / Quilbiotics™️ product architecture.",
      benefits: "By feeding beneficial micro-flora and creating an optimized environment for your skin’s invisible first line of defense, we ensure your skin remains balanced, calm, and perfectly supported against daily environmental noise."
    }
  ];

  return <ScienceClient ingredients={ingredients} skinConcerns={dbSkinConcerns} />;
}
