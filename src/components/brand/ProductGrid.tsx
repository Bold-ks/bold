'use client';

import { useTranslations } from 'next-intl';
import { Product } from '@/data/types';
import { ProductCard } from '@/components/ui/ProductCard';

export function ProductGrid({
  products,
  brandName,
}: {
  products: Product[];
  brandName: string;
}) {
  const t = useTranslations('common');

  // Group by category
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
      {categories.map((category) => {
        const catProducts = products.filter((p) => p.category === category);
        return (
          <div key={category} className="mb-20">
            <h2 className="text-2xl md:text-3xl font-light mb-10 capitalize">
              {category === 'headphones'
                ? 'Dëgjuese'
                : category === 'speakers'
                ? 'Altoparlantë'
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {catProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
