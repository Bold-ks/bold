'use client';

import { useEffect, useState, useRef } from 'react';
import { createAdminClient } from '@/lib/supabase/admin-client';
import toast from 'react-hot-toast';

interface ContentBlock {
  id: string;
  page: string;
  section: string;
  key: string;
  value_sq: string;
  value_en: string;
  media_url: string | null;
  media_type: string | null;
  sort_order: number;
}

const PAGE_SECTIONS: Record<string, { label: string; sections: { id: string; label: string; fields: FieldDef[] }[] }> = {
  home: {
    label: 'Homepage',
    sections: [
      {
        id: 'hero',
        label: '🎬 Hero Section',
        fields: [
          { key: 'hero-title', label: 'Title', type: 'text', placeholder: 'e.g. The Art of Sound' },
          { key: 'hero-subtitle', label: 'Subtitle', type: 'text', placeholder: 'e.g. Premium audio experience' },
          { key: 'hero-cta', label: 'Button Text', type: 'text', placeholder: 'e.g. Explore More' },
          { key: 'hero-media', label: 'Background Image or Video', type: 'media' },
        ],
      },
      {
        id: 'brands',
        label: '🏷️ Brands Section',
        fields: [
          { key: 'brands-title', label: 'Title', type: 'text', placeholder: 'e.g. Our Brands' },
          { key: 'brands-subtitle', label: 'Subtitle', type: 'text', placeholder: 'e.g. Curated for excellence' },
          { key: 'brands-bo-image', label: 'Bang & Olufsen — Card Image', type: 'media' },
          { key: 'brands-devialet-image', label: 'Devialet — Card Image', type: 'media' },
          { key: 'brands-loewe-image', label: 'Loewe — Card Image', type: 'media' },
        ],
      },
      {
        id: 'cta',
        label: '📢 Bottom CTA Section',
        fields: [
          { key: 'cta-title', label: 'Title', type: 'text', placeholder: 'e.g. Discover the Collection' },
          { key: 'cta-subtitle', label: 'Subtitle', type: 'text', placeholder: '' },
        ],
      },
    ],
  },
  'bang-olufsen': {
    label: 'Bang & Olufsen',
    sections: [
      {
        id: 'hero',
        label: '🎬 Hero Section',
        fields: [
          { key: 'hero-title', label: 'Title', type: 'text', placeholder: 'e.g. Bang & Olufsen' },
          { key: 'hero-subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Brand description' },
          { key: 'hero-media', label: 'Hero Image or Video', type: 'media' },
        ],
      },
    ],
  },
  devialet: {
    label: 'Devialet',
    sections: [
      {
        id: 'hero',
        label: '🎬 Hero Section',
        fields: [
          { key: 'hero-title', label: 'Title', type: 'text', placeholder: 'e.g. Devialet' },
          { key: 'hero-subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Brand description' },
          { key: 'hero-media', label: 'Hero Image or Video', type: 'media' },
        ],
      },
    ],
  },
  loewe: {
    label: 'Loewe',
    sections: [
      {
        id: 'hero',
        label: '🎬 Hero Section',
        fields: [
          { key: 'hero-title', label: 'Title', type: 'text', placeholder: 'e.g. Loewe' },
          { key: 'hero-subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Brand description' },
          { key: 'hero-media', label: 'Hero Image or Video', type: 'media' },
        ],
      },
    ],
  },
  about: {
    label: 'About',
    sections: [
      {
        id: 'hero',
        label: '🎬 Hero Section',
        fields: [
          { key: 'hero-title', label: 'Title', type: 'text', placeholder: 'e.g. About Bold' },
          { key: 'hero-subtitle', label: 'Subtitle', type: 'textarea', placeholder: '' },
          { key: 'hero-media', label: 'Hero Image', type: 'media' },
        ],
      },
      {
        id: 'story',
        label: '📖 Our Story',
        fields: [
          { key: 'story-title', label: 'Title', type: 'text', placeholder: '' },
          { key: 'story-text', label: 'Content', type: 'textarea', placeholder: '' },
        ],
      },
    ],
  },
  contact: {
    label: 'Contact',
    sections: [
      {
        id: 'info',
        label: '📍 Contact Info',
        fields: [
          { key: 'address', label: 'Address', type: 'text', placeholder: '' },
          { key: 'email', label: 'Email', type: 'text', placeholder: '' },
          { key: 'phone', label: 'Phone', type: 'text', placeholder: '' },
          { key: 'hours', label: 'Working Hours', type: 'text', placeholder: '' },
        ],
      },
    ],
  },
};

interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'media';
  placeholder?: string;
}

export default function ContentPage() {
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadTargetKey, setUploadTargetKey] = useState<string | null>(null);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    const supabase = createAdminClient();
    const { data } = await supabase.from('site_content').select('*').order('sort_order');
    setContent(data || []);
    setLoading(false);
  }

  function getFieldValue(page: string, section: string, key: string, field: 'value_en' | 'value_sq' | 'media_url' | 'media_type'): string {
    const fullKey = `${section}-${key}`.replace(/^hero-hero-/, 'hero-');
    const item = content.find((c) => c.page === page && c.key === fullKey);
    return (item?.[field] as string) || '';
  }

  function setFieldValue(page: string, section: string, key: string, field: 'value_en' | 'value_sq' | 'media_url' | 'media_type', value: string) {
    const fullKey = `${section}-${key}`.replace(/^hero-hero-/, 'hero-');
    setContent((prev) => {
      const existing = prev.find((c) => c.page === page && c.key === fullKey);
      if (existing) {
        return prev.map((c) => (c.id === existing.id ? { ...c, [field]: value } : c));
      }
      // Create new entry
      return [
        ...prev,
        {
          id: `new-${Date.now()}-${Math.random()}`,
          page,
          section,
          key: fullKey,
          value_sq: field === 'value_sq' ? value : '',
          value_en: field === 'value_en' ? value : '',
          media_url: field === 'media_url' ? value : null,
          media_type: field === 'media_type' ? value : null,
          sort_order: prev.length,
        },
      ];
    });
  }

  async function handleSave() {
    setSaving(true);
    const supabase = createAdminClient();

    try {
      for (const item of content) {
        if (item.id.startsWith('new-')) {
          const { id: _id, ...rest } = item;
          void _id;
          const { error } = await supabase.from('site_content').insert(rest);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('site_content')
            .update({
              value_sq: item.value_sq,
              value_en: item.value_en,
              media_url: item.media_url,
              media_type: item.media_type,
            })
            .eq('id', item.id);
          if (error) throw error;
        }
      }
      toast.success('Content saved!');
      // Reload to get real IDs for any new entries
      await loadContent();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleMediaUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !uploadTargetKey) return;

    const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File too large');
      return;
    }

    setUploading(uploadTargetKey);
    const supabase = createAdminClient();
    const ext = file.name.split('.').pop();
    const path = `content/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from('site').upload(path, file);
    if (uploadError) {
      toast.error('Upload failed');
      setUploading(null);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('site').getPublicUrl(path);
    const mediaType = file.type.startsWith('video/') ? 'video' : 'image';

    // Parse the target key: page|section|key
    const [page, section, key] = uploadTargetKey.split('|');
    setFieldValue(page, section, key, 'media_url', publicUrl);
    setFieldValue(page, section, key, 'media_type', mediaType);

    toast.success(`${mediaType === 'video' ? 'Video' : 'Image'} uploaded!`);
    setUploading(null);
    setUploadTargetKey(null);
    e.target.value = '';
  }

  function triggerUpload(page: string, section: string, key: string) {
    setUploadTargetKey(`${page}|${section}|${key}`);
    setTimeout(() => fileRef.current?.click(), 50);
  }

  const pageConfig = PAGE_SECTIONS[activePage];

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Site Content</h1>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse" />
        ))}
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
          className="px-5 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>

      {/* Page tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 overflow-x-auto">
        {Object.entries(PAGE_SECTIONS).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setActivePage(key)}
            className={`px-4 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
              activePage === key ? 'bg-white text-black font-medium shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {config.label}
          </button>
        ))}
      </div>

      {/* Sections */}
      {pageConfig?.sections.map((section) => (
        <div key={section.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-sm font-semibold">{section.label}</h2>
          </div>
          <div className="p-6 space-y-5">
            {section.fields.map((field) => {
              const fieldKey = field.key.replace(`${section.id}-`, '');

              if (field.type === 'media') {
                const mediaUrl = getFieldValue(activePage, section.id, fieldKey, 'media_url');
                const mediaType = getFieldValue(activePage, section.id, fieldKey, 'media_type');
                const isUploadingThis = uploading === `${activePage}|${section.id}|${fieldKey}`;

                return (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>

                    {mediaUrl ? (
                      <div className="space-y-3">
                        <div className="relative rounded-lg overflow-hidden border border-gray-200 max-w-lg">
                          {mediaType === 'video' ? (
                            <video src={mediaUrl} controls className="w-full max-h-64 object-cover" />
                          ) : (
                            <img src={mediaUrl} alt="" className="w-full max-h-64 object-cover" />
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => triggerUpload(activePage, section.id, fieldKey)}
                            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                          >
                            Replace
                          </button>
                          <button
                            onClick={() => {
                              setFieldValue(activePage, section.id, fieldKey, 'media_url', '');
                              setFieldValue(activePage, section.id, fieldKey, 'media_type', '');
                            }}
                            className="px-3 py-1.5 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 break-all">{mediaUrl}</p>
                      </div>
                    ) : (
                      <div
                        onClick={() => !isUploadingThis && triggerUpload(activePage, section.id, fieldKey)}
                        className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center cursor-pointer hover:border-gray-300 transition-colors max-w-lg"
                      >
                        {isUploadingThis ? (
                          <p className="text-sm text-gray-500">Uploading…</p>
                        ) : (
                          <>
                            <p className="text-sm text-gray-500">Click to upload an image or video</p>
                            <p className="text-xs text-gray-400 mt-1">Images up to 10MB, videos up to 50MB</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              // Text or textarea field
              const isTextarea = field.type === 'textarea';
              const InputComponent = isTextarea ? 'textarea' : 'input';

              return (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-xs text-gray-400 mb-1 block">English</span>
                      <InputComponent
                        value={getFieldValue(activePage, section.id, fieldKey, 'value_en')}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                          setFieldValue(activePage, section.id, fieldKey, 'value_en', e.target.value)
                        }
                        placeholder={field.placeholder}
                        rows={isTextarea ? 3 : undefined}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black resize-y"
                      />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 mb-1 block">Shqip</span>
                      <InputComponent
                        value={getFieldValue(activePage, section.id, fieldKey, 'value_sq')}
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                          setFieldValue(activePage, section.id, fieldKey, 'value_sq', e.target.value)
                        }
                        placeholder={field.placeholder}
                        rows={isTextarea ? 3 : undefined}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black resize-y"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleMediaUpload}
        className="hidden"
      />
    </div>
  );
}
