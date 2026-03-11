"use client";

import { motion } from "framer-motion";

export default function EngineersCTA() {
  return (
    <section className="relative z-10 min-h-[60vh] flex items-center justify-center px-6 pb-32">
      <div className="text-center max-w-2xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold tracking-tight mb-10"
        >
          CTA headline here.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="terminal-chrome inline-block cursor-pointer hover:border-cyan-400/30 transition-colors group"
        >
          <div className="px-8 py-4 font-mono text-lg">
            <span className="text-white/50">~/project $</span>{" "}
            <span className="text-cyan-400">cmd start</span>{" "}
            <span className="inline-block w-2.5 h-5 bg-cyan-400 animate-cursor-blink group-hover:bg-cyan-300" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex justify-center gap-6"
        >
          <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors font-mono">
            Link A
          </a>
          <a href="#" className="text-sm text-white/40 hover:text-white/70 transition-colors font-mono">
            Link B →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
