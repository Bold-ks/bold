import https from 'https';

const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZheHJva3hjeWdtcXB4cnZlc29jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDgyOTM2NiwiZXhwIjoyMDg2NDA1MzY2fQ.riKd-UumHlIXM8YjqmcZ-d85WvMVAgtS2wkKX1Gd6Vk';
const HOST = 'faxrokxcygmqpxrvesoc.supabase.co';
const headers = {
  'Content-Type': 'application/json',
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
};

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname: HOST, path, method, headers }, (res) => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => resolve({ status: res.statusCode, body: b }));
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  // Create brand_categories table
  console.log('Creating brand_categories table...');
  const createSQL = `
    CREATE TABLE IF NOT EXISTS brand_categories (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      brand TEXT NOT NULL,
      category_en TEXT NOT NULL,
      category_sq TEXT NOT NULL,
      subcategory_en TEXT,
      subcategory_sq TEXT,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT now()
    );
    ALTER TABLE brand_categories ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Public read" ON brand_categories FOR SELECT USING (true);
    CREATE POLICY "Service write" ON brand_categories FOR ALL USING (true);
  `;
  
  const sqlRes = await request('POST', '/rest/v1/rpc/exec_sql', { query: createSQL });
  // If rpc doesn't exist, use management API
  if (sqlRes.status === 404) {
    const mgmtRes = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'api.supabase.com',
        path: '/v1/projects/faxrokxcygmqpxrvesoc/database/query',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer sbp_15a03bbbe189556d71051541c9f5028d069e1f77' }
      }, (res) => {
        let b = '';
        res.on('data', d => b += d);
        res.on('end', () => resolve({ status: res.statusCode, body: b }));
      });
      req.on('error', reject);
      req.write(JSON.stringify({ query: createSQL }));
      req.end();
    });
    console.log('Migration:', mgmtRes.status);
  } else {
    console.log('Migration:', sqlRes.status);
  }

  // Seed categories
  const categories = [
    // Bang & Olufsen
    { brand: 'bang-olufsen', category_en: 'Speakers', category_sq: 'Altoparlantë', subcategory_en: null, subcategory_sq: null, sort_order: 0 },
    { brand: 'bang-olufsen', category_en: 'Speakers', category_sq: 'Altoparlantë', subcategory_en: 'Home', subcategory_sq: 'Shtëpi', sort_order: 1 },
    { brand: 'bang-olufsen', category_en: 'Speakers', category_sq: 'Altoparlantë', subcategory_en: 'Portable', subcategory_sq: 'Portativ', sort_order: 2 },
    { brand: 'bang-olufsen', category_en: 'Speakers', category_sq: 'Altoparlantë', subcategory_en: 'Outdoor', subcategory_sq: 'Outdoor', sort_order: 3 },
    { brand: 'bang-olufsen', category_en: 'Headphones', category_sq: 'Kufje', subcategory_en: null, subcategory_sq: null, sort_order: 4 },
    { brand: 'bang-olufsen', category_en: 'TV', category_sq: 'Televizorë', subcategory_en: null, subcategory_sq: null, sort_order: 5 },
    { brand: 'bang-olufsen', category_en: 'Soundbar', category_sq: 'Soundbar', subcategory_en: null, subcategory_sq: null, sort_order: 6 },
    // Devialet
    { brand: 'devialet', category_en: 'Speakers', category_sq: 'Altoparlantë', subcategory_en: null, subcategory_sq: null, sort_order: 0 },
    { brand: 'devialet', category_en: 'Speakers', category_sq: 'Altoparlantë', subcategory_en: 'Phantom I', subcategory_sq: 'Phantom I', sort_order: 1 },
    { brand: 'devialet', category_en: 'Speakers', category_sq: 'Altoparlantë', subcategory_en: 'Phantom II', subcategory_sq: 'Phantom II', sort_order: 2 },
    { brand: 'devialet', category_en: 'Speakers', category_sq: 'Altoparlantë', subcategory_en: 'Portable', subcategory_sq: 'Portativ', sort_order: 3 },
    { brand: 'devialet', category_en: 'Headphones', category_sq: 'Kufje', subcategory_en: null, subcategory_sq: null, sort_order: 4 },
    { brand: 'devialet', category_en: 'Soundbar', category_sq: 'Soundbar', subcategory_en: null, subcategory_sq: null, sort_order: 5 },
    // Loewe
    { brand: 'loewe', category_en: 'TV', category_sq: 'Televizorë', subcategory_en: null, subcategory_sq: null, sort_order: 0 },
    { brand: 'loewe', category_en: 'TV', category_sq: 'Televizorë', subcategory_en: 'We.SEE', subcategory_sq: 'We.SEE', sort_order: 1 },
    { brand: 'loewe', category_en: 'TV', category_sq: 'Televizorë', subcategory_en: 'We.BEAM', subcategory_sq: 'We.BEAM', sort_order: 2 },
    { brand: 'loewe', category_en: 'TV', category_sq: 'Televizorë', subcategory_en: 'Inspire', subcategory_sq: 'Inspire', sort_order: 3 },
    { brand: 'loewe', category_en: 'TV', category_sq: 'Televizorë', subcategory_en: 'Stellar', subcategory_sq: 'Stellar', sort_order: 4 },
    { brand: 'loewe', category_en: 'TV', category_sq: 'Televizorë', subcategory_en: 'Iconic', subcategory_sq: 'Iconic', sort_order: 5 },
    { brand: 'loewe', category_en: 'Audio', category_sq: 'Audio', subcategory_en: null, subcategory_sq: null, sort_order: 6 },
    { brand: 'loewe', category_en: 'Audio', category_sq: 'Audio', subcategory_en: 'Soundbars', subcategory_sq: 'Soundbars', sort_order: 7 },
    { brand: 'loewe', category_en: 'Audio', category_sq: 'Audio', subcategory_en: 'Multiroom', subcategory_sq: 'Multiroom', sort_order: 8 },
    { brand: 'loewe', category_en: 'Audio', category_sq: 'Audio', subcategory_en: 'Radio', subcategory_sq: 'Radio', sort_order: 9 },
  ];

  console.log(`Inserting ${categories.length} categories...`);
  const res = await request('POST', '/rest/v1/brand_categories', categories);
  console.log('Insert:', res.status, res.body || '(success)');
}

main().catch(console.error);
