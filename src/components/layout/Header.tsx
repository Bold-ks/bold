'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const brandLinks = [
  { href: '/bang-olufsen', label: 'Bang & Olufsen' },
  { href: '/devialet', label: 'Devialet' },
  { href: '/loewe', label: 'Loewe' },
];

export function Header() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-100">
        <div className="flex items-center justify-between px-6 md:px-12 h-16">
          <Link href="/" className="text-xl font-semibold tracking-[0.3em] uppercase">
            Bold
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {brandLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide transition-colors hover:text-black ${
                  pathname.startsWith(link.href) ? 'text-black' : 'text-warm-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-2 text-xs tracking-wide">
              <Link href={pathname} locale="sq" className="hover:text-black text-warm-500">
                SQ
              </Link>
              <span className="text-warm-300">|</span>
              <Link href={pathname} locale="en" className="hover:text-black text-warm-500">
                EN
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-sm tracking-wide"
            >
              {menuOpen ? t('close') : t('menu')}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-white pt-16"
          >
            <nav className="flex flex-col items-center gap-8 pt-16">
              {brandLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-light tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-4 pt-8 text-sm tracking-wide">
                <Link href={pathname} locale="sq" onClick={() => setMenuOpen(false)}>
                  Shqip
                </Link>
                <span className="text-warm-300">|</span>
                <Link href={pathname} locale="en" onClick={() => setMenuOpen(false)}>
                  English
                </Link>
              </div>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 text-sm tracking-wide text-warm-500"
              >
                {t('contactUs')}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
