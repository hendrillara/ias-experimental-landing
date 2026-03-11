"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import EngineersHero from "@/components/engineers/Hero";
import DailyReality from "@/components/engineers/DailyReality";
import Transformation from "@/components/engineers/Transformation";
import WorkflowDemo from "@/components/engineers/WorkflowDemo";
import Stack from "@/components/engineers/Stack";
import EngineersCTA from "@/components/engineers/CTA";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useMousePosition } from "@/hooks/useMousePosition";

const AIEngineersGraph = dynamic(
  () => import("@/components/canvas/AIEngineersGraph"),
  { ssr: false }
);

const sections = [
  { id: "hero", start: 0, end: 0.15 },
  { id: "problem", start: 0.15, end: 0.35 },
  { id: "transform", start: 0.35, end: 0.45 },
  { id: "demo", start: 0.45, end: 0.7 },
  { id: "stack", start: 0.7, end: 0.85 },
  { id: "cta", start: 0.85, end: 1 },
];

export default function AIEngineersPage() {
  const scroll = useScrollProgress(sections);
  const mouse = useMousePosition();

  return (
    <main className="relative texture-grain">
      <AIEngineersGraph
        scrollProgress={scroll.progress}
        mouseX={mouse.x}
        mouseY={mouse.y}
      />
      <Navbar />
      <EngineersHero />
      <DailyReality />
      <Transformation />
      <WorkflowDemo />
      <Stack />
      <EngineersCTA />
      <Footer />
    </main>
  );
}
