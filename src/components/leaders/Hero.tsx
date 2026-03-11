"use client";

import { motion } from "framer-motion";

export default function LeadersHero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 max-w-5xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-sm tracking-widest text-cyan-400/70 uppercase mb-6"
      >
        Eyebrow Label Here
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
      >
        <span className="block">Hero headline first line.</span>
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
          Hero headline second line.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam quis nostrud.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-10 flex gap-4"
      >
        <button className="cursor-pointer px-6 py-3 bg-cyan-500 text-black text-sm font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]">
          Primary CTA Here
        </button>
        <button className="cursor-pointer px-6 py-3 border border-white/15 text-white/60 text-sm font-semibold rounded-lg hover:border-white/30 hover:text-white/80 transition-all duration-200">
          Secondary CTA Here
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
