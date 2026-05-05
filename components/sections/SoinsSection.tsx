'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

type Props = { locale: string };
const prefix = (l: string) => (l === 'fr' ? '' : `/${l}`);

type SoinItem = {
  id: string;
  name: string;
  category: string;
  type: string;
  subtitle: string;
  duration: string;
  price: string;
  price2: string | null;
  description: string;
  highlights: string[];
  isNew: boolean;
  isFeatured: boolean;
};

export default function SoinsSection({ locale }: Props) {
  useScrollReveal();
  const t    = useTranslations('soins');
  const tabs = t.raw('tabs') as Record<string, string>;
  const items = t.raw('items') as SoinItem[];
  const p    = prefix(locale);

  const [activeTab, setActiveTab] = useState<string>('all');

  const tabKeys = ['all', 'visage', 'corps', 'cheveux'];
  const filtered = activeTab === 'all' ? items : items.filter((s) => s.type === activeTab);

  return (
    <section id="soins" className="section-px section-py bg-cream border-b border-sand">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <div className="mb-10 lg:mb-14">
          <p className="reveal text-label text-charcoal/50 mb-5">{t('label')}</p>
          <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal mb-3">
            {t('heading')}
          </h2>
          <p className="reveal reveal-delay-2 font-display text-lg italic text-charcoal/50">
            {t('subheading')}
          </p>
        </div>

        {/* Tabs */}
        <div className="reveal reveal-delay-2 flex border-b border-sand mb-12 gap-0">
          {tabKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={cn(
                'text-label px-8 py-4 border-b-2 transition-all duration-300 -mb-px',
                activeTab === key
                  ? 'border-charcoal text-charcoal'
                  : 'border-transparent text-charcoal/40 hover:text-charcoal/70'
              )}
            >
              {tabs[key]}
            </button>
          ))}
        </div>

        {/* Treatment cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-sand">
          {filtered.map((soin, i) => (
            <SoinCard key={soin.id} soin={soin} index={i} locale={locale} t={t} p={p} />
          ))}
        </div>

        {/* CTA */}
        {activeTab !== 'all' && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setActiveTab('all')}
              className="btn-navy-outline"
            >
              {t('cta_all')} →
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

function SoinCard({
  soin, index, locale, t, p,
}: {
  soin: SoinItem;
  index: number;
  locale: string;
  t: any;
  p: string;
}) {
  return (
    <article
      className={cn(
        'reveal group bg-cream hover:bg-cream-200 transition-colors duration-300 p-8 flex flex-col',
        `reveal-delay-${Math.min((index % 4) + 1, 4)}`,
        soin.isFeatured && 'bg-navy hover:bg-navy-dark text-cream'
      )}
    >
      {/* Category + New badge */}
      <div className="flex items-center justify-between mb-5">
        <span
          className={cn(
            'text-label',
            soin.isFeatured ? 'text-cream/60' : 'text-charcoal/40'
          )}
        >
          — {soin.category}
        </span>
        {soin.isNew && (
          <span className="text-label bg-gold text-charcoal px-3 py-1 text-[0.55rem]">
            {t('new')}
          </span>
        )}
      </div>

      {/* Name */}
      <h3
        className={cn(
          'font-display text-xl leading-snug whitespace-pre-line mb-2',
          soin.isFeatured ? 'text-cream' : 'text-charcoal'
        )}
      >
        {soin.name}
      </h3>

      {/* Subtitle */}
      <p
        className={cn(
          'font-display text-sm italic mb-5',
          soin.isFeatured ? 'text-cream/60' : 'text-charcoal/50'
        )}
      >
        {soin.subtitle}
      </p>

      <div className={cn('h-px mb-6', soin.isFeatured ? 'bg-cream/20' : 'bg-sand')} />

      {/* Duration + Price */}
      <div className="mt-auto">
        <p className={cn('text-label mb-1', soin.isFeatured ? 'text-cream/50' : 'text-charcoal/40')}>
          {soin.duration}
        </p>
        <p className={cn('font-display text-2xl', soin.isFeatured ? 'text-cream' : 'text-charcoal')}>
          €{soin.price}
          {soin.price2 && (
            <span className={cn('text-lg', soin.isFeatured ? 'text-cream/70' : 'text-charcoal/50')}>
              {' '}/ €{soin.price2}
            </span>
          )}
        </p>

        {/* Hover CTA */}
        <Link
          href={`${p}/#contact`}
          className={cn(
            'mt-5 text-label flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0',
            soin.isFeatured ? 'text-cream' : 'text-navy'
          )}
        >
          Réserver →
        </Link>
      </div>
    </article>
  );
}
