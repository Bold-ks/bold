'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { BrandInfo } from '@/data/types';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

export function BrandHero({ brand }: { brand: BrandInfo }) {
  const t = useTranslations();
  const locale = useLocale();
  const [hero, setHero] = useState<{ title?: string; subtitle?: string; mediaUrl?: string; mediaType?: string }>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadHero() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('site_content')
          .select('*')
          .eq('page', brand.id)
          .eq('section', 'hero');

        if (data && data.length > 0) {
          const vf = locale === 'sq' ? 'value_sq' : 'value_en';
          const content: typeof hero = {};
          for (const item of data as Record<string, string | null>[]) {
            if (item.key === 'hero-title' && item[vf]) content.title = item[vf]!;
            if (item.key === 'hero-subtitle' && item[vf]) content.subtitle = item[vf]!;
            if (item.key === 'hero-media' && item.media_url) {
              content.mediaUrl = item.media_url;
              content.mediaType = item.media_type || undefined;
            }
          }
          setHero(content);
        }
      } catch {
        // fallback
      }
      setLoaded(true);
    }
    loadHero();
  }, [brand.id, locale]);

  const title = hero.title || brand.name;
  const subtitle = hero.subtitle || t(brand.taglineKey);
  const hasMedia = !!hero.mediaUrl;
  const isVideo = hero.mediaType === 'video';
  const isDark = hasMedia;

  return (
    <section className="relative h-[70vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      {hasMedia ? (
        isVideo ? (
          <>
            <video
              src={hero.mediaUrl}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="bg-video absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-[1]" />
          </>
        ) : (
          <Image
            src={hero.mediaUrl!}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )
      ) : (
        <div className="absolute inset-0 bg-warm-50" />
      )}

      {hasMedia && <div className="absolute inset-0 bg-black/30" />}

      <div className={`relative z-10 text-center px-4 md:px-6 ${!loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`text-3xl md:text-7xl font-light tracking-tight mb-4 ${isDark ? 'text-white' : 'text-black'}`}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-base md:text-xl ${isDark ? 'text-white/80' : 'text-warm-500'}`}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
