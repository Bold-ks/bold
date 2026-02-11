import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      <section className="h-[60vh] bg-warm-50 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-7xl font-light tracking-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-warm-500 text-lg md:text-xl max-w-lg mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl font-light mb-8">{t('story')}</h2>
        <div className="text-warm-600 leading-relaxed space-y-6">
          <p>
            Bold is Kosovo&apos;s premier destination for luxury audio and visual technology. 
            We are the authorized retailer for three of the world&apos;s most prestigious brands: 
            Bang &amp; Olufsen, Devialet, and Loewe.
          </p>
          <p>
            Our mission is to bring world-class sound and visual experiences to Kosovo, 
            offering expert guidance and personalized service to help you find the perfect 
            products for your home and lifestyle.
          </p>
        </div>
      </section>
    </>
  );
}
