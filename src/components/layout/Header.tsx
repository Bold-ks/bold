'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-100">
        <div className="flex items-center justify-between px-4 md:px-12 h-14 md:h-16">
          <Link href="/" className="text-lg md:text-xl font-semibold tracking-[0.3em] uppercase">
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

          <div className="flex items-center gap-4 md:gap-6">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-warm-500 hover:text-black transition-colors"
              aria-label={t('search')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>

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
              className="md:hidden text-xs tracking-widest uppercase text-warm-500"
            >
              {menuOpen ? t('close') : t('menu')}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-warm-100"
            >
              <div className="px-4 md:px-12 py-3">
                <div className="relative max-w-xl mx-auto">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('search') + '...'}
                    className="w-full bg-warm-50 border border-warm-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        window.location.href = `/${pathname.split('/')[1] || 'sq'}/search?q=${encodeURIComponent(searchQuery.trim())}`;
                      }
                      if (e.key === 'Escape') setSearchOpen(false);
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-400 hover:text-black"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 z-40 bg-white pt-14"
          >
            <nav className="flex flex-col items-center gap-6 pt-12">
              {brandLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-light tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-light tracking-wide text-warm-500"
              >
                {t('about')}
              </Link>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="text-lg font-light tracking-wide text-warm-500"
              >
                {t('contactUs')}
              </Link>
              <div className="flex gap-4 pt-6 text-sm tracking-wide">
                <Link href={pathname} locale="sq" onClick={() => setMenuOpen(false)}>
                  Shqip
                </Link>
                <span className="text-warm-300">|</span>
                <Link href={pathname} locale="en" onClick={() => setMenuOpen(false)}>
                  English
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-14 md:h-16" />
    </>
  );
}
