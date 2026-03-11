"use client";

import { motion } from "framer-motion";

export default function PMHero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm tracking-widest text-blue-400/70 uppercase mb-6"
      >
        Eyebrow Label Here
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[0.9]"
      >
        Lorem ipsum dolor sit.
        <br />
        <span className="text-blue-400">Amet consectetur.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-10"
      >
        <button className="px-6 py-3 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-400 transition-colors">
          Primary CTA Here
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
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
