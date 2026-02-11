'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Product } from '@/data/types';
import { ProductCard } from '@/components/ui/ProductCard';

const categoryTranslations: Record<string, { en: string; sq: string }> = {
  speakers: { en: 'Speakers', sq: 'Altoparlantë' },
  headphones: { en: 'Headphones', sq: 'Dëgjuese' },
  tv: { en: 'Televisions', sq: 'Televizorë' },
  soundbar: { en: 'Soundbars', sq: 'Soundbar' },
  accessories: { en: 'Accessories', sq: 'Aksesorë' },
  audio: { en: 'Audio', sq: 'Audio' },
  portable: { en: 'Portable Speakers', sq: 'Altoparlantë të lëvizshëm' },
  earbuds: { en: 'Earbuds', sq: 'Dëgjuese' },
  multiroom: { en: 'Multiroom', sq: 'Multiroom' },
  'home-theater': { en: 'Home Theater', sq: 'Home Theater' },
  radio: { en: 'Radio', sq: 'Radio' },
  'bluetooth-speakers': { en: 'Bluetooth Speakers', sq: 'Bluetooth Altoparlantë' },
  amplifiers: { en: 'Amplifiers', sq: 'Amplifikatorë' },
};

export function ProductGrid({
  products,
  brandName,
}: {
  products: Product[];
  brandName: string;
}) {
  const t = useTranslations('common');
  const locale = useLocale();

  // Group by category
  const categories = [...new Set(products.map((p) => p.category))];

  function getCategoryName(category: string): string {
    const trans = categoryTranslations[category];
    if (trans) {
      return locale === 'sq' ? trans.sq : trans.en;
    }
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      {categories.map((category) => {
        const catProducts = products.filter((p) => p.category === category);
        return (
          <div key={category} className="mb-20">
            <h2 className="text-2xl md:text-3xl font-light mb-10">
              {getCategoryName(category)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {catProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
