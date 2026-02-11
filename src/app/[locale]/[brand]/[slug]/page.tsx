import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/data/products';
import { getBrand } from '@/data/brands';
import { ProductDetail } from '@/components/product/ProductDetail';

type Props = {
  params: Promise<{ brand: string; slug: string; locale: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { brand: brandSlug, slug } = await params;

  const brand = getBrand(brandSlug);
  if (!brand) notFound();

  const product = getProductBySlug(slug);
  if (!product || product.brand !== brandSlug) notFound();

  return <ProductDetail product={product} />;
}
