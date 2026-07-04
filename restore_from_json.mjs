import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function sync() {
  console.log("Reading products.json from Flenjure folder...");
  const rawData = fs.readFileSync('/Users/arko/Desktop/quilbrum/Flenjure/src/data/products.json', 'utf-8');
  const data = JSON.parse(rawData);
  const products = data.products;

  if (!products || products.length === 0) {
    console.error("No products found in JSON.");
    return;
  }

  console.log(`Found ${products.length} products. Syncing to Supabase...`);

  const supabaseProducts = products.map((p, idx) => {
    // Strip HTML from body
    const desc = p.body_html ? p.body_html.replace(/<[^>]*>?/gm, '').trim() : '';
    const variant = p.variants[0] || {};
    
    // Determine category based on title keywords or default to Snack
    let category = "Snacks";
    const titleLower = p.title.toLowerCase();
    if (titleLower.includes("shirt") || titleLower.includes("jersey") || titleLower.includes("hoodie")) {
      category = "Apparel";
    } else if (titleLower.includes("bag") || titleLower.includes("hat")) {
      category = "Accessories";
    } else if (titleLower.includes("cafe") || titleLower.includes("coffee") || titleLower.includes("bean")) {
      category = "Cafe";
    }

    return {
      title: p.title,
      slug: p.handle,
      description: desc,
      price: variant.price ? parseFloat(variant.price) : 0,
      compare_at_price: variant.compare_at_price ? parseFloat(variant.compare_at_price) : null,
      category: category,
      in_stock: variant.available === true,
      inventory_count: variant.available ? 100 : 0, 
      image_urls: p.images ? p.images.map(img => img.src) : [],
      priority: 100 - idx
    };
  });

  // We should do this in batches or skip duplicates
  for (const p of supabaseProducts) {
    const { error } = await supabase.from('products').insert(p);
    if (error) {
      if (error.code === '23505') {
        // Skip duplicate
      } else {
        console.error("Error inserting product:", p.title, error.message);
      }
    }
  }

  console.log(`Finished restoring products to Supabase!`);
}

sync();
