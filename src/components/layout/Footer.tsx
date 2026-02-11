'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('common');

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold tracking-[0.3em] uppercase mb-4">Bold</h3>
            <p className="text-warm-400 text-sm leading-relaxed">
              Premium audio & visual technology in Kosovo
            </p>
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
            <p className="text-sm text-warm-300">Prishtina, Kosovo</p>
            <p className="text-sm text-warm-300 mt-1">info@bold-ks.com</p>
          </div>
        </div>

        <div className="border-t border-warm-800 mt-12 pt-8 text-center">
          <p className="text-xs text-warm-500">&copy; {new Date().getFullYear()} Bold. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
