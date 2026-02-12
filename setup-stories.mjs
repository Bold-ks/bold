const query = `
CREATE TABLE IF NOT EXISTS product_stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  headline_en TEXT,
  headline_sq TEXT,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(product_id)
);

CREATE TABLE IF NOT EXISTS product_story_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES product_stories(id) ON DELETE CASCADE,
  image_url TEXT,
  title_en TEXT,
  title_sq TEXT,
  description_en TEXT,
  description_sq TEXT,
  link_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE product_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_story_blocks ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'anon_read_stories') THEN
    CREATE POLICY anon_read_stories ON product_stories FOR SELECT TO anon USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'anon_read_story_blocks') THEN
    CREATE POLICY anon_read_story_blocks ON product_story_blocks FOR SELECT TO anon USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'service_all_stories') THEN
    CREATE POLICY service_all_stories ON product_stories FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'service_all_story_blocks') THEN
    CREATE POLICY service_all_story_blocks ON product_story_blocks FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
END $$;
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
