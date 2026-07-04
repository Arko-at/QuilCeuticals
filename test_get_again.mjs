import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  const { data, error } = await supabase.from("products").select("*").is("deleted_at", null);
  if (error) {
    console.error("Error fetching products:", error.message);
  } else {
    console.log(`Found ${data.length} products.`);
    if (data.length > 0) {
      console.log("First product:", data[0].title, "inStock:", data[0].in_stock);
    }
  }
}
run();
