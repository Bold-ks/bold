import { createClient } from '@supabase/supabase-js';
const sb = createClient('https://faxrokxcygmqpxrvesoc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZheHJva3hjeWdtcXB4cnZlc29jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDgyOTM2NiwiZXhwIjoyMDg2NDA1MzY2fQ.riKd-UumHlIXM8YjqmcZ-d85WvMVAgtS2wkKX1Gd6Vk');

const rows = [
  { page:'footer', section:'footer', key:'footer-description', value_en:'Premium audio & visual technology in Kosovo', value_sq:'Teknologji premium audio dhe vizuale në Kosovë', sort_order:0 },
  { page:'footer', section:'footer', key:'footer-address', value_en:'Prishtina, Kosovo', value_sq:'Prishtinë, Kosovë', sort_order:1 },
  { page:'footer', section:'footer', key:'footer-email', value_en:'info@bold-ks.com', value_sq:'info@bold-ks.com', sort_order:2 },
  { page:'footer', section:'social', key:'social-instagram', value_en:'https://instagram.com/boldkosova', value_sq:'', sort_order:10 },
  { page:'footer', section:'social', key:'social-facebook', value_en:'https://facebook.com/boldkosova', value_sq:'', sort_order:11 },
  { page:'about', section:'story', key:'story-title', value_en:'Our Story', value_sq:'Historia jonë', sort_order:0 },
  { page:'about', section:'story', key:'story-text', value_en:"Bold is Kosovo's premier destination for luxury audio and visual technology. We are the authorized retailer for three of the world's most prestigious brands: Bang & Olufsen, Devialet, and Loewe.\n\nOur mission is to bring world-class sound and visual experiences to Kosovo, offering expert guidance and personalized service to help you find the perfect products for your home and lifestyle.", value_sq:"Bold është destinacioni kryesor i Kosovës për teknologjinë luksoze audio dhe vizuale. Ne jemi shitësi i autorizuar për tre nga brendet më prestigjioze në botë: Bang & Olufsen, Devialet, dhe Loewe.\n\nMisioni ynë është të sjellim përvojat audio dhe vizuale të klasit botëror në Kosovë, duke ofruar udhëzime eksperte dhe shërbim të personalizuar.", sort_order:1 },
];

for (const row of rows) {
  // Check if exists first
  const { data: existing } = await sb.from('site_content').select('id').eq('key', row.key).maybeSingle();
  if (existing) { console.log('SKIP (exists):', row.key); continue; }
  const { error } = await sb.from('site_content').insert(row);
  if (error) console.log('Error for', row.key, error.message);
  else console.log('OK:', row.key);
}
