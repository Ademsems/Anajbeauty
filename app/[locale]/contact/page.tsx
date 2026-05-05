import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactSection from '@/components/sections/ContactSection';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'metadata' });
  return {
    title: t('contact_title'),
    description: t('contact_description'),
  };
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  return (
    <main>
      <Header locale={params.locale} />
      <div className="pt-24">
        <ContactSection locale={params.locale} />
      </div>
      <Footer locale={params.locale} />
    </main>
  );
}
