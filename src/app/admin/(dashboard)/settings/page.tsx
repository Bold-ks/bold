'use client';

import { useEffect, useState } from 'react';
import { createAdminClient } from '@/lib/supabase/admin-client';
import type { SiteContent } from '@/lib/supabase/types';
import toast from 'react-hot-toast';

const SETTINGS_KEYS = [
  { section: 'brand', key: 'bo_description', label: 'Bang & Olufsen Description' },
  { section: 'brand', key: 'devialet_description', label: 'Devialet Description' },
  { section: 'brand', key: 'loewe_description', label: 'Loewe Description' },
  { section: 'contact', key: 'email', label: 'Contact Email' },
  { section: 'contact', key: 'phone', label: 'Phone Number' },
  { section: 'contact', key: 'address', label: 'Address' },
  { section: 'social', key: 'instagram', label: 'Instagram URL' },
  { section: 'social', key: 'facebook', label: 'Facebook URL' },
  { section: 'social', key: 'tiktok', label: 'TikTok URL' },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('page', 'settings');

    const existing = data || [];

    // Ensure all settings keys exist
    const result: SiteContent[] = SETTINGS_KEYS.map((sk, i) => {
      const found = existing.find((e: SiteContent) => e.section === sk.section && e.key === sk.key);
      if (found) return found;
      return {
        id: `temp-${sk.section}-${sk.key}`,
        page: 'settings',
        section: sk.section,
        key: sk.key,
        value_sq: '',
        value_en: '',
        media_url: null,
        media_type: null,
        sort_order: i,
        updated_at: new Date().toISOString(),
      };
    });

    setSettings(result);
    setLoading(false);
  }

  function updateValue(section: string, key: string, field: 'value_en' | 'value_sq', value: string) {
    setSettings((prev) =>
      prev.map((s) =>
        s.section === section && s.key === key ? { ...s, [field]: value } : s
      )
    );
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createAdminClient();

    try {
      for (const item of settings) {
        const payload = {
          page: 'settings',
          section: item.section,
          key: item.key,
          value_sq: item.value_sq,
          value_en: item.value_en,
          media_url: item.media_url,
          media_type: item.media_type,
          sort_order: item.sort_order,
        };

        if (item.id.startsWith('temp-')) {
          const { data, error } = await supabase.from('site_content').insert(payload).select().single();
          if (error) throw error;
          setSettings((prev) =>
            prev.map((s) => (s.id === item.id ? data : s))
          );
        } else {
          const { error } = await supabase.from('site_content').update(payload).eq('id', item.id);
          if (error) throw error;
        }
      }
      toast.success('Settings saved');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Settings</h1>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  const grouped = {
    brand: settings.filter((s) => s.section === 'brand'),
    contact: settings.filter((s) => s.section === 'contact'),
    social: settings.filter((s) => s.section === 'social'),
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>

      {/* Brand Descriptions */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Brand Descriptions</h2>
        {grouped.brand.map((s) => {
          const meta = SETTINGS_KEYS.find((sk) => sk.section === s.section && sk.key === s.key);
          return (
            <div key={s.key} className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{meta?.label}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-gray-400">English</span>
                  <textarea
                    value={s.value_en}
                    onChange={(e) => updateValue(s.section, s.key, 'value_en', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black resize-y"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-400">Shqip</span>
                  <textarea
                    value={s.value_sq}
                    onChange={(e) => updateValue(s.section, s.key, 'value_sq', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black resize-y"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Contact Info */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Contact Info</h2>
        {grouped.contact.map((s) => {
          const meta = SETTINGS_KEYS.find((sk) => sk.section === s.section && sk.key === s.key);
          return (
            <div key={s.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{meta?.label}</label>
              <input
                value={s.value_en}
                onChange={(e) => updateValue(s.section, s.key, 'value_en', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              />
            </div>
          );
        })}
      </section>

      {/* Social Links */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Social Links</h2>
        {grouped.social.map((s) => {
          const meta = SETTINGS_KEYS.find((sk) => sk.section === s.section && sk.key === s.key);
          return (
            <div key={s.key}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{meta?.label}</label>
              <input
                value={s.value_en}
                onChange={(e) => updateValue(s.section, s.key, 'value_en', e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
              />
            </div>
          );
        })}
      </section>
    </div>
  );
}

