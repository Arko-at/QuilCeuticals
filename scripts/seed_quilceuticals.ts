import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load env vars
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Starting QuilCeuticals Seed Process...");

  // 1. Delete existing products and collections (due to cascade, this might wipe products when collections are deleted, but let's be safe)
  console.log("Clearing old Flenjure products and collections...");
  await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('collections').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // 2. Create New Collections
  console.log("Inserting QuilCeuticals Collections...");
  const collections = [
    { name: 'Serums', slug: 'serums', description: 'Concentrated active ingredients', order: 1 },
    { name: 'Creams', slug: 'creams', description: 'Rich barrier repair hydration', order: 2 },
    { name: 'Cleansers', slug: 'cleansers', description: 'Gentle purifying formulas', order: 3 },
    { name: 'Treatments', slug: 'treatments', description: 'Targeted skin solutions', order: 4 },
  ];

  const { data: cols, error: colErr } = await supabase.from('collections').insert(collections).select();
  if (colErr) throw colErr;

  const colMap = cols.reduce((acc, col) => {
    acc[col.slug] = col.id;
    return acc;
  }, {} as Record<string, string>);

  // 3. Create New Products
  console.log("Inserting QuilCeuticals Products...");
  const products = [
    {
      title: 'The Catalyst Serum',
      slug: 'the-catalyst-serum',
      description: 'A revolutionary serum powered by Niacinamide and Ectoin to completely repair the skin barrier.',
      price: 185.00,
      compare_at_price: null,
      category: 'Serums',
      in_stock: true,
      inventory_count: 500,
      image_urls: ['/images/the_catalyst_serum.png'],
      priority: 10,
      collection_id: colMap['serums']
    },
    {
      title: 'Luminous Pearl Cream',
      slug: 'luminous-pearl-cream',
      description: 'An ultra-rich, deeply hydrating cream infused with finely milled pearl extract for unmatched luminosity.',
      price: 240.00,
      compare_at_price: 280.00,
      category: 'Creams',
      in_stock: true,
      inventory_count: 200,
      image_urls: ['/images/luminous_pearl_cream.png'],
      priority: 9,
      collection_id: colMap['creams']
    },
    {
      title: 'Ectoin Barrier Shield',
      slug: 'ectoin-barrier-shield',
      description: 'A daily defensive fluid that protects against environmental stressors and prevents transepidermal water loss.',
      price: 150.00,
      compare_at_price: null,
      category: 'Treatments',
      in_stock: true,
      inventory_count: 350,
      image_urls: ['/images/ectoin_barrier_shield.png'],
      priority: 8,
      collection_id: colMap['treatments']
    },
    {
      title: 'Cellular Cleansing Gel',
      slug: 'cellular-cleansing-gel',
      description: 'A gentle, pH-balanced cleansing gel that removes impurities without stripping the skin.',
      price: 85.00,
      compare_at_price: null,
      category: 'Cleansers',
      in_stock: true,
      inventory_count: 1000,
      image_urls: ['/images/cellular_cleansing_gel.png'],
      priority: 7,
      collection_id: colMap['cleansers']
    }
  ];

  const { error: prodErr } = await supabase.from('products').insert(products);
  if (prodErr) throw prodErr;

  console.log("✅ Seed process complete! QuilCeuticals products are now live.");
}

seed().catch(console.error);
