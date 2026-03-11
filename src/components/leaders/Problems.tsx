"use client";

import { motion } from "framer-motion";

const problems = [
  {
    icon: "⊘",
    title: "Problem 1 Here",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    icon: "◇",
    title: "Problem 2 Here",
    desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    icon: "⬡",
    title: "Problem 3 Here",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    icon: "△",
    title: "Problem 4 Here",
    desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const stats = [
  { value: "XX%", label: "Stat description one here", sub: "Stat label 1" },
  { value: "YY%", label: "Stat description two here", sub: "Stat label 2" },
  { value: "ZZ%", label: "Stat description three here", sub: "Stat label 3" },
];

export default function Problems() {
  return (
    <section className="relative z-10 py-28 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 md:gap-8 mb-20"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group cursor-default"
            >
              <p className="text-4xl md:text-6xl font-bold tracking-tight text-white/90 group-hover:text-cyan-400/90 transition-colors duration-300">
                {s.value}
              </p>
              <p className="text-xs md:text-sm text-white/40 mt-2 leading-relaxed">
                {s.label}
              </p>
              <p className="text-[10px] text-cyan-400/40 uppercase tracking-wider mt-1">
                {s.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-[10px] tracking-[0.3em] text-white/25 uppercase mb-3">
            Section Eyebrow Here
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight max-w-2xl leading-tight">
            Section headline goes here in this spot.
          </h2>
          <p className="text-white/35 mt-4 max-w-xl text-[15px] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>

        {/* Problem grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group cursor-default"
            >
              <div className="h-full p-5 md:p-6 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:border-white/[0.1] hover:bg-white/[0.025] transition-all duration-300">
                <div className="flex items-start gap-4">
                  <span className="text-white/10 text-2xl mt-0.5 group-hover:text-red-400/30 transition-colors duration-300">
                    {p.icon}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-white/80 mb-2 group-hover:text-white transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-white/30 leading-relaxed group-hover:text-white/40 transition-colors">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
