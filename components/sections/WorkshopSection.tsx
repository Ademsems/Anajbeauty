'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Props = { locale: string };
const prefix = (l: string) => (l === 'fr' ? '' : `/${l}`);
type Detail = { label: string; value: string };

export default function WorkshopSection({ locale }: Props) {
  useScrollReveal();
  const t       = useTranslations('workshop');
  const details = t.raw('details') as Detail[];
  const p       = prefix(locale);

  return (
    <section id="workshop" className="section-px section-py bg-navy border-b border-navy-dark">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left: Content */}
          <div>
            <div className="reveal inline-flex items-center gap-3 border border-cream/20 px-4 py-2 mb-8">
              <span className="text-label text-cream/60">{t('label')}</span>
              <span className="text-label text-cream/30">·</span>
              <span className="text-label text-cream/60">{t('date_label')}</span>
            </div>

            <h2 className="reveal reveal-delay-1 font-display text-display-lg text-cream whitespace-pre-line mb-6">
              {t('heading')}
            </h2>

            <div className="reveal reveal-delay-2 h-px w-8 bg-cream/20 mb-8" />

            <p className="reveal reveal-delay-2 font-display text-base italic text-cream/60 leading-relaxed mb-10 max-w-lg">
              {t('description')}
            </p>

            {/* Details table */}
            <div className="reveal reveal-delay-3 border border-cream/10 mb-10">
              {details.map((d, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-cream/10 last:border-0">
                  <span className="text-sm text-cream/40 font-light">{d.label}</span>
                  <span className="text-sm text-cream font-medium text-right">{d.value}</span>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-4">
              <Link href={`${p}/#contact`} className="btn-ghost-light">
                {t('cta')} →
              </Link>
            </div>
          </div>

          {/* Right: Photo placeholder */}
          <div className="reveal reveal-delay-2">
            <div className="relative aspect-[4/5] bg-navy-dark border border-cream/10 overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 gap-3">
                <p className="text-label text-cream/20 tracking-widest">PHOTO WORKSHOP ATELIER</p>
                <p className="text-label text-cream/20 tracking-widest">PEPTIDES · SKINCARE</p>
                <p className="text-label text-cream/20 tracking-widest">SUMMER PREP</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
