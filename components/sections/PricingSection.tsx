'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import type { Service } from '@/types';

type Props = { locale: string };
const prefix = (locale: string) => (locale === 'fr' ? '' : `/${locale}`);

export default function PricingSection({ locale }: Props) {
  useScrollReveal();
  const t = useTranslations('pricing');
  const tRoot = useTranslations();
  const p = prefix(locale);
  const services = tRoot.raw('services') as Service[];

  return (
    <section id="tarifs" className="section-px section-py bg-cream-100 border-b border-sand">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 lg:mb-20">
          <div>
            <p className="reveal text-label text-sage mb-5">{t('label')}</p>
            <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal whitespace-pre-line">
              {t('heading')}
            </h2>
          </div>
          <div className="reveal reveal-delay-2">
            <Link href={`${p}/#contact`} className="btn-primary">
              {t('cta')} <span>→</span>
            </Link>
          </div>
        </div>

        {/* Pricing table */}
        <div className="border-t border-sand">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={cn(
                'reveal reveal-delay-1 group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6',
                'border-b border-sand py-10 lg:py-12',
                'hover:bg-cream transition-colors duration-300 -mx-6 px-6 lg:-mx-12 lg:px-12'
              )}
            >
              {/* Left: info */}
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                <span className="text-label text-charcoal/25 w-8 shrink-0 mt-1">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-3 mb-3">
                    <span className="text-label text-sage">{service.category}</span>
                    <h3 className="font-display text-2xl text-charcoal">{service.name}</h3>
                  </div>
                  <p className="text-sm text-charcoal/60 font-light leading-relaxed max-w-lg">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {service.highlights.map((h) => (
                      <span key={h} className="text-label border border-sand px-3 py-1 text-charcoal/50">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: price + duration */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:gap-2 shrink-0">
                <span className="font-display text-4xl text-charcoal">{service.price}€</span>
                <span className="text-label text-charcoal/40">{service.duration}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="reveal reveal-delay-1 text-sm text-charcoal/40 font-light mt-8 text-center">
          {locale === 'fr'
            ? 'Tous nos tarifs sont affichés TTC. Paiement en espèces ou carte bleue.'
            : 'All prices include taxes. Payment by cash or credit card.'}
        </p>
      </div>
    </section>
  );
}
