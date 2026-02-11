'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { BrandInfo } from '@/data/types';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

export function BrandShowcase({ brand }: { brand: BrandInfo }) {
  const t = useTranslations();

  return (
    <Link href={`/${brand.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group cursor-pointer"
      >
        <PlaceholderImage
          name={brand.name}
          aspect="aspect-[4/5]"
          className="mb-6"
        />
        <h3 className="text-lg font-medium tracking-wide mb-2">{brand.name}</h3>
        <p className="text-sm text-warm-500">{t(brand.descriptionKey)}</p>
      </motion.div>
    </Link>
  );
}
