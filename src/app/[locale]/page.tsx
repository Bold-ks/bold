import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { getFeaturedProducts } from '@/data/products';
import { brands } from '@/data/brands';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandShowcase } from '@/components/home/BrandShowcase';
import { FeaturedGrid } from '@/components/home/FeaturedGrid';

export default function HomePage() {
  const t = useTranslations();
  const featured = getFeaturedProducts();

  return (
    <>
      <HeroSection />

      {/* Brand Showcase */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-light text-center mb-4">
            {t('home.brandsTitle')}
          </h2>
          <p className="text-warm-500 text-center mb-16 max-w-md mx-auto">
            {t('home.brandsSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <BrandShowcase key={brand.id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 md:py-32 bg-warm-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-5xl font-light text-center mb-16">
            {t('brand.featuredProducts')}
          </h2>
          <FeaturedGrid products={featured} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-black text-white text-center">
        <h2 className="text-3xl md:text-5xl font-light mb-6">
          {t('home.discoverCollection')}
        </h2>
        <p className="text-warm-400 mb-10 max-w-md mx-auto">
          {t('home.heroSubtitle')}
        </p>
        <Link
          href="/contact"
          className="inline-block border border-white px-10 py-3 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
        >
          {t('common.contactUs')}
        </Link>
      </section>
    </>
  );
}
