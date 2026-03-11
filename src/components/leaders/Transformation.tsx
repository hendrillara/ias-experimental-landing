"use client";

import { motion } from "framer-motion";

export default function LeadersTransformation() {
  return (
    <section className="relative z-10 min-h-[60vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="text-center max-w-4xl"
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-px bg-cyan-400/40 mx-auto mb-8"
        />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-balance">
          <span className="block">Transition headline first line here.</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
            Transition headline second line here.
          </span>
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-px bg-cyan-400/40 mx-auto mt-8"
        />
      </motion.div>
    </section>
  );
}
