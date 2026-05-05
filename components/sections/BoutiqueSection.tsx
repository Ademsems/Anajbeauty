'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

type Props = { locale: string };
const prefix = (l: string) => (l === 'fr' ? '' : `/${l}`);

type BoutiqueItem = {
  id: string;
  type: string;
  title: string;
  description: string;
  format: string;
  price: string;
  isFeatured: boolean;
};

export default function BoutiqueSection({ locale }: Props) {
  useScrollReveal();
  const t     = useTranslations('boutique');
  const items = t.raw('items') as BoutiqueItem[];
  const p     = prefix(locale);

  return (
    <section id="boutique" className="section-px section-py bg-cream-100 border-b border-sand">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="reveal text-label text-charcoal/50 mb-5">{t('label')}</p>
          <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal whitespace-pre-line mb-4">
            {t('heading')}
          </h2>
          <p className="reveal reveal-delay-2 font-display text-base italic text-charcoal/50">
            {t('subheading')}
          </p>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-sand">
          {items.map((item, i) => (
            <article
              key={item.id}
              className={cn(
                'reveal flex flex-col p-10',
                `reveal-delay-${Math.min(i + 1, 4)}`,
                item.isFeatured ? 'bg-navy text-cream' : 'bg-cream-100'
              )}
            >
              <span className={cn('text-label mb-4', item.isFeatured ? 'text-cream/50' : 'text-charcoal/40')}>
                — {item.type}
              </span>

              <h3
                className={cn(
                  'font-display text-xl leading-snug whitespace-pre-line mb-4',
                  item.isFeatured ? 'text-cream' : 'text-charcoal'
                )}
              >
                {item.title}
              </h3>

              <p
                className={cn(
                  'text-sm leading-relaxed mb-6 font-light flex-1',
                  item.isFeatured ? 'text-cream/70' : 'text-charcoal/60'
                )}
              >
                {item.description}
              </p>

              <div className={cn('h-px mb-5', item.isFeatured ? 'bg-cream/15' : 'bg-sand')} />

              <p className={cn('text-label mb-3', item.isFeatured ? 'text-cream/40' : 'text-charcoal/40')}>
                {item.format}
              </p>

              <p className={cn('font-display text-2xl mb-6', item.isFeatured ? 'text-cream' : 'text-charcoal')}>
                {item.price}
              </p>

              <Link
                href={`${p}/#contact`}
                className={cn(
                  'text-label flex items-center gap-2 transition-colors',
                  item.isFeatured ? 'text-cream hover:text-cream/70' : 'text-navy hover:text-navy-dark'
                )}
              >
                {locale === 'fr' ? 'Découvrir' : 'Discover'} →
              </Link>
            </article>
          ))}
        </div>

        {/* Gift card note */}
        <p className="reveal reveal-delay-2 text-center text-sm text-charcoal/40 font-light italic mt-10">
          {t('gift_card')}
        </p>

      </div>
    </section>
  );
}
