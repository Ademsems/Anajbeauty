'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Props = { locale: string };

export default function AboutSection({ locale }: Props) {
  useScrollReveal();
  const t = useTranslations('about');

  const values = t.raw('values') as { number: string; title: string; text: string }[];

  return (
    <section id="about" className="section-px section-py bg-cream border-b border-sand">
      <div className="max-w-8xl mx-auto">

        {/* Top: label + heading + image layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24 lg:mb-32">
          
          {/* Left: Text */}
          <div>
            <p className="reveal text-label text-sage mb-6">{t('label')}</p>
            <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal mb-10 whitespace-pre-line">
              {t('heading')}
            </h2>
            <p className="reveal reveal-delay-2 text-charcoal/70 leading-relaxed text-base mb-6 font-light">
              {t('body')}
            </p>
            <p className="reveal reveal-delay-2 text-charcoal/70 leading-relaxed text-base font-light">
              {t('body2')}
            </p>

            {/* Signature line */}
            <div className="reveal reveal-delay-3 flex items-center gap-4 mt-10">
              <div className="h-px w-12 bg-sand" />
              <span className="font-display text-xl italic text-charcoal/50">Jana</span>
            </div>
          </div>

          {/* Right: Portrait placeholder */}
          <div className="reveal reveal-delay-2">
            <div className="relative aspect-[3/4] overflow-hidden bg-cream-200">
              <Image
                src="/images/jana-portrait.jpg"
                alt="Jana – Fondatrice d'Anaj Beauty"
                fill
                className="object-cover object-top grayscale-[15%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Decorative corner */}
              <div className="absolute bottom-6 right-6 w-16 h-16 border border-cream/60" />
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-sand">
          {values.map((value, i) => (
            <div
              key={value.number}
              className={`reveal bg-cream p-10 lg:p-14 reveal-delay-${i + 1}`}
            >
              <span className="text-label text-sage block mb-6">{value.number}</span>
              <h3 className="font-display text-2xl text-charcoal mb-4">{value.title}</h3>
              <p className="text-sm text-charcoal/60 leading-relaxed font-light">{value.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
