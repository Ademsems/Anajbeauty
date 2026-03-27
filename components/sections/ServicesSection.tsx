'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import ServiceCard from '@/components/ui/ServiceCard';
import type { Service } from '@/types';

type Props = { locale: string };

export default function ServicesSection({ locale }: Props) {
  useScrollReveal();
  const tm = useTranslations('massages');
  const ts = useTranslations('soins');

  return (
    <>
      {/* ── Massages Section ─────────────────────── */}
      <section id="massages" className="section-px section-py bg-cream-100 border-b border-sand">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
            {/* Sticky label + heading */}
            <div className="lg:sticky lg:top-32">
              <p className="reveal text-label text-sage mb-6">{tm('label')}</p>
              <h2 className="reveal reveal-delay-1 font-display text-display-md text-charcoal whitespace-pre-line">
                {tm('heading')}
              </h2>
              <div className="reveal reveal-delay-2 h-px w-full bg-sand mt-10 hidden lg:block" />
            </div>
            {/* Body text */}
            <div className="reveal reveal-delay-2 flex flex-col justify-center">
              <p className="text-base text-charcoal/70 leading-relaxed font-light max-w-xl">
                {tm('body')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Soins / Treatments Section ──────────── */}
      <section id="soins" className="section-px section-py bg-cream border-b border-sand">
        <div className="max-w-8xl mx-auto">
          {/* Section header */}
          <div className="mb-16 lg:mb-20">
            <div className="flex items-end justify-between gap-8 mb-6">
              <div>
                <p className="reveal text-label text-sage mb-5">{ts('label')}</p>
                <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal whitespace-pre-line">
                  {ts('heading')}
                </h2>
              </div>
            </div>
            <p className="reveal reveal-delay-2 text-base text-charcoal/70 leading-relaxed font-light max-w-2xl">
              {ts('body')}
            </p>
          </div>

          {/* Service Cards Grid */}
          <ServiceCardsGrid locale={locale} />
        </div>
      </section>
    </>
  );
}

function ServiceCardsGrid({ locale }: { locale: string }) {
  const t = useTranslations();
  const services = t.raw('services') as Service[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-sand">
      {services.map((service, i) => (
        <ServiceCard
          key={service.id}
          service={service}
          index={i}
          locale={locale}
        />
      ))}
    </div>
  );
}
