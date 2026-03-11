"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const pillars = [
  {
    title: "Pillar 1 Here",
    tagline: "Pillar 1 tagline here",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    trust: "Trust signal 1",
    features: [
      "Feature A placeholder",
      "Feature B placeholder",
      "Feature C placeholder",
      "Feature D placeholder",
    ],
  },
  {
    title: "Pillar 2 Here",
    tagline: "Pillar 2 tagline here",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    trust: "Trust signal 2",
    features: [
      "Feature E placeholder",
      "Feature F placeholder",
      "Feature G placeholder",
      "Feature H placeholder",
    ],
  },
  {
    title: "Pillar 3 Here",
    tagline: "Pillar 3 tagline here",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    trust: "Trust signal 3",
    features: [
      "Feature I placeholder",
      "Feature J placeholder",
      "Feature K placeholder",
      "Feature L placeholder",
    ],
  },
];

export default function Pillars() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="relative z-10 py-32 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-widest text-cyan-400/60 uppercase mb-4">
            Platform Section Eyebrow
          </p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Platform section headline here.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 items-start">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setExpanded(expanded === i ? null : i)}
              className="cursor-pointer group"
            >
              <div className="h-full rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-400/[0.02]">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-cyan-400/50 font-mono uppercase tracking-wider">
                    {p.trust}
                  </span>
                  <motion.span
                    animate={{ rotate: expanded === i ? 45 : 0 }}
                    className="text-white/20 group-hover:text-white/40 transition-colors text-lg"
                  >
                    +
                  </motion.span>
                </div>
                <h3 className="text-xl font-semibold text-white/90 mb-1 group-hover:text-white transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-white/30 mb-4">{p.tagline}</p>
                <p className="text-sm text-white/45 leading-relaxed">{p.desc}</p>
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-2">
                        {p.features.map((f) => (
                          <div key={f} className="flex items-center gap-2 text-xs text-white/35 hover:text-white/60 transition-colors cursor-default">
                            <div className="w-1 h-1 rounded-full bg-cyan-400/40" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
