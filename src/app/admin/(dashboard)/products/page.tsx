'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { createAdminClient } from '@/lib/supabase/admin-client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import type { Product, ProductVariant } from '@/lib/supabase/types';
import toast from 'react-hot-toast';

const brandLabels: Record<string, string> = {
  'bang-olufsen': 'Bang & Olufsen',
  'devialet': 'Devialet',
  'loewe': 'Loewe',
};

const PAGE_SIZE = 20;

type ProductWithVariants = Product & { product_variants: ProductVariant[] };

export default function ProductsListPage() {
  return (
    <Suspense fallback={<div className="animate-pulse h-64 bg-gray-100 rounded-xl" />}>
      <ProductsListInner />
    </Suspense>
  );
}

function ProductsListInner() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<ProductWithVariants[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState(searchParams.get('brand') || '');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const loadProducts = useCallback(async () => {
    setLoading(true);
    const supabase = createAdminClient();
    let query = supabase
      .from('products')
      .select('*, product_variants(*)')
      .order('brand')
      .order('sort_order');

    if (brandFilter) query = query.eq('brand', brandFilter);
    if (categoryFilter) query = query.eq('category_en', categoryFilter);

    const { data, error } = await query;
    if (error) {
      toast.error('Failed to load products');
      console.error(error);
    }
    setProducts((data as ProductWithVariants[]) || []);
    setLoading(false);
    setSelected(new Set());
  }, [brandFilter, categoryFilter]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const categories = [...new Set(products.map((p) => p.category_en))].sort();

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selected.size === paginated.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map((p) => p.id)));
    }
  }

  async function bulkDelete() {
    if (selected.size === 0) return;
    if (!confirm(`Delete ${selected.size} product(s)? This cannot be undone.`)) return;
    const supabase = createAdminClient();
    const { error } = await supabase.from('products').delete().in('id', Array.from(selected));
    if (error) {
      toast.error('Failed to delete');
      return;
    }
    toast.success(`${selected.size} product(s) deleted`);
    loadProducts();
  }

  async function bulkToggleFeatured(featured: boolean) {
    if (selected.size === 0) return;
    const supabase = createAdminClient();
    const { error } = await supabase.from('products').update({ is_featured: featured }).in('id', Array.from(selected));
    if (error) {
      toast.error('Failed to update');
      return;
    }
    toast.success(`${selected.size} product(s) ${featured ? 'featured' : 'unfeatured'}`);
    loadProducts();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-semibold">Products</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          + Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black w-full sm:w-64"
        />
        <select
          value={brandFilter}
          onChange={(e) => { setBrandFilter(e.target.value); setPage(0); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white"
        >
          <option value="">All Brands</option>
          {Object.entries(brandLabels).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(0); }}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2">
          <span className="text-sm text-gray-600">{selected.size} selected</span>
          <button onClick={() => bulkToggleFeatured(true)} className="text-sm px-3 py-1 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
            ★ Feature
          </button>
          <button onClick={() => bulkToggleFeatured(false)} className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
            Unfeature
          </button>
          <button onClick={bulkDelete} className="text-sm px-3 py-1 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors">
            Delete
          </button>
        </div>
      )}

      {/* Product list */}
      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
              <div className="h-5 bg-gray-100 rounded w-48" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400">
          No products found
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-4 py-3 font-medium w-10">
                  <input
                    type="checkbox"
                    checked={selected.size === paginated.length && paginated.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Brand</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Category</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Colors</th>
                <th className="px-4 py-3 font-medium text-right">Price</th>
                <th className="px-4 py-3 font-medium w-10" />
              </tr>
            </thead>
            <tbody>
              {paginated.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/products/${p.id}`} className="font-medium text-black hover:underline">
                      {p.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5">
                      {p.is_featured && <span className="text-xs bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded">Featured</span>}
                      {p.is_contact_only && <span className="text-xs bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded">Contact Only</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{brandLabels[p.brand]}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell capitalize">{p.category_en}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex gap-1">
                      {p.product_variants?.slice(0, 5).map((v) => (
                        <span
                          key={v.id}
                          className="w-5 h-5 rounded-full border border-gray-200"
                          style={{ backgroundColor: v.color_hex || '#ccc' }}
                          title={v.color_name}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    {p.base_price ? `€${p.base_price.toLocaleString()}` : <span className="text-gray-400">Contact</span>}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/products/${p.id}`} className="text-gray-400 hover:text-black">
                      →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ←
            </button>
            <span className="text-sm text-gray-500">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
