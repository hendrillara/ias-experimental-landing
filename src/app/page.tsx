"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const audiences = [
  {
    href: "/ai-engineers",
    label: "AI Engineers",
    tagline: "Lorem ipsum dolor sit amet consectetur.",
    accent: "from-cyan-500 to-cyan-300",
    border: "border-cyan-500/20 hover:border-cyan-500/50",
    bg: "hover:bg-cyan-500/5",
    dot: "bg-cyan-400",
  },
  {
    href: "/product-managers",
    label: "Product Managers",
    tagline: "Ut enim ad minim veniam quis nostrud.",
    accent: "from-cyan-500 to-cyan-300",
    border: "border-cyan-500/20 hover:border-cyan-500/50",
    bg: "hover:bg-cyan-500/5",
    dot: "bg-cyan-400",
  },
  {
    href: "/decision-makers",
    label: "Decision Makers",
    tagline: "Duis aute irure dolor in reprehenderit.",
    accent: "from-cyan-500 to-cyan-300",
    border: "border-cyan-500/20 hover:border-cyan-500/50",
    bg: "hover:bg-cyan-500/5",
    dot: "bg-cyan-400",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 bg-[#0a0a0b] text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/40 mb-4">
          Platform Name
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Lorem ipsum dolor
        </h1>
        <p className="text-lg text-white/40 max-w-md mx-auto">
          Amet consectetur adipiscing elit.
        </p>
      </motion.div>

      <div className="flex flex-col gap-4 w-full max-w-lg">
        {audiences.map((a, i) => (
          <motion.div
            key={a.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
          >
            <Link
              href={a.href}
              className={`group block p-6 rounded-lg border ${a.border} ${a.bg} transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-2 h-2 rounded-full ${a.dot}`} />
                <span className="font-semibold text-lg">{a.label}</span>
                <span className="ml-auto text-white/20 group-hover:text-white/50 transition-colors">
                  &rarr;
                </span>
              </div>
              <p className="text-sm text-white/40 pl-5">{a.tagline}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
