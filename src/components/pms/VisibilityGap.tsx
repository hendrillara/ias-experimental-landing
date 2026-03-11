"use client";

import { motion } from "framer-motion";

const timeline = [
  { time: "8:32 AM", source: "Source A", text: "Lorem ipsum dolor sit amet consectetur.", icon: "💬" },
  { time: "8:47 AM", source: "Source B", text: "Ut enim ad minim veniam quis nostrud.", icon: "📋" },
  { time: "9:15 AM", source: "Source C", text: "Duis aute irure dolor in reprehenderit.", icon: "🔀" },
  { time: "9:30 AM", source: "Source D", text: "Excepteur sint occaecat cupidatat non proident.", icon: "🎙️" },
];

export default function VisibilityGap() {
  return (
    <section className="relative z-10 py-32 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16"
        >
          Section headline goes here.
        </motion.h2>

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start gap-6 mb-12 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400/50 border-2 border-[#0a0a0b] z-10" />

              <div className={`ml-16 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                <p className="text-blue-400/60 text-xs tracking-widest uppercase mb-1">{item.time}</p>
                <p className="text-white/80 text-sm font-semibold mb-1">{item.source}</p>
                <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-2xl text-white/30 italic mt-8"
        >
          Summary statement placeholder.
        </motion.p>
      </div>
    </section>
  );
}
