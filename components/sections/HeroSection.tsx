'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Props = { locale: string };

const prefix = (locale: string) => (locale === 'fr' ? '' : `/${locale}`);

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection({ locale }: Props) {
  const t = useTranslations('hero');
  const videoRef = useRef<HTMLVideoElement>(null);
  const p = prefix(locale);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay blocked — that's fine, poster image shows
    });
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/hero.mp4"
        poster="/images/hero-poster.jpg"
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />

      {/* Gradient Overlay */}
      <div className="video-overlay absolute inset-0" />

      {/* Decorative top line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-cream/20"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end section-px pb-16 md:pb-24">
        <div className="max-w-8xl mx-auto w-full">
          {/* Eyebrow */}
          <motion.p
            className="text-label text-cream/60 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
          >
            {t('tagline')}
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="font-display text-display-xl text-cream mb-8 whitespace-pre-line"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease }}
          >
            {t('headline')}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-base md:text-lg text-cream/70 max-w-xl mb-12 leading-relaxed font-light"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease }}
          >
            {t('subheadline')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease }}
          >
            <Link href={`${p}/#soins`} className="btn-ghost-light">
              {t('cta_primary')}
              <span className="ml-1">→</span>
            </Link>
            <Link href={`${p}/#contact`} className="btn-primary">
              {t('cta_secondary')}
              <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 right-8 md:right-16 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <p className="text-label text-cream/40 [writing-mode:vertical-lr]">Scroll</p>
          <div className="w-px h-12 bg-cream/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-cream/60"
              animate={{ y: ['0%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-cream/10" />
    </section>
  );
}
