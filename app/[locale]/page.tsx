import Header              from '@/components/layout/Header';
import Footer              from '@/components/layout/Footer';
import HeroSection         from '@/components/sections/HeroSection';
import ExpertiseSection    from '@/components/sections/ExpertiseSection';
import MethodeSection      from '@/components/sections/MethodeSection';
import SoinsSection        from '@/components/sections/SoinsSection';
import CuresSection        from '@/components/sections/CuresSection';
import CoachingSection     from '@/components/sections/CoachingSection';
import WorkshopSection     from '@/components/sections/WorkshopSection';
import BoutiqueSection     from '@/components/sections/BoutiqueSection';
import FounderSection      from '@/components/sections/FounderSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import AvantApresSection   from '@/components/sections/AvantApresSection';
import FAQSection          from '@/components/sections/FAQSection';
import NewsletterSection   from '@/components/sections/NewsletterSection';
import ContactSection      from '@/components/sections/ContactSection';

export default function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <main className="grain">
      <Header locale={locale} />
      <HeroSection         locale={locale} />
      <ExpertiseSection    locale={locale} />
      <MethodeSection      locale={locale} />
      <SoinsSection        locale={locale} />
      <CuresSection        locale={locale} />
      <CoachingSection     locale={locale} />
      <WorkshopSection     locale={locale} />
      <BoutiqueSection     locale={locale} />
      <FounderSection      locale={locale} />
      <TestimonialsSection locale={locale} />
      <AvantApresSection   locale={locale} />
      <FAQSection          locale={locale} />
      <NewsletterSection   locale={locale} />
      <ContactSection      locale={locale} />
      <Footer              locale={locale} />
    </main>
  );
}