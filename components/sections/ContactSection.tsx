'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import type { Service, OpeningHour } from '@/types';

type Props = { locale: string };

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  services: z.array(z.string()).min(1),
  message: z.string().min(10),
});
type FormData = z.infer<typeof schema>;

export default function ContactSection({ locale }: Props) {
  useScrollReveal();
  const t = useTranslations('contact');
  const tf = useTranslations('contact.form');
  const ti = useTranslations('contact.info');
  const tRoot = useTranslations();
  const services = tRoot.raw('services') as Service[];

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { services: [] },
  });

  const onSubmit = async (data: FormData) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const hours = ti.raw('hours') as OpeningHour[];

  return (
    <section id="contact" className="section-px section-py bg-cream-100 border-b border-sand">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <p className="reveal text-label text-sage mb-5">{t('label')}</p>
          <h2 className="reveal reveal-delay-1 font-display text-display-lg text-charcoal whitespace-pre-line">
            {t('heading')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24">

          {/* ── Left: Form ── */}
          <div className="reveal reveal-delay-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10" noValidate>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="text-label text-charcoal/50 block mb-3">{tf('name')}</label>
                  <input
                    {...register('name')}
                    className={cn('form-input', errors.name && 'border-b-red-400')}
                    placeholder="Jana Dupont"
                  />
                </div>
                <div>
                  <label className="text-label text-charcoal/50 block mb-3">{tf('email')}</label>
                  <input
                    {...register('email')}
                    type="email"
                    className={cn('form-input', errors.email && 'border-b-red-400')}
                    placeholder="jana@email.com"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="text-label text-charcoal/50 block mb-3">{tf('phone')}</label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="form-input"
                  placeholder="+33 6 00 00 00 00"
                />
              </div>

              {/* Multi-service checkboxes */}
              <div>
                <label className="text-label text-charcoal/50 block mb-6">{tf('services')}</label>
                <Controller
                  control={control}
                  name="services"
                  render={({ field }) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {services.map((service) => {
                        const checked = field.value.includes(service.name);
                        return (
                          <label
                            key={service.id}
                            className={cn(
                              'relative flex items-start gap-4 p-5 border cursor-pointer transition-all duration-300 hover:border-charcoal',
                              checked ? 'border-charcoal bg-cream' : 'border-sand'
                            )}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => {
                                const next = checked
                                  ? field.value.filter((v) => v !== service.name)
                                  : [...field.value, service.name];
                                field.onChange(next);
                              }}
                            />
                            <span
                              className={cn(
                                'w-4 h-4 shrink-0 border mt-0.5 flex items-center justify-center transition-all duration-200',
                                checked ? 'border-charcoal bg-charcoal' : 'border-sand'
                              )}
                            >
                              {checked && (
                                <span className="text-cream text-xs leading-none">✓</span>
                              )}
                            </span>
                            <span className="text-sm text-charcoal leading-snug">
                              {service.name}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                />
                {errors.services && (
                  <p className="text-xs text-red-500 mt-2">
                    {locale === 'fr'
                      ? 'Sélectionnez au moins un soin.'
                      : 'Please select at least one treatment.'}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="text-label text-charcoal/50 block mb-3">{tf('message')}</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className={cn('form-input resize-none', errors.message && 'border-b-red-400')}
                  placeholder={tf('message_placeholder')}
                />
              </div>

              {/* Submit */}
              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'success'}
                  className={cn(
                    'btn-primary',
                    (status === 'sending' || status === 'success') &&
                      'opacity-60 cursor-not-allowed'
                  )}
                >
                  {status === 'sending' ? tf('sending') : tf('submit')}
                  {status !== 'sending' && <span>→</span>}
                </button>

                {status === 'success' && (
                  <p className="text-sm text-sage font-medium">{tf('success')}</p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-red-500">{tf('error')}</p>
                )}
              </div>
            </form>
          </div>

          {/* ── Right: Info + Map ── */}
          <div className="reveal reveal-delay-3 space-y-12">

            {/* Contact Details */}
            <div className="space-y-8">
              <div className="border-b border-sand pb-6">
                <p className="text-label text-charcoal/40 mb-2">{ti('address_label')}</p>
                <p className="text-sm text-charcoal/70 leading-relaxed font-light whitespace-pre-line">
                  {ti('address')}
                </p>
              </div>
              <div className="border-b border-sand pb-6">
                <p className="text-label text-charcoal/40 mb-2">{ti('email_label')}</p>
                <a
                  href="mailto:info@anajbeauty.com"
                  className="text-sm text-sage hover:text-charcoal transition-colors"
                >
                  {ti('email')}
                </a>
              </div>
              <div className="border-b border-sand pb-6">
                <p className="text-label text-charcoal/40 mb-2">{ti('phone_label')}</p>
                <a
                  href="tel:+33626818693"
                  className="text-sm text-sage hover:text-charcoal transition-colors"
                >
                  {ti('phone')}
                </a>
              </div>

              {/* Opening hours */}
              <div className="border-b border-sand pb-6">
                <p className="text-label text-charcoal/40 mb-1">{ti('hours_label')}</p>
                <p className="text-xs text-sage mb-4">{ti('hours_note')}</p>
                <div className="space-y-3">
                  {hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-charcoal/50">{h.days}</span>
                      <span className="text-sm text-charcoal font-medium">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative aspect-[4/3] bg-cream-200 overflow-hidden border border-sand">
              {/*
                ── MAP INTEGRATION ──────────────────────────────────────────
                Replace this placeholder with a real embed. Options:

                Option A – Google Maps iframe (no key needed for basic embed):
                <iframe
                  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
                  width="100%" height="100%" style={{ border: 0 }}
                  allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                Option B – Mapbox: add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local
                Option C – Leaflet (free, open-source): npm install react-leaflet leaflet
                ────────────────────────────────────────────────────────────
              */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 p-8">
                <div className="w-10 h-10 border border-sand flex items-center justify-center">
                  <span className="text-sage text-lg">📍</span>
                </div>
                <div>
                  <p className="font-display text-lg text-charcoal mb-1">Anaj Beauty</p>
                  <p className="text-xs text-charcoal/50 leading-relaxed">
                    7 rue Jacques Dulud
                    <br />
                    92200 Neuilly-sur-Seine
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=7+rue+Jacques+Dulud+92200+Neuilly-sur-Seine"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-label text-sage hover:text-charcoal transition-colors mt-2"
                >
                  {locale === 'fr' ? 'Voir sur Google Maps →' : 'View on Google Maps →'}
                </a>
              </div>
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-sand/60" />
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-sand/60" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-sand/60" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-sand/60" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
