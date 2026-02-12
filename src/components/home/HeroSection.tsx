'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

interface HeroContent {
  title?: string;
  subtitle?: string;
  cta?: string;
  mediaUrl?: string;
  mediaType?: string;
}

export function HeroSection() {
  const t = useTranslations('home');
  const locale = useLocale();
  const [hero, setHero] = useState<HeroContent>({});
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function loadHero() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('site_content')
          .select('*')
          .eq('page', 'home')
          .eq('section', 'hero');

        if (data && data.length > 0) {
          const valueField = locale === 'sq' ? 'value_sq' : 'value_en';
          const content: HeroContent = {};

          for (const item of data as Record<string, string | null>[]) {
            if (item.key === 'hero-title' && item[valueField]) content.title = item[valueField];
            if (item.key === 'hero-subtitle' && item[valueField]) content.subtitle = item[valueField];
            if (item.key === 'hero-cta' && item[valueField]) content.cta = item[valueField];
            if (item.key === 'hero-media' && item.media_url) {
              content.mediaUrl = item.media_url;
              content.mediaType = item.media_type || undefined;
            }
          }
          setHero(content);
        }
      } catch {
        // Fall back to translations
      }
      setLoaded(true);
    }
    loadHero();
  }, [locale]);

  // Force autoplay on iOS Safari — it may pause despite attributes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, [hero.mediaUrl]);

  const title = hero.title || t('heroTitle');
  const subtitle = hero.subtitle || t('heroSubtitle');
  const cta = hero.cta || t('exploreMore');
  const hasMedia = !!hero.mediaUrl;
  const isVideo = hero.mediaType === 'video';
  const isDark = hasMedia;

  return (
    <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      {hasMedia ? (
        isVideo ? (
          <>
            <video
              ref={videoRef}
              src={hero.mediaUrl}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              preload="metadata"
              className="bg-video absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-[1]" />
          </>
        ) : (
          <Image
            src={hero.mediaUrl!}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-warm-200 to-warm-100" />
      )}

      {/* Overlay for readability */}
      {hasMedia && <div className="absolute inset-0 bg-black/30" />}

      {/* Content */}
      <div className={`relative z-10 text-center px-4 md:px-6 ${!loaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`text-3xl md:text-8xl font-light tracking-tight mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-black'}`}
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className={`text-base md:text-xl max-w-lg mx-auto mb-8 md:mb-10 ${isDark ? 'text-white/80' : 'text-warm-600'}`}
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            href="/bang-olufsen"
            className={`inline-block px-8 md:px-10 py-3 text-xs md:text-sm tracking-widest uppercase transition-colors ${
              isDark
                ? 'bg-white text-black hover:bg-white/90'
                : 'bg-black text-white hover:bg-warm-800'
            }`}
          >
            {cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
