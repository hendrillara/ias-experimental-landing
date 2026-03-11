"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const risks = [
  {
    id: "risk-1",
    number: "01",
    title: "Risk 1 Here",
    stat: "XX",
    statLabel: "stat description for risk one here",
    problem:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    detail:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
    visual: "fragmentation" as const,
  },
  {
    id: "risk-2",
    number: "02",
    title: "Risk 2 Here",
    stat: "YY",
    statLabel: "stat description for risk two here",
    problem: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    detail:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis.",
    visual: "regulatory" as const,
  },
  {
    id: "risk-3",
    number: "03",
    title: "Risk 3 Here",
    stat: "ZZ",
    statLabel: "stat description for risk three here",
    problem:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    detail:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    visual: "lockin" as const,
  },
];

/* ─── Micro-visualizations ─── */

function FragmentationVisual() {
  const tools = ["Tool A", "Tool B", "Tool C", "Tool D", "Tool E"];
  return (
    <div className="relative w-[280px] h-[280px]">
      {tools.map((tool, i) => {
        const angle = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
        const radius = 90;
        const x = 140 + Math.cos(angle) * radius;
        const y = 140 + Math.sin(angle) * radius;
        return (
          <motion.div
            key={tool}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            className="absolute"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="px-3 py-2 rounded-lg border border-red-500/20 bg-red-500/[0.04]">
              <span className="text-xs font-mono text-red-400/70">{tool}</span>
            </div>
          </motion.div>
        );
      })}
      <svg className="absolute inset-0" width="280" height="280" viewBox="0 0 280 280">
        {tools.map((_, i) => {
          const a1 = (i / tools.length) * Math.PI * 2 - Math.PI / 2;
          const a2 = (((i + 1) % tools.length) / tools.length) * Math.PI * 2 - Math.PI / 2;
          const r = 90;
          return (
            <motion.line
              key={i}
              x1={140 + Math.cos(a1) * r}
              y1={140 + Math.sin(a1) * r}
              x2={140 + Math.cos(a2) * r}
              y2={140 + Math.sin(a2) * r}
              stroke="rgba(239,68,68,0.1)"
              strokeWidth="1"
              strokeDasharray="4 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
            />
          );
        })}
      </svg>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className="text-[10px] text-white/15 tracking-widest uppercase">
          placeholder label
        </span>
      </motion.div>
    </div>
  );
}

function RegulatoryVisual() {
  const lines = ["field_alpha", "field_beta", "field_gamma", "field_delta", "field_epsilon"];
  return (
    <div className="font-mono text-[11px] w-[240px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.3 }}
        className="text-white/20 mb-3"
      >
        $ check --verify status
      </motion.div>
      <div className="space-y-1.5">
        {lines.map((line, i) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.15 }}
            className="flex items-center justify-between"
          >
            <span className="text-white/25">{line}</span>
            <span className="text-red-400/60 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400/40" />
              missing
            </span>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="pt-3 mt-3 border-t border-red-500/10 text-red-400/40"
      >
        {"⚠"} 5 issues found
      </motion.div>
    </div>
  );
}

function LockInVisual() {
  const items = ["item_alpha", "item_beta", "item_gamma", "item_delta", "item_epsilon"];
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="border border-white/[0.08] rounded-lg p-5 w-[240px]"
      >
        <div className="text-[10px] text-white/15 uppercase tracking-wider mb-3 text-center">
          external_platform_v3
        </div>
        <div className="space-y-1.5">
          {items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.12 }}
              className="text-[11px] text-white/30 font-mono flex items-center gap-2"
            >
              <span className="text-red-400/30">&#x25A0;</span>
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a0a0b] px-2 text-red-400/30 text-sm"
      >
        &#x1F512;
      </motion.div>
    </div>
  );
}

const visualComponents = {
  fragmentation: FragmentationVisual,
  regulatory: RegulatoryVisual,
  lockin: LockInVisual,
};

/* ─── Main component ─── */

export default function RiskLandscape() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const sectionHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollable = sectionHeight - viewportHeight;
    if (scrollable <= 0) return;

    const progress = Math.max(0, Math.min(0.999, -rect.top / scrollable));
    setActiveIndex(Math.floor(progress * risks.length));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const risk = risks[activeIndex];
  const Visual = visualComponents[risk.visual];

  return (
    <section
      ref={containerRef}
      className="relative z-10"
      style={{ height: `${risks.length * 100 + 50}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col">
        <div ref={titleRef} className="shrink-0 pt-16 md:pt-20 px-6 md:px-16">
          <div className="max-w-6xl mx-auto flex items-end justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={titleInView ? { opacity: 1 } : {}}
                className="text-[10px] tracking-[0.3em] text-red-400/40 uppercase mb-3"
              >
                Section Eyebrow Here
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold tracking-tight"
              >
                Scroll section headline
                <br className="hidden md:block" /> goes right here.
              </motion.h2>
            </div>

            <div className="hidden md:flex items-center gap-3 pb-2">
              {risks.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => {
                    if (!containerRef.current) return;
                    const sectionTop = containerRef.current.offsetTop;
                    const sectionHeight = containerRef.current.offsetHeight;
                    const viewportHeight = window.innerHeight;
                    const scrollable = sectionHeight - viewportHeight;
                    const targetScroll = sectionTop + (i / risks.length) * scrollable + 1;
                    window.scrollTo({ top: targetScroll, behavior: "smooth" });
                  }}
                  className="cursor-pointer flex items-center gap-2 group"
                >
                  <span
                    className={`text-xs font-mono transition-colors duration-500 ${
                      i === activeIndex ? "text-white/70" : "text-white/15 group-hover:text-white/30"
                    }`}
                  >
                    {r.number}
                  </span>
                  <div className="w-8 h-[2px] rounded-full overflow-hidden bg-white/[0.06]">
                    <div
                      className="h-full bg-red-400/60 transition-all duration-500"
                      style={{ width: i <= activeIndex ? "100%" : "0%" }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center px-6 md:px-16 overflow-hidden">
          <div className="max-w-6xl mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={risk.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center"
              >
                <div className="relative">
                  <span className="absolute -top-16 -left-4 text-[160px] md:text-[220px] font-bold leading-none tracking-tighter text-white/[0.03] select-none pointer-events-none">
                    {risk.number}
                  </span>
                  <div className="relative">
                    <h3 className="text-2xl md:text-4xl font-bold tracking-tight leading-tight mb-6">
                      {risk.title}
                    </h3>
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-3xl md:text-4xl font-bold text-red-400/80 tracking-tight">
                        {risk.stat}
                      </span>
                      <span className="text-xs text-white/25 leading-relaxed">
                        {risk.statLabel}
                      </span>
                    </div>
                    <p className="text-white/50 leading-relaxed text-[15px] mb-4 max-w-lg">
                      {risk.problem}
                    </p>
                    <p className="text-white/25 leading-relaxed text-sm max-w-lg">
                      {risk.detail}
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center">
                  <Visual />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="shrink-0 px-6 md:px-16 pb-6">
          <div className="max-w-6xl mx-auto">
            <div className="h-px bg-white/[0.04] relative overflow-hidden rounded-full">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-red-400/40 to-red-400/10 transition-all duration-500"
                style={{ width: `${((activeIndex + 1) / risks.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
