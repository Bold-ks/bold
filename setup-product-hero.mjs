const query = `
ALTER TABLE products ADD COLUMN IF NOT EXISTS hero_enabled BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS hero_media_url TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS hero_title_en TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS hero_title_sq TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS hero_subtitle_en TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS hero_subtitle_sq TEXT;
`;

const res = await fetch('https://api.supabase.com/v1/projects/faxrokxcygmqpxrvesoc/database/query', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sbp_15a03bbbe189556d71051541c9f5028d069e1f77',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query }),
});
console.log(await res.text());
