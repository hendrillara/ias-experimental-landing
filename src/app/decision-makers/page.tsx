"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import LeadersHero from "@/components/leaders/Hero";
import Problems from "@/components/leaders/Problems";
import RiskLandscape from "@/components/leaders/RiskLandscape";
import LeadersTransformation from "@/components/leaders/Transformation";
import GovernanceDemo from "@/components/leaders/GovernanceDemo";
import Pillars from "@/components/leaders/Pillars";
import WhyNow from "@/components/leaders/WhyNow";
import LeadersCTA from "@/components/leaders/CTA";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useMousePosition } from "@/hooks/useMousePosition";

const DecisionMakersCanvas = dynamic(
  () => import("@/components/canvas/DecisionMakersGlobe"),
  { ssr: false }
);

const sections = [
  { id: "hero", start: 0, end: 0.1 },
  { id: "problems", start: 0.1, end: 0.2 },
  { id: "risks", start: 0.2, end: 0.35 },
  { id: "transform", start: 0.35, end: 0.42 },
  { id: "governance", start: 0.42, end: 0.6 },
  { id: "pillars", start: 0.6, end: 0.72 },
  { id: "whynow", start: 0.72, end: 0.85 },
  { id: "cta", start: 0.85, end: 1 },
];

export default function DecisionMakersPage() {
  const scroll = useScrollProgress(sections);
  const mouse = useMousePosition();

  return (
    <main className="relative bg-[#0a0a0b]">
      <DecisionMakersCanvas
        scrollProgress={scroll.progress}
        mouseX={mouse.x}
        mouseY={mouse.y}
      />
      <Navbar />
      <LeadersHero />
      <Problems />
      <RiskLandscape />
      <LeadersTransformation />
      <GovernanceDemo />
      <Pillars />
      <WhyNow />
      <LeadersCTA />
      <Footer />
    </main>
  );
}
