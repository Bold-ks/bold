const res = await fetch('https://api.supabase.com/v1/projects/faxrokxcygmqpxrvesoc/database/query', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sbp_15a03bbbe189556d71051541c9f5028d069e1f77',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: `ALTER TABLE products ADD COLUMN IF NOT EXISTS show_starting_at BOOLEAN DEFAULT true;` }),
});
console.log(await res.text());
