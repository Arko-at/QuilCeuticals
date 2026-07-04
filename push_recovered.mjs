import fs from 'fs';
import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function pushRecovered() {
  const data = JSON.parse(fs.readFileSync('recovered_products.json', 'utf-8'));
  
  const supabaseProducts = data.map(p => {
    // Strip $$ from price
    let priceStr = p.price;
    if (priceStr.startsWith('$$')) priceStr = priceStr.substring(2);
    else if (priceStr.startsWith('$')) priceStr = priceStr.substring(1);
    
    let comparePriceStr = p.compareAtPrice;
    if (comparePriceStr && typeof comparePriceStr === 'string') {
        if (comparePriceStr.startsWith('$$')) comparePriceStr = comparePriceStr.substring(2);
        else if (comparePriceStr.startsWith('$')) comparePriceStr = comparePriceStr.substring(1);
    }
    
    const imageUrls = [];
    if (p.image) imageUrls.push(p.image);
    if (p.hoverImage) imageUrls.push(p.hoverImage);
    
    return {
      title: p.name,
      slug: p.slug,
      description: "", // Cache didn't include full description unfortunately, but at least the product is back
      price: parseFloat(priceStr) || 0,
      compare_at_price: comparePriceStr ? parseFloat(comparePriceStr) : null,
      category: p.category || "Apparel",
      collection_id: p.collectionId === null ? null : p.collectionId,
      in_stock: p.inStock,
      inventory_count: p.inStock ? 100 : 0,
      image_urls: imageUrls,
      priority: 50 // Default priority for recovered
    };
  });

  let successCount = 0;
  for (const p of supabaseProducts) {
    const { error } = await supabase.from('products').insert(p);
    if (error) {
      if (error.code === '23505') {
        console.log(`Skipped duplicate: ${p.title}`);
      } else {
        console.error(`Failed to insert ${p.title}:`, error.message);
      }
    } else {
      console.log(`Restored: ${p.title}`);
      successCount++;
    }
  }
  
  console.log(`Successfully restored ${successCount} recently added products from the cache!`);
}

pushRecovered();
