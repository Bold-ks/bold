import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/contact/ContactForm';

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <section className="py-24 md:py-32 max-w-4xl mx-auto px-6 md:px-12">
      <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
        {t('title')}
      </h1>
      <p className="text-warm-500 text-lg mb-16 max-w-lg">
        {t('subtitle')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <ContactForm />

        <div>
          <div className="mb-8">
            <h3 className="text-xs tracking-widest uppercase text-warm-400 mb-2">
              {t('address')}
            </h3>
            <p className="text-sm">Prishtina, Kosovo</p>
          </div>
          <div className="mb-8">
            <h3 className="text-xs tracking-widest uppercase text-warm-400 mb-2">
              Email
            </h3>
            <p className="text-sm">info@bold-ks.com</p>
          </div>
          <div>
            <h3 className="text-xs tracking-widest uppercase text-warm-400 mb-2">
              {t('workingHours')}
            </h3>
            <p className="text-sm">Mon - Sat: 10:00 - 20:00</p>
          </div>
        </div>
      </div>
    </section>
  );
}
