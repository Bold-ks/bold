'use client';

import { useEffect, useState } from 'react';
import { createAdminClient } from '@/lib/supabase/admin-client';
import Link from 'next/link';

interface BrandCount {
  brand: string;
  count: number;
}

interface Stats {
  totalProducts: number;
  brandCounts: BrandCount[];
  featuredCount: number;
  contactOnlyCount: number;
  mediaCount: number;
}

const brandLabels: Record<string, string> = {
  'bang-olufsen': 'Bang & Olufsen',
  'devialet': 'Devialet',
  'loewe': 'Loewe',
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createAdminClient();

      const [productsRes, mediaRes] = await Promise.all([
        supabase.from('products').select('brand, is_featured, is_contact_only'),
        supabase.from('media').select('id', { count: 'exact', head: true }),
      ]);

      const products = productsRes.data || [];
      const brandMap = new Map<string, number>();
      let featuredCount = 0;
      let contactOnlyCount = 0;

      for (const p of products) {
        brandMap.set(p.brand, (brandMap.get(p.brand) || 0) + 1);
        if (p.is_featured) featuredCount++;
        if (p.is_contact_only) contactOnlyCount++;
      }

      setStats({
        totalProducts: products.length,
        brandCounts: Array.from(brandMap.entries()).map(([brand, count]) => ({ brand, count })),
        featuredCount,
        contactOnlyCount,
        mediaCount: mediaRes.count || 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
              <div className="h-4 bg-gray-100 rounded w-20 mb-3" />
              <div className="h-8 bg-gray-100 rounded w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Products" value={stats?.totalProducts || 0} />
        <StatCard label="Featured" value={stats?.featuredCount || 0} />
        <StatCard label="Contact Only" value={stats?.contactOnlyCount || 0} />
        <StatCard label="Media Files" value={stats?.mediaCount || 0} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats?.brandCounts.map((bc) => (
          <Link
            key={bc.brand}
            href={`/admin/products?brand=${bc.brand}`}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 transition-colors"
          >
            <p className="text-sm text-gray-500">{brandLabels[bc.brand] || bc.brand}</p>
            <p className="text-2xl font-semibold mt-1">{bc.count}</p>
            <p className="text-xs text-gray-400 mt-1">products →</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-medium text-gray-500 mb-3">Quick Actions</h2>
          <div className="space-y-2">
            <QuickLink href="/admin/products/new" label="Add new product" />
            <QuickLink href="/admin/media" label="Upload media" />
            <QuickLink href="/admin/content" label="Edit site content" />
            <QuickLink href="/admin/settings" label="Update settings" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 hover:text-black transition-colors"
    >
      {label}
      <span className="text-gray-400">→</span>
    </Link>
  );
}

