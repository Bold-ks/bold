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
    const req = https.request({ hostname: HOST, path, method, headers: { ...headers, ...(body ? {} : {}) } }, (res) => {
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
  // Step 1: Delete all existing site_content
  console.log('Deleting old site_content...');
  const del = await request('DELETE', '/rest/v1/site_content?id=neq.00000000-0000-0000-0000-000000000000');
  console.log('Delete:', del.status);

  // Step 2: Insert fresh content matching content editor keys
  const rows = [
    // Homepage hero
    { page: 'home', section: 'hero', key: 'hero-title', value_en: 'The art of sound', value_sq: 'Arti i tingullit', sort_order: 0 },
    { page: 'home', section: 'hero', key: 'hero-subtitle', value_en: 'Discover our curated collection of premium audio and visual technology', value_sq: 'Zbuloni koleksionin tonë të kuruar të teknologjisë premium audio dhe vizuale', sort_order: 1 },
    { page: 'home', section: 'hero', key: 'hero-cta', value_en: 'Explore more', value_sq: 'Eksploro më shumë', sort_order: 2 },
    { page: 'home', section: 'hero', key: 'hero-media', value_en: '', value_sq: '', sort_order: 3 },
    // Homepage brands
    { page: 'home', section: 'brands', key: 'brands-title', value_en: 'Our brands', value_sq: 'Brendet tona', sort_order: 4 },
    { page: 'home', section: 'brands', key: 'brands-subtitle', value_en: "Three of the world's most prestigious brands", value_sq: 'Tre brendet më prestigjioze në botë', sort_order: 5 },
    { page: 'home', section: 'brands', key: 'brands-bo-image', value_en: '', value_sq: '', sort_order: 6 },
    { page: 'home', section: 'brands', key: 'brands-devialet-image', value_en: '', value_sq: '', sort_order: 7 },
    { page: 'home', section: 'brands', key: 'brands-loewe-image', value_en: '', value_sq: '', sort_order: 8 },
    // Homepage CTA
    { page: 'home', section: 'cta', key: 'cta-title', value_en: 'Discover the collection', value_sq: 'Zbulo koleksionin', sort_order: 9 },
    { page: 'home', section: 'cta', key: 'cta-subtitle', value_en: 'Discover our curated collection of premium audio and visual technology', value_sq: 'Zbuloni koleksionin tonë të kuruar të teknologjisë premium audio dhe vizuale', sort_order: 10 },
    // B&O
    { page: 'bang-olufsen', section: 'hero', key: 'hero-title', value_en: 'Bang & Olufsen', value_sq: 'Bang & Olufsen', sort_order: 0 },
    { page: 'bang-olufsen', section: 'hero', key: 'hero-subtitle', value_en: 'Danish design. Extraordinary sound.', value_sq: 'Dizajn danez. Tingull i jashtëzakonshëm.', sort_order: 1 },
    { page: 'bang-olufsen', section: 'hero', key: 'hero-media', value_en: '', value_sq: '', sort_order: 2 },
    // Devialet
    { page: 'devialet', section: 'hero', key: 'hero-title', value_en: 'Devialet', value_sq: 'Devialet', sort_order: 0 },
    { page: 'devialet', section: 'hero', key: 'hero-subtitle', value_en: 'Sound engineering. Reinvented.', value_sq: 'Inxhinieri e zërit. E reinventuar.', sort_order: 1 },
    { page: 'devialet', section: 'hero', key: 'hero-media', value_en: '', value_sq: '', sort_order: 2 },
    // Loewe
    { page: 'loewe', section: 'hero', key: 'hero-title', value_en: 'Loewe', value_sq: 'Loewe', sort_order: 0 },
    { page: 'loewe', section: 'hero', key: 'hero-subtitle', value_en: 'Premium technology. German craftsmanship.', value_sq: 'Teknologji premium. Artizanat gjerman.', sort_order: 1 },
    { page: 'loewe', section: 'hero', key: 'hero-media', value_en: '', value_sq: '', sort_order: 2 },
    // About
    { page: 'about', section: 'hero', key: 'hero-title', value_en: 'About Bold', value_sq: 'Rreth Bold', sort_order: 0 },
    { page: 'about', section: 'hero', key: 'hero-subtitle', value_en: 'Your trusted partner for premium audio and visual technology in Kosovo', value_sq: 'Partneri juaj i besuar për teknologjinë premium audio dhe vizuale në Kosovë', sort_order: 1 },
    { page: 'about', section: 'hero', key: 'hero-media', value_en: '', value_sq: '', sort_order: 2 },
    { page: 'about', section: 'story', key: 'story-title', value_en: 'Our story', value_sq: 'Historia jonë', sort_order: 3 },
    { page: 'about', section: 'story', key: 'story-text', value_en: "Bold is Kosovo's premier destination for luxury audio and visual technology. We are the authorized retailer for three of the world's most prestigious brands: Bang & Olufsen, Devialet, and Loewe.\n\nOur mission is to bring world-class sound and visual experiences to Kosovo, offering expert guidance and personalized service to help you find the perfect products for your home and lifestyle.", value_sq: 'Bold është destinacioni kryesor i Kosovës për teknologjinë luksoze audio dhe vizuale. Ne jemi shitësi i autorizuar për tre nga brendet më prestigjioze në botë: Bang & Olufsen, Devialet, dhe Loewe.\n\nMisioni ynë është të sjellim përvojat audio dhe vizuale të klasit botëror në Kosovë, duke ofruar udhëzime eksperte dhe shërbim të personalizuar.', sort_order: 4 },
    // Footer
    { page: 'footer', section: 'footer', key: 'footer-description', value_en: 'Premium audio & visual technology in Kosovo', value_sq: 'Teknologji premium audio dhe vizuale në Kosovë', sort_order: 0 },
    { page: 'footer', section: 'footer', key: 'footer-address', value_en: 'Prishtina, Kosovo', value_sq: 'Prishtinë, Kosovë', sort_order: 1 },
    { page: 'footer', section: 'footer', key: 'footer-email', value_en: 'info@bold-ks.com', value_sq: 'info@bold-ks.com', sort_order: 2 },
    { page: 'footer', section: 'footer', key: 'footer-phone', value_en: '+383 44 000 000', value_sq: '+383 44 000 000', sort_order: 3 },
    // Social
    { page: 'footer', section: 'social', key: 'social-instagram', value_en: 'https://instagram.com/boldkosova', value_sq: 'https://instagram.com/boldkosova', sort_order: 4 },
    { page: 'footer', section: 'social', key: 'social-facebook', value_en: 'https://facebook.com/boldkosova', value_sq: 'https://facebook.com/boldkosova', sort_order: 5 },
    { page: 'footer', section: 'social', key: 'social-tiktok', value_en: 'https://tiktok.com/@boldkosova', value_sq: 'https://tiktok.com/@boldkosova', sort_order: 6 },
    { page: 'footer', section: 'social', key: 'social-youtube', value_en: 'https://youtube.com/@boldkosova', value_sq: 'https://youtube.com/@boldkosova', sort_order: 7 },
    // Contact
    { page: 'contact', section: 'info', key: 'info-address', value_en: 'Prishtina, Kosovo', value_sq: 'Prishtinë, Kosovë', sort_order: 0 },
    { page: 'contact', section: 'info', key: 'info-email', value_en: 'info@bold-ks.com', value_sq: 'info@bold-ks.com', sort_order: 1 },
    { page: 'contact', section: 'info', key: 'info-phone', value_en: '+383 44 000 000', value_sq: '+383 44 000 000', sort_order: 2 },
    { page: 'contact', section: 'info', key: 'info-hours', value_en: 'Mon-Sat: 10:00 - 20:00', value_sq: 'Hën-Sht: 10:00 - 20:00', sort_order: 3 },
  ];

  console.log(`Inserting ${rows.length} content rows...`);
  const ins = await request('POST', '/rest/v1/site_content', rows);
  console.log('Insert:', ins.status, ins.body || '(success)');
}

main().catch(console.error);
