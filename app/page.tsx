import { QuoteProvider } from "@/components/providers/QuoteProvider";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Gallery } from "@/components/Gallery";
import { Process } from "@/components/Process";
import { ServiceAreas } from "@/components/ServiceAreas";
import { Testimonials } from "@/components/Testimonials";
import { Commercial } from "@/components/Commercial";
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { ExitIntent } from "@/components/ExitIntent";
import { faqs } from "@/lib/site";

function FaqSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function HomePage() {
  return (
    <QuoteProvider>
      <FaqSchema />
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <Process />
        <ServiceAreas />
        <Testimonials />
        <Commercial />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingActions />
      <ExitIntent />
    </QuoteProvider>
  );
}
