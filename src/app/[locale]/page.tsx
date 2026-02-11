import { useTranslations } from 'next-intl';
import { getFeaturedProducts } from '@/lib/data';
import { brands } from '@/lib/data';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandShowcase } from '@/components/home/BrandShowcase';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';
import { HomeBrands } from '@/components/home/HomeBrands';
import { HomeCTA } from '@/components/home/HomeCTA';

export const revalidate = 60;

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return <HomePageClient featured={featured} />;
}

function HomePageClient({ featured }: { featured: import('@/data/types').Product[] }) {
  return (
    <>
      <HeroSection />

      {/* Brand Showcase */}
      <HomeBrands brands={brands} />

      {/* Featured Products */}
      {featured.length > 0 && (
        <FeaturedSection products={featured} />
      )}

      {/* CTA */}
      <HomeCTA />
    </>
  );
}

function FeaturedSection({ products }: { products: import('@/data/types').Product[] }) {
  const t = useTranslations();
  return (
    <section className="py-16 md:py-32 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <h2 className="text-2xl md:text-5xl font-light text-center mb-10 md:mb-16">
          {t('brand.featuredProducts')}
        </h2>
        <FeaturedGrid products={products} />
      </div>
    </section>
  );
}
