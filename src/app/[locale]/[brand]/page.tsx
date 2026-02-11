import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getBrand } from '@/data/brands';
import { getProductsByBrand } from '@/data/products';
import { BrandHero } from '@/components/brand/BrandHero';
import { ProductGrid } from '@/components/brand/ProductGrid';

type Props = {
  params: Promise<{ brand: string; locale: string }>;
};

export default async function BrandPage({ params }: Props) {
  const { brand: brandSlug } = await params;

  const brand = getBrand(brandSlug);
  if (!brand) notFound();

  const products = getProductsByBrand(brandSlug);

  return (
    <>
      <BrandHero brand={brand} />
      <ProductGrid products={products} brandName={brand.name} />
    </>
  );
}
