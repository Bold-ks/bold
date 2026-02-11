'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export function AboutContent() {
  const t = useTranslations('about');
  const locale = useLocale();
  const [storyTitle, setStoryTitle] = useState('');
  const [storyText, setStoryText] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('site_content')
          .select('*')
          .eq('page', 'about')
          .eq('section', 'story');

        if (data) {
          const vf = locale === 'sq' ? 'value_sq' : 'value_en';
          for (const item of data as Record<string, string | null>[]) {
            if (item.key === 'story-title' && item[vf]) setStoryTitle(item[vf]!);
            if (item.key === 'story-text' && item[vf]) setStoryText(item[vf]!);
          }
        }
      } catch { /* fallback */ }
    }
    load();
  }, [locale]);

  const defaultStoryEn = `Bold is Kosovo's premier destination for luxury audio and visual technology. We are the authorized retailer for three of the world's most prestigious brands: Bang & Olufsen, Devialet, and Loewe.\n\nOur mission is to bring world-class sound and visual experiences to Kosovo, offering expert guidance and personalized service to help you find the perfect products for your home and lifestyle.`;
  const defaultStorySq = `Bold është destinacioni kryesor i Kosovës për teknologjinë luksoze audio dhe vizuale. Ne jemi shitësi i autorizuar për tre nga brendet më prestigjioze në botë: Bang & Olufsen, Devialet, dhe Loewe.\n\nMisioni ynë është të sjellim përvojat audio dhe vizuale të klasit botëror në Kosovë, duke ofruar udhëzime eksperte dhe shërbim të personalizuar.`;

  const title = storyTitle || t('story');
  const text = storyText || (locale === 'sq' ? defaultStorySq : defaultStoryEn);

  return (
    <section className="py-16 md:py-32 max-w-3xl mx-auto px-4 md:px-12">
      <h2 className="text-2xl md:text-3xl font-light mb-8">{title}</h2>
      <div className="text-warm-600 leading-relaxed space-y-6">
        {text.split('\n').filter(Boolean).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </section>
  );
}
