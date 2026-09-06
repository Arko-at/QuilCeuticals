import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function createBuckets() {
  const bucketsToCreate = ['products', 'audio'];

  for (const bucketName of bucketsToCreate) {
    console.log(`Checking bucket: ${bucketName}...`);
    
    // Check if bucket exists
    const { data: existingBuckets, error: listError } = await supabaseAdmin.storage.listBuckets();
    
    if (listError) {
      console.error(`Error listing buckets:`, listError);
      continue;
    }

    const bucketExists = existingBuckets.some(b => b.name === bucketName);

    if (!bucketExists) {
      console.log(`Creating public bucket: ${bucketName}...`);
      const { data, error } = await supabaseAdmin.storage.createBucket(bucketName, {
        public: true,
        allowedMimeTypes: null,
        fileSizeLimit: 50 * 1024 * 1024, // 50MB
      });

      if (error) {
        console.error(`Error creating bucket ${bucketName}:`, error.message);
      } else {
        console.log(`Successfully created bucket: ${bucketName}`);
      }
    } else {
      console.log(`Bucket ${bucketName} already exists.`);
      
      // Ensure it is public
      const { error: updateError } = await supabaseAdmin.storage.updateBucket(bucketName, {
        public: true,
      });
      if (updateError) {
        console.error(`Error updating bucket ${bucketName} to public:`, updateError.message);
      } else {
        console.log(`Ensured bucket ${bucketName} is public.`);
      }
    }
  }
}

createBuckets();
