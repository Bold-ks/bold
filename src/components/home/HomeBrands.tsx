'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BrandShowcase } from './BrandShowcase';
import type { BrandInfo } from '@/data/types';

export function HomeBrands({ brands }: { brands: BrandInfo[] }) {
  const t = useTranslations('home');
  const locale = useLocale();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('site_content')
          .select('*')
          .eq('page', 'home')
          .eq('section', 'brands');

        if (data) {
          const vf = locale === 'sq' ? 'value_sq' : 'value_en';
          for (const item of data as Record<string, string | null>[]) {
            if (item.key === 'brands-title' && item[vf]) setTitle(item[vf]!);
            if (item.key === 'brands-subtitle' && item[vf]) setSubtitle(item[vf]!);
          }
        }
      } catch { /* fallback */ }
    }
    load();
  }, [locale]);

  return (
    <section className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <h2 className="text-2xl md:text-5xl font-light text-center mb-3 md:mb-4">
          {title || t('brandsTitle')}
        </h2>
        <p className="text-warm-500 text-center mb-10 md:mb-16 max-w-md mx-auto text-sm md:text-base">
          {subtitle || t('brandsSubtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {brands.map((brand) => (
            <BrandShowcase key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
