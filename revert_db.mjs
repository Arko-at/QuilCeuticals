import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  const slugsToDelete = [
    'the-catalyst-serum',
    'luminous-pearl-cream',
    'ectoin-barrier-shield',
    'cellular-cleansing-gel'
  ];

  console.log("Deleting rogue QuilCeuticals products from Flenjure DB...");

  const { data, error } = await supabase
    .from('products')
    .delete()
    .in('slug', slugsToDelete);
    
  if (error) {
    console.error("Error deleting products:", error);
  } else {
    console.log(`Successfully deleted ${slugsToDelete.length} products.`);
  }
}

main();
