import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database, ProductWithRelations, Brand } from './types';

async function getSupabase() {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    }
  );
}

export async function getProducts(): Promise<ProductWithRelations[]> {
  const supabase = await getSupabase();
  const { data } = await supabase
    .from('products')
    .select('*, product_variants(*), product_images(*), product_specs(*)')
    .order('sort_order');
  return (data as ProductWithRelations[]) || [];
}

export async function getProductsByBrand(brand: Brand): Promise<ProductWithRelations[]> {
  const supabase = await getSupabase();
  const { data } = await supabase
    .from('products')
    .select('*, product_variants(*), product_images(*), product_specs(*)')
    .eq('brand', brand)
    .order('sort_order');
  return (data as ProductWithRelations[]) || [];
}

export async function getProductBySlug(slug: string): Promise<ProductWithRelations | null> {
  const supabase = await getSupabase();
  const { data } = await supabase
    .from('products')
    .select('*, product_variants(*), product_images(*), product_specs(*), product_badges(*)')
    .eq('slug', slug)
    .single();
  return data ? (data as unknown as ProductWithRelations) : null;
}

export async function getFeaturedProducts(): Promise<ProductWithRelations[]> {
  const supabase = await getSupabase();
  const { data } = await supabase
    .from('products')
    .select('*, product_variants(*), product_images(*), product_specs(*)')
    .eq('is_featured', true)
    .order('sort_order');
  return (data as ProductWithRelations[]) || [];
}

export async function getSiteContent(page: string) {
  const supabase = await getSupabase();
  const { data } = await supabase
    .from('site_content')
    .select('*')
    .eq('page', page)
    .order('sort_order');
  return data || [];
}

export async function getSettings() {
  const supabase = await getSupabase();
  const { data } = await supabase
    .from('site_content')
    .select('*')
    .eq('page', 'settings');
  return data || [];
}
