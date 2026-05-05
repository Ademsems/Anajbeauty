'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type Props = { locale: string };
const prefix = (locale: string) => (locale === 'fr' ? '' : `/${locale}`);

export default function Header({ locale }: Props) {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const p = prefix(locale);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { href: `${p}/`,          label: t('accueil')  },
    { href: `${p}/#soins`,    label: t('soins')    },
    { href: `${p}/#coaching`, label: t('coaching') },
    { href: `${p}/#boutique`, label: t('boutique') },
    { href: `${p}/blog`,      label: t('journal')  },
    { href: `${p}/#about`,    label: t('about')    },
    { href: `${p}/#contact`,  label: t('contact')  },
  ];

  return (
    <>
      {/* ── Top Banner ─────────────────────────────────────────── */}
      <div className="bg-navy text-cream text-label text-center py-3 px-4 tracking-widest text-[0.6rem]">
        {t('banner')}
      </div>

      {/* ── Main Header ────────────────────────────────────────── */}
      <header
        className={cn(
          'sticky top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-cream/97 backdrop-blur-sm border-b border-sand shadow-sm'
            : 'bg-cream border-b border-sand/60'
        )}
      >
        {/* ── Top Row: FR/EN | Logo | Icons ── */}
        <div className="section-px border-b border-sand/40">
          <div className="max-w-8xl mx-auto flex items-center justify-between h-14">

            {/* Left: Locale + Contact */}
            <div className="flex items-center gap-6 text-label text-charcoal/60">
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className={cn('transition-opacity hover:opacity-100', locale === 'fr' ? 'opacity-100 text-charcoal' : 'opacity-40')}
                >
                  FR
                </Link>
                <span className="opacity-30">/</span>
                <Link
                  href="/en"
                  className={cn('transition-opacity hover:opacity-100', locale === 'en' ? 'opacity-100 text-charcoal' : 'opacity-40')}
                >
                  EN
                </Link>
              </div>
              <Link href={`${p}/#contact`} className="hidden md:block hover:text-charcoal transition-colors">
                Contact
              </Link>
            </div>

            {/* Center: Logo */}
            <Link href={`${p}/`} className="absolute left-1/2 -translate-x-1/2 text-center group">
              <span className="font-display text-2xl tracking-[0.25em] text-charcoal block leading-none">
                A&nbsp;N&nbsp;A&nbsp;J
              </span>
              <span className="text-label text-charcoal/50 text-[0.55rem] tracking-[0.2em] block mt-0.5">
                BEAUTY · NEUILLY-SUR-SEINE
              </span>
            </Link>

            {/* Right: Icons + Mobile toggle */}
            <div className="flex items-center gap-5 text-charcoal/60">
              {/* Search icon */}
              <button aria-label="Rechercher" className="hidden lg:block hover:text-charcoal transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>
              {/* Location icon */}
              <a
                href="https://maps.google.com/?q=7+rue+Jacques+Dulud+92200+Neuilly-sur-Seine"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Notre adresse"
                className="hidden lg:block hover:text-charcoal transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </a>
              {/* Account icon */}
              <Link href={`${p}/#contact`} aria-label="Mon compte" className="hidden lg:block hover:text-charcoal transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
                className="lg:hidden flex flex-col gap-1.5 p-1"
              >
                <span className={cn('block h-px w-5 bg-charcoal transition-all duration-300', menuOpen && 'translate-y-2 rotate-45')} />
                <span className={cn('block h-px w-5 bg-charcoal transition-all duration-300', menuOpen && 'opacity-0')} />
                <span className={cn('block h-px w-5 bg-charcoal transition-all duration-300', menuOpen && '-translate-y-2 -rotate-45')} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom Row: Main Nav ── */}
        <div className="section-px hidden lg:block">
          <div className="max-w-8xl mx-auto flex items-center justify-center gap-12 h-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label text-charcoal/70 hover:text-charcoal transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0 left-0 w-full h-px bg-navy scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          ref={menuRef}
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-500 bg-cream border-t border-sand',
            menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <nav className="section-px py-8 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-2xl text-charcoal hover:text-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-6 border-t border-sand">
              <Link
                href={`${p}/#contact`}
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full justify-center"
              >
                {t('booking')} →
              </Link>
            </div>
            <div className="flex gap-3 text-label text-charcoal/60">
              <Link href="/" className={locale === 'fr' ? 'text-charcoal' : 'opacity-40'}>FR</Link>
              <span className="opacity-30">/</span>
              <Link href="/en" className={locale === 'en' ? 'text-charcoal' : 'opacity-40'}>EN</Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
