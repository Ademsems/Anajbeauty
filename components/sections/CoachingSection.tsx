'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Props = { locale: string };
const prefix = (l: string) => (l === 'fr' ? '' : `/${l}`);
type Program = { title: string; slug: string };

export default function CoachingSection({ locale }: Props) {
  useScrollReveal();
  const t        = useTranslations('coaching');
  const programs = t.raw('programs') as Program[];
  const p        = prefix(locale);

  return (
    <section id="coaching" className="section-px section-py bg-cream border-b border-sand">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Text */}
          <div>
            <p className="reveal text-label text-charcoal/50 mb-5">{t('label')}</p>
            <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal whitespace-pre-line mb-8">
              {t('heading')}
            </h2>
            <p className="reveal reveal-delay-2 font-display text-base italic text-charcoal/60 leading-relaxed mb-10 max-w-md">
              {t('subheading')}
            </p>

            {/* Programs list */}
            <div className="reveal reveal-delay-3 space-y-0 border-t border-sand mb-10">
              {programs.map((prog) => (
                <div
                  key={prog.slug}
                  className="flex items-center justify-between py-5 border-b border-sand group hover:bg-cream-100 -mx-4 px-4 transition-colors"
                >
                  <span className="text-sm text-charcoal font-light tracking-wide uppercase text-[0.7rem] leading-loose">
                    {prog.title}
                  </span>
                  <span className="text-charcoal/30 group-hover:text-navy transition-colors">→</span>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-4">
              <Link href={`${p}/#contact`} className="btn-primary">
                {t('cta')} →
              </Link>
            </div>
          </div>

          {/* Right: Photo placeholder */}
          <div className="reveal reveal-delay-2">
            <div className="relative aspect-[3/4] bg-cream-200 border border-sand overflow-hidden">
              {/* Replace with <Image> when photo is ready */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <p className="text-label text-charcoal/20 tracking-widest">PHOTO LIFESTYLE JANA</p>
              </div>
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-sand/60" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-sand/60" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-sand/60" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-sand/60" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
