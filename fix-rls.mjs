const query = `
-- Add authenticated policies for product_stories
CREATE POLICY auth_insert_stories ON product_stories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY auth_update_stories ON product_stories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY auth_delete_stories ON product_stories FOR DELETE TO authenticated USING (true);
CREATE POLICY auth_read_stories ON product_stories FOR SELECT TO authenticated USING (true);

-- Add authenticated policies for product_story_blocks
CREATE POLICY auth_insert_story_blocks ON product_story_blocks FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY auth_update_story_blocks ON product_story_blocks FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY auth_delete_story_blocks ON product_story_blocks FOR DELETE TO authenticated USING (true);
CREATE POLICY auth_read_story_blocks ON product_story_blocks FOR SELECT TO authenticated USING (true);
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
