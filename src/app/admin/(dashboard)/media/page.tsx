'use client';

import { useEffect, useState, useRef } from 'react';
import { createAdminClient } from '@/lib/supabase/admin-client';
import type { Media } from '@/lib/supabase/types';
import toast from 'react-hot-toast';

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from('media')
      .select('*')
      .order('uploaded_at', { ascending: false });
    setMedia(data || []);
    setLoading(false);
  }

  async function handleUpload(files: FileList | File[]) {
    setUploading(true);
    const supabase = createAdminClient();
    let count = 0;

    for (const file of Array.from(files)) {
      const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error(`${file.name} too large`);
        continue;
      }

      const path = `uploads/${Date.now()}-${file.name}`;
      const bucket = file.type.startsWith('video/') ? 'site' : 'products';
      const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file);
      if (uploadError) {
        toast.error(`Upload failed: ${file.name}`);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);

      await supabase.from('media').insert({
        url: publicUrl,
        filename: file.name,
        mime_type: file.type,
        size: file.size,
        alt_text: file.name.replace(/\.[^.]+$/, ''),
      });
      count++;
    }

    if (count > 0) {
      toast.success(`${count} file${count > 1 ? 's' : ''} uploaded`);
      loadMedia();
    }
    setUploading(false);
  }

  async function handleDelete(item: Media) {
    if (!confirm(`Delete "${item.filename}"?`)) return;
    const supabase = createAdminClient();
    await supabase.from('media').delete().eq('id', item.id);
    setMedia((prev) => prev.filter((m) => m.id !== item.id));
    toast.success('Deleted');
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) handleUpload(e.dataTransfer.files);
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Media Library</h1>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : '+ Upload'}
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
          dragOver ? 'border-black bg-gray-50' : 'border-gray-200'
        }`}
        onClick={() => fileRef.current?.click()}
      >
        <p className="text-sm text-gray-400">
          {uploading ? 'Uploading…' : 'Drag & drop files here, or click to browse'}
        </p>
        <p className="text-xs text-gray-300 mt-1">Images up to 10MB, videos up to 50MB</p>
      </div>

      {/* Media grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : media.length === 0 ? (
        <p className="text-center text-gray-400 py-12">No media files yet</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => (
            <div key={item.id} className="group relative rounded-xl overflow-hidden border border-gray-200 bg-white">
              {item.mime_type.startsWith('video/') ? (
                <div className="aspect-square bg-gray-900 flex items-center justify-center">
                  <span className="text-3xl">🎬</span>
                </div>
              ) : (
                <img src={item.url} alt={item.alt_text || ''} className="aspect-square object-cover w-full" />
              )}
              <div className="p-2">
                <p className="text-xs text-gray-600 truncate">{item.filename}</p>
                <p className="text-[10px] text-gray-400">{formatSize(item.size)}</p>
              </div>
              <button
                onClick={() => handleDelete(item)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                ✕
              </button>
              <button
                onClick={() => { navigator.clipboard.writeText(item.url); toast.success('URL copied'); }}
                className="absolute top-1.5 left-1.5 w-6 h-6 bg-black/70 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                title="Copy URL"
              >
                📋
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">{media.length} file{media.length !== 1 ? 's' : ''}</p>
    </div>
  );
}

