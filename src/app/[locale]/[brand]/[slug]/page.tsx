import { notFound } from 'next/navigation';
import { getProductBySlug, getBrand } from '@/lib/data';
import { getProductImagesAndSpecs } from '@/lib/data';
import { ProductDetail } from '@/components/product/ProductDetail';

export const revalidate = 60;

type Props = {
  params: Promise<{ brand: string; slug: string; locale: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { brand: brandSlug, slug } = await params;

  const brand = getBrand(brandSlug);
  if (!brand) notFound();

  const product = await getProductBySlug(slug);
  if (!product || product.brand !== brandSlug) notFound();

  const { images, specs } = await getProductImagesAndSpecs(slug);

  return <ProductDetail product={product} allImages={images} specs={specs} />;
}
