import { getTranslations } from 'next-intl/server';
import { getFeaturedProducts } from '@/lib/data';
import { brands } from '@/lib/data';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { HomeBrands } from '@/components/home/HomeBrands';
import { HomeCTA } from '@/components/home/HomeCTA';

export const revalidate = 60;

export default async function HomePage() {
  const featured = await getFeaturedProducts();
  const t = await getTranslations();

  return (
    <>
      <HeroSection />

      {/* Brand Showcase */}
      <HomeBrands brands={brands} />

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-16 md:py-32 bg-warm-50">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <h2 className="text-2xl md:text-5xl font-light text-center mb-10 md:mb-16">
              {t('brand.featuredProducts')}
            </h2>
            <FeaturedGrid products={featured} />
          </div>
        </section>
      )}

      {/* CTA */}
      <HomeCTA />
    </>
  );
}
