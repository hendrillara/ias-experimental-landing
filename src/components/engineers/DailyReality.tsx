"use client";

import { motion } from "framer-motion";

const scenarios = [
  {
    cmd: "$ scenario_alpha",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    cost: "XX min",
    barWidth: "40%",
  },
  {
    cmd: "$ scenario_beta",
    text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    cost: "YY hours",
    barWidth: "65%",
  },
  {
    cmd: "$ scenario_gamma",
    text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    cost: "risk level",
    barWidth: "90%",
  },
];

export default function DailyReality() {
  return (
    <section className="relative z-10 min-h-screen py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-16 items-start">
        <div className="md:sticky md:top-40">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-mono text-xs tracking-widest text-red-400/60 uppercase mb-4"
          >
            Section Eyebrow Here
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold tracking-tight leading-tight"
          >
            Section headline first line.
            <br />
            <span className="text-white/50">
              Section headline second line here.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-white/40"
          >
            Supporting text here.
          </motion.p>
        </div>

        <div className="flex flex-col gap-6">
          {scenarios.map((s, i) => (
            <motion.div
              key={s.cmd}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="terminal-chrome"
            >
              <div className="p-6 font-mono">
                <p className="text-cyan-400/80 text-sm mb-3">{s.cmd}</p>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{s.text}</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500/50 rounded-full" style={{ width: s.barWidth }} />
                  </div>
                  <span className="text-red-400/70 text-xs font-mono whitespace-nowrap">{s.cost}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
