'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Props = { locale: string };
type Testimonial = { quote: string; name: string; role: string };

export default function TestimonialsSection({ locale }: Props) {
  useScrollReveal();
  const t     = useTranslations('testimonials');
  const items = t.raw('items') as Testimonial[];

  return (
    <section id="testimonials" className="section-px section-py bg-cream border-b border-sand">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="reveal text-label text-charcoal/50 mb-5">{t('label')}</p>
          <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal">
            {t('heading')}
          </h2>
          <div className="reveal reveal-delay-2 h-px w-8 bg-sand mx-auto mt-8" />
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sand">
          {items.map((item, i) => (
            <div
              key={item.name}
              className={`reveal bg-cream p-10 lg:p-12 flex flex-col reveal-delay-${i + 1}`}
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-8">
                <span className="text-charcoal/30 text-label">—</span>
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="text-gold text-xs">★</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-display text-lg italic text-charcoal/70 leading-relaxed mb-10 flex-1">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div>
                <div className="h-px w-6 bg-sand mb-5" />
                <p className="text-label text-charcoal">{item.name}</p>
                <p className="text-label text-charcoal/40 mt-1">{item.role}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
