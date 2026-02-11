'use client';

import { useEffect, useState, useRef } from 'react';
import { createAdminClient } from '@/lib/supabase/admin-client';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import type { Media } from '@/lib/supabase/types';
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

const PAGE_SECTIONS: Record<string, { label: string; sections: SectionDef[] }> = {
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
      { id: 'categories', label: '📁 Categories & Subcategories', fields: [], dynamic: 'brand-categories' },
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
      { id: 'categories', label: '📁 Categories & Subcategories', fields: [], dynamic: 'brand-categories' },
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
      { id: 'categories', label: '📁 Categories & Subcategories', fields: [], dynamic: 'brand-categories' },
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
  footer: {
    label: 'Footer',
    sections: [
      {
        id: 'footer',
        label: '🦶 Footer Content',
        fields: [
          { key: 'footer-description', label: 'Description', type: 'text', placeholder: 'Premium audio & visual technology in Kosovo' },
          { key: 'footer-address', label: 'Address', type: 'text', placeholder: 'Prishtina, Kosovo' },
          { key: 'footer-email', label: 'Email', type: 'text', placeholder: 'info@bold-ks.com' },
          { key: 'footer-phone', label: 'Phone', type: 'text', placeholder: '+383 ...' },
        ],
      },
      {
        id: 'social',
        label: '🔗 Social Media Links',
        fields: [
          { key: 'social-instagram', label: 'Instagram URL', type: 'text', placeholder: 'https://instagram.com/boldkosova' },
          { key: 'social-facebook', label: 'Facebook URL', type: 'text', placeholder: 'https://facebook.com/boldkosova' },
          { key: 'social-tiktok', label: 'TikTok URL', type: 'text', placeholder: 'https://tiktok.com/@boldkosova' },
          { key: 'social-youtube', label: 'YouTube URL', type: 'text', placeholder: 'https://youtube.com/@boldkosova' },
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

interface SectionDef {
  id: string;
  label: string;
  fields: FieldDef[];
  dynamic?: string;
}

interface BrandCategoryRow {
  id: string;
  brand: string;
  category_en: string;
  category_sq: string;
  subcategory_en: string | null;
  subcategory_sq: string | null;
  sort_order: number;
}

export default function ContentPage() {
  const [content, setContent] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadTargetKey, setUploadTargetKey] = useState<string | null>(null);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<string | null>(null);
  const [brandCategories, setBrandCategories] = useState<BrandCategoryRow[]>([]);
  const [savingCats, setSavingCats] = useState(false);

  useEffect(() => {
    loadContent();
    loadBrandCategories();
  }, []);

  async function loadBrandCategories() {
    const supabase = createAdminClient();
    const { data } = await supabase.from('brand_categories').select('*').order('sort_order');
    setBrandCategories((data as BrandCategoryRow[]) || []);
  }

  function addCategory(brand: string) {
    setBrandCategories((prev) => [
      ...prev,
      {
        id: `new-${Date.now()}-${Math.random()}`,
        brand,
        category_en: '',
        category_sq: '',
        subcategory_en: null,
        subcategory_sq: null,
        sort_order: prev.filter((c) => c.brand === brand).length,
      },
    ]);
  }

  function updateCategory(id: string, field: string, value: string) {
    setBrandCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value || null } : c))
    );
  }

  function removeCategory(id: string) {
    setBrandCategories((prev) => prev.filter((c) => c.id !== id));
  }

  async function saveBrandCategories(brand: string) {
    setSavingCats(true);
    const supabase = createAdminClient();
    const brandCats = brandCategories.filter((c) => c.brand === brand);

    try {
      // Delete all for this brand
      await supabase.from('brand_categories').delete().eq('brand', brand);

      // Insert current
      if (brandCats.length > 0) {
        const toInsert = brandCats.map((c, i) => ({
          brand: c.brand,
          category_en: c.category_en,
          category_sq: c.category_sq,
          subcategory_en: c.subcategory_en || null,
          subcategory_sq: c.subcategory_sq || null,
          sort_order: i,
        }));
        const { error } = await supabase.from('brand_categories').insert(toInsert);
        if (error) throw error;
      }

      toast.success('Categories saved!');
      await loadBrandCategories();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save categories');
    } finally {
      setSavingCats(false);
    }
  }

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

    const maxSize = file.type.startsWith('video/') ? 500 * 1024 * 1024 : 100 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error('File too large');
      return;
    }

    setUploading(uploadTargetKey);
    const supabase = createAdminClient();
    const ext = file.name.split('.').pop();
    const path = `content/${Date.now()}.${ext}`;

    // Use upsert and chunk large files
    const { error: uploadError } = await supabase.storage.from('site').upload(path, file, {
      cacheControl: '3600',
      upsert: true,
      // Supabase JS v2 handles chunked upload automatically for large files when using tus
    });
    if (uploadError) {
      console.error('Upload error:', uploadError);
      toast.error(`Upload failed: ${uploadError.message || 'Unknown error'}`);
      setUploading(null);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('site').getPublicUrl(path);
    const mediaType = file.type.startsWith('video/') ? 'video' : 'image';

    // Parse the target key: page|section|key
    const [page, section, key] = uploadTargetKey.split('|');
    setFieldValue(page, section, key, 'media_url', publicUrl);
    setFieldValue(page, section, key, 'media_type', mediaType);

    // Also add to media library so it shows in the Media tab
    await supabase.from('media').insert({
      url: publicUrl,
      filename: file.name,
      mime_type: file.type,
      size: file.size,
      alt_text: file.name.replace(/\.[^.]+$/, ''),
    });

    toast.success(`${mediaType === 'video' ? 'Video' : 'Image'} uploaded!`);
    setUploading(null);
    setUploadTargetKey(null);
    e.target.value = '';
  }

  function triggerUpload(page: string, section: string, key: string) {
    setUploadTargetKey(`${page}|${section}|${key}`);
    setTimeout(() => fileRef.current?.click(), 50);
  }

  function openMediaPicker(page: string, section: string, key: string) {
    setMediaPickerTarget(`${page}|${section}|${key}`);
    setShowMediaPicker(true);
  }

  function handleMediaPickerSelect(media: Media) {
    if (!mediaPickerTarget) return;
    const [page, section, key] = mediaPickerTarget.split('|');
    const mediaType = media.mime_type.startsWith('video/') ? 'video' : 'image';
    setFieldValue(page, section, key, 'media_url', media.url);
    setFieldValue(page, section, key, 'media_type', mediaType);
    toast.success('Media selected from library');
    setMediaPickerTarget(null);
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
      {pageConfig?.sections.map((section) => {
        // Dynamic: brand categories editor
        if (section.dynamic === 'brand-categories') {
          const brandId = activePage; // e.g. 'bang-olufsen', 'devialet', 'loewe'
          const cats = brandCategories.filter((c) => c.brand === brandId);

          return (
            <div key={section.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h2 className="text-sm font-semibold">{section.label}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => addCategory(brandId)}
                    className="text-sm text-black hover:underline"
                  >
                    + Add
                  </button>
                  <button
                    onClick={() => saveBrandCategories(brandId)}
                    disabled={savingCats}
                    className="px-4 py-1.5 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50"
                  >
                    {savingCats ? 'Saving…' : 'Save Categories'}
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {cats.length === 0 && <p className="text-sm text-gray-400">No categories yet</p>}
                {cats.map((cat) => (
                  <div key={cat.id} className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
                    <input
                      value={cat.category_en}
                      onChange={(e) => updateCategory(cat.id, 'category_en', e.target.value)}
                      placeholder="Category (EN)"
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black"
                    />
                    <input
                      value={cat.category_sq}
                      onChange={(e) => updateCategory(cat.id, 'category_sq', e.target.value)}
                      placeholder="Category (SQ)"
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black"
                    />
                    <input
                      value={cat.subcategory_en || ''}
                      onChange={(e) => updateCategory(cat.id, 'subcategory_en', e.target.value)}
                      placeholder="Subcategory (EN)"
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black"
                    />
                    <input
                      value={cat.subcategory_sq || ''}
                      onChange={(e) => updateCategory(cat.id, 'subcategory_sq', e.target.value)}
                      placeholder="Subcategory (SQ)"
                      className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-black"
                    />
                    <button
                      onClick={() => removeCategory(cat.id)}
                      className="text-red-400 hover:text-red-600 text-sm justify-self-start"
                    >
                      ✕ Remove
                    </button>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-2">
                  Leave subcategory empty for top-level categories. Categories are shared across EN and SQ.
                </p>
              </div>
            </div>
          );
        }

        return (
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
                            Upload New
                          </button>
                          <button
                            onClick={() => openMediaPicker(activePage, section.id, fieldKey)}
                            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
                          >
                            From Library
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
                      <div className="max-w-lg">
                        {isUploadingThis ? (
                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                            <p className="text-sm text-gray-500">Uploading…</p>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center space-y-3">
                            <p className="text-sm text-gray-500">Add an image or video</p>
                            <div className="flex gap-3 justify-center">
                              <button
                                onClick={() => triggerUpload(activePage, section.id, fieldKey)}
                                className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                              >
                                Upload File
                              </button>
                              <button
                                onClick={() => openMediaPicker(activePage, section.id, fieldKey)}
                                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                From Library
                              </button>
                            </div>
                            <p className="text-xs text-gray-400">Images up to 100MB, videos up to 500MB</p>
                          </div>
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
        );
      })}

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleMediaUpload}
        className="hidden"
      />

      {/* Media picker modal */}
      <MediaPickerModal
        open={showMediaPicker}
        onClose={() => { setShowMediaPicker(false); setMediaPickerTarget(null); }}
        onSelect={handleMediaPickerSelect}
      />
    </div>
  );
}
