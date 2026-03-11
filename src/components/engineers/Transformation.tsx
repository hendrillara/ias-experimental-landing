"use client";

import { motion } from "framer-motion";

export default function Transformation() {
  return (
    <section className="relative z-10 min-h-[60vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center max-w-3xl"
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="h-px bg-cyan-400/40 mx-auto mb-8"
        />
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          Transition headline first
          <br />
          <span className="text-cyan-400">line goes here.</span>
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
