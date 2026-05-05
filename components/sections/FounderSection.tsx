'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Props = { locale: string };
const prefix = (l: string) => (l === 'fr' ? '' : `/${l}`);

export default function FounderSection({ locale }: Props) {
  useScrollReveal();
  const t = useTranslations('founder');
  const p = prefix(locale);

  return (
    <section id="about" className="border-b border-sand">

      {/* ── Method block ─────────────────────────────── */}
      <div className="section-px section-py bg-cream-100">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: photo placeholder */}
          <div className="reveal order-2 lg:order-1">
            <div className="relative aspect-[3/4] bg-cream-200 border border-sand overflow-hidden">
              <Image
                src="/images/jana-atelier.jpg"
                alt="Jana — Fondatrice d'Anaj Beauty dans l'atelier"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* fallback label when no image */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 pointer-events-none">
                <p className="text-label text-charcoal/15 tracking-widest">PHOTO JANA</p>
                <p className="text-label text-charcoal/15 tracking-widest">ATELIER · LIFESTYLE</p>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div className="order-1 lg:order-2">
            <p className="reveal text-label text-charcoal/50 mb-5">{t('label')}</p>
            <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal whitespace-pre-line mb-8">
              {t('heading')}
            </h2>
            <p className="reveal reveal-delay-2 font-display text-base italic text-charcoal/60 leading-relaxed mb-6">
              {t('body1')}
            </p>
            <p className="reveal reveal-delay-2 font-display text-base italic text-charcoal/60 leading-relaxed mb-6">
              {t('body2')}
            </p>
            <p className="reveal reveal-delay-3 font-display text-base italic text-charcoal/60 leading-relaxed mb-10">
              {t('body3')}
            </p>
            <div className="reveal reveal-delay-3">
              <Link href={`${p}/#contact`} className="btn-navy-outline">
                {t('cta')} →
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── About Jana block ─────────────────────────── */}
      <div className="section-px section-py bg-cream-200">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: text */}
          <div>
            <p className="reveal text-label text-charcoal/50 mb-3">{t('about_label')}</p>
            <h2 className="reveal reveal-delay-1 font-display text-display-md text-charcoal whitespace-pre-line mb-8">
              {t('about_heading')}
            </h2>
            <p className="reveal reveal-delay-2 text-charcoal/70 leading-relaxed text-base mb-5 font-light">
              {t('about_body1')}
            </p>
            <p className="reveal reveal-delay-2 text-charcoal/70 leading-relaxed text-base font-light">
              {t('about_body2')}
            </p>
            <div className="reveal reveal-delay-3 flex items-center gap-4 mt-10">
              <div className="h-px w-12 bg-sand" />
              <span className="font-display text-xl italic text-charcoal/50">{t('signature')}</span>
            </div>
          </div>

          {/* Right: portrait */}
          <div className="reveal reveal-delay-2">
            <div className="relative aspect-[3/4] overflow-hidden bg-cream-300">
              <Image
                src="/images/jana-portrait.jpg"
                alt="Jana — Fondatrice d'Anaj Beauty"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-label text-charcoal/10 tracking-widest">PHOTO PORTRAIT JANA</p>
              </div>
              <div className="absolute bottom-5 right-5 w-14 h-14 border border-cream/50" />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
