'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface FooterContent {
  description?: string;
  address?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
}

export function Footer() {
  const t = useTranslations('common');
  const locale = useLocale();
  const [content, setContent] = useState<FooterContent>({});

  useEffect(() => {
    async function load() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from('site_content')
          .select('*')
          .eq('page', 'footer');

        if (data && data.length > 0) {
          const vf = locale === 'sq' ? 'value_sq' : 'value_en';
          const c: FooterContent = {};
          for (const item of data as Record<string, string | null>[]) {
            const k = item.key as string;
            const v = (item[vf] || item.value_en || '') as string;
            if (k === 'footer-description') c.description = v;
            if (k === 'footer-address') c.address = v;
            if (k === 'footer-email') c.email = v;
            if (k === 'footer-phone') c.phone = v;
            if (k === 'social-instagram') c.instagram = item.value_en as string;
            if (k === 'social-facebook') c.facebook = item.value_en as string;
            if (k === 'social-tiktok') c.tiktok = item.value_en as string;
            if (k === 'social-youtube') c.youtube = item.value_en as string;
          }
          setContent(c);
        }
      } catch {
        // fallback
      }
    }
    load();
  }, [locale]);

  const description = content.description || 'Premium audio & visual technology in Kosovo';
  const address = content.address || 'Prishtina, Kosovo';
  const email = content.email || 'info@bold-ks.com';

  const socialLinks = [
    { url: content.instagram, label: 'Instagram', icon: InstagramIcon },
    { url: content.facebook, label: 'Facebook', icon: FacebookIcon },
    { url: content.tiktok, label: 'TikTok', icon: TikTokIcon },
    { url: content.youtube, label: 'YouTube', icon: YouTubeIcon },
  ].filter((s) => s.url);

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold tracking-[0.3em] uppercase mb-4">Bold</h3>
            <p className="text-warm-400 text-sm leading-relaxed">
              {description}
            </p>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 mt-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warm-400 hover:text-white transition-colors"
                    aria-label={s.label}
                  >
                    <s.icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Brands */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-warm-400 mb-4">Brands</h4>
            <ul className="space-y-2">
              <li><Link href="/bang-olufsen" className="text-sm text-warm-300 hover:text-white transition-colors">Bang & Olufsen</Link></li>
              <li><Link href="/devialet" className="text-sm text-warm-300 hover:text-white transition-colors">Devialet</Link></li>
              <li><Link href="/loewe" className="text-sm text-warm-300 hover:text-white transition-colors">Loewe</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-warm-400 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-warm-300 hover:text-white transition-colors">{t('about')}</Link></li>
              <li><Link href="/contact" className="text-sm text-warm-300 hover:text-white transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-warm-400 mb-4">{t('contact')}</h4>
            <p className="text-sm text-warm-300">{address}</p>
            <p className="text-sm text-warm-300 mt-1">{email}</p>
            {content.phone && <p className="text-sm text-warm-300 mt-1">{content.phone}</p>}
          </div>
        </div>

        <div className="border-t border-warm-800 mt-10 md:mt-12 pt-6 md:pt-8 text-center">
          <p className="text-xs text-warm-500">&copy; {new Date().getFullYear()} Bold. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}
