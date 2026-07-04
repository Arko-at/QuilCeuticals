import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  const { data: collections } = await supabase.from('collections').select('id').limit(1);
  const collectionId = collections?.[0]?.id || null;

  const newProduct = {
    slug: 'quilceuticals-luminary-cream',
    title: 'The Luminary Cream',
    description: 'A luxurious cream formulated with cellular restructuring properties to deeply hydrate and reconstruct the lipid barrier.',
    price: 185.00,
    compare_at_price: 210.00,
    image_urls: ['/QUILCEUTICALS-product.jpeg'],
    category: 'creams',
    in_stock: true,
    priority: 100, // Put it at the top
    collection_id: collectionId,
    variants: [
      { size: '50ml (1.7 fl oz)', color: '', price: 185.00 },
      { size: '100ml (3.4 fl oz)', color: '', price: 320.00 }
    ]
  };

  const { data, error } = await supabase.from('products').upsert([newProduct], { onConflict: 'slug' }).select();
  
  if (error) {
    console.error("Error inserting product:", error);
  } else {
    console.log("Successfully inserted product:", data);
  }
}

main();
