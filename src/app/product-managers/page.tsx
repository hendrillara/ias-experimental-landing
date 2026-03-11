"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PMHero from "@/components/pms/Hero";
import VisibilityGap from "@/components/pms/VisibilityGap";
import PMTransformation from "@/components/pms/Transformation";
import DashboardDemo from "@/components/pms/DashboardDemo";
import Integrations from "@/components/pms/Integrations";
import PMCTA from "@/components/pms/CTA";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useMousePosition } from "@/hooks/useMousePosition";

const PMRibbon = dynamic(() => import("@/components/canvas/PMRibbon"), {
  ssr: false,
});

const sections = [
  { id: "hero", start: 0, end: 0.15 },
  { id: "problem", start: 0.15, end: 0.35 },
  { id: "transform", start: 0.35, end: 0.45 },
  { id: "demo", start: 0.45, end: 0.7 },
  { id: "integrations", start: 0.7, end: 0.85 },
  { id: "cta", start: 0.85, end: 1 },
];

export default function ProductManagersPage() {
  const scroll = useScrollProgress(sections);
  const mouse = useMousePosition();

  return (
    <main className="relative texture-grid">
      <PMRibbon
        scrollProgress={scroll.progress}
        mouseX={mouse.x}
        mouseY={mouse.y}
      />
      <Navbar />
      <PMHero />
      <VisibilityGap />
      <PMTransformation />
      <DashboardDemo />
      <Integrations />
      <PMCTA />
      <Footer />
    </main>
  );
}
