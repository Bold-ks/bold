/**
 * Unified data layer that reads from Supabase when configured,
 * falls back to static TypeScript data files when not.
 */
import {
  products as staticProducts,
  getProductsByBrand as staticGetByBrand,
  getProductBySlug as staticGetBySlug,
  getFeaturedProducts as staticGetFeatured,
} from '@/data/products';
import { brands as staticBrands, getBrand as staticGetBrand } from '@/data/brands';
import type { Product as StaticProduct, BrandInfo } from '@/data/types';

// Check if Supabase is configured
const isSupabaseConfigured =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  process.env.NEXT_PUBLIC_SUPABASE_URL !== 'PLACEHOLDER';

// Re-export static types for compatibility
export type { StaticProduct, BrandInfo };

export function getBrand(id: string): BrandInfo | undefined {
  return staticGetBrand(id);
}

export const brands = staticBrands;

export async function getProductsByBrand(brand: string): Promise<StaticProduct[]> {
  if (isSupabaseConfigured) {
    try {
      const { getProductsByBrand: sbGetByBrand } = await import('@/lib/supabase/queries');
      const products = await sbGetByBrand(brand as 'bang-olufsen' | 'devialet' | 'loewe');
      return products.map(mapSupabaseProduct);
    } catch (e) {
      console.error('Supabase fetch failed, using static data:', e);
    }
  }
  return staticGetByBrand(brand);
}

export async function getProductBySlug(slug: string): Promise<StaticProduct | undefined> {
  if (isSupabaseConfigured) {
    try {
      const { getProductBySlug: sbGetBySlug } = await import('@/lib/supabase/queries');
      const product = await sbGetBySlug(slug);
      if (product) return mapSupabaseProduct(product);
    } catch (e) {
      console.error('Supabase fetch failed, using static data:', e);
    }
  }
  return staticGetBySlug(slug);
}

export async function getFeaturedProducts(): Promise<StaticProduct[]> {
  if (isSupabaseConfigured) {
    try {
      const { getFeaturedProducts: sbGetFeatured } = await import('@/lib/supabase/queries');
      const products = await sbGetFeatured();
      return products.map(mapSupabaseProduct);
    } catch (e) {
      console.error('Supabase fetch failed, using static data:', e);
    }
  }
  return staticGetFeatured();
}

export function getAllProducts(): StaticProduct[] {
  return staticProducts;
}

export async function getProductImagesAndSpecs(slug: string): Promise<{
  images: { url: string; alt_text?: string | null; is_hero?: boolean; variant_id?: string | null }[];
  specs: { spec_key_sq: string; spec_key_en: string; spec_value_sq: string; spec_value_en: string }[];
  variants: { id: string; color_name: string; color_hex: string | null; price: number | null }[];
  badges: { icon: string; text_en: string; text_sq: string; sort_order: number }[];
  tagline_en: string | null;
  tagline_sq: string | null;
  productId: string | null;
  hero: {
    enabled: boolean;
    media_url: string | null;
    title_en: string | null;
    title_sq: string | null;
    subtitle_en: string | null;
    subtitle_sq: string | null;
  } | null;
}> {
  if (isSupabaseConfigured) {
    try {
      const { getProductBySlug: sbGetBySlug } = await import('@/lib/supabase/queries');
      const product = await sbGetBySlug(slug);
      if (product) {
        const images = (product.product_images || [])
          .sort((a: { sort_order: number; is_hero: boolean }, b: { sort_order: number; is_hero: boolean }) => {
            if (a.is_hero && !b.is_hero) return -1;
            if (!a.is_hero && b.is_hero) return 1;
            return a.sort_order - b.sort_order;
          })
          .map((img: { url: string; alt_text?: string | null; is_hero: boolean; variant_id?: string | null }) => ({
            url: img.url,
            alt_text: img.alt_text,
            is_hero: img.is_hero,
            variant_id: img.variant_id || null,
          }));
        const specs = (product.product_specs || [])
          .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
          .map((s: { spec_key_sq: string; spec_key_en: string; spec_value_sq: string; spec_value_en: string }) => ({
            spec_key_sq: s.spec_key_sq,
            spec_key_en: s.spec_key_en,
            spec_value_sq: s.spec_value_sq,
            spec_value_en: s.spec_value_en,
          }));
        const variants = (product.product_variants || [])
          .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
          .map((v: { id: string; color_name: string; color_hex: string | null; price: number | null }) => ({
            id: v.id,
            color_name: v.color_name,
            color_hex: v.color_hex,
            price: v.price,
          }));
        const badges = (product.product_badges || [])
          .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
          .map((b: { icon: string; text_en: string; text_sq: string; sort_order: number }) => ({
            icon: b.icon,
            text_en: b.text_en,
            text_sq: b.text_sq,
            sort_order: b.sort_order,
          }));
        const tagline_en = (product as unknown as Record<string, unknown>).tagline_en as string | null;
        const tagline_sq = (product as unknown as Record<string, unknown>).tagline_sq as string | null;
        const productId = (product as unknown as Record<string, unknown>).id as string;
        const p = product as unknown as Record<string, unknown>;
        const hero = p.hero_enabled ? {
          enabled: true,
          media_url: (p.hero_media_url as string) || null,
          title_en: (p.hero_title_en as string) || null,
          title_sq: (p.hero_title_sq as string) || null,
          subtitle_en: (p.hero_subtitle_en as string) || null,
          subtitle_sq: (p.hero_subtitle_sq as string) || null,
        } : null;
        return { images, specs, variants, badges, tagline_en, tagline_sq, productId, hero };
      }
    } catch (e) {
      console.error('Failed to get images/specs from Supabase:', e);
    }
  }
  return { images: [], specs: [], variants: [], badges: [], tagline_en: null, tagline_sq: null, productId: null, hero: null };
}

export interface StoryBlock {
  id: string;
  image_url: string | null;
  title_en: string | null;
  title_sq: string | null;
  description_en: string | null;
  description_sq: string | null;
  link_url: string | null;
  sort_order: number;
}

export interface ProductStory {
  id: string;
  headline_en: string | null;
  headline_sq: string | null;
  enabled: boolean;
  blocks: StoryBlock[];
}

export async function getProductStory(productId: string): Promise<ProductStory | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: story } = await supabase
      .from('product_stories')
      .select('*')
      .eq('product_id', productId)
      .single();
    if (!story || !story.enabled) return null;

    const { data: blocks } = await supabase
      .from('product_story_blocks')
      .select('*')
      .eq('story_id', story.id)
      .order('sort_order');

    return {
      id: story.id,
      headline_en: story.headline_en,
      headline_sq: story.headline_sq,
      enabled: story.enabled,
      blocks: (blocks || []) as StoryBlock[],
    };
  } catch (e) {
    console.error('Failed to get product story:', e);
    return null;
  }
}

// Map Supabase product to static product shape for backwards compatibility
function mapSupabaseProduct(p: {
  slug: string;
  brand: string;
  name: string;
  description_sq: string;
  description_en: string;
  category_en: string;
  subcategory_en?: string | null;
  base_price?: number | null;
  is_featured?: boolean;
  is_contact_only?: boolean;
  product_variants?: Array<{ color_name: string; color_hex: string | null }>;
  product_specs?: Array<{ spec_key_sq: string; spec_value_sq: string }>;
  product_images?: Array<{ url: string; is_hero: boolean }>;
  featured_image_url?: string | null;
  tagline_en?: string | null;
  tagline_sq?: string | null;
}): StaticProduct {
  const specs: Record<string, string> = {};
  p.product_specs?.forEach((s) => {
    specs[s.spec_key_sq] = s.spec_value_sq;
  });

  return {
    id: p.slug,
    slug: p.slug,
    brand: p.brand as StaticProduct['brand'],
    name: p.name,
    category: p.category_en,
    subcategory: p.subcategory_en || undefined,
    description: {
      sq: p.description_sq,
      en: p.description_en,
    },
    price: p.is_contact_only ? null : (p.base_price ?? null),
    colors: (p.product_variants || []).map((v) => ({
      name: v.color_name,
      hex: v.color_hex || '#000000',
    })),
    specs,
    tagline: p.tagline_en || p.tagline_sq ? { en: p.tagline_en || '', sq: p.tagline_sq || '' } : undefined,
    featured: p.is_featured,
    heroImage: p.product_images?.find((img) => img.is_hero)?.url,
    featuredImage: p.featured_image_url || undefined,
  };
}
