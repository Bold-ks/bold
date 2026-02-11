'use client';

import { useEffect, useState } from 'react';
import { createAdminClient } from '@/lib/supabase/admin-client';
import type { SiteContent } from '@/lib/supabase/types';
import toast from 'react-hot-toast';

const PAGES = ['home', 'about', 'contact'] as const;

export default function ContentPage() {
  const [content, setContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activePage, setActivePage] = useState<string>('home');

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .order('page')
      .order('sort_order');
    setContent(data || []);
    setLoading(false);
  }

  const filtered = content.filter((c) => c.page === activePage);

  function updateField(id: string, field: keyof SiteContent, value: string) {
    setContent((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createAdminClient();

    try {
      for (const item of content) {
        const payload = {
          page: item.page,
          section: item.section,
          key: item.key,
          value_sq: item.value_sq,
          value_en: item.value_en,
          media_url: item.media_url,
          media_type: item.media_type,
          sort_order: item.sort_order,
        };
        const { error } = await supabase
          .from('site_content')
          .update(payload)
          .eq('id', item.id);
        if (error) throw error;
      }
      toast.success('Content saved');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleAdd() {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('site_content')
      .insert({
        page: activePage,
        section: 'new',
        key: `item-${Date.now()}`,
        value_sq: '',
        value_en: '',
        sort_order: filtered.length,
      })
      .select()
      .single();

    if (error) {
      toast.error('Failed to add');
      return;
    }
    setContent((prev) => [...prev, data]);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this content block?')) return;
    const supabase = createAdminClient();
    await supabase.from('site_content').delete().eq('id', id);
    setContent((prev) => prev.filter((c) => c.id !== id));
    toast.success('Deleted');
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Site Content</h1>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-xl font-semibold">Site Content</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save All'}
        </button>
      </div>

      {/* Page tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {PAGES.map((page) => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`px-4 py-1.5 rounded-md text-sm capitalize transition-colors ${
              activePage === page ? 'bg-white text-black font-medium shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Content blocks */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 py-8 text-center">No content blocks for this page</p>
        )}

        {filtered.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <input
                  value={item.section}
                  onChange={(e) => updateField(item.id, 'section', e.target.value)}
                  placeholder="Section"
                  className="px-2 py-1 border border-gray-200 rounded text-sm w-32"
                />
                <input
                  value={item.key}
                  onChange={(e) => updateField(item.id, 'key', e.target.value)}
                  placeholder="Key"
                  className="px-2 py-1 border border-gray-200 rounded text-sm w-40"
                />
              </div>
              <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 text-sm">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">English</label>
                <textarea
                  value={item.value_en}
                  onChange={(e) => updateField(item.id, 'value_en', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black resize-y"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Shqip</label>
                <textarea
                  value={item.value_sq}
                  onChange={(e) => updateField(item.id, 'value_sq', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black resize-y"
                />
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <input
                value={item.media_url || ''}
                onChange={(e) => updateField(item.id, 'media_url', e.target.value)}
                placeholder="Media URL (optional)"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
              />
              <select
                value={item.media_type || ''}
                onChange={(e) => updateField(item.id, 'media_type', e.target.value as 'image' | 'video' | '')}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="">No media</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleAdd}
        className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-colors"
      >
        + Add Content Block
      </button>
    </div>
  );
}
