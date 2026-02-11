import { notFound } from 'next/navigation';
import { getBrand, getProductsByBrand } from '@/lib/data';
import { BrandHero } from '@/components/brand/BrandHero';
import { ProductGrid } from '@/components/brand/ProductGrid';

export const revalidate = 60;

type Props = {
  params: Promise<{ brand: string; locale: string }>;
};

export default async function BrandPage({ params }: Props) {
  const { brand: brandSlug } = await params;

  const brand = getBrand(brandSlug);
  if (!brand) notFound();

  const products = await getProductsByBrand(brandSlug);

  return (
    <>
      <BrandHero brand={brand} />
      <ProductGrid products={products} brandName={brand.name} />
    </>
  );
}
