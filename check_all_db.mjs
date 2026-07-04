import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkDatabase() {
  console.log("Fetching all products...");
  const { data: allProducts, error: pError } = await supabase
    .from('products')
    .select('*');
    
  if (pError) console.error(pError);
  else console.log(`Total products currently in DB: ${allProducts.length}`);

  const { data: collections, error: cError } = await supabase
    .from('collections')
    .select('*');
    
  if (cError) console.error(cError);
  else console.log(`Total collections currently in DB: ${collections.length}`);
  console.log("Collections:", collections.map(c => c.name));
}

checkDatabase();
