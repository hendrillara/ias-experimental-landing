"use client";

import { motion } from 'framer-motion';
import { Terminal, GitCommitHorizontal, FolderGit2, Play, ShieldCheck, Pin, Shield } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import dynamic from 'next/dynamic';

const AIEngineersGraph = dynamic(() => import('@/components/canvas/AIEngineersGraph'), { ssr: false });

export default function AIEngineersPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-white selection:bg-cyan-500/30 font-mono">
      <Navbar />
      
      {/* Background 3D Scene */}
      <AIEngineersGraph />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-40 pb-20 pointer-events-none">
        <div className="pointer-events-auto">
          {/* HERO SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs tracking-widest uppercase mb-8">
              <Terminal className="w-4 h-4" />
              <span>System.Initialize // IAS_Framework_v2</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] text-white">
              The Engine <br />
              <span className="text-cyan-400">For Autonomy.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl font-sans font-light leading-relaxed">
              IAS is a repo-first, terminal-native workflow for running coding agents with minimal human interruption. Fully auditable, deterministic execution, and horizontally scalable.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 font-sans">
              <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 group">
                <Terminal className="w-5 h-5 group-hover:animate-pulse" />
                ias bootstrap
              </button>
              <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-sm border border-white/10 backdrop-blur-md transition-all duration-300">
                Read the Docs
              </button>
            </div>
          </motion.div>

          {/* THE OPERATIONAL GAP */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-16 font-sans"
          >
            <div>
              <div className="inline-flex items-center gap-4 mb-4">
                 <div className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">The Operational Gap</div>
                 <div className="h-px w-16 bg-gradient-to-r from-cyan-400/40 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.1] mb-8">
                AI agents are powerful. <br/>
                <span className="text-white/40">Managing them is chaos.</span>
              </h2>

              <div className="space-y-6">
                <div className="border-l-2 border-red-500/30 pl-6 py-2">
                  <div className="text-red-400 mb-2 font-mono text-sm">Today: 20 min wasted · 0 lines shipped</div>
                  <div className="text-white/50 text-sm font-mono space-y-2">
                    <p>09:03 - &quot;What&apos;s the auth spec?&quot;</p>
                    <p>09:05 - You re-paste the spec (3rd time)</p>
                    <p className="text-red-400/70">09:12 - Context window exceeded</p>
                  </div>
                </div>
                <div className="border-l-2 border-cyan-500/50 pl-6 py-2">
                  <div className="text-cyan-400 mb-2 font-mono text-sm">With IAS: 47 seconds · 1 commit shipped</div>
                  <div className="text-white/50 text-sm font-mono space-y-2">
                    <p>Context loaded from docs/ias/</p>
                    <p>Spec read from context pack</p>
                    <p className="text-cyan-400/70">Committed: a3f2b1c</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
               {[
                { title: "Non-Blocking Decisions", text: "Agents don't stop and wait. They create requests, stub the gap, and keep moving. You answer when you're ready." },
                { title: "Multi-Persona Quality", text: "Work runs through built-in role passes — PM scoping, UX validation, and implementation review. Not just 'did it compile.'" },
                { title: "Durable Re-Entry", text: "Context lives in repo files, not chat history. Any agent can pick up where another left off — understand the state, and continue." },
              ].map((item, i) => (
                <div key={i} className="group relative rounded-xl border border-white/5 bg-[#111113]/80 p-6 transition-all duration-700 hover:border-cyan-500/30 hover:bg-black backdrop-blur-md">
                   <div className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 group-hover:text-cyan-400 transition-colors duration-500 mb-2">Advantage 0{i+1}</div>
                   <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                   <p className="text-white/50 leading-relaxed text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* THE WORKFLOW */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-40 font-sans"
          >
            <div className="mb-12">
              <div className="inline-flex items-center gap-4 mb-4">
                 <div className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">The Workflow</div>
                 <div className="h-px w-16 bg-gradient-to-r from-cyan-400/40 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.1]">
                Your repo. Your machine. <br/>
                <span className="text-cyan-400">Zero vendor lock-in.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: FolderGit2, title: "Bootstrap", desc: "IAS scaffolds a docs/ias/ directory into your repo. Context, world model, and policies are all version-controlled." },
                { icon: Play, title: "Claim & Run", desc: "Workers claim jobs from the queue and execute against your local checkout. Real-time feedback in the CLI." },
                { icon: ShieldCheck, title: "Quality Gates", desc: "Built-in role passes: PM scoping, UX validation, and security checks. Not just 'did it compile.'" },
                { icon: GitCommitHorizontal, title: "Git-Native", desc: "Every action produces a commit with a real SHA. Full traceability back from intent to final code." }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-xl bg-[#111113]/80 border border-white/5 backdrop-blur-md hover:border-cyan-500/30 transition-colors group">
                  <div className="w-10 h-10 rounded-sm bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* TRUST AND PERFORMANCE */}
           <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-40 font-sans grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <div>
               <div className="inline-flex items-center gap-4 mb-4">
                 <div className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">Trust & Performance</div>
                 <div className="h-px w-16 bg-gradient-to-r from-cyan-400/40 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.1] mb-6">
                Deterministic context. <br/>
                <span className="text-white/40">Not RAG roulette.</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                Every job gets an explicit, reproducible context pack. Idempotent upserts, append-only revisions, and space-scoped ACLs.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="p-8 rounded-xl bg-[#111113]/80 border border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-6">
                  <Pin className="text-cyan-400 w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">Context Lake</h3>
                </div>
                <ul className="space-y-3 text-white/50 text-sm font-mono">
                  <li>→ Pinned items + recent sources = deterministic pack.</li>
                  <li>→ Idempotent upserts with dedup keys — safe to re-sync.</li>
                  <li>→ Every job records exactly which items it consumed.</li>
                </ul>
              </div>

               <div className="p-8 rounded-xl bg-[#111113]/80 border border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-4 mb-6">
                  <Shield className="text-cyan-400 w-6 h-6" />
                  <h3 className="text-xl font-bold text-white">Security Architecture</h3>
                </div>
                <ul className="space-y-3 text-white/50 text-sm font-mono">
                  <li>→ Workers claim jobs locally from a secure queue.</li>
                  <li>→ Source code never leaves your infrastructure.</li>
                  <li>→ The cloud receives only orchestration metadata.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* INSTALLATION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-40 p-1 bg-gradient-to-br from-cyan-500/30 via-white/5 to-cyan-500/10 rounded-xl overflow-hidden font-mono"
          >
            <div className="bg-[#0a0a0b] p-12 rounded-lg">
              <h2 className="text-2xl font-bold mb-6 text-white tracking-tight">Deploy to any repository in seconds.</h2>
              <div className="bg-[#0c0c0e] border border-white/10 rounded-lg p-6 text-sm overflow-x-auto text-cyan-300/80 shadow-inner">
                <div className="flex gap-4 mb-2 opacity-50"><span className="text-white/30">1</span> <span>{/* Install the global CLI */}</span></div>
                <div className="flex gap-4 mb-4"><span className="text-white/30">2</span> <span className="text-white">npm i -g @lucentivelabs/ias</span></div>
                <div className="flex gap-4 mb-2 opacity-50"><span className="text-white/30">3</span> <span>{/* Bootstrap into any repo */}</span></div>
                <div className="flex gap-4 mb-4"><span className="text-white/30">4</span> <span className="text-white">ias bootstrap /path/to/target-repo --profile full</span></div>
                <div className="flex gap-4 mb-2 opacity-50"><span className="text-white/30">5</span> <span>{/* Run preflight checks */}</span></div>
                <div className="flex gap-4 mb-4"><span className="text-white/30">6</span> <span className="text-white">./scripts/ias preflight --fix</span></div>
                <div className="flex gap-4 mb-2 opacity-50"><span className="text-white/30">7</span> <span>{/* Start an autonomous run */}</span></div>
                <div className="flex gap-4"><span className="text-white/30">8</span> <span className="text-white">./scripts/ias new-run feature-login</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
