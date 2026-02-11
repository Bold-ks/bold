'use client';

import { useState } from 'react';
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
  const [search, setSearch] = useState('');

  const query = search.toLowerCase().trim();
  const filtered = query
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description[locale as 'sq' | 'en'].toLowerCase().includes(query)
      )
    : products;

  // Group by category
  const categories = [...new Set(filtered.map((p) => p.category))];

  function getCategoryName(category: string): string {
    const trans = categoryTranslations[category];
    if (trans) {
      return locale === 'sq' ? trans.sq : trans.en;
    }
    return category.charAt(0).toUpperCase() + category.slice(1);
  }

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-12">
      {/* Search */}
      <div className="mb-10 md:mb-16 max-w-md">
        <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search') + '...'}
            className="w-full bg-warm-50 border border-warm-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-black text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-warm-500 text-center py-12">
          {locale === 'sq' ? 'Nuk u gjet asnjë produkt.' : 'No products found.'}
        </p>
      ) : (
        categories.map((category) => {
          const catProducts = filtered.filter((p) => p.category === category);
          return (
            <div key={category} className="mb-16 md:mb-20">
              <h2 className="text-xl md:text-3xl font-light mb-8 md:mb-10">
                {getCategoryName(category)}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                {catProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}
