"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/5"
    >
      <Link href="/" className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
        <div className="w-4 h-4 bg-cyan-400 rounded-sm"></div>
        IAS<span className="text-white/40 font-normal">/Resonance</span>
      </Link>
      <div className="flex gap-8">
        <Link href="/ai-engineers" className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-cyan-400 transition-colors">
          Engineers
        </Link>
        <Link href="/product-managers" className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-cyan-400 transition-colors">
          PMs
        </Link>
        <Link href="/decision-makers" className="text-xs font-mono uppercase tracking-widest text-white/50 hover:text-cyan-400 transition-colors">
          Leaders
        </Link>
      </div>
    </motion.nav>
  );
}
