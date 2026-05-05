'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type Props = { locale: string };

export default function NewsletterSection({ locale }: Props) {
  useScrollReveal();
  const t = useTranslations('newsletter');
  const [email, setEmail]         = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <section id="newsletter" className="section-px py-20 bg-cream-200 border-b border-sand">
      <div className="max-w-xl mx-auto text-center">

        <p className="reveal text-label text-charcoal/50 mb-5">{t('label')}</p>
        <h2 className="reveal reveal-delay-1 font-display text-display-md text-charcoal whitespace-pre-line mb-4">
          {t('heading')}
        </h2>
        <p className="reveal reveal-delay-2 font-display text-base italic text-charcoal/50 leading-relaxed mb-10">
          {t('subheading')}
        </p>

        {subscribed ? (
          <p className="reveal font-display text-xl italic text-navy">
            {locale === 'fr' ? 'Merci ! À très vite.' : 'Thank you! See you soon.'}
          </p>
        ) : (
          <form onSubmit={handle} className="reveal reveal-delay-3 flex gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('placeholder')}
              required
              className="flex-1 bg-transparent border border-sand px-5 py-4 text-sm text-charcoal
                         placeholder-charcoal/40 focus:outline-none focus:border-navy transition-colors"
            />
            <button
              type="submit"
              className="bg-navy text-cream text-label px-7 py-4 hover:bg-navy-dark transition-colors shrink-0"
            >
              {t('cta')}
            </button>
          </form>
        )}

        <p className="reveal reveal-delay-4 text-xs text-charcoal/40 font-light italic mt-6">
          {t('bonus')}
        </p>

      </div>
    </section>
  );
}
