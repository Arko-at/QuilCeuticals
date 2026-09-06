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

async function deleteAudioBucket() {
  console.log('Emptying bucket...');
  const { data: files } = await supabaseAdmin.storage.from('audio').list();
  if (files && files.length > 0) {
    const fileNames = files.map(x => x.name);
    await supabaseAdmin.storage.from('audio').remove(fileNames);
  }

  console.log('Deleting bucket...');
  const { data, error } = await supabaseAdmin.storage.deleteBucket('audio');
  
  if (error) {
    console.error("Error deleting bucket:", error.message);
  } else {
    console.log("Audio bucket successfully deleted!");
  }
}

deleteAudioBucket();
