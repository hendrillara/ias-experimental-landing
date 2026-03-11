"use client";

import { motion } from "framer-motion";

export default function EngineersHero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-mono text-sm tracking-widest text-cyan-400/70 mb-6"
      >
        {`// SECTION.HEADER`}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="font-mono text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]"
      >
        Lorem ipsum dolor sit.
        <br />
        <span className="text-cyan-400">Amet consectetur.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <button className="px-6 py-3 bg-cyan-400 text-black font-mono text-sm font-semibold rounded hover:bg-cyan-300 transition-colors">
          Primary CTA Here
        </button>
        <button className="px-6 py-3 border border-white/20 text-white/70 font-mono text-sm rounded hover:border-white/40 hover:text-white transition-colors">
          Secondary CTA Here
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-white/20 text-2xl"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
