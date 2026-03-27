import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const locales = ['fr', 'en'] as const;
type Locale = (typeof locales)[number];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const messages = await getMessages({ locale });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const meta = (messages as any).metadata;

  return {
    title: {
      template: '%s | Anaj Beauty',
      default: meta.title as string,
    },
    description: meta.description as string,
    openGraph: {
      title: meta.og_title as string,
      description: meta.og_description as string,
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      siteName: 'Anaj Beauty',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.og_title as string,
      description: meta.og_description as string,
    },
    alternates: {
      canonical: '/',
      languages: {
        fr: '/',
        en: '/en',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
