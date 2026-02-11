'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Product } from '@/data/types';
import { ProductCard } from '@/components/ui/ProductCard';

export function SearchResults({ products }: { products: Product[] }) {
  const t = useTranslations('common');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [search, setSearch] = useState(initialQuery);

  useEffect(() => {
    setSearch(searchParams.get('q') || '');
  }, [searchParams]);

  const query = search.toLowerCase().trim();
  const filtered = query
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description[locale as 'sq' | 'en'].toLowerCase().includes(query)
      )
    : [];

  return (
    <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-12">
      <h1 className="text-3xl md:text-5xl font-light mb-8">{t('search')}</h1>
      <div className="max-w-md mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('search') + '...'}
          className="w-full bg-warm-50 border border-warm-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
          autoFocus
        />
      </div>
      {query ? (
        filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-warm-500 py-12">
            {locale === 'sq' ? 'Nuk u gjet asnjë produkt.' : 'No products found.'}
          </p>
        )
      ) : (
        <p className="text-warm-500">
          {locale === 'sq' ? 'Shkruani për të kërkuar...' : 'Start typing to search...'}
        </p>
      )}
    </section>
  );
}
