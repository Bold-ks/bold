import https from 'https';

const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZheHJva3hjeWdtcXB4cnZlc29jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDgyOTM2NiwiZXhwIjoyMDg2NDA1MzY2fQ.riKd-UumHlIXM8YjqmcZ-d85WvMVAgtS2wkKX1Gd6Vk';
const HOST = 'faxrokxcygmqpxrvesoc.supabase.co';
const headers = {
  'Content-Type': 'application/json',
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
  'Prefer': 'return=minimal',
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

// Map old lowercase categories to proper casing
const catMap = {
  'speakers': 'Speakers', 'altoparlantë': 'Altoparlantë',
  'headphones': 'Headphones', 'kufje': 'Kufje',
  'tv': 'TV', 'televizorë': 'Televizorë',
  'soundbar': 'Soundbar',
  'audio': 'Audio',
};

const subcatMap = {
  'home': 'Home', 'shtëpi': 'Shtëpi',
  'portable': 'Portable', 'portativ': 'Portativ',
  'outdoor': 'Outdoor',
  'phantom-i': 'Phantom I', 'phantom-ii': 'Phantom II',
  'we-see': 'We.SEE', 'we-beam': 'We.BEAM',
  'inspire': 'Inspire', 'stellar': 'Stellar', 'iconic': 'Iconic',
  'soundbars': 'Soundbars', 'multiroom': 'Multiroom', 'radio': 'Radio',
};

async function main() {
  // Get all products
  const res = await request('GET', '/rest/v1/products?select=id,category_en,category_sq,subcategory_en,subcategory_sq');
  const products = JSON.parse(res.body);
  
  let updated = 0;
  for (const p of products) {
    const newCatEn = catMap[p.category_en.toLowerCase()] || p.category_en;
    const newCatSq = catMap[p.category_sq.toLowerCase()] || p.category_sq;
    const newSubEn = p.subcategory_en ? (subcatMap[p.subcategory_en.toLowerCase()] || p.subcategory_en) : null;
    const newSubSq = p.subcategory_sq ? (subcatMap[p.subcategory_sq.toLowerCase()] || p.subcategory_sq) : null;
    
    if (newCatEn !== p.category_en || newCatSq !== p.category_sq || newSubEn !== p.subcategory_en || newSubSq !== p.subcategory_sq) {
      await request('PATCH', `/rest/v1/products?id=eq.${p.id}`, {
        category_en: newCatEn,
        category_sq: newCatSq,
        subcategory_en: newSubEn,
        subcategory_sq: newSubSq,
      });
      updated++;
      console.log(`Updated: ${p.category_en} → ${newCatEn}, ${p.subcategory_en || '-'} → ${newSubEn || '-'}`);
    }
  }
  console.log(`Done. Updated ${updated}/${products.length} products.`);
}

main().catch(console.error);
