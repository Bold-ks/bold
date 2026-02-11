'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

const text = {
  sq: {
    message: 'Ky uebsajt përdor cookies për të përmirësuar përvojën tuaj.',
    accept: 'Pranoj',
    decline: 'Refuzoj',
  },
  en: {
    message: 'This website uses cookies to enhance your experience.',
    accept: 'Accept',
    decline: 'Decline',
  },
};

export function CookieConsent() {
  const locale = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Delay slightly for better UX
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function handleResponse(accepted: boolean) {
    localStorage.setItem('cookie-consent', accepted ? 'accepted' : 'declined');
    setShow(false);
  }

  const t = text[locale as 'sq' | 'en'] || text.en;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4"
        >
          <div className="max-w-xl mx-auto bg-black text-white rounded-xl px-5 py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 shadow-2xl">
            <p className="text-sm text-warm-300 flex-1 text-center sm:text-left">
              {t.message}
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleResponse(false)}
                className="px-4 py-1.5 text-xs tracking-wider uppercase text-warm-400 hover:text-white border border-warm-700 rounded-md transition-colors"
              >
                {t.decline}
              </button>
              <button
                onClick={() => handleResponse(true)}
                className="px-4 py-1.5 text-xs tracking-wider uppercase bg-white text-black rounded-md hover:bg-warm-200 transition-colors"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
