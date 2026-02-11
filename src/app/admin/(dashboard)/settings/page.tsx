'use client';

import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-xl font-semibold">Settings</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Content Management</h2>
        <p className="text-sm text-gray-600">
          All site content — including contact info, social links, brand descriptions, and page text — 
          can be managed from the <strong>Content</strong> editor.
        </p>
        <Link
          href="/admin/content"
          className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Go to Content Editor →
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Quick Reference</h2>
        <div className="divide-y divide-gray-100">
          <SettingRow label="Site URL" value="bold-ks.com" />
          <SettingRow label="Admin Email" value="rona@bold-ks.com" />
          <SettingRow label="Brands" value="Bang & Olufsen, Devialet, Loewe" />
          <SettingRow label="Languages" value="Albanian (SQ), English (EN)" />
          <SettingRow label="Image Storage" value="Supabase Storage" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Help</h2>
        <div className="text-sm text-gray-600 space-y-2">
          <p><strong>Products:</strong> Add, edit, manage product catalog with images, specs, and color variants.</p>
          <p><strong>Media:</strong> Upload and manage images and videos used across the site.</p>
          <p><strong>Content:</strong> Edit homepage hero, brand pages, about page, footer, and social links.</p>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
