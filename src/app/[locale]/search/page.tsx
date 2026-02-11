import { getAllProducts } from '@/lib/data';
import { SearchResults } from '@/components/search/SearchResults';

export default function SearchPage() {
  const products = getAllProducts();
  return <SearchResults products={products} />;
}
