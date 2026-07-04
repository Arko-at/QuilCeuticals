import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkDatabase() {
  console.log("Checking products table for any 'quilceuticals' entries...");
  const { data: products, error: pError } = await supabase
    .from('products')
    .select('id, title, slug')
    .ilike('slug', '%quilceuticals%');
    
  console.log("Products found:", products);

  console.log("Checking for ANY inserted product today that might be related...");
  const { data: recentProducts, error: rError } = await supabase
    .from('products')
    .select('id, title, slug, created_at')
    .order('created_at', { ascending: false })
    .limit(5);
    
  console.log("5 Most recently created products:", recentProducts);
}

checkDatabase();
