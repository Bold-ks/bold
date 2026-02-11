export type Brand = 'bang-olufsen' | 'devialet' | 'loewe';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  brand: Brand;
  name: string;
  category: string;
  subcategory?: string;
  description: {
    sq: string;
    en: string;
  };
  price: number | null; // null = "Na kontaktoni"
  colors: ProductColor[];
  specs: Record<string, string>;
  featured?: boolean;
}

export interface BrandInfo {
  id: Brand;
  name: string;
  taglineKey: string;
  descriptionKey: string;
}
