'use client';

import { useEffect, useState, useCallback } from 'react';
import { createAdminClient } from '@/lib/supabase/admin-client';
import { useRouter, useParams } from 'next/navigation';
import type { ProductVariant, ProductImage, ProductSpec, Brand } from '@/lib/supabase/types';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { MediaPickerModal } from '@/components/admin/MediaPickerModal';
import type { Media } from '@/lib/supabase/types';

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

  // Relations
  const [variants, setVariants] = useState<Partial<ProductVariant>[]>([]);
  const [images, setImages] = useState<Partial<ProductImage>[]>([]);
  const [specs, setSpecs] = useState<Partial<ProductSpec>[]>([]);

  // Brand categories for dropdowns
  const [brandCategories, setBrandCategories] = useState<{ id: string; brand: string; category_en: string; category_sq: string; subcategory_en: string | null; subcategory_sq: string | null }[]>([]);

  const loadProduct = useCallback(async () => {
    if (isNew) return;
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('products')
      .select('*, product_variants(*), product_images(*), product_specs(*)')
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
    setVariants(data.product_variants || []);
    setImages(data.product_images || []);
    setSpecs(data.product_specs || []);
    setSlugManuallyEdited(true); // Don't auto-generate for existing products
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
        base_price: basePrice ? parseFloat(basePrice) : null,
        is_contact_only: isContactOnly,
        is_featured: isFeatured,
        sort_order: sortOrder,
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
    for (const file of Array.from(files)) {
      if (file.size > 100 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 100MB)`);
        continue;
      }

      const ext = file.name.split('.').pop();
      const path = `${id}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('products').upload(path, file);
      if (uploadError) {
        toast.error(`Failed to upload ${file.name}`);
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
    for (const file of Array.from(files)) {
      if (file.size > 100 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 100MB)`);
        continue;
      }

      const ext = file.name.split('.').pop();
      const path = `${id}/variants/${variantId}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from('products').upload(path, file);
      if (uploadError) {
        toast.error(`Failed to upload ${file.name}`);
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
        </div>
      </section>

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
