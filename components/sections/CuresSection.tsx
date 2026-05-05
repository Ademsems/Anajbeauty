'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

type Props = { locale: string };
const prefix = (l: string) => (l === 'fr' ? '' : `/${l}`);

type CureItem = {
  id: string;
  type: string;
  title: string;
  description: string;
  price: string;
  note: string;
  cta: string;
};

export default function CuresSection({ locale }: Props) {
  useScrollReveal();
  const t     = useTranslations('cures');
  const items = t.raw('items') as CureItem[];
  const p     = prefix(locale);

  return (
    <section id="cures" className="section-px section-py bg-cream-200 border-b border-sand">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="reveal text-label text-charcoal/50 mb-5">{t('label')}</p>
          <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal whitespace-pre-line mb-4">
            {t('heading')}
          </h2>
          <p className="reveal reveal-delay-2 font-display text-lg italic text-charcoal/50">
            {t('subheading')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={cn(
                'reveal p-12 lg:p-16 text-center flex flex-col items-center border',
                `reveal-delay-${i + 1}`,
                i === 0
                  ? 'bg-cream border-sand'
                  : 'bg-cream border-sand'
              )}
            >
              <span className="text-label text-charcoal/40 mb-6">— {item.type}</span>
              <h3 className="font-display text-display-md text-charcoal mb-6 leading-tight">
                {item.title}
              </h3>
              <div className="h-px w-8 bg-sand mx-auto mb-6" />
              <p className="font-display text-base italic text-charcoal/60 leading-relaxed max-w-xs mb-10">
                {item.description}
              </p>
              <p className="font-display text-3xl text-charcoal mb-1">{item.price}</p>
              <p className="text-label text-charcoal/40 mb-8">{item.note}</p>
              <Link href={`${p}/#contact`} className="btn-ghost">
                {item.cta} →
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
