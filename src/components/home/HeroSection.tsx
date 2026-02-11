'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';

export function HeroSection() {
  const t = useTranslations('home');

  return (
    <section className="relative h-[90vh] bg-warm-100 flex items-center justify-center overflow-hidden">
      {/* Placeholder for hero image */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-200 to-warm-100" />

      <div className="relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-5xl md:text-8xl font-light tracking-tight mb-6"
        >
          {t('heroTitle')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="text-warm-600 text-lg md:text-xl max-w-lg mx-auto mb-10"
        >
          {t('heroSubtitle')}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            href="/bang-olufsen"
            className="inline-block bg-black text-white px-10 py-3 text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors"
          >
            {t('exploreMore')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
