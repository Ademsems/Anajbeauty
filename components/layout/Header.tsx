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
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside click
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
    { href: `${p}/#massages`, label: t('massages') },
    { href: `${p}/#soins`, label: t('soins') },
    { href: `${p}/#tarifs`, label: t('tarifs') },
    { href: `${p}/blog`, label: t('blog') },
    { href: `${p}/#contact`, label: t('contact') },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-cream/95 backdrop-blur-sm border-b border-sand'
          : 'bg-transparent'
      )}
    >
      <div className="section-px">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`${p}/`}
            className={cn(
              'font-display text-2xl tracking-wide transition-colors duration-300',
              scrolled ? 'text-charcoal' : 'text-cream'
            )}
          >
            Anaj Beauty
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-label transition-colors duration-300 hover:opacity-60',
                  scrolled ? 'text-charcoal' : 'text-cream'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            {/* Locale Switcher */}
            <div className={cn('hidden lg:flex gap-2 text-label', scrolled ? 'text-charcoal' : 'text-cream')}>
              <Link
                href="/"
                className={cn('transition-opacity', locale === 'fr' ? 'opacity-100' : 'opacity-40 hover:opacity-70')}
              >
                FR
              </Link>
              <span className="opacity-30">/</span>
              <Link
                href="/en"
                className={cn('transition-opacity', locale === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-70')}
              >
                EN
              </Link>
            </div>

            {/* CTA */}
            <Link
              href={`${p}/#contact`}
              className={cn(
                'hidden lg:inline-flex items-center gap-2 text-label px-6 py-3 border transition-all duration-300',
                scrolled
                  ? 'border-charcoal text-charcoal hover:bg-charcoal hover:text-cream'
                  : 'border-cream/70 text-cream hover:border-cream hover:bg-cream/10'
              )}
            >
              {t('booking')}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className={cn(
                'lg:hidden flex flex-col gap-1.5 p-2 transition-colors',
                scrolled ? 'text-charcoal' : 'text-cream'
              )}
            >
              <span
                className={cn(
                  'block h-px w-6 bg-current transition-all duration-300',
                  menuOpen && 'translate-y-2 rotate-45'
                )}
              />
              <span
                className={cn(
                  'block h-px w-6 bg-current transition-all duration-300',
                  menuOpen && 'opacity-0'
                )}
              />
              <span
                className={cn(
                  'block h-px w-6 bg-current transition-all duration-300',
                  menuOpen && '-translate-y-2 -rotate-45'
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-500 bg-cream border-t border-sand',
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="section-px py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl text-charcoal hover:text-sage transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-4 pt-4 border-t border-sand text-label text-charcoal">
            <Link href="/" className={locale === 'fr' ? 'opacity-100' : 'opacity-40'}>FR</Link>
            <span className="opacity-30">/</span>
            <Link href="/en" className={locale === 'en' ? 'opacity-100' : 'opacity-40'}>EN</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
