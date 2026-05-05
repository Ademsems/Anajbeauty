'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Props = { locale: string };
const prefix = (l: string) => (l === 'fr' ? '' : `/${l}`);
type AvantItem = { title: string; detail: string; session1: string; session2: string };

export default function AvantApresSection({ locale }: Props) {
  useScrollReveal();
  const t     = useTranslations('avantapres');
  const items = t.raw('items') as AvantItem[];
  const p     = prefix(locale);

  return (
    <section id="resultats" className="section-px section-py bg-cream-100 border-b border-sand">
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

        {/* Grid: first 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {items.slice(0, 3).map((item, i) => (
            <AvantApresCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Grid: next 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {items.slice(3, 6).map((item, i) => (
            <AvantApresCard key={i + 3} item={item} index={i + 3} />
          ))}
        </div>

        {/* Last one */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.slice(6).map((item, i) => (
            <AvantApresCard key={i + 6} item={item} index={i + 6} />
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

function AvantApresCard({ item, index }: { item: AvantItem; index: number }) {
  return (
    <article className={`reveal reveal-delay-${Math.min((index % 3) + 1, 4)} group`}>
      {/* Before / After split image */}
      <div className="grid grid-cols-2 gap-0 mb-4 overflow-hidden border border-sand">
        <div className="relative aspect-square bg-cream-200 flex flex-col items-start justify-end p-3">
          <span className="text-label text-charcoal/60 text-[0.55rem] bg-cream px-2 py-1">AVANT</span>
          <p className="text-label text-charcoal/25 text-[0.5rem] mt-1 absolute top-3 left-3">{item.session1}</p>
        </div>
        <div className="relative aspect-square bg-cream-300 flex flex-col items-start justify-end p-3">
          <span className="text-label text-charcoal/60 text-[0.55rem] bg-cream px-2 py-1">APRÈS</span>
          <p className="text-label text-charcoal/25 text-[0.5rem] mt-1 absolute top-3 left-3">{item.session2}</p>
        </div>
      </div>
      {/* Caption */}
      <div className="px-1">
        <h3 className="text-label text-charcoal mb-1">{item.title}</h3>
        <p className="font-display text-sm italic text-charcoal/50">{item.detail}</p>
      </div>
    </article>
  );
}
