'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Props = { locale: string };
type Step = { number: string; title: string; body: string };

export default function MethodeSection({ locale }: Props) {
  useScrollReveal();
  const t     = useTranslations('methode');
  const steps = t.raw('steps') as Step[];

  return (
    <section id="methode" className="section-px section-py bg-cream-200 border-b border-sand">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="reveal text-label text-charcoal/50 mb-5">{t('label')}</p>
          <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal whitespace-pre-line">
            {t('heading')}
          </h2>
          <div className="reveal reveal-delay-2 h-px w-8 bg-sand mx-auto mt-8" />
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sand">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal reveal-delay-${i + 1} bg-cream-200 px-10 lg:px-16 py-14 text-center`}
            >
              <span className="font-display text-6xl text-navy/20 block mb-6 leading-none">
                {step.number}
              </span>
              <div className="h-px w-8 bg-sand mx-auto mb-6" />
              <h3 className="text-label text-charcoal mb-5">{step.title}</h3>
              <p className="text-sm text-charcoal/60 leading-relaxed font-light">
                {step.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
