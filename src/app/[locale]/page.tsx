import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getFeaturedProducts } from '@/lib/data';
import { brands } from '@/lib/data';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandShowcase } from '@/components/home/BrandShowcase';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';

export const revalidate = 60;

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return <HomePageClient featured={featured} />;
}

function HomePageClient({ featured }: { featured: import('@/data/types').Product[] }) {
  const t = useTranslations();

  return (
    <>
      <HeroSection />

      {/* Brand Showcase */}
      <section className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <h2 className="text-2xl md:text-5xl font-light text-center mb-3 md:mb-4">
            {t('home.brandsTitle')}
          </h2>
          <p className="text-warm-500 text-center mb-10 md:mb-16 max-w-md mx-auto text-sm md:text-base">
            {t('home.brandsSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {brands.map((brand) => (
              <BrandShowcase key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

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
      <section className="py-16 md:py-32 bg-black text-white text-center px-4">
        <h2 className="text-2xl md:text-5xl font-light mb-4 md:mb-6">
          {t('home.discoverCollection')}
        </h2>
        <p className="text-warm-400 mb-8 md:mb-10 max-w-md mx-auto text-sm md:text-base">
          {t('home.heroSubtitle')}
        </p>
        <Link
          href="/contact"
          className="inline-block border border-white px-8 md:px-10 py-3 text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
        >
          {t('common.contactUs')}
        </Link>
      </section>
    </>
  );
}
