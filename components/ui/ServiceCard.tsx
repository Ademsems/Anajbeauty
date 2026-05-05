'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type Service = {
  id: string;
  name: string;
  category: string;
  price: string;
  duration: string;
  description: string;
  highlights: string[];
};

type Props = {
  service: Service;
  index: number;
  locale: string;
};

const prefix = (locale: string) => (locale === 'fr' ? '' : `/${locale}`);

export default function ServiceCard({ service, index, locale }: Props) {
  const [hovered, setHovered] = useState(false);
  const t = useTranslations('pricing');
  const p = prefix(locale);

  return (
    <div
      className={cn(
        'reveal bg-cream group relative overflow-hidden cursor-default',
        `reveal-delay-${(index % 4) + 1}`
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background fill on hover */}
      <div
        className={cn(
          'absolute inset-0 bg-charcoal transition-transform duration-700 origin-bottom',
          hovered ? 'scale-y-100' : 'scale-y-0'
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      />

      <div className="relative z-10 p-10 lg:p-14 flex flex-col gap-6 min-h-[28rem]">
        {/* Top: category + price */}
        <div className="flex items-start justify-between">
          <span
            className={cn(
              'text-label transition-colors duration-500',
              hovered ? 'text-sage' : 'text-sage'
            )}
          >
            {service.category}
          </span>
          <span
            className={cn(
              'font-display text-3xl transition-colors duration-500',
              hovered ? 'text-cream' : 'text-charcoal'
            )}
          >
            {service.price}€
          </span>
        </div>

        {/* Name */}
        <h3
          className={cn(
            'font-display text-display-md transition-colors duration-500',
            hovered ? 'text-cream' : 'text-charcoal'
          )}
        >
          {service.name}
        </h3>

        {/* Duration */}
        <p
          className={cn(
            'text-label transition-colors duration-500',
            hovered ? 'text-cream/50' : 'text-charcoal/40'
          )}
        >
          {t('duration')} — {service.duration}
        </p>

        {/* Description */}
        <p
          className={cn(
            'text-sm leading-relaxed font-light flex-1 transition-colors duration-500',
            hovered ? 'text-cream/80' : 'text-charcoal/60'
          )}
        >
          {service.description}
        </p>

        {/* Highlights */}
        <ul className="flex flex-wrap gap-2">
          {service.highlights.map((h) => (
            <li
              key={h}
              className={cn(
                'text-label border px-3 py-1.5 transition-all duration-500',
                hovered
                  ? 'border-cream/20 text-cream/70'
                  : 'border-sand text-charcoal/50'
              )}
            >
              {h}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={`${p}/#contact`}
          className={cn(
            'inline-flex items-center gap-3 text-label transition-all duration-500 mt-2 group/link',
            hovered ? 'text-cream' : 'text-charcoal'
          )}
        >
          {t('cta')}
          <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  );
}
