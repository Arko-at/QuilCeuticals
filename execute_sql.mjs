import postgres from 'postgres';
import fs from 'fs';

const sql = postgres('postgresql://postgres:SIdFgJonV1zkLBVK@db.kxvuasvtzssgarccjkzj.supabase.co:5432/postgres', {
  ssl: 'require' // SSL required for Supabase
});

async function run() {
  try {
    const schema = fs.readFileSync('supabase/schema.sql', 'utf-8');
    // postgres.js doesn't natively execute huge multi-statement SQL blocks via `sql` tagged template safely,
    // so we use unsafe
    await sql.unsafe(schema);
    console.log("Schema executed successfully!");
  } catch (err) {
    console.error("Error executing schema:", err);
  } finally {
    await sql.end();
  }
}

run();
