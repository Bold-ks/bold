const https = require('https');

const query = `
INSERT INTO product_badges (product_id, icon, text_en, text_sq, sort_order)
SELECT p.id, b.icon, b.text_en, b.text_sq, b.sort_order
FROM products p
CROSS JOIN (VALUES
  ('tools', 'Home Installation', 'Instalim në shtëpi', 0),
  ('phone', '24/7 Customer Service', 'Shërbim 24/7', 1),
  ('shield', 'Up to 3 years'' warranty', 'Deri në 3 vjet garanci', 2)
) AS b(icon, text_en, text_sq, sort_order)
WHERE NOT EXISTS (
  SELECT 1 FROM product_badges pb WHERE pb.product_id = p.id
);
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
  res.on('end', () => console.log('Status:', res.statusCode, 'Body:', b));
});
req.write(data);
req.end();
