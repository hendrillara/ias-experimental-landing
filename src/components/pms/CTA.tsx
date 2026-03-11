"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "XX", label: "metric label A" },
  { value: "YY%", label: "metric label B" },
  { value: "0", label: "metric label C" },
];

export default function PMCTA() {
  return (
    <section className="relative z-10 py-32 px-6 md:px-16 pb-40">
      <div className="max-w-4xl mx-auto text-center">
        <div className="grid grid-cols-3 gap-8 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <p className="text-4xl md:text-5xl font-bold text-blue-400">{s.value}</p>
              <p className="text-sm text-white/40 mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-semibold tracking-tight mb-10"
        >
          CTA headline here.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <button className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-colors text-lg">
            Primary CTA Here
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center gap-6"
        >
          <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors">
            Link A →
          </a>
          <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors">
            Link B
          </a>
        </motion.div>
      </div>
    </section>
  );
}
