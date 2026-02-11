'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BrandInfo } from '@/data/types';

export function BrandHero({ brand }: { brand: BrandInfo }) {
  const t = useTranslations();

  return (
    <section className="h-[70vh] bg-warm-50 flex items-center justify-center">
      <div className="text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-7xl font-light tracking-tight mb-4"
        >
          {brand.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-warm-500 text-lg md:text-xl"
        >
          {t(brand.taglineKey)}
        </motion.p>
      </div>
    </section>
  );
}
