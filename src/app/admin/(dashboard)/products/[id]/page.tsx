'use client';

import { useEffect, useState, useCallback } from 'react';
import { createAdminClient } from '@/lib/supabase/admin-client';
import { useRouter, useParams } from 'next/navigation';
import type { ProductVariant, ProductImage, ProductSpec, ProductBadge, Brand } from '@/lib/supabase/types';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import type { Media } from '@/lib/supabase/types';
import { compressFile } from '@/lib/compress';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function ProductEditPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = id === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Product fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [brand, setBrand] = useState<Brand>('bang-olufsen');
  const [descSq, setDescSq] = useState('');
  const [descEn, setDescEn] = useState('');
  const [catSq, setCatSq] = useState('');
  const [catEn, setCatEn] = useState('');
  const [subcatSq, setSubcatSq] = useState('');
  const [subcatEn, setSubcatEn] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [isContactOnly, setIsContactOnly] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);
  const [showStartingAt, setShowStartingAt] = useState(true);
  const [taglineEn, setTaglineEn] = useState('');
  const [taglineSq, setTaglineSq] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [showFeaturedMediaPicker, setShowFeaturedMediaPicker] = useState(false);

  // Relations
  const [variants, setVariants] = useState<Partial<ProductVariant>[]>([]);
  const [images, setImages] = useState<Partial<ProductImage>[]>([]);
  const [specs, setSpecs] = useState<Partial<ProductSpec>[]>([]);
  const [badges, setBadges] = useState<Partial<ProductBadge>[]>([]);

  // Product Hero
  const [heroEnabled, setHeroEnabled] = useState(false);
  const [heroMediaUrl, setHeroMediaUrl] = useState('');
  const [heroTitleEn, setHeroTitleEn] = useState('');
  const [heroTitleSq, setHeroTitleSq] = useState('');
  const [heroSubtitleEn, setHeroSubtitleEn] = useState('');
  const [heroSubtitleSq, setHeroSubtitleSq] = useState('');
  const [showHeroMediaPicker, setShowHeroMediaPicker] = useState(false);

  // Product Story
  const [storyEnabled, setStoryEnabled] = useState(false);
  const [storyHeadlineEn, setStoryHeadlineEn] = useState('');
  const [storyHeadlineSq, setStoryHeadlineSq] = useState('');
  const [storyId, setStoryId] = useState<string | null>(null);
  const [storyBlocks, setStoryBlocks] = useState<{
    id?: string;
    image_url: string;
    title_en: string;
    title_sq: string;
    description_en: string;
    description_sq: string;
    link_url: string;
  }[]>([]);
  const [storyMediaPickerIndex, setStoryMediaPickerIndex] = useState<number | null>(null);

  // Brand categories for dropdowns
  const [brandCategories, setBrandCategories] = useState<{ id: string; brand: string; category_en: string; category_sq: string; subcategory_en: string | null; subcategory_sq: string | null }[]>([]);

  const loadProduct = useCallback(async () => {
    if (isNew) return;
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, product_variants(*), product_images(*), product_specs(*), product_badges(*)')
      .eq('id', id)
      .single();

    if (error || !data) {
      toast.error('Product not found');
      router.push('/admin/products');
      return;
    }

    setName(data.name);
    setSlug(data.slug);
    setBrand(data.brand as Brand);
    setDescSq(data.description_sq);
    setDescEn(data.description_en);
    setCatSq(data.category_sq);
    setCatEn(data.category_en);
    setSubcatSq(data.subcategory_sq || '');
    setSubcatEn(data.subcategory_en || '');
    setBasePrice(data.base_price?.toString() || '');
    setIsContactOnly(data.is_contact_only);
    setIsFeatured(data.is_featured);
    setSortOrder(data.sort_order);
    setShowStartingAt(data.show_starting_at !== false);
    setTaglineEn(data.tagline_en || '');
    setTaglineSq(data.tagline_sq || '');
    setFeaturedImageUrl(data.featured_image_url || '');
    setHeroEnabled(data.hero_enabled || false);
    setHeroMediaUrl(data.hero_media_url || '');
    setHeroTitleEn(data.hero_title_en || '');
    setHeroTitleSq(data.hero_title_sq || '');
    setHeroSubtitleEn(data.hero_subtitle_en || '');
    setHeroSubtitleSq(data.hero_subtitle_sq || '');
    setVariants(data.product_variants || []);
    setImages(data.product_images || []);
    setSpecs(data.product_specs || []);
    setBadges((data.product_badges || []).sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order));
    setSlugManuallyEdited(true); // Don't auto-generate for existing products

    // Load story
    const { data: storyData } = await supabase
      .from('product_stories')
      .select('*')
      .eq('product_id', id)
      .single();
    if (storyData) {
      setStoryId(storyData.id);
      setStoryEnabled(storyData.enabled);
      setStoryHeadlineEn(storyData.headline_en || '');
      setStoryHeadlineSq(storyData.headline_sq || '');
      const { data: blocksData } = await supabase
        .from('product_story_blocks')
        .select('*')
        .eq('story_id', storyData.id)
        .order('sort_order');
      setStoryBlocks((blocksData || []).map((b: Record<string, unknown>) => ({
        id: b.id as string,
        image_url: (b.image_url as string) || '',
        title_en: (b.title_en as string) || '',
        title_sq: (b.title_sq as string) || '',
        description_en: (b.description_en as string) || '',
        description_sq: (b.description_sq as string) || '',
        link_url: (b.link_url as string) || '',
      })));
    }

    setLoading(false);
  }, [id, isNew, router]);

  useEffect(() => { loadProduct(); loadCategories(); }, [loadProduct]);

  async function loadCategories() {
    const supabase = createAdminClient();
    const { data } = await supabase.from('brand_categories').select('*').order('sort_order');
    setBrandCategories((data as typeof brandCategories) || []);
  }

  // Auto-generate slug from name for new products
  function handleNameChange(newName: string) {
    setName(newName);
    if (isNew && !slugManuallyEdited) {
      setSlug(slugify(newName));
    }
  }

  function handleSlugChange(newSlug: string) {
    setSlug(newSlug);
    setSlugManuallyEdited(true);
  }

  async function handleSave() {
    if (!name || !slug || !catEn) {
      toast.error('Name, slug, and category are required');
      return;
    }

    setSaving(true);
    const supabase = createAdminClient();

    try {
      const productData = {
        name,
        slug,
        brand,
        description_sq: descSq,
        description_en: descEn,
        category_sq: catSq,
        category_en: catEn,
        subcategory_sq: subcatSq || null,
        subcategory_en: subcatEn || null,
        tagline_en: taglineEn || null,
        tagline_sq: taglineSq || null,
        base_price: basePrice ? parseFloat(basePrice) : null,
        is_contact_only: isContactOnly,
        is_featured: isFeatured,
        show_starting_at: showStartingAt,
        sort_order: sortOrder,
        featured_image_url: featuredImageUrl || null,
        hero_enabled: heroEnabled,
        hero_media_url: heroMediaUrl || null,
        hero_title_en: heroTitleEn || null,
        hero_title_sq: heroTitleSq || null,
        hero_subtitle_en: heroSubtitleEn || null,
        hero_subtitle_sq: heroSubtitleSq || null,
      };

      let productId = id;

      if (isNew) {
        const { data, error } = await supabase.from('products').insert(productData).select('id').single();
        if (error) throw error;
        productId = data.id;
      } else {
        const { error } = await supabase.from('products').update(productData).eq('id', id);
        if (error) throw error;
      }

      // Save variants — upsert existing, insert new, delete removed
      if (!isNew) {
        const existingIds = variants.filter((v) => v.id).map((v) => v.id!);
        // Delete variants that were removed (but first unlink their images)
        if (existingIds.length > 0) {
          await supabase.from('product_images').update({ variant_id: null }).eq('product_id', productId).not('variant_id', 'in', `(${existingIds.join(',')})`);
          await supabase.from('product_variants').delete().eq('product_id', productId).not('id', 'in', `(${existingIds.join(',')})`);
        } else {
          await supabase.from('product_images').update({ variant_id: null }).eq('product_id', productId);
          await supabase.from('product_variants').delete().eq('product_id', productId);
        }
      }
      const newVariantIds: string[] = [];
      for (let i = 0; i < variants.length; i++) {
        const v = variants[i];
        const variantData = {
          product_id: productId,
          color_name: v.color_name || '',
          color_hex: v.color_hex || null,
          price: v.price || null,
          image_url: v.image_url || null,
          sort_order: i,
        };
        if (v.id) {
          await supabase.from('product_variants').update(variantData).eq('id', v.id);
          newVariantIds.push(v.id);
        } else {
          const { data: newV, error } = await supabase.from('product_variants').insert(variantData).select('id').single();
          if (error) throw error;
          newVariantIds.push(newV.id);
          // Update local state with new ID
          const updated = [...variants];
          updated[i] = { ...updated[i], id: newV.id };
          setVariants(updated);
        }
      }

      // Save specs
      if (!isNew) {
        await supabase.from('product_specs').delete().eq('product_id', productId);
      }
      if (specs.length > 0) {
        const { error } = await supabase.from('product_specs').insert(
          specs.map((s, i) => ({
            product_id: productId,
            spec_key_sq: s.spec_key_sq || '',
            spec_key_en: s.spec_key_en || '',
            spec_value_sq: s.spec_value_sq || '',
            spec_value_en: s.spec_value_en || '',
            sort_order: i,
          }))
        );
        if (error) throw error;
      }

      // Save badges
      if (!isNew) {
        await supabase.from('product_badges').delete().eq('product_id', productId);
      }
      if (badges.length > 0) {
        const { error: badgeError } = await supabase.from('product_badges').insert(
          badges.map((b, i) => ({
            product_id: productId,
            icon: b.icon || 'star',
            text_en: b.text_en || '',
            text_sq: b.text_sq || '',
            sort_order: i,
          }))
        );
        if (badgeError) throw badgeError;
      }

      // Save Product Story
      if (storyEnabled || storyBlocks.length > 0) {
        let currentStoryId = storyId;
        // Upsert: try update first, if no rows affected, insert
        if (currentStoryId) {
          await supabase.from('product_stories').update({
            headline_en: storyHeadlineEn || null,
            headline_sq: storyHeadlineSq || null,
            enabled: storyEnabled,
          }).eq('id', currentStoryId);
        } else {
          // Check if one already exists (edge case: state lost)
          const { data: existing } = await supabase.from('product_stories').select('id').eq('product_id', productId).single();
          if (existing) {
            currentStoryId = existing.id;
            await supabase.from('product_stories').update({
              headline_en: storyHeadlineEn || null,
              headline_sq: storyHeadlineSq || null,
              enabled: storyEnabled,
            }).eq('id', currentStoryId);
          } else {
            const { data: newStory, error: storyErr } = await supabase.from('product_stories').insert({
              product_id: productId,
              headline_en: storyHeadlineEn || null,
              headline_sq: storyHeadlineSq || null,
              enabled: storyEnabled,
            }).select('id').single();
            if (storyErr) throw storyErr;
            currentStoryId = newStory.id;
          }
          setStoryId(currentStoryId);
        }

        // Delete existing blocks and re-insert
        await supabase.from('product_story_blocks').delete().eq('story_id', currentStoryId);
        if (storyBlocks.length > 0) {
          const { error: blocksErr } = await supabase.from('product_story_blocks').insert(
            storyBlocks.map((b, i) => ({
              story_id: currentStoryId,
              image_url: b.image_url || null,
              title_en: b.title_en || null,
              title_sq: b.title_sq || null,
              description_en: b.description_en || null,
              description_sq: b.description_sq || null,
              link_url: b.link_url || null,
              sort_order: i,
            }))
          );
          if (blocksErr) throw blocksErr;
        }
      }

      toast.success(isNew ? 'Product created' : 'Product saved');
      if (isNew) {
        router.push(`/admin/products/${productId}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    setDeleting(true);
    const supabase = createAdminClient();
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast.error('Failed to delete');
      setDeleting(false);
      return;
    }
    toast.success('Product deleted');
    router.push('/admin/products');
  }

  // Image upload
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    if (isNew) {
      toast.error('Save the product first before uploading images');
      return;
    }

    const supabase = createAdminClient();
    for (let file of Array.from(files)) {
      if (file.size > 100 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 100MB)`);
        continue;
      }

      // Compress image before upload
      const originalName = file.name;
      file = await compressFile(file);

      const ext = file.name.split('.').pop();
      const path = `${id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('products').upload(path, file);
      if (uploadError) {
        toast.error(`Failed to upload ${originalName}`);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(path);

      const { data: imgData, error: imgError } = await supabase
        .from('product_images')
        .insert({
          product_id: id,
          url: publicUrl,
          alt_text: name,
          is_hero: images.length === 0,
          sort_order: images.length,
        })
        .select()
        .single();

      if (imgError) {
        toast.error('Failed to save image record');
        continue;
      }

      setImages((prev) => [...prev, imgData]);

      // Also add to media library
      await supabase.from('media').insert({
        url: publicUrl,
        filename: file.name,
        mime_type: file.type,
        size: file.size,
        alt_text: name,
      });
    }
    toast.success('Images uploaded');
    e.target.value = '';
  }

  async function handleDeleteImage(img: Partial<ProductImage>) {
    if (!img.id) return;
    if (!confirm('Remove this image?')) return;
    const supabase = createAdminClient();
    await supabase.from('product_images').delete().eq('id', img.id);
    setImages((prev) => prev.filter((i) => i.id !== img.id));
    toast.success('Image removed');
  }

  async function handleToggleHero(img: Partial<ProductImage>) {
    if (!img.id) return;
    const supabase = createAdminClient();
    // Unset all heroes first
    await supabase.from('product_images').update({ is_hero: false }).eq('product_id', id);
    // Set this one
    await supabase.from('product_images').update({ is_hero: true }).eq('id', img.id);
    setImages((prev) =>
      prev.map((i) => ({ ...i, is_hero: i.id === img.id }))
    );
    toast.success('Hero image updated');
  }

  function handleMediaSelect(media: Media) {
    if (isNew) {
      toast.error('Save the product first');
      return;
    }
    // Add from media library
    const supabase = createAdminClient();
    supabase
      .from('product_images')
      .insert({
        product_id: id,
        url: media.url,
        alt_text: media.alt_text || name,
        is_hero: images.length === 0,
        sort_order: images.length,
      })
      .select()
      .single()
      .then(({ data, error }: { data: ProductImage | null; error: unknown }) => {
        if (error) {
          toast.error('Failed to add image');
          return;
        }
        if (data) setImages((prev) => [...prev, data]);
        toast.success('Image added from media library');
      });
  }

  async function handleVariantImageUpload(e: React.ChangeEvent<HTMLInputElement>, variantId: string) {
    const files = e.target.files;
    if (!files?.length) return;
    if (isNew) {
      toast.error('Save the product first');
      return;
    }

    const supabase = createAdminClient();
    for (let file of Array.from(files)) {
      if (file.size > 100 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 100MB)`);
        continue;
      }

      const originalName = file.name;
      file = await compressFile(file);

      const ext = file.name.split('.').pop();
      const path = `${id}/variants/${variantId}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('products').upload(path, file);
      if (uploadError) {
        toast.error(`Failed to upload ${originalName}`);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(path);

      const { data: imgData, error: imgError } = await supabase
        .from('product_images')
        .insert({
          product_id: id,
          variant_id: variantId,
          url: publicUrl,
          alt_text: name,
          is_hero: false,
          sort_order: images.filter((img) => img.variant_id === variantId).length,
        })
        .select()
        .single();

      if (imgError) {
        toast.error('Failed to save image record');
        continue;
      }

      setImages((prev) => [...prev, imgData]);

      await supabase.from('media').insert({
        url: publicUrl,
        filename: file.name,
        mime_type: file.type,
        size: file.size,
        alt_text: `${name} - variant`,
      });
    }
    toast.success('Variant images uploaded');
    e.target.value = '';
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 bg-gray-100 rounded w-48 animate-pulse" />
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="text-gray-400 hover:text-black text-sm">← Products</Link>
          <span className="text-gray-300">/</span>
          <h1 className="text-xl font-semibold">{isNew ? 'New Product' : name}</h1>
        </div>
        {!isNew && slug && (
          <a
            href={`/sq/${brand}/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            🌐 View on site ↗
          </a>
        )}
      </div>

      {/* Product Hero */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Hero Section</h2>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={heroEnabled} onChange={(e) => setHeroEnabled(e.target.checked)} className="rounded" />
            Enabled
          </label>
        </div>

        {heroEnabled && (
          <>
            <p className="text-xs text-gray-400">Full-width hero banner shown above the product details. Supports image or video backgrounds.</p>

            {/* Hero Media */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Background (Image or Video)</label>
              {heroMediaUrl ? (
                <div className="flex items-center gap-3">
                  <div className="relative w-48 h-28 rounded overflow-hidden border border-gray-200">
                    {heroMediaUrl.match(/\.(mp4|webm|mov)$/i) ? (
                      <video src={heroMediaUrl} className="w-full h-full object-cover" muted />
                    ) : (
                      <img src={heroMediaUrl} alt="" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <button onClick={() => setShowHeroMediaPicker(true)} className="text-xs text-gray-500 hover:text-black">Replace</button>
                    <button onClick={() => setHeroMediaUrl('')} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <label className="border-2 border-dashed border-gray-200 rounded-lg px-6 py-4 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 cursor-pointer">
                    {isNew ? 'Save product first' : '+ Upload'}
                    {!isNew && (
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={async (e) => {
                          let file = e.target.files?.[0];
                          if (!file) return;
                          file = await compressFile(file);
                          const supabase = createAdminClient();
                          const ext = file.name.split('.').pop();
                          const path = `${id}/hero-bg-${Date.now()}.${ext}`;
                          const { error: uploadError } = await supabase.storage.from('products').upload(path, file);
                          if (uploadError) { toast.error('Upload failed'); return; }
                          const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(path);
                          setHeroMediaUrl(publicUrl);
                          await supabase.from('media').insert({ url: publicUrl, filename: file.name, mime_type: file.type, size: file.size, alt_text: `${name} - hero` });
                          toast.success('Hero media uploaded');
                          e.target.value = '';
                        }}
                      />
                    )}
                  </label>
                  {!isNew && (
                    <button
                      onClick={() => setShowHeroMediaPicker(true)}
                      className="border-2 border-dashed border-gray-200 rounded-lg px-6 py-4 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300"
                    >
                      From Library
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Hero Text */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Hero Title (EN)" value={heroTitleEn} onChange={setHeroTitleEn} />
              <Field label="Hero Title (SQ)" value={heroTitleSq} onChange={setHeroTitleSq} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Hero Subtitle (EN)" value={heroSubtitleEn} onChange={setHeroSubtitleEn} />
              <Field label="Hero Subtitle (SQ)" value={heroSubtitleSq} onChange={setHeroSubtitleSq} />
            </div>
          </>
        )}
      </section>

      {/* Hero Media Picker */}
      <MediaPickerModal
        open={showHeroMediaPicker}
        onClose={() => setShowHeroMediaPicker(false)}
        onSelect={(media: Media) => {
          setHeroMediaUrl(media.url);
          setShowHeroMediaPicker(false);
          toast.success('Hero media set from library');
        }}
      />

      {/* Basic Info */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Basic Info</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Name" value={name} onChange={handleNameChange} />
          <Field label="Slug" value={slug} onChange={handleSlugChange} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <select
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value as Brand);
                setCatEn(''); setCatSq(''); setSubcatEn(''); setSubcatSq('');
              }}
              className="input-field"
            >
              <option value="bang-olufsen">Bang & Olufsen</option>
              <option value="devialet">Devialet</option>
              <option value="loewe">Loewe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            {(() => {
              const cats = brandCategories.filter((c) => c.brand === brand);
              // Unique categories for this brand
              const uniqueCats = [...new Map(cats.map((c) => [c.category_en, c])).values()];
              return (
                <select
                  value={catEn}
                  onChange={(e) => {
                    const selected = uniqueCats.find((c) => c.category_en === e.target.value);
                    setCatEn(selected?.category_en || e.target.value);
                    setCatSq(selected?.category_sq || '');
                    setSubcatEn(''); setSubcatSq('');
                  }}
                  className="input-field"
                >
                  <option value="">Select category…</option>
                  {uniqueCats.map((c) => (
                    <option key={c.category_en} value={c.category_en}>
                      {c.category_en} / {c.category_sq}
                    </option>
                  ))}
                </select>
              );
            })()}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
            {(() => {
              const subcats = brandCategories.filter(
                (c) => c.brand === brand && c.category_en === catEn && c.subcategory_en
              );
              return subcats.length > 0 ? (
                <select
                  value={subcatEn}
                  onChange={(e) => {
                    const selected = subcats.find((c) => c.subcategory_en === e.target.value);
                    setSubcatEn(selected?.subcategory_en || '');
                    setSubcatSq(selected?.subcategory_sq || '');
                  }}
                  className="input-field"
                >
                  <option value="">None</option>
                  {subcats.map((c) => (
                    <option key={c.subcategory_en} value={c.subcategory_en!}>
                      {c.subcategory_en} / {c.subcategory_sq}
                    </option>
                  ))}
                </select>
              ) : (
                <select className="input-field" disabled>
                  <option>No subcategories</option>
                </select>
              );
            })()}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Tagline (EN)" value={taglineEn} onChange={setTaglineEn} />
          <Field label="Tagline (SQ)" value={taglineSq} onChange={setTaglineSq} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (EN)</label>
          <textarea value={descEn} onChange={(e) => setDescEn(e.target.value)} rows={3} className="input-field" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (SQ)</label>
          <textarea value={descSq} onChange={(e) => setDescSq(e.target.value)} rows={3} className="input-field" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Base Price (€)" value={basePrice} onChange={setBasePrice} type="number" />
          <Field label="Sort Order" value={sortOrder.toString()} onChange={(v) => setSortOrder(parseInt(v) || 0)} type="number" />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isContactOnly} onChange={(e) => setIsContactOnly(e.target.checked)} className="rounded" />
            Contact Only (no price shown)
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded" />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={showStartingAt} onChange={(e) => setShowStartingAt(e.target.checked)} className="rounded" />
            Show &quot;Starting at&quot;
          </label>
        </div>
      </section>

      {/* Featured Image — only shown when Featured is enabled */}
      {isFeatured && (
      <>
      <section className="bg-white rounded-xl border p-6 space-y-4 transition-all border-amber-300 ring-1 ring-amber-200">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Featured Image</h2>
        </div>

        <p className="text-xs text-gray-400">
          Optional image shown when this product appears on the homepage. Falls back to hero image if not set.
        </p>

        {featuredImageUrl ? (
          <div className="relative group w-full max-w-xs">
            <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
              <img src={featuredImageUrl} alt="Featured" className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setShowFeaturedMediaPicker(true)}
                className="text-xs text-gray-500 hover:text-black"
              >
                Replace
              </button>
              <button
                onClick={() => setFeaturedImageUrl('')}
                className="text-xs text-red-400 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <label className={`border-2 border-dashed rounded-lg px-6 py-4 text-sm text-center ${
              isNew ? 'border-gray-100 text-gray-300' : 'border-gray-200 text-gray-400 hover:text-gray-600 hover:border-gray-300 cursor-pointer'
            }`}>
              {isNew ? 'Save product first' : '+ Upload'}
              {!isNew && (
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    let file = e.target.files?.[0];
                    if (!file) return;
                    if (file.size > 100 * 1024 * 1024) { toast.error('File too large (max 100MB)'); return; }
                    file = await compressFile(file);
                    const supabase = createAdminClient();
                    const ext = file.name.split('.').pop();
                    const path = `${id}/featured-${Date.now()}.${ext}`;
                    const { error: uploadError } = await supabase.storage.from('products').upload(path, file);
                    if (uploadError) { toast.error('Upload failed'); return; }
                    const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(path);
                    setFeaturedImageUrl(publicUrl);
                    await supabase.from('media').insert({ url: publicUrl, filename: file.name, mime_type: file.type, size: file.size, alt_text: `${name} - featured` });
                    toast.success('Featured image uploaded');
                    e.target.value = '';
                  }}
                />
              )}
            </label>
            {!isNew && (
              <button
                onClick={() => setShowFeaturedMediaPicker(true)}
                className="border-2 border-dashed border-gray-200 rounded-lg px-6 py-4 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300"
              >
                📷 From Library
              </button>
            )}
          </div>
        )}
      </section>

      <MediaPickerModal
        open={showFeaturedMediaPicker}
        onClose={() => setShowFeaturedMediaPicker(false)}
        onSelect={(media: Media) => {
          setFeaturedImageUrl(media.url);
          setShowFeaturedMediaPicker(false);
          toast.success('Featured image set from library');
        }}
      />
      </>
      )}

      {/* Variants */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Color Variants</h2>
          <button
            onClick={() => setVariants([...variants, { color_name: '', color_hex: '', price: null }])}
            className="text-sm text-black hover:underline"
          >
            + Add Color
          </button>
        </div>

        {variants.length === 0 && <p className="text-sm text-gray-400">No color variants yet</p>}

        {variants.map((v, i) => {
          const variantId = v.id;
          const variantImages = images.filter((img) => img.variant_id === variantId);
          return (
            <div key={v.id || `new-${i}`} className="border border-gray-100 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  value={v.color_name || ''}
                  onChange={(e) => {
                    const updated = [...variants];
                    updated[i] = { ...updated[i], color_name: e.target.value };
                    setVariants(updated);
                  }}
                  placeholder="Color name"
                  className="input-field flex-1 min-w-[150px]"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={v.color_hex || '#000000'}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[i] = { ...updated[i], color_hex: e.target.value };
                      setVariants(updated);
                    }}
                    className="w-8 h-8 rounded border border-gray-200 cursor-pointer"
                  />
                  <input
                    value={v.color_hex || ''}
                    onChange={(e) => {
                      const updated = [...variants];
                      updated[i] = { ...updated[i], color_hex: e.target.value };
                      setVariants(updated);
                    }}
                    placeholder="#hex"
                    className="input-field w-24"
                  />
                </div>
                <input
                  value={v.price?.toString() || ''}
                  onChange={(e) => {
                    const updated = [...variants];
                    updated[i] = { ...updated[i], price: e.target.value ? parseFloat(e.target.value) : null };
                    setVariants(updated);
                  }}
                  placeholder="Price override"
                  type="number"
                  className="input-field w-32"
                />
                <button
                  onClick={() => {
                    setVariants(variants.filter((_, j) => j !== i));
                    // Remove associated images
                    if (variantId) {
                      setImages((prev) => prev.filter((img) => img.variant_id !== variantId));
                    }
                  }}
                  className="text-red-400 hover:text-red-600 text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Per-variant images */}
              {variantId ? (
                <div className="pl-2 border-l-2 border-gray-100 ml-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Images for {v.color_name || 'this color'}</span>
                    <label className="text-xs text-black hover:underline cursor-pointer">
                      + Upload
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleVariantImageUpload(e, variantId)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {variantImages.length > 0 ? (
                    <div className="flex gap-2 flex-wrap">
                      {variantImages.map((img, j) => (
                        <div key={img.id || j} className="relative group w-16 h-16 rounded overflow-hidden border border-gray-200">
                          <img src={img.url} alt="" className="w-full h-full object-cover" />
                          <button
                            onClick={() => handleDeleteImage(img)}
                            className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all text-white text-xs"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-300">No images yet — upload or save variant first</p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-gray-300 pl-2">Save the product first to upload images for this color</p>
              )}
            </div>
          );
        })}
      </section>

      {/* Service Badges */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Service Badges</h2>
          <button
            onClick={() => setBadges([...badges, { icon: 'star', text_en: '', text_sq: '' }])}
            className="text-sm text-black hover:underline"
          >
            + Add Badge
          </button>
        </div>

        {badges.length === 0 && <p className="text-sm text-gray-400">No service badges yet</p>}

        {badges.map((b, i) => (
          <div key={i} className="grid grid-cols-2 sm:grid-cols-[120px_1fr_1fr_auto] gap-2 items-center">
            <select
              value={b.icon || 'star'}
              onChange={(e) => {
                const updated = [...badges];
                updated[i] = { ...updated[i], icon: e.target.value };
                setBadges(updated);
              }}
              className="input-field"
            >
              <option value="tools">🔧 Tools</option>
              <option value="phone">📞 Phone</option>
              <option value="shield">🛡️ Shield</option>
              <option value="truck">🚚 Truck</option>
              <option value="clock">🕐 Clock</option>
              <option value="star">⭐ Star</option>
            </select>
            <input
              value={b.text_en || ''}
              onChange={(e) => {
                const updated = [...badges];
                updated[i] = { ...updated[i], text_en: e.target.value };
                setBadges(updated);
              }}
              placeholder="Text (EN)"
              className="input-field"
            />
            <input
              value={b.text_sq || ''}
              onChange={(e) => {
                const updated = [...badges];
                updated[i] = { ...updated[i], text_sq: e.target.value };
                setBadges(updated);
              }}
              placeholder="Text (SQ)"
              className="input-field"
            />
            <button
              onClick={() => setBadges(badges.filter((_, j) => j !== i))}
              className="text-red-400 hover:text-red-600 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </section>

      {/* Images */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Images</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setShowMediaPicker(true)}
              className="text-sm text-black hover:underline"
            >
              📷 From Library
            </button>
            <label className="text-sm text-black hover:underline cursor-pointer">
              + Upload
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>

        {images.length === 0 ? (
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <label className="cursor-pointer text-sm text-gray-400 hover:text-gray-600">
              {isNew ? 'Save product first, then upload images' : 'Drop images here or click to upload'}
              {!isNew && <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />}
            </label>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div key={img.id || i} className="relative group rounded-lg overflow-hidden border border-gray-200">
                <img src={img.url} alt={img.alt_text || ''} className="w-full h-32 object-cover" />
                {img.is_hero && (
                  <span className="absolute top-1 left-1 text-[10px] bg-black text-white px-1.5 py-0.5 rounded">Hero</span>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!img.is_hero && (
                    <button
                      onClick={() => handleToggleHero(img)}
                      className="w-6 h-6 bg-black/70 text-white rounded-full text-xs flex items-center justify-center"
                      title="Set as hero"
                    >
                      ★
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteImage(img)}
                    className="w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Product Story */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Product Story</h2>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={storyEnabled} onChange={(e) => setStoryEnabled(e.target.checked)} className="rounded" />
            Enabled
          </label>
        </div>

        {storyEnabled && (
          <>
            <p className="text-xs text-gray-400">Editorial section with lifestyle images and text blocks. Appears between Product Band and Tech Specs.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Headline (EN)" value={storyHeadlineEn} onChange={setStoryHeadlineEn} />
              <Field label="Headline (SQ)" value={storyHeadlineSq} onChange={setStoryHeadlineSq} />
            </div>

            <div className="flex items-center justify-between pt-2">
              <h3 className="text-sm font-medium text-gray-600">Story Blocks</h3>
              <button
                onClick={() => setStoryBlocks([...storyBlocks, { image_url: '', title_en: '', title_sq: '', description_en: '', description_sq: '', link_url: '' }])}
                className="text-sm text-black hover:underline"
              >
                + Add Block
              </button>
            </div>

            {storyBlocks.length === 0 && <p className="text-sm text-gray-400">No story blocks yet. Add blocks to create an editorial section.</p>}

            {storyBlocks.map((block, i) => (
              <div key={i} className="border border-gray-100 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-medium">Block {i + 1} — {i % 2 === 0 ? 'Image Left' : 'Image Right'}</span>
                  <div className="flex gap-2">
                    {i > 0 && (
                      <button
                        onClick={() => {
                          const updated = [...storyBlocks];
                          [updated[i - 1], updated[i]] = [updated[i], updated[i - 1]];
                          setStoryBlocks(updated);
                        }}
                        className="text-xs text-gray-400 hover:text-black"
                      >↑</button>
                    )}
                    {i < storyBlocks.length - 1 && (
                      <button
                        onClick={() => {
                          const updated = [...storyBlocks];
                          [updated[i], updated[i + 1]] = [updated[i + 1], updated[i]];
                          setStoryBlocks(updated);
                        }}
                        className="text-xs text-gray-400 hover:text-black"
                      >↓</button>
                    )}
                    <button
                      onClick={() => setStoryBlocks(storyBlocks.filter((_, j) => j !== i))}
                      className="text-red-400 hover:text-red-600 text-sm"
                    >✕</button>
                  </div>
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                  {block.image_url ? (
                    <div className="flex items-center gap-3">
                      <div className="relative w-24 h-24 rounded overflow-hidden border border-gray-200">
                        <img src={block.image_url} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <button onClick={() => setStoryMediaPickerIndex(i)} className="text-xs text-gray-500 hover:text-black">Replace</button>
                        <button onClick={() => {
                          const updated = [...storyBlocks];
                          updated[i] = { ...updated[i], image_url: '' };
                          setStoryBlocks(updated);
                        }} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <label className="border-2 border-dashed border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300 cursor-pointer">
                        + Upload
                        {!isNew && (
                          <input
                            type="file"
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={async (e) => {
                              let file = e.target.files?.[0];
                              if (!file) return;
                              file = await compressFile(file);
                              const supabase = createAdminClient();
                              const ext = file.name.split('.').pop();
                              const path = `${id}/story/${Date.now()}.${ext}`;
                              const { error: uploadError } = await supabase.storage.from('products').upload(path, file);
                              if (uploadError) { toast.error('Upload failed'); return; }
                              const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(path);
                              const updated = [...storyBlocks];
                              updated[i] = { ...updated[i], image_url: publicUrl };
                              setStoryBlocks(updated);
                              await supabase.from('media').insert({ url: publicUrl, filename: file.name, mime_type: file.type, size: file.size, alt_text: `${name} - story` });
                              toast.success('Image uploaded');
                              e.target.value = '';
                            }}
                          />
                        )}
                      </label>
                      <button
                        onClick={() => setStoryMediaPickerIndex(i)}
                        className="border-2 border-dashed border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-400 hover:text-gray-600 hover:border-gray-300"
                      >
                        From Library
                      </button>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    value={block.title_en}
                    onChange={(e) => {
                      const updated = [...storyBlocks];
                      updated[i] = { ...updated[i], title_en: e.target.value };
                      setStoryBlocks(updated);
                    }}
                    placeholder="Title (EN)"
                    className="input-field"
                  />
                  <input
                    value={block.title_sq}
                    onChange={(e) => {
                      const updated = [...storyBlocks];
                      updated[i] = { ...updated[i], title_sq: e.target.value };
                      setStoryBlocks(updated);
                    }}
                    placeholder="Title (SQ)"
                    className="input-field"
                  />
                </div>

                {/* Description */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <textarea
                    value={block.description_en}
                    onChange={(e) => {
                      const updated = [...storyBlocks];
                      updated[i] = { ...updated[i], description_en: e.target.value };
                      setStoryBlocks(updated);
                    }}
                    placeholder="Description (EN)"
                    rows={2}
                    className="input-field"
                  />
                  <textarea
                    value={block.description_sq}
                    onChange={(e) => {
                      const updated = [...storyBlocks];
                      updated[i] = { ...updated[i], description_sq: e.target.value };
                      setStoryBlocks(updated);
                    }}
                    placeholder="Description (SQ)"
                    rows={2}
                    className="input-field"
                  />
                </div>

                {/* Link */}
                <input
                  value={block.link_url}
                  onChange={(e) => {
                    const updated = [...storyBlocks];
                    updated[i] = { ...updated[i], link_url: e.target.value };
                    setStoryBlocks(updated);
                  }}
                  placeholder="Read more link (optional)"
                  className="input-field"
                />
              </div>
            ))}
          </>
        )}
      </section>

      {/* Story Media Picker */}
      <MediaPickerModal
        open={storyMediaPickerIndex !== null}
        onClose={() => setStoryMediaPickerIndex(null)}
        onSelect={(media: Media) => {
          if (storyMediaPickerIndex !== null) {
            const updated = [...storyBlocks];
            updated[storyMediaPickerIndex] = { ...updated[storyMediaPickerIndex], image_url: media.url };
            setStoryBlocks(updated);
            setStoryMediaPickerIndex(null);
            toast.success('Image set from library');
          }
        }}
      />

      {/* Specs */}
      <section className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Specifications</h2>
          <button
            onClick={() => setSpecs([...specs, { spec_key_sq: '', spec_key_en: '', spec_value_sq: '', spec_value_en: '' }])}
            className="text-sm text-black hover:underline"
          >
            + Add Spec
          </button>
        </div>

        {specs.length === 0 && <p className="text-sm text-gray-400">No specifications yet</p>}

        {specs.map((s, i) => (
          <div key={i} className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-center">
            <input
              value={s.spec_key_en || ''}
              onChange={(e) => {
                const updated = [...specs];
                updated[i] = { ...updated[i], spec_key_en: e.target.value };
                setSpecs(updated);
              }}
              placeholder="Key (EN)"
              className="input-field"
            />
            <input
              value={s.spec_key_sq || ''}
              onChange={(e) => {
                const updated = [...specs];
                updated[i] = { ...updated[i], spec_key_sq: e.target.value };
                setSpecs(updated);
              }}
              placeholder="Key (SQ)"
              className="input-field"
            />
            <input
              value={s.spec_value_en || ''}
              onChange={(e) => {
                const updated = [...specs];
                updated[i] = { ...updated[i], spec_value_en: e.target.value };
                setSpecs(updated);
              }}
              placeholder="Value (EN)"
              className="input-field"
            />
            <input
              value={s.spec_value_sq || ''}
              onChange={(e) => {
                const updated = [...specs];
                updated[i] = { ...updated[i], spec_value_sq: e.target.value };
                setSpecs(updated);
              }}
              placeholder="Value (SQ)"
              className="input-field"
            />
            <button
              onClick={() => setSpecs(specs.filter((_, j) => j !== i))}
              className="text-red-400 hover:text-red-600 text-sm justify-self-start"
            >
              ✕
            </button>
          </div>
        ))}
      </section>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div>
          {!isNew && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              {deleting ? 'Deleting…' : 'Delete Product'}
            </button>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving…' : isNew ? 'Create Product' : 'Save Changes'}
        </button>
      </div>

      <MediaPickerModal
        open={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={handleMediaSelect}
      />

      <style jsx global>{`
        .input-field {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          font-size: 0.875rem;
        }
        .input-field:focus {
          outline: none;
          box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
          border-color: #000;
        }
        textarea.input-field {
          resize: vertical;
        }
      `}</style>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text' }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input-field" />
    </div>
  );
}
