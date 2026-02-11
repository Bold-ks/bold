'use client';

import { useTranslations } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('contact');

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="text-xs tracking-widest uppercase text-warm-400 block mb-2">
          {t('name')}
        </label>
        <input
          type="text"
          className="w-full border-b border-warm-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm"
        />
      </div>
      <div>
        <label className="text-xs tracking-widest uppercase text-warm-400 block mb-2">
          {t('email')}
        </label>
        <input
          type="email"
          className="w-full border-b border-warm-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm"
        />
      </div>
      <div>
        <label className="text-xs tracking-widest uppercase text-warm-400 block mb-2">
          {t('phone')}
        </label>
        <input
          type="tel"
          className="w-full border-b border-warm-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm"
        />
      </div>
      <div>
        <label className="text-xs tracking-widest uppercase text-warm-400 block mb-2">
          {t('message')}
        </label>
        <textarea
          rows={4}
          className="w-full border-b border-warm-300 py-2 bg-transparent focus:outline-none focus:border-black transition-colors text-sm resize-none"
        />
      </div>
      <button
        type="submit"
        className="bg-black text-white px-10 py-3 text-sm tracking-widest uppercase hover:bg-warm-800 transition-colors"
      >
        {t('send')}
      </button>
    </form>
  );
}
