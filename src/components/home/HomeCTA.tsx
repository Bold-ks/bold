'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Link } from '@/i18n/navigation';

export function HomeCTA() {
  const t = useTranslations();
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
          .eq('section', 'cta');

        if (data) {
          const vf = locale === 'sq' ? 'value_sq' : 'value_en';
          for (const item of data as Record<string, string | null>[]) {
            if (item.key === 'cta-title' && item[vf]) setTitle(item[vf]!);
            if (item.key === 'cta-subtitle' && item[vf]) setSubtitle(item[vf]!);
          }
        }
      } catch { /* fallback */ }
    }
    load();
  }, [locale]);

  return (
    <section className="py-16 md:py-32 bg-black text-white text-center px-4">
      <h2 className="text-2xl md:text-5xl font-light mb-4 md:mb-6">
        {title || t('home.discoverCollection')}
      </h2>
      <p className="text-warm-400 mb-8 md:mb-10 max-w-md mx-auto text-sm md:text-base">
        {subtitle || t('home.heroSubtitle')}
      </p>
      <Link
        href="/contact"
        className="inline-block border border-white px-8 md:px-10 py-3 text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
      >
        {t('common.contactUs')}
      </Link>
    </section>
  );
}
