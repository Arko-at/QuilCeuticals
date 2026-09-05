import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual simple dotenv parser
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.join('=').trim();
  }
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function run() {
  console.log("Setting old products out of stock...");
  const { error: hideErr } = await supabase.from('products').update({ in_stock: false }).neq('id', '00000000-0000-0000-0000-000000000000');
  if (hideErr) console.error("Error hiding products:", hideErr);

  const p1 = {
    title: 'QuilCeuticals Face Cream',
    slug: 'the-face-cream',
    description: 'A sophisticated daily face cream that supports the skin rather than overwhelming it. Target 4% Niacinamide and Ectoin. Just Your Skin™️',
    price: 114.00,
    image_urls: [
      '/QUILCEUTICALS-PRODUCT-IMAGES/Face-cream-jar.jpeg',
      '/QUILCEUTICALS-PRODUCT-IMAGES/face-cream-withPack.jpeg'
    ],
    category: 'creams',
    in_stock: true,
    priority: 100
  };

  const p2 = {
    title: 'QuilCeuticals Body Lotion',
    slug: 'the-body-lotion',
    description: 'Face-level thinking for body skin. A sophisticated daily body lotion designed to moisturize, condition and support healthy-looking skin.',
    price: 65.00,
    image_urls: [
      '/QUILCEUTICALS-PRODUCT-IMAGES/BODY-LOTION.png',
      '/QUILCEUTICALS-PRODUCT-IMAGES/BODY-LOTION-PACK.png'
    ],
    category: 'lotions',
    in_stock: true,
    priority: 90
  };

  const p3 = {
    title: 'QuilCeuticals Cleanser',
    slug: 'the-cleanser',
    description: 'Clean skin without the stripped-skin philosophy. Cleansing should remove what the skin doesn\'t need without treating the skin itself as the problem.',
    price: 50.00,
    image_urls: [
      '/QUILCEUTICALS-PRODUCT-IMAGES/BODY-CLEANER.jpeg',
      '/QUILCEUTICALS-PRODUCT-IMAGES/BODY-CLEANSER-PACK.jpeg'
    ],
    category: 'cleansers',
    in_stock: true,
    priority: 80
  };

  const products = [p1, p2, p3];

  for (const p of products) {
    const { data, error } = await supabase.from('products').select('*').eq('slug', p.slug).single();
    if (data) {
      console.log(`Updating ${p.slug}`);
      const { error: updateErr } = await supabase.from('products').update(p).eq('slug', p.slug);
      if (updateErr) console.error("Error updating:", updateErr);
    } else {
      console.log(`Inserting ${p.slug}`);
      const { error: insErr } = await supabase.from('products').insert([p]);
      if (insErr) console.error("Error inserting:", insErr);
    }
  }
  console.log("Done updating products!");
}

run().catch(console.error);
