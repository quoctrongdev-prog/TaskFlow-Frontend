import LandingNavbar from "./LandingNavbar";
import HeroSection from "./HeroSection";
import TrustSection from "./TrustSection";
import FeaturesSection from "./FeaturesSection";
import WorkflowSection from "./WorkflowSection";
import BenefitsSection from "./BenefitsSection";
import TestimonialsSection from "./TestimonialsSection";
import PricingSection from "./PricingSection";
import FinalCTA from "./FinalCTA";
import LandingFooter from "./LandingFooter";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <LandingNavbar />
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <WorkflowSection />
      <BenefitsSection />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTA />
      <LandingFooter />
    </main>
  );
}
