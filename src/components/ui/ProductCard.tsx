'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { Product } from '@/data/types';
import { PlaceholderImage } from './PlaceholderImage';

export function ProductCard({ product }: { product: Product }) {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <Link href={`/${product.brand}/${product.slug}`}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group cursor-pointer"
      >
        <div className="aspect-square mb-4 overflow-hidden">
          {product.heroImage ? (
            <img
              src={product.heroImage}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <PlaceholderImage
              name={product.name}
              className="w-full h-full group-hover:scale-105 transition-transform duration-700"
            />
          )}
        </div>
        <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
        <p className="text-xs text-warm-500 mt-1">
          {product.description[locale as 'sq' | 'en']}
        </p>
        <p className="text-sm mt-2 font-medium">
          {product.price
            ? `€${product.price.toLocaleString()}`
            : t('contactUs')}
        </p>
      </motion.article>
    </Link>
  );
}
