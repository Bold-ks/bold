// Full database backup — all tables
const SUPABASE_URL = 'https://faxrokxcygmqpxrvesoc.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZheHJva3hjeWdtcXB4cnZlc29jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDgyOTM2NiwiZXhwIjoyMDg2NDA1MzY2fQ.riKd-UumHlIXM8YjqmcZ-d85WvMVAgtS2wkKX1Gd6Vk';
import { writeFileSync } from 'fs';

const tables = [
  'products',
  'product_variants',
  'product_images',
  'product_specs',
  'product_badges',
  'product_stories',
  'product_story_blocks',
  'site_content',
  'media',
  'brand_categories',
];

const dir = process.argv[2] || './backups/2026-02-14';
const backup = {};

for (const table of tables) {
  let allData = [];
  let offset = 0;
  const limit = 1000;
  
  while (true) {
    const url = `${SUPABASE_URL}/rest/v1/${table}?select=*&offset=${offset}&limit=${limit}`;
    const res = await fetch(url, {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
    });
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;
    allData = allData.concat(data);
    if (data.length < limit) break;
    offset += limit;
  }
  
  backup[table] = allData;
  console.log(`✓ ${table}: ${allData.length} rows`);
}

const filename = `${dir}/db-backup-${new Date().toISOString().slice(0,19).replace(/:/g,'-')}.json`;
writeFileSync(filename, JSON.stringify(backup, null, 2));
console.log(`\n✅ Full backup saved to ${filename}`);
console.log(`Total: ${Object.values(backup).reduce((sum, arr) => sum + arr.length, 0)} rows across ${tables.length} tables`);
