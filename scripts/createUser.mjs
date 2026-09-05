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

async function setupAdmin() {
  const email = 'arkoprovatikader1998@gmail.com';
  const password = 'Arko@2026';

  console.log(`Setting up user: ${email}`);

  // 1. Try to create the user with email auto-confirm
  const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (createError) {
    if (createError.message.includes('already registered') || createError.message.includes('already exists')) {
      console.log('User already exists. Updating password and confirming email...');
      
      // We need the user ID to update them
      const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers();
      if (usersError) {
         console.error("Failed to list users:", usersError);
         process.exit(1);
      }
      
      const user = usersData.users.find(u => u.email === email);
      if (user) {
        const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
          password,
          email_confirm: true,
        });
        
        if (updateError) {
           console.error("Failed to update user:", updateError);
        } else {
           console.log("User successfully updated and confirmed!");
        }
      }
    } else {
      console.error("Error creating user:", createError.message);
    }
  } else {
    console.log("User successfully created and confirmed!");
  }
}

setupAdmin();
