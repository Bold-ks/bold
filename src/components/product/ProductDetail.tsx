'use client';

import { useState, useCallback, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Product } from '@/data/types';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { ColorPicker } from '@/components/ui/ColorPicker';
import Image from 'next/image';

interface ProductDetailProps {
  product: Product;
  allImages?: { url: string; alt_text?: string | null; is_hero?: boolean; variant_id?: string | null }[];
  specs?: { spec_key_sq: string; spec_key_en: string; spec_value_sq: string; spec_value_en: string }[];
  variants?: { id: string; color_name: string; color_hex: string | null; price: number | null }[];
}

export function ProductDetail({ product, allImages, specs, variants: dbVariants }: ProductDetailProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Use DB variants if available, otherwise fall back to product.colors
  const colorVariants = dbVariants && dbVariants.length > 0 ? dbVariants : null;
  const selectedVariantId = colorVariants ? colorVariants[selectedColorIndex]?.id : null;

  // Build images list — filter by selected variant if variant has images
  const allImgs = allImages && allImages.length > 0 ? allImages : [];
  const variantImages = selectedVariantId
    ? allImgs.filter((img) => img.variant_id === selectedVariantId)
    : [];
  const generalImages = allImgs.filter((img) => !img.variant_id);
  // Show variant-specific images if they exist, otherwise show general images
  const displayImages = variantImages.length > 0 ? variantImages : generalImages;
  const images = displayImages.length > 0
    ? displayImages.map((img) => img.url)
    : product.heroImage
    ? [product.heroImage]
    : [];

  const currentImage = images[selectedImageIndex] || null;

  // Reset image index when switching colors
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedColorIndex]);

  // Build specs list (bilingual from props, fallback to product.specs)
  const specsList = specs && specs.length > 0
    ? specs.map((s) => ({
        key: locale === 'sq' ? s.spec_key_sq : s.spec_key_en,
        value: locale === 'sq' ? s.spec_value_sq : s.spec_value_en,
      }))
    : Object.entries(product.specs).map(([key, value]) => ({ key, value }));

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    if (e.key === 'Escape') setLightboxOpen(false);
    if (e.key === 'ArrowRight' && selectedImageIndex < images.length - 1) setSelectedImageIndex((i) => i + 1);
    if (e.key === 'ArrowLeft' && selectedImageIndex > 0) setSelectedImageIndex((i) => i - 1);
  }, [lightboxOpen, selectedImageIndex, images.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const brandLabel = product.brand === 'bang-olufsen'
    ? 'Bang & Olufsen'
    : product.brand === 'devialet'
    ? 'Devialet'
    : 'Loewe';

  return (
    <>
      {/* Hero: Image + Product Info side by side on desktop */}
      <section className="bg-warm-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] lg:min-h-[80vh]">
            {/* Image Gallery */}
            <div className="relative flex flex-col">
              {/* Main Image */}
              <div
                className="relative flex-1 min-h-[50vh] lg:min-h-0 flex items-center justify-center cursor-zoom-in p-4 md:p-8"
                onClick={() => images.length > 0 && setLightboxOpen(true)}
              >
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full max-w-lg mx-auto aspect-square"
                >
                  {currentImage ? (
                    <Image
                      src={currentImage}
                      alt={product.name}
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <PlaceholderImage name={product.name} className="w-full h-full" />
                  )}
                </motion.div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 px-4 md:px-8 pb-4 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                        i === selectedImageIndex ? 'border-black' : 'border-transparent hover:border-warm-300'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex items-center">
              <div className="w-full px-4 md:px-12 lg:px-16 py-8 md:py-12 lg:py-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-xs tracking-widest uppercase text-warm-400 mb-3">
                    {brandLabel}
                  </p>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-4 md:mb-6">
                    {product.name}
                  </h1>
                  <p className="text-warm-600 leading-relaxed mb-6 md:mb-8 max-w-md text-sm md:text-base">
                    {product.description[locale as 'sq' | 'en']}
                  </p>

                  {/* Price */}
                  <div className="mb-6 md:mb-8">
                    {(() => {
                      const variantPrice = colorVariants?.[selectedColorIndex]?.price;
                      const displayPrice = variantPrice || product.price;
                      return displayPrice ? (
                        <p className="text-2xl md:text-3xl font-light">
                          €{displayPrice.toLocaleString()}
                        </p>
                      ) : (
                        <p className="text-base md:text-lg text-warm-500">
                          {t('product.contactForPrice')}
                        </p>
                      );
                    })()}
                  </div>

                  {/* Colors */}
                  {(colorVariants ? colorVariants.length > 0 : product.colors.length > 0) && (
                    <div className="mb-6 md:mb-8">
                      <h3 className="text-xs tracking-widest uppercase text-warm-400 mb-3">
                        {t('product.selectColor')}
                        {colorVariants && colorVariants[selectedColorIndex]?.color_name && (
                          <span className="ml-2 normal-case tracking-normal text-warm-600 font-medium">
                            — {colorVariants[selectedColorIndex].color_name}
                          </span>
                        )}
                      </h3>
                      <ColorPicker
                        colors={colorVariants
                          ? colorVariants.map((v) => ({ name: v.color_name, hex: v.color_hex || '#000000' }))
                          : product.colors
                        }
                        selectedIndex={selectedColorIndex}
                        onSelect={setSelectedColorIndex}
                      />
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className="inline-block w-full sm:w-auto bg-black text-white py-3.5 px-10 text-sm tracking-widest uppercase text-center hover:bg-warm-800 transition-colors"
                  >
                    {t('common.contactUs')}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      {specsList.length > 0 && (
        <section className="py-12 md:py-24">
          <div className="max-w-4xl mx-auto px-4 md:px-12">
            <h2 className="text-2xl md:text-3xl font-light mb-8 md:mb-12">
              {t('product.techSpecs')}
            </h2>
            <div className="divide-y divide-warm-200">
              {specsList.map(({ key, value }, i) => (
                <div key={i} className="flex justify-between items-baseline py-4 md:py-5 gap-4">
                  <span className="text-warm-500 text-xs md:text-sm uppercase tracking-wider flex-shrink-0">{key}</span>
                  <span className="text-sm md:text-base font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="py-8 md:py-12 text-center border-t border-warm-100">
        <Link
          href={`/${product.brand}`}
          className="text-sm text-warm-500 tracking-wide hover:text-black transition-colors"
        >
          ← {t('common.backTo')} {brandLabel}
        </Link>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white text-2xl z-10"
            >
              ✕
            </button>

            {/* Prev/Next */}
            {images.length > 1 && (
              <>
                {selectedImageIndex > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedImageIndex((i) => i - 1); }}
                    className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10"
                  >
                    ‹
                  </button>
                )}
                {selectedImageIndex < images.length - 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedImageIndex((i) => i + 1); }}
                    className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-3xl z-10"
                  >
                    ›
                  </button>
                )}
              </>
            )}

            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative w-[90vw] h-[80vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            {/* Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                {selectedImageIndex + 1} / {images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
