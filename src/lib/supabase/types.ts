export type Brand = 'bang-olufsen' | 'devialet' | 'loewe';

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          brand: Brand;
          slug: string;
          name: string;
          description_sq: string;
          description_en: string;
          category_sq: string;
          category_en: string;
          subcategory_sq: string | null;
          subcategory_en: string | null;
          base_price: number | null;
          is_contact_only: boolean;
          is_featured: boolean;
          sort_order: number;
          created_at: string;
          featured_image_url: string | null;
          tagline_en: string | null;
          tagline_sq: string | null;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      product_variants: {
        Row: {
          id: string;
          product_id: string;
          color_name: string;
          color_hex: string | null;
          price: number | null;
          image_url: string | null;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['product_variants']['Row'], 'id'> & { id?: string };
        Update: Partial<Database['public']['Tables']['product_variants']['Insert']>;
      };
      product_images: {
        Row: {
          id: string;
          product_id: string;
          variant_id: string | null;
          url: string;
          alt_text: string | null;
          is_hero: boolean;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['product_images']['Row'], 'id'> & { id?: string };
        Update: Partial<Database['public']['Tables']['product_images']['Insert']>;
      };
      product_specs: {
        Row: {
          id: string;
          product_id: string;
          spec_key_sq: string;
          spec_key_en: string;
          spec_value_sq: string;
          spec_value_en: string;
          sort_order: number;
        };
        Insert: Omit<Database['public']['Tables']['product_specs']['Row'], 'id'> & { id?: string };
        Update: Partial<Database['public']['Tables']['product_specs']['Insert']>;
      };
      site_content: {
        Row: {
          id: string;
          page: string;
          section: string;
          key: string;
          value_sq: string;
          value_en: string;
          media_url: string | null;
          media_type: 'image' | 'video' | null;
          sort_order: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          page: string;
          section: string;
          key: string;
          value_sq?: string;
          value_en?: string;
          media_url?: string | null;
          media_type?: 'image' | 'video' | null;
          sort_order?: number;
          updated_at?: string;
        };
        Update: {
          page?: string;
          section?: string;
          key?: string;
          value_sq?: string;
          value_en?: string;
          media_url?: string | null;
          media_type?: 'image' | 'video' | null;
          sort_order?: number;
        };
      };
      media: {
        Row: {
          id: string;
          url: string;
          filename: string;
          mime_type: string;
          size: number;
          alt_text: string | null;
          uploaded_at: string;
        };
        Insert: Omit<Database['public']['Tables']['media']['Row'], 'id' | 'uploaded_at'> & {
          id?: string;
          uploaded_at?: string;
        };
        Update: Partial<Database['public']['Tables']['media']['Insert']>;
      };
      brand_categories: {
        Row: {
          id: string;
          brand: string;
          category_en: string;
          category_sq: string;
          subcategory_en: string | null;
          subcategory_sq: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['brand_categories']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Database['public']['Tables']['brand_categories']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience types
export type Product = Database['public']['Tables']['products']['Row'];
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductUpdate = Database['public']['Tables']['products']['Update'];
export type ProductVariant = Database['public']['Tables']['product_variants']['Row'];
export type ProductVariantInsert = Database['public']['Tables']['product_variants']['Insert'];
export type ProductImage = Database['public']['Tables']['product_images']['Row'];
export type ProductImageInsert = Database['public']['Tables']['product_images']['Insert'];
export type ProductSpec = Database['public']['Tables']['product_specs']['Row'];
export type ProductSpecInsert = Database['public']['Tables']['product_specs']['Insert'];
export type SiteContent = Database['public']['Tables']['site_content']['Row'];
export type Media = Database['public']['Tables']['media']['Row'];
export type BrandCategory = Database['public']['Tables']['brand_categories']['Row'];

export interface ProductBadge {
  id: string;
  product_id: string;
  icon: string;
  text_en: string;
  text_sq: string;
  sort_order: number;
}

export interface ProductWithRelations extends Product {
  product_variants: ProductVariant[];
  product_images: ProductImage[];
  product_specs: ProductSpec[];
  product_badges?: ProductBadge[];
}
