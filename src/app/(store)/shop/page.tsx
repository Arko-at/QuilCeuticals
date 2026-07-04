import type { Metadata } from 'next';
import { getProducts, getCollections } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: 'Shop Premium Essentials',
  description: 'Shop Fleñjure\'s premium lifestyle and apparel collections. Discover Capsule 1 and elevate your living with exclusive, high-end pieces designed in Atlanta.',
};
import ShopClient from "@/components/shop/ShopClient";
import { Suspense } from "react";

export default async function ShopPage() {
  const dbProducts = await getProducts();
  const dbCollections = await getCollections();
  
  const getSizing = (product: any) => {
    const category = (product.category || "").toLowerCase();

    if (category.includes("serums") || category.includes("treatments")) {
      return {
        type: "skincare",
        metrics: [
          { size: "30ml (1 fl oz)" },
          { size: "50ml (1.7 fl oz)" }
        ]
      };
    }
    if (category.includes("creams") || category.includes("cleansers")) {
      return {
        type: "skincare-large",
        metrics: [
          { size: "50ml (1.7 fl oz)" },
          { size: "100ml (3.4 fl oz)" }
        ]
      };
    }
    return {
      type: "one-size",
      metrics: []
    };
  };

  const products = dbProducts
    .filter((p: any) => p.in_stock)
    .map((p: any) => {
      const sizingData = getSizing(p);
      return {
        id: p.slug, // Use slug as the ID for routing purposes since ShopClient links to /shop/${product.id}
        name: p.title, // ShopClient uses product.name
        slug: p.slug,
        price: `$${p.price.toFixed(2)}`,
        compareAtPrice: p.compare_at_price ? `$${p.compare_at_price.toFixed(2)}` : null,
        image: p.image_urls?.[0] || "https://via.placeholder.com/500", // ShopClient uses product.image
        hoverImage: p.image_urls?.[1] || null,
        category: p.category,
        collectionId: p.collection_id,
        inStock: p.in_stock,
        variants: p.variants || [],
        sizes: p.variants && p.variants.length > 0 ? p.variants.map((v: any) => v.size + (v.color ? ` - ${v.color}` : '')) : (sizingData.type !== 'one-size' ? sizingData.metrics.map((m: any) => m.size) : [])
      };
    });
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50 dark:bg-stone-950" />}>
      <ShopClient products={products} collections={dbCollections || []} />
    </Suspense>
  );
}
