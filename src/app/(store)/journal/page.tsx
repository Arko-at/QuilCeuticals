import { getArticles } from "@/app/admin/actions";
import JournalClient from "@/components/journal/JournalClient";

// Opt out of static rendering so the journal updates when CMS changes
export const dynamic = "force-dynamic";

export default async function JournalPage() {
  // Try fetching from DB, fallback to empty array if fails
  let dbArticles = [];
  try {
    const res = await getArticles();
    if (res) dbArticles = res;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  // If no articles in DB, we'll provide some hardcoded placeholders for demonstration
  // But ideally, the admin will create them.
  const articles = dbArticles.length > 0 ? dbArticles : [
    {
      id: 1,
      title: "The Ectoin Revolution",
      category: "Ingredients",
      created_at: "2026-10-24",
      image_url: "/journal_ectoin_revolution.png",
      content: "How a microscopic extremolyte discovered in salt lakes is changing the landscape of modern clinical skincare by locking in moisture at a cellular level."
    },
    {
      id: 2,
      title: "Mastering the Lipid Barrier",
      category: "Skin Health",
      created_at: "2026-10-12",
      image_url: "/lipid_barrier.png",
      content: "Why true hydration is about retention, not just application. A deep dive into barrier health, ceramides, and preventing transepidermal water loss."
    },
    {
      id: 3,
      title: "The Architecture of a Regimen",
      category: "Application",
      created_at: "2026-09-28",
      image_url: "/images/regimen_architecture_abstract.jpg",
      content: "Layering active ingredients for maximum bioavailability and absorption. Why the order in which you apply your skincare matters."
    }
  ];

  return <JournalClient articles={articles} />;
}
