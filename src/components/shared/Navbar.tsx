"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

const tabs = [
  { href: "/ai-engineers", label: "Engineers", accent: "text-cyan-400" },
  { href: "/product-managers", label: "PMs", accent: "text-blue-400" },
  { href: "/decision-makers", label: "Leaders", accent: "text-amber-400" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.08], [-20, 0]);

  return (
    <motion.nav
      style={{ opacity, y }}
      className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-white/5"
    >
      <Link
        href="/"
        className="text-xl font-bold tracking-tighter text-white flex items-center gap-2"
      >
        <div className="w-4 h-4 bg-cyan-400 rounded-sm" />
        APP<span className="text-white/40 font-normal">/Platform</span>
      </Link>
      <div className="flex gap-8 relative">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative text-xs font-mono uppercase tracking-widest transition-colors ${
                isActive ? tab.accent : "text-white/50 hover:text-white/80"
              }`}
            >
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-px bg-current"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
