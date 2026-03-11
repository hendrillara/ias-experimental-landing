"use client";

import { motion } from "framer-motion";

const integrations = [
  {
    name: "Integration A",
    items: [
      "Feature A placeholder text",
      "Feature B placeholder text",
      "Feature C placeholder text",
    ],
  },
  {
    name: "Integration B",
    items: [
      "Feature D placeholder text",
      "Feature E placeholder text",
      "Feature F placeholder text",
    ],
  },
  {
    name: "Integration C",
    items: [
      "Feature G placeholder text",
      "Feature H placeholder text",
      "Feature I placeholder text",
    ],
  },
];

export default function Integrations() {
  return (
    <section className="relative z-10 py-32 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16"
        >
          Platform section headline here.
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {integrations.map((int, i) => (
            <motion.div
              key={int.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="p-6 border border-blue-400/10 rounded-xl bg-blue-400/5"
            >
              <h3 className="text-blue-400 font-semibold text-lg mb-4">{int.name}</h3>
              <ul className="space-y-3">
                {int.items.map((item) => (
                  <li key={item} className="text-sm text-white/50 leading-relaxed flex gap-2">
                    <span className="text-blue-400/50 mt-0.5">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
