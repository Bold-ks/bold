'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Product } from '@/data/types';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { ColorPicker } from '@/components/ui/ColorPicker';

export function ProductDetail({ product }: { product: Product }) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <>
      {/* Full-bleed hero */}
      <section className="h-[80vh] bg-warm-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl px-6"
        >
          <PlaceholderImage
            name={product.name}
            aspect="aspect-square"
            className="w-full"
          />
        </motion.div>
      </section>

      {/* Product info */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs tracking-widest uppercase text-warm-400 mb-2">
                {product.brand === 'bang-olufsen'
                  ? 'Bang & Olufsen'
                  : product.brand === 'devialet'
                  ? 'Devialet'
                  : 'Loewe'}
              </p>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                {product.name}
              </h1>
              <p className="text-warm-600 leading-relaxed mb-8">
                {product.description[locale as 'sq' | 'en']}
              </p>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Price */}
              <div className="mb-8">
                {product.price ? (
                  <p className="text-3xl font-light">
                    €{product.price.toLocaleString()}
                  </p>
                ) : (
                  <p className="text-lg text-warm-500">
                    {t('product.contactForPrice')}
                  </p>
                )}
              </div>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs tracking-widest uppercase text-warm-400 mb-3">
                    {t('product.selectColor')}
                  </h3>
                  <ColorPicker colors={product.colors} />
                </div>
              )}

              {/* CTA */}
              {product.price ? (
                <button className="w-full bg-black text-white py-4 text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors">
                  {t('common.contactUs')}
                </button>
              ) : (
                <Link
                  href="/contact"
                  className="block w-full bg-black text-white py-4 text-sm tracking-widest uppercase text-center hover:bg-warm-800 transition-colors"
                >
                  {t('common.contactUs')}
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs */}
      {Object.keys(product.specs).length > 0 && (
        <section className="py-16 md:py-24 bg-warm-50">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl font-light mb-10">
              {t('product.techSpecs')}
            </h2>
            <div className="divide-y divide-warm-200">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-4">
                  <span className="text-warm-500 text-sm">{key}</span>
                  <span className="text-sm font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="py-12 text-center">
        <Link
          href={`/${product.brand}`}
          className="text-sm text-warm-500 tracking-wide hover:text-black transition-colors"
        >
          ← {t('common.backTo')}{' '}
          {product.brand === 'bang-olufsen'
            ? 'Bang & Olufsen'
            : product.brand === 'devialet'
            ? 'Devialet'
            : 'Loewe'}
        </Link>
      </section>
    </>
  );
}
