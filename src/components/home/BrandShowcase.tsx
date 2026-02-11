'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import { BrandInfo } from '@/data/types';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const brandImageKeys: Record<string, string> = {
  'bang-olufsen': 'brands-bo-image',
  devialet: 'brands-devialet-image',
  loewe: 'brands-loewe-image',
};

export function BrandShowcase({ brand }: { brand: BrandInfo }) {
  const t = useTranslations();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadImage() {
      try {
        const supabase = createClient();
        const key = brandImageKeys[brand.id];
        if (!key) return;
        const { data } = await supabase
          .from('site_content')
          .select('media_url')
          .eq('page', 'home')
          .eq('key', key)
          .single();
        const row = data as Record<string, string | null> | null;
        if (row?.media_url) setImageUrl(row.media_url);
      } catch {
        // fallback to placeholder
      }
    }
    loadImage();
  }, [brand.id]);

  return (
    <Link href={`/${brand.id}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group cursor-pointer"
      >
        {imageUrl ? (
          <div className="aspect-[4/5] mb-6 overflow-hidden rounded-sm bg-warm-100">
            <img
              src={imageUrl}
              alt={brand.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ) : (
          <PlaceholderImage name={brand.name} aspect="aspect-[4/5]" className="mb-6" />
        )}
        <h3 className="text-lg font-medium tracking-wide mb-2">{brand.name}</h3>
        <p className="text-sm text-warm-500">{t(brand.descriptionKey)}</p>
      </motion.div>
    </Link>
  );
}
