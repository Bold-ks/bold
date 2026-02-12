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
        return { images, specs, variants, badges };
      }
    } catch (e) {
      console.error('Failed to get images/specs from Supabase:', e);
    }
  }
  return { images: [], specs: [], variants: [], badges: [] };
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
    featured: p.is_featured,
    heroImage: p.product_images?.find((img) => img.is_hero)?.url,
    featuredImage: p.featured_image_url || undefined,
  };
}
