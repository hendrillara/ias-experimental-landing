"use client";

import { motion } from "framer-motion";

export default function LeadersCTA() {
  return (
    <section className="relative z-10 py-32 px-6 md:px-16 pb-40">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
        >
          CTA headline goes here in this spot.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base md:text-lg text-white/35 leading-relaxed mb-10 max-w-xl mx-auto"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#"
            className="cursor-pointer px-8 py-4 bg-cyan-500 text-black font-semibold text-sm rounded-lg hover:bg-cyan-400 transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,0.15)] hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]"
          >
            Primary CTA Here
          </a>
          <a
            href="#"
            className="cursor-pointer px-8 py-4 border border-white/15 text-white/50 font-semibold text-sm rounded-lg hover:border-white/30 hover:text-white/80 transition-all duration-200"
          >
            Secondary CTA Here
          </a>
        </motion.div>
      </div>
    </section>
  );
}
