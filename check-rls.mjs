const res = await fetch('https://api.supabase.com/v1/projects/faxrokxcygmqpxrvesoc/database/query', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sbp_15a03bbbe189556d71051541c9f5028d069e1f77',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: "SELECT tablename,policyname,roles,cmd FROM pg_policies WHERE schemaname='public' ORDER BY tablename,policyname" }),
});
const d = await res.json();
console.log(JSON.stringify(d, null, 2));
