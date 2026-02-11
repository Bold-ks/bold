'use client';

import { useEffect, useState } from 'react';
import { createAdminClient } from '@/lib/supabase/admin-client';
import type { Media } from '@/lib/supabase/types';

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (media: Media) => void;
  multiple?: boolean;
}

export function MediaPickerModal({ open, onClose, onSelect }: Props) {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!open) return;
    loadMedia();
  }, [open]);

  async function loadMedia() {
    setLoading(true);
    const supabase = createAdminClient();
    const { data } = await supabase
      .from('media')
      .select('*')
      .order('uploaded_at', { ascending: false });
    setMedia(data || []);
    setLoading(false);
  }

  if (!open) return null;

  const filtered = media.filter(
    (m) =>
      m.filename.toLowerCase().includes(search.toLowerCase()) ||
      (m.alt_text || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Select from Media Library</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black text-xl">✕</button>
        </div>

        <div className="px-6 py-3 border-b border-gray-100">
          <input
            type="text"
            placeholder="Search media…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-12">No media found</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="rounded-lg overflow-hidden border-2 border-transparent hover:border-black transition-colors focus:border-black focus:outline-none flex flex-col"
                >
                  {item.mime_type.startsWith('video/') ? (
                    <div className="aspect-square relative bg-gray-900">
                      <video
                        src={item.url}
                        muted
                        preload="metadata"
                        className="w-full h-full object-cover"
                        onMouseEnter={(e) => { const v = e.currentTarget; v.currentTime = 0; v.play().catch(() => {}); }}
                        onMouseLeave={(e) => { e.currentTarget.pause(); }}
                      />
                      <div className="absolute top-1 right-1 bg-black/70 text-white text-[9px] px-1.5 py-0.5 rounded font-medium">
                        VIDEO
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-square">
                      <img src={item.url} alt={item.alt_text || ''} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="px-1.5 py-1 bg-white">
                    <p className="text-[10px] text-gray-500 truncate">{item.filename}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
