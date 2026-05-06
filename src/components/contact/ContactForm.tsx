'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { createAdminClient } from '@/lib/supabase/admin-client';

export function ContactForm() {
  const t = useTranslations('contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error(t('errorRequired'));
      return;
    }
    setSubmitting(true);
    try {
      // createAdminClient is just an untyped browser client with the anon key
      // (the name is a misnomer in this codebase). We use it here because the
      // contact_submissions table isn't in the generated Database types yet.
      const supabase = createAdminClient();
      const { error } = await supabase.from('contact_submissions').insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        message: message.trim(),
      });
      if (error) {
        toast.error(t('errorGeneric'));
        return;
      }
      toast.success(t('successMessage'));
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      toast.error(t('errorGeneric'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="text-xs tracking-widest uppercase text-warm-400 block mb-2">
          {t('name')}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={submitting}
          className="w-full border-b border-warm-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm disabled:opacity-50"
        />
      </div>
      <div>
        <label className="text-xs tracking-widest uppercase text-warm-400 block mb-2">
          {t('email')}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={submitting}
          className="w-full border-b border-warm-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm disabled:opacity-50"
        />
      </div>
      <div>
        <label className="text-xs tracking-widest uppercase text-warm-400 block mb-2">
          {t('phone')}
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={submitting}
          className="w-full border-b border-warm-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm disabled:opacity-50"
        />
      </div>
      <div>
        <label className="text-xs tracking-widest uppercase text-warm-400 block mb-2">
          {t('message')}
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          disabled={submitting}
          className="w-full border-b border-warm-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm resize-none disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white px-10 py-3 text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? t('sending') : t('send')}
      </button>
    </form>
  );
}
