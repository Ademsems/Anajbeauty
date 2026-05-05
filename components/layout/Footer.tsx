'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { OpeningHour } from '@/types';

type Props = { locale: string };
const prefix = (locale: string) => (locale === 'fr' ? '' : `/${locale}`);

export default function Footer({ locale }: Props) {
  const t  = useTranslations('footer');
  const tc = useTranslations('contact.info');
  const [email, setEmail]         = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const p = prefix(locale);
  const hours = tc.raw('hours') as OpeningHour[];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const navLinks = [
    { href: `${p}/`,          label: locale === 'fr' ? 'Accueil'    : 'Home'       },
    { href: `${p}/#soins`,    label: locale === 'fr' ? 'Soins'      : 'Treatments' },
    { href: `${p}/#coaching`, label: 'Coaching'                                     },
    { href: `${p}/blog`,      label: locale === 'fr' ? 'Journal'    : 'Journal'    },
    { href: `${p}/#about`,    label: locale === 'fr' ? 'À Propos'   : 'About'      },
  ];

  const collabLinks = [
    { href: `${p}/#contact`, label: locale === 'fr' ? 'Partenariats'     : 'Partnerships'  },
    { href: `${p}/#contact`, label: locale === 'fr' ? 'Travailler avec nous' : 'Work with us' },
    { href: `${p}/#contact`, label: locale === 'fr' ? 'Presse & Média'   : 'Press & Media' },
  ];

  const socials = [
    { href: 'https://www.instagram.com/anajbeauty', label: 'Instagram' },
    { href: 'https://www.linkedin.com/company/anajbeauty', label: 'LinkedIn' },
    { href: 'https://www.tiktok.com/@anajbeauty', label: 'TikTok' },
    { href: 'https://www.pinterest.com/anajbeauty', label: 'Pinterest' },
  ];

  return (
    <footer className="bg-navy text-cream" aria-label="Pied de page">

      {/* ── Address + Studio block ─────────────────────────────── */}
      <div className="section-px pt-20 pb-16 border-b border-cream/10">
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-start">

          {/* Logo + address */}
          <div>
            <div className="mb-8">
              <span className="font-display text-2xl tracking-[0.25em] text-cream block leading-none">
                A&nbsp;N&nbsp;A&nbsp;J
              </span>
              <span className="text-label text-cream/40 text-[0.55rem] tracking-[0.2em] block mt-1">
                BEAUTY · NEUILLY-SUR-SEINE
              </span>
            </div>

            <p className="font-display text-display-md text-cream/90 whitespace-pre-line leading-snug mb-10">
              {t('tagline')}
            </p>

            <div className="space-y-2 text-sm text-cream/60">
              <p>7 rue Jacques Dulud</p>
              <p>92200 Neuilly-sur-Seine</p>
              <a href="mailto:info@anajbeauty.com" className="block hover:text-cream transition-colors mt-4">
                {tc('email')}
              </a>
              <a href={`tel:${tc('phone').replace(/\s/g, '')}`} className="block hover:text-cream transition-colors">
                {tc('phone')}
              </a>
              <div className="pt-2">
                <p className="text-label text-cream/30 mb-1">{tc('hours_note')}</p>
                {hours.map((h, i) => (
                  <p key={i} className="text-cream/60">{h.days} · {h.time}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-sm w-full">
            <p className="text-label text-cream/40 mb-4">{t('newsletter_label')}</p>
            {subscribed ? (
              <p className="font-display text-xl italic text-cream/70">{t('newsletter_success')}</p>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-0">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter_placeholder')}
                  required
                  className="flex-1 bg-transparent border border-cream/20 px-5 py-3.5 text-sm text-cream
                             placeholder-cream/30 focus:outline-none focus:border-cream/50 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-cream text-navy text-label px-5 py-3.5 hover:bg-cream/90 transition-colors shrink-0"
                >
                  {t('newsletter_cta')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Nav columns ───────────────────────────────────────── */}
      <div className="section-px py-14 border-b border-cream/10">
        <div className="max-w-8xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-10">

          <div>
            <p className="text-label text-cream/30 mb-5">{t('nav_label')}</p>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="text-sm text-cream/60 hover:text-cream transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-label text-cream/30 mb-5">{t('collab_label')}</p>
            <nav className="flex flex-col gap-3">
              {collabLinks.map((link) => (
                <Link key={link.label} href={link.href}
                  className="text-sm text-cream/60 hover:text-cream transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-label text-cream/30 mb-5">{t('social_label')}</p>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-cream/60 hover:text-cream transition-colors">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────────── */}
      <div className="section-px py-5">
        <div className="max-w-8xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-cream/30">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-5 text-xs text-cream/30">
            <Link href={`${p}/legal`}   className="hover:text-cream/60 transition-colors">{t('terms')}</Link>
            <Link href={`${p}/privacy`} className="hover:text-cream/60 transition-colors">{t('privacy')}</Link>
            <Link href={`${p}/cgv`}     className="hover:text-cream/60 transition-colors">{t('cgv')}</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
