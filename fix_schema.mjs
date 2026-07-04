import fs from 'fs';

let schema = fs.readFileSync('supabase/schema.sql', 'utf-8');

const drops = `
DROP TABLE IF EXISTS public.orders CASCADE;
DROP TABLE IF EXISTS public.cart_sessions CASCADE;
DROP TABLE IF EXISTS public.articles CASCADE;
DROP TABLE IF EXISTS public.ingredients CASCADE;
DROP TABLE IF EXISTS public.skin_concerns CASCADE;
DROP TABLE IF EXISTS public.reviews CASCADE;
DROP TABLE IF EXISTS public.faq CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.collections CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

`;

// Only add drops if not already there
if (!schema.startsWith("DROP TABLE")) {
  schema = drops + schema;
  fs.writeFileSync('supabase/schema.sql', schema);
  console.log("Added DROP TABLE statements to the top of schema.sql.");
}
