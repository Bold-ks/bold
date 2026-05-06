'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { createAdminClient } from '@/lib/supabase/admin-client';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

const STATUS_OPTIONS: ContactSubmission['status'][] = ['new', 'read', 'replied', 'archived'];

const STATUS_STYLES: Record<ContactSubmission['status'], string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  read: 'bg-gray-50 text-gray-700 border-gray-200',
  replied: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  archived: 'bg-amber-50 text-amber-700 border-amber-200',
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function ContactsPage() {
  const [items, setItems] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | ContactSubmission['status']>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('Failed to load submissions');
    } else {
      setItems((data || []) as ContactSubmission[]);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: ContactSubmission['status']) {
    const supabase = createAdminClient();
    const prev = items;
    setItems((rows) => rows.map((r) => (r.id === id ? { ...r, status } : r)));
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status })
      .eq('id', id);
    if (error) {
      setItems(prev);
      toast.error('Failed to update status');
    }
  }

  async function deleteRow(id: string) {
    if (!confirm('Delete this submission permanently?')) return;
    const supabase = createAdminClient();
    const prev = items;
    setItems((rows) => rows.filter((r) => r.id !== id));
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
    if (error) {
      setItems(prev);
      toast.error('Failed to delete');
    } else {
      toast.success('Deleted');
    }
  }

  const filtered = filter === 'all' ? items : items.filter((r) => r.status === filter);
  const counts = {
    all: items.length,
    new: items.filter((r) => r.status === 'new').length,
    read: items.filter((r) => r.status === 'read').length,
    replied: items.filter((r) => r.status === 'replied').length,
    archived: items.filter((r) => r.status === 'archived').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Contacts</h1>
        <button
          onClick={load}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {(['all', 'new', 'read', 'replied', 'archived'] as const).map((key) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
              filter === key
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="capitalize">{key}</span>
            <span className="ml-2 text-xs opacity-70">{counts[key]}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
          Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500 text-sm">
          No submissions {filter !== 'all' ? `with status "${filter}"` : 'yet'}.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-100">
            {filtered.map((row) => {
              const isOpen = expanded === row.id;
              return (
                <li key={row.id} className="p-4 md:p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{row.name}</span>
                        <span
                          className={`px-2 py-0.5 text-xs rounded-full border ${STATUS_STYLES[row.status]}`}
                        >
                          {row.status}
                        </span>
                        <span className="text-xs text-gray-400">{formatDate(row.created_at)}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-gray-500 mb-2">
                        <a
                          href={`mailto:${row.email}`}
                          className="hover:text-black transition-colors"
                        >
                          {row.email}
                        </a>
                        {row.phone && (
                          <a
                            href={`tel:${row.phone}`}
                            className="hover:text-black transition-colors"
                          >
                            {row.phone}
                          </a>
                        )}
                      </div>
                      <p
                        className={`text-sm text-gray-700 whitespace-pre-wrap ${
                          isOpen ? '' : 'line-clamp-2'
                        }`}
                      >
                        {row.message}
                      </p>
                      {row.message.length > 140 && (
                        <button
                          onClick={() => setExpanded(isOpen ? null : row.id)}
                          className="mt-1 text-xs text-gray-500 hover:text-black"
                        >
                          {isOpen ? 'Show less' : 'Show more'}
                        </button>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <select
                        value={row.status}
                        onChange={(e) =>
                          updateStatus(row.id, e.target.value as ContactSubmission['status'])
                        }
                        className="text-xs border border-gray-200 rounded-md px-2 py-1 bg-white"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => deleteRow(row.id)}
                        className="text-xs text-gray-400 hover:text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
