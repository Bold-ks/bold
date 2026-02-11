-- Bold Kosova Database Schema
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand TEXT NOT NULL CHECK (brand IN ('bang-olufsen', 'devialet', 'loewe')),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description_sq TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  category_sq TEXT NOT NULL DEFAULT '',
  category_en TEXT NOT NULL DEFAULT '',
  subcategory_sq TEXT,
  subcategory_en TEXT,
  base_price NUMERIC,
  is_contact_only BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Product variants (colors)
CREATE TABLE IF NOT EXISTS product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  color_name TEXT NOT NULL,
  color_hex TEXT,
  price NUMERIC,
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Product images
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  is_hero BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Product specs
CREATE TABLE IF NOT EXISTS product_specs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  spec_key_sq TEXT NOT NULL,
  spec_key_en TEXT NOT NULL,
  spec_value_sq TEXT NOT NULL,
  spec_value_en TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Site content
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value_sq TEXT NOT NULL DEFAULT '',
  value_en TEXT NOT NULL DEFAULT '',
  media_url TEXT,
  media_type TEXT CHECK (media_type IN ('image', 'video') OR media_type IS NULL),
  sort_order INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(page, section, key)
);

-- Media library
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL DEFAULT 0,
  alt_text TEXT,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_product_variants_product ON product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_product_specs_product ON product_specs(product_id);
CREATE INDEX IF NOT EXISTS idx_site_content_page ON site_content(page);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read variants" ON product_variants FOR SELECT USING (true);
CREATE POLICY "Public read images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Public read specs" ON product_specs FOR SELECT USING (true);
CREATE POLICY "Public read content" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public read media" ON media FOR SELECT USING (true);

-- Authenticated write access
CREATE POLICY "Auth insert products" ON products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update products" ON products FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete products" ON products FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert variants" ON product_variants FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update variants" ON product_variants FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete variants" ON product_variants FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert images" ON product_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update images" ON product_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete images" ON product_images FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert specs" ON product_specs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update specs" ON product_specs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete specs" ON product_specs FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert content" ON site_content FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update content" ON site_content FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete content" ON site_content FOR DELETE TO authenticated USING (true);

CREATE POLICY "Auth insert media" ON media FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth update media" ON media FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete media" ON media FOR DELETE TO authenticated USING (true);

-- Storage buckets (run these separately if needed)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('products', 'products', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('site', 'site', true);
