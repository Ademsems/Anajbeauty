'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { OpeningHour } from '@/types';

type Props = { locale: string };

const prefix = (locale: string) => (locale === 'fr' ? '' : `/${locale}`);

export default function Footer({ locale }: Props) {
  const t = useTranslations('footer');
  const tc = useTranslations('contact.info');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const p = prefix(locale);
  const hours = tc.raw('hours') as OpeningHour[];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-charcoal text-cream">
      {/* Top: Tagline + newsletter */}
      <div className="section-px pt-20 pb-16 border-b border-cream/10">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
          <div>
            <p className="text-label text-sage mb-6">Anaj Beauty</p>
            <p className="font-display text-display-md text-cream whitespace-pre-line leading-tight">
              {t('tagline')}
            </p>
          </div>

          <div className="lg:text-right">
            <p className="text-label text-cream/50 mb-4">{t('newsletter_label')}</p>
            {subscribed ? (
              <p className="font-display text-xl italic text-sage">{t('newsletter_success')}</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-0 max-w-sm lg:ml-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter_placeholder')}
                  required
                  className="flex-1 bg-transparent border border-cream/20 px-5 py-3.5 text-sm text-cream
                             placeholder-cream/30 focus:outline-none focus:border-cream/50
                             transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="bg-sage text-cream text-label px-6 py-3.5 hover:bg-sage-400
                             transition-colors duration-300 shrink-0"
                >
                  {t('newsletter_cta')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Middle: Links grid */}
      <div className="section-px py-16 border-b border-cream/10">
        <div className="max-w-8xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Navigation */}
          <div>
            <p className="text-label text-cream/40 mb-6">{t('nav_label')}</p>
            <nav className="flex flex-col gap-4">
              {[
                { href: `${p}/#massages`, label: 'Massages' },
                { href: `${p}/#soins`, label: locale === 'fr' ? 'Nos Soins' : 'Treatments' },
                { href: `${p}/#tarifs`, label: locale === 'fr' ? 'Tarifs' : 'Pricing' },
                { href: `${p}/blog`, label: 'Journal' },
                { href: `${p}/#contact`, label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-cream/60 hover:text-cream transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-label text-cream/40 mb-6">{tc('address_label')}</p>
            <p className="text-sm text-cream/60 leading-relaxed whitespace-pre-line mb-6">
              {tc('address')}
            </p>
            <a
              href="mailto:info@anajbeauty.com"
              className="block text-sm text-cream/60 hover:text-cream transition-colors mb-2"
            >
              {tc('email')}
            </a>
            <a
              href="tel:+33626818693"
              className="block text-sm text-cream/60 hover:text-cream transition-colors"
            >
              {tc('phone')}
            </a>
          </div>

          {/* Hours */}
          <div>
            <p className="text-label text-cream/40 mb-6">{tc('hours_label')}</p>
            <p className="text-xs text-sage mb-4 uppercase tracking-wider">{tc('hours_note')}</p>
            <div className="flex flex-col gap-3">
              {hours.map((h, i) => (
                <div key={i} className="flex flex-col gap-0.5">
                  <span className="text-xs text-cream/40 uppercase tracking-wider">{h.days}</span>
                  <span className="text-sm text-cream/70">{h.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-label text-cream/40 mb-6">Social</p>
            <div className="flex flex-col gap-4">
              {[
                { href: 'https://www.instagram.com/anajbeauty', label: 'Instagram' },
                { href: 'https://www.facebook.com/anajbeauty', label: 'Facebook' },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cream/60 hover:text-cream transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-sage inline-block" />
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section-px py-6">
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/30">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-6 text-xs text-cream/30">
            <Link href={`${p}/legal`} className="hover:text-cream/60 transition-colors">
              {t('terms')}
            </Link>
            <Link href={`${p}/privacy`} className="hover:text-cream/60 transition-colors">
              {t('privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
