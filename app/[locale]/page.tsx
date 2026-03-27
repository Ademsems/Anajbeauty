import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PricingSection from '@/components/sections/PricingSection';
import InstagramSection from '@/components/sections/InstagramSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <main className="grain">
      <Header locale={params.locale} />
      <HeroSection locale={params.locale} />
      <AboutSection locale={params.locale} />
      <ServicesSection locale={params.locale} />
      <PricingSection locale={params.locale} />
      <InstagramSection locale={params.locale} />
      <ContactSection locale={params.locale} />
      <Footer locale={params.locale} />
    </main>
  );
}
