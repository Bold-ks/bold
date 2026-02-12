'use client';

import { useState, useCallback, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { Product } from '@/data/types';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { ColorPicker } from '@/components/ui/ColorPicker';
import Image from 'next/image';

interface Badge {
  icon: string;
  text_en: string;
  text_sq: string;
  sort_order: number;
}

interface ProductDetailProps {
  product: Product;
  allImages?: { url: string; alt_text?: string | null; is_hero?: boolean; variant_id?: string | null }[];
  specs?: { spec_key_sq: string; spec_key_en: string; spec_value_sq: string; spec_value_en: string }[];
  variants?: { id: string; color_name: string; color_hex: string | null; price: number | null }[];
  badges?: Badge[];
}

function BadgeIcon({ icon, className = 'w-6 h-6' }: { icon: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    tools: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
      </svg>
    ),
    phone: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    shield: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    truck: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.07-.504 1.004-1.12A18.684 18.684 0 0020.953 9.87c-.328-.656-.99-1.062-1.703-1.062h-1.5V5.625a1.125 1.125 0 00-1.125-1.125H5.25a1.125 1.125 0 00-1.125 1.125v12.857" />
      </svg>
    ),
    clock: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    star: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  };
  return <>{icons[icon] || icons.star}</>;
}

export function ProductDetail({ product, allImages, specs, variants: dbVariants, badges }: ProductDetailProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const colorVariants = dbVariants && dbVariants.length > 0 ? dbVariants : null;
  const selectedVariantId = colorVariants ? colorVariants[selectedColorIndex]?.id : null;

  const allImgs = allImages && allImages.length > 0 ? allImages : [];
  const variantImages = selectedVariantId
    ? allImgs.filter((img) => img.variant_id === selectedVariantId)
    : [];
  const generalImages = allImgs.filter((img) => !img.variant_id);
  const displayImages = variantImages.length > 0 ? variantImages : generalImages;
  const images = displayImages.length > 0
    ? displayImages.map((img) => img.url)
    : product.heroImage
    ? [product.heroImage]
    : [];

  const currentImage = images[selectedImageIndex] || null;

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedColorIndex]);

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

  // Get first image of each variant for popular variants section
  const variantThumbnails = colorVariants?.map((v, idx) => {
    const vImgs = allImgs.filter((img) => img.variant_id === v.id);
    const thumb = vImgs.length > 0 ? vImgs[0].url : (generalImages.length > 0 ? generalImages[0].url : product.heroImage);
    return { ...v, thumbnail: thumb, index: idx };
  });

  return (
    <>
      {/* Hero: Image + Product Info */}
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
                  key={`${selectedColorIndex}-${selectedImageIndex}`}
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

              {/* Dot indicators + arrows */}
              {images.length > 1 && (
                <div className="flex items-center justify-center gap-4 px-4 pb-6">
                  <button
                    onClick={() => setSelectedImageIndex((i) => Math.max(0, i - 1))}
                    disabled={selectedImageIndex === 0}
                    className="w-8 h-8 flex items-center justify-center text-warm-400 hover:text-black disabled:opacity-30 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          i === selectedImageIndex ? 'bg-black w-6' : 'bg-warm-300 hover:bg-warm-400'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedImageIndex((i) => Math.min(images.length - 1, i + 1))}
                    disabled={selectedImageIndex === images.length - 1}
                    className="w-8 h-8 flex items-center justify-center text-warm-400 hover:text-black disabled:opacity-30 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
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
                  <p className="text-xs tracking-[0.25em] uppercase text-warm-400 mb-3">
                    {brandLabel}
                  </p>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mb-2">
                    {product.name}
                  </h1>
                  {product.category && (
                    <p className="text-warm-400 text-sm md:text-base mb-6 md:mb-8">
                      {product.category}
                    </p>
                  )}

                  {/* Colors with selected label */}
                  {(colorVariants ? colorVariants.length > 0 : product.colors.length > 0) && (
                    <div className="mb-6 md:mb-8">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xs tracking-[0.2em] uppercase text-warm-400">
                          {t('product.selectColor')}
                        </h3>
                        {colorVariants && colorVariants[selectedColorIndex]?.color_name && (
                          <span className="text-sm text-warm-700">
                            — {colorVariants[selectedColorIndex].color_name}
                          </span>
                        )}
                      </div>
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

                  {/* Description */}
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

                  {/* CTA Button - B&O style */}
                  <Link
                    href="/contact"
                    className="block w-full bg-black text-white py-4 text-sm tracking-[0.2em] uppercase text-center hover:bg-warm-800 transition-colors"
                  >
                    {locale === 'sq' ? 'Personalizo' : 'Compose yours'}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Variants + Service Badges — one seamless section with dividers */}
      {((variantThumbnails && variantThumbnails.length > 1) || (badges && badges.length > 0)) && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            {/* Popular Variants */}
            {variantThumbnails && variantThumbnails.length > 1 && (
              <div className="py-10 md:py-14">
                <h2 className="text-xs tracking-[0.25em] uppercase text-warm-400 mb-6">
                  {locale === 'sq' ? 'Variantet popullore' : 'Popular variants'}
                </h2>
                <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 -mx-1 px-1">
                  {variantThumbnails.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedColorIndex(v.index)}
                      className="flex-shrink-0 group transition-all"
                    >
                      <div className={`relative w-28 h-28 md:w-36 md:h-36 overflow-hidden bg-warm-50 border-2 transition-all ${
                        v.index === selectedColorIndex
                          ? 'border-black'
                          : 'border-transparent hover:border-warm-300'
                      }`}>
                        {v.thumbnail ? (
                          <Image
                            src={v.thumbnail}
                            alt={v.color_name}
                            fill
                            className="object-contain p-2"
                            sizes="144px"
                          />
                        ) : (
                          <div className="w-full h-full bg-warm-50" />
                        )}
                      </div>
                      <p className={`text-xs mt-2 text-center transition-colors ${
                        v.index === selectedColorIndex ? 'text-black font-medium' : 'text-warm-500'
                      }`}>{v.color_name}</p>
                    </button>
                  ))}
                  {/* Compose yours card */}
                  <Link
                    href="/contact"
                    className="flex-shrink-0 group transition-all"
                  >
                    <div className="relative w-28 h-28 md:w-36 md:h-36 overflow-hidden bg-warm-50 border-2 border-transparent hover:border-warm-300 flex items-center justify-center transition-all">
                      <svg className="w-6 h-6 text-warm-400 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
                      </svg>
                    </div>
                    <p className="text-xs mt-2 text-center text-warm-500 group-hover:text-black transition-colors">
                      {locale === 'sq' ? 'Personalizo' : 'Compose yours'}
                    </p>
                  </Link>
                </div>
              </div>
            )}

            {/* Thin divider */}
            {variantThumbnails && variantThumbnails.length > 1 && badges && badges.length > 0 && (
              <div className="border-t border-warm-200" />
            )}

            {/* Service Badges */}
            {badges && badges.length > 0 && (
              <div className="py-8 md:py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
                {badges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="text-warm-400 flex-shrink-0">
                      <BadgeIcon icon={badge.icon} className="w-6 h-6" />
                    </div>
                    <span className="text-sm text-warm-700 tracking-wide">
                      {locale === 'sq' ? badge.text_sq : badge.text_en}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

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
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white text-2xl z-10"
            >
              ✕
            </button>

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

            {images.length > 1 && (
              <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setSelectedImageIndex(i); }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === selectedImageIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
