"use client";

import { motion } from "framer-motion";

export default function WhyNow() {
  return (
    <section className="relative z-10 py-28 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-[10px] tracking-[0.3em] text-cyan-400/40 uppercase mb-3">
            Timing Eyebrow Here
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Timing section headline here.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-default"
          >
            <div className="h-full p-6 md:p-8 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:border-cyan-400/15 hover:bg-cyan-400/[0.01] transition-all duration-300">
              <p className="text-xs text-cyan-400/50 font-mono uppercase tracking-wider mb-4">
                Card 1 label here
              </p>
              <h3 className="text-xl font-semibold text-white/85 mb-3 group-hover:text-white transition-colors">
                Card 1 headline here.
              </h3>
              <p className="text-sm text-white/35 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group cursor-default"
          >
            <div className="h-full p-6 md:p-8 rounded-xl border border-white/[0.05] bg-white/[0.015] hover:border-cyan-400/15 hover:bg-cyan-400/[0.01] transition-all duration-300">
              <p className="text-xs text-cyan-400/50 font-mono uppercase tracking-wider mb-4">
                Card 2 label here
              </p>
              <h3 className="text-xl font-semibold text-white/85 mb-3 group-hover:text-white transition-colors">
                Card 2 headline here.
              </h3>
              <p className="text-sm text-white/35 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
