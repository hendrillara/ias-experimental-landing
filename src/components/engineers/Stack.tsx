"use client";

import { motion } from "framer-motion";

const panels = [
  {
    title: "MODULE A",
    stats: ["status: ● ON", "items: 2", "gates: 5"],
    desc: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    title: "MODULE B",
    stats: ["items: 3", "pending: 1", "shipped: 12"],
    desc: "Ut enim ad minim veniam quis nostrud.",
  },
  {
    title: "MODULE C",
    stats: ["items: 847", "sync: live", "access: rbac"],
    desc: "Duis aute irure dolor in reprehenderit.",
  },
];

export default function Stack() {
  return (
    <section className="relative z-10 py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-3xl md:text-4xl font-bold tracking-tight text-center mb-16"
        >
          Platform section headline here.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {panels.map((panel, i) => (
            <motion.div
              key={panel.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="terminal-chrome"
            >
              <div className="p-6 font-mono">
                <h3 className="text-cyan-400 text-sm font-bold tracking-wider mb-4">
                  {panel.title}
                </h3>
                <div className="space-y-1 mb-6">
                  {panel.stats.map((stat) => (
                    <p key={stat} className="text-white/60 text-xs">{stat}</p>
                  ))}
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{panel.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
