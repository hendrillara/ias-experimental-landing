"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "typing" | "decision" | "executing" | "done";

const initialLines = [
  { text: "~/project $ cmd run task-alpha", delay: 0, style: "text-white" },
  { text: "", delay: 600, style: "" },
  { text: "✓ Resources loaded (14 items, 3 rules)", delay: 800, style: "text-green-400/80" },
  { text: "✓ Worker claimed: task-alpha", delay: 1200, style: "text-green-400/80" },
  { text: "⚡ Running... (worker-1)", delay: 1600, style: "text-yellow-400/80" },
];

const postDecisionLines = [
  { text: "✓ Decision recorded → ref: a3f2b1c", style: "text-green-400/80" },
  { text: "✓ Worker resumed → 12 items modified", style: "text-green-400/80" },
  { text: "✓ Quality gate passed (Gate A ✓, Gate B ✓, Gate C ✓)", style: "text-green-400/80" },
  { text: "✓ Output created → #347 task-alpha completed", style: "text-cyan-400" },
  { text: "", style: "" },
  { text: "⏱ Total time: 47 seconds", style: "text-white/60" },
  { text: "📦 Context retained: 100%", style: "text-white/60" },
];

export default function WorkflowDemo() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [postLines, setPostLines] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    if (visibleLines >= initialLines.length) {
      const timer = setTimeout(() => setPhase("decision"), 400);
      return () => clearTimeout(timer);
    }
    const line = initialLines[visibleLines];
    const timer = setTimeout(() => setVisibleLines((v) => v + 1), line.delay || 400);
    return () => clearTimeout(timer);
  }, [hasStarted, visibleLines]);

  useEffect(() => {
    if (phase !== "executing") return;
    if (postLines >= postDecisionLines.length) {
      setPhase("done");
      return;
    }
    const timer = setTimeout(() => setPostLines((v) => v + 1), 300);
    return () => clearTimeout(timer);
  }, [phase, postLines]);

  const handleDecision = () => {
    setPhase("executing");
  };

  return (
    <section ref={ref} className="relative z-10 py-32 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-2xl md:text-3xl font-bold tracking-tight mb-12 text-center"
        >
          Interactive demo headline here.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="terminal-chrome"
        >
          <div className="p-6 font-mono text-sm leading-relaxed min-h-[400px]">
            {initialLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={line.style}>
                {line.text}
              </div>
            ))}

            <AnimatePresence>
              {phase === "decision" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 border border-cyan-400/30 rounded-lg p-4 bg-cyan-400/5"
                >
                  <p className="text-cyan-400 text-xs uppercase tracking-widest mb-2">
                    ── Decision Request ──
                  </p>
                  <p className="text-white/80 mb-1">
                    Strategy: Option A vs Option B vs Both
                  </p>
                  <p className="text-white/40 text-xs mb-1">
                    Recommendation: <span className="text-cyan-400">Both</span>
                  </p>
                  <p className="text-white/40 text-xs mb-4">Confidence: 0.73</p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleDecision}
                      className="px-4 py-2 bg-cyan-400/20 border border-cyan-400/40 text-cyan-400 text-xs rounded hover:bg-cyan-400/30 transition-colors"
                    >
                      Approve Both
                    </button>
                    <button
                      onClick={handleDecision}
                      className="px-4 py-2 border border-white/20 text-white/60 text-xs rounded hover:border-white/40 transition-colors"
                    >
                      Override: Option A only
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {postDecisionLines.slice(0, postLines).map((line, i) => (
              <motion.div
                key={`post-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`${line.style} ${i === 0 ? "mt-4" : ""}`}
              >
                {line.text}
              </motion.div>
            ))}

            {phase !== "done" && (
              <span className="inline-block w-2 h-4 bg-cyan-400 animate-cursor-blink ml-0.5" />
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { title: "Feature A", desc: "Lorem ipsum dolor sit amet consectetur." },
            { title: "Feature B", desc: "Ut enim ad minim veniam quis nostrud." },
            { title: "Feature C", desc: "Duis aute irure dolor in reprehenderit." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-5 border border-cyan-400/10 rounded-lg bg-cyan-400/5"
            >
              <h3 className="font-mono text-sm font-semibold text-cyan-400 mb-2">{item.title}</h3>
              <p className="text-sm text-white/50">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
