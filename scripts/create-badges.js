const https = require('https');

const query = `
CREATE TABLE IF NOT EXISTS product_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  icon TEXT NOT NULL DEFAULT 'star',
  text_en TEXT NOT NULL,
  text_sq TEXT NOT NULL,
  sort_order INT DEFAULT 0
);
ALTER TABLE product_badges ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  CREATE POLICY "Public read badges" ON product_badges FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  CREATE POLICY "Service write badges" ON product_badges FOR ALL USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
`;

const data = JSON.stringify({ query });
const req = https.request({
  hostname: 'api.supabase.com',
  path: '/v1/projects/faxrokxcygmqpxrvesoc/database/query',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sbp_15a03bbbe189556d71051541c9f5028d069e1f77',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
}, res => {
  let b = '';
  res.on('data', c => b += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body:', b);
  });
});
req.write(data);
req.end();
