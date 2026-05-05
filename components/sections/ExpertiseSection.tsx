'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Props = { locale: string };
const prefix = (l: string) => (l === 'fr' ? '' : `/${l}`);

type Category = {
  name: string;
  items: { number: string; title: string; cta: string }[];
};

export default function ExpertiseSection({ locale }: Props) {
  useScrollReveal();
  const t  = useTranslations('expertise');
  const p  = prefix(locale);
  const categories = t.raw('categories') as Category[];

  return (
    <section id="expertise" className="section-px section-py bg-cream-100 border-b border-sand">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="reveal text-label text-charcoal/50 mb-5">{t('label')}</p>
          <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal whitespace-pre-line mb-6">
            {t('heading')}
          </h2>
          <div className="reveal reveal-delay-2 flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-sand" />
            <p className="font-display text-lg italic text-charcoal/50">{t('subheading')}</p>
            <div className="h-px w-10 bg-sand" />
          </div>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-sand">
          {categories.map((cat, ci) => (
            <div key={cat.name} className={`reveal reveal-delay-${ci + 1} bg-cream-100 flex flex-col`}>
              {/* Category header */}
              <div className="flex items-center gap-3 px-8 pt-10 pb-6 border-b border-sand">
                <div className="h-px w-6 bg-charcoal/30" />
                <h3 className="text-label text-charcoal/60">{cat.name}</h3>
              </div>

              {/* Items */}
              <div className="flex flex-col divide-y divide-sand flex-1">
                {cat.items.map((item) => (
                  <div
                    key={item.number}
                    className="group px-8 py-7 hover:bg-cream transition-colors duration-300 cursor-pointer"
                  >
                    <span className="text-label text-charcoal/25 block mb-3">— {item.number}</span>
                    <p className="font-display text-lg text-charcoal leading-snug whitespace-pre-line mb-4">
                      {item.title}
                    </p>
                    <Link
                      href={`${p}/#soins`}
                      className="text-label text-charcoal/50 group-hover:text-navy transition-colors flex items-center gap-1"
                    >
                      {item.cta} <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal reveal-delay-2 flex justify-center mt-12">
          <Link href={`${p}/#contact`} className="btn-navy-outline">
            {t('cta')} →
          </Link>
        </div>

      </div>
    </section>
  );
}
