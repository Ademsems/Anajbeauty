'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

type Props = { locale: string };
type FaqItem = { question: string; answer: string };

export default function FAQSection({ locale }: Props) {
  useScrollReveal();
  const t     = useTranslations('faq');
  const items = t.raw('items') as FaqItem[];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-px section-py bg-cream border-b border-sand">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="reveal text-label text-charcoal/50 mb-5">{t('label')}</p>
          <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal">
            {t('heading')}
          </h2>
          <div className="reveal reveal-delay-2 h-px w-8 bg-sand mx-auto mt-8" />
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto border-t border-sand">
          {items.map((item, i) => (
            <div key={i} className="reveal border-b border-sand">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 text-left group"
                aria-expanded={open === i}
              >
                <span className={cn(
                  'text-label transition-colors duration-200',
                  open === i ? 'text-navy' : 'text-charcoal group-hover:text-navy'
                )}>
                  {item.question}
                </span>
                <span
                  className={cn(
                    'ml-6 shrink-0 w-5 h-5 border border-charcoal/30 flex items-center justify-center transition-all duration-300',
                    open === i ? 'bg-navy border-navy rotate-45' : 'group-hover:border-navy'
                  )}
                >
                  <span className={cn('text-xs leading-none', open === i ? 'text-cream' : 'text-charcoal/50')}>
                    +
                  </span>
                </span>
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-500',
                  open === i ? 'max-h-96 pb-8' : 'max-h-0'
                )}
              >
                <p className="text-sm text-charcoal/65 leading-relaxed font-light pr-12">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
