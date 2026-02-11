import { useTranslations } from 'next-intl';
import { AboutContent } from '@/components/about/AboutContent';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      <section className="h-[50vh] md:h-[60vh] bg-warm-50 flex items-center justify-center">
        <div className="text-center px-4 md:px-6">
          <h1 className="text-3xl md:text-7xl font-light tracking-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-warm-500 text-base md:text-xl max-w-lg mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <AboutContent />
    </>
  );
}
