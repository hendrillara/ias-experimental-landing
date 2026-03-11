"use client";

import { motion } from 'framer-motion';
import { Kanban, TrendingUp, CheckCircle, GitMerge, FileWarning, Timer, CheckSquare, Zap, ScrollText, Clock, FileCode2 } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import dynamic from 'next/dynamic';

const PMRibbon = dynamic(() => import('@/components/canvas/PMRibbon'), { ssr: false });

export default function PMPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-white selection:bg-cyan-500/30 overflow-hidden font-sans">
      <Navbar />
      
      {/* Background 3D Scene */}
      <PMRibbon />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-40 pb-20 pointer-events-none">
        <div className="pointer-events-auto">
          {/* HERO SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-8">
              <TrendingUp className="w-4 h-4" />
              <span>Velocity meets Predictability</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
              Ship faster. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
                Break less.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 mb-12 font-light leading-relaxed">
              Integrate directly with Linear. Agents treat tickets as first-class citizens, autonomously verifying scope and acceptance criteria before writing a single line of code. No more bouncing incomplete tickets back to engineering.
            </p>
            
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-white text-black font-semibold rounded-sm transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Explore Workflows
              </button>
            </div>
          </motion.div>

          {/* THE TRANSPARENCY GAP */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-40 grid grid-cols-1 lg:grid-cols-2 gap-16 font-sans"
          >
            <div>
              <div className="inline-flex items-center gap-4 mb-4">
                 <div className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">The Transparency Gap</div>
                 <div className="h-px w-16 bg-gradient-to-r from-cyan-400/40 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.1] mb-8">
                AI agents are a black box. <br/>
                <span className="text-white/40">You deserve a control room.</span>
              </h2>

              <div className="space-y-6">
                <div className="border-l-2 border-red-500/30 pl-6 py-2">
                  <div className="text-red-400 mb-2 font-mono text-sm">Today: 5 context switches, 0 answers</div>
                  <div className="text-white/50 text-sm font-mono space-y-2">
                    <p><span className="text-white/30 mr-2">[PM]</span> What&apos;s the status on the settings page?</p>
                    <p><span className="text-white/30 mr-2">[DEV]</span> The agent did... something? Let me check.</p>
                    <p className="text-red-400/70"><span className="text-white/30 mr-2">[PM]</span> *Opens Slack, Linear, GitHub, terminal...*</p>
                  </div>
                </div>
                <div className="border-l-2 border-cyan-500/50 pl-6 py-2">
                  <div className="text-cyan-400 mb-2 font-mono text-sm">With IAS: 1 screen, full clarity.</div>
                  <div className="text-white/50 text-sm font-mono space-y-2">
                    <p>→ 3 agents running, 1 needs your approval</p>
                    <p>→ S3 or BLOBs? → Tap &apos;S3 + CDN&apos;</p>
                    <p className="text-cyan-400/70">→ 4 tasks shipped overnight</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {[
                { icon: CheckSquare, title: "Decision Requests", text: "When an agent hits an ambiguity, it creates a structured request. No vague Slack messages." },
                { icon: Zap, title: "Instant Resumption", text: "Agent continues with your answer immediately. No more status meetings about blockers." },
                { icon: ScrollText, title: "Full Auditability", text: "Every decision is recorded and auditable. Traces back from intent to final commit." },
                { icon: Clock, title: "Morning Briefings", text: "Summarize overnight progress and surface what needs your attention before your first meeting." },
              ].map((item, i) => (
                <div key={i} className="group relative rounded-xl border border-white/5 bg-[#111113]/80 p-6 transition-all duration-700 hover:border-cyan-500/30 hover:bg-black backdrop-blur-md">
                   <item.icon className="w-6 h-6 text-cyan-400 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                   <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                   <p className="text-white/50 leading-relaxed text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* LINEAR INTEGRATION & GUARDRAILS */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-40 font-sans"
          >
            <div className="mb-12">
              <div className="inline-flex items-center gap-4 mb-4">
                 <div className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">Deep Integrations</div>
                 <div className="h-px w-16 bg-gradient-to-r from-cyan-400/40 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.1]">
                Built into your tools. <br/>
                <span className="text-cyan-400">Not the other way around.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 rounded-xl bg-[#111113]/80 border border-white/5 backdrop-blur-md hover:border-cyan-500/30 transition-colors group">
                <Kanban className="w-10 h-10 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-4">Linear Native</h3>
                <p className="text-white/50 leading-relaxed text-sm">
                  Deep integration with Linear. If a ticket lacks scope or acceptance criteria, IAS runs a Definition of Ready check, upgrading the ticket automatically via API before code execution begins.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-[#111113]/80 border border-white/5 backdrop-blur-md hover:border-cyan-500/30 transition-colors group">
                <CheckCircle className="w-10 h-10 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-4">Quality Guardrails</h3>
                <p className="text-white/50 leading-relaxed text-sm">
                  Built-in PR gates and autonomous test validations. The agent writes tests for its own code, ensuring that AI-generated code meets human standards before a PR is opened.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-[#111113]/80 border border-white/5 backdrop-blur-md hover:border-cyan-500/30 transition-colors group">
                <GitMerge className="w-10 h-10 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-4">Autonomous PRs</h3>
                <p className="text-white/50 leading-relaxed text-sm">
                  Once work is complete, IAS automatically stages files, crafts a semantic commit message matching repo conventions, and opens a meticulously formatted Pull Request.
                </p>
              </div>
            </div>
          </motion.div>

          {/* METRICS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-40 relative rounded-xl overflow-hidden p-[1px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-white/10 to-cyan-500/30 opacity-50" />
            <div className="relative bg-[#0a0a0b]/90 backdrop-blur-2xl p-16 flex flex-col items-center text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Metrics that matter.</h2>
              <p className="text-white/40 max-w-2xl mb-12 text-lg">Track agent performance just like your human team. Real-time insights into autonomous cycle times and bug squashing rates.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-4xl">
                <div className="flex flex-col items-center">
                  <Timer className="w-8 h-8 text-cyan-400 mb-4 opacity-50" />
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-white mb-2">80%</div>
                  <div className="text-white/50 text-sm font-mono uppercase tracking-widest">Time saved on boilerplate</div>
                </div>
                <div className="flex flex-col items-center">
                  <FileCode2 className="w-8 h-8 text-cyan-400 mb-4 opacity-50" />
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-white mb-2">99%</div>
                  <div className="text-white/50 text-sm font-mono uppercase tracking-widest">Acceptance criteria met</div>
                </div>
                <div className="flex flex-col items-center">
                  <FileWarning className="w-8 h-8 text-cyan-400 mb-4 opacity-50" />
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-white mb-2">0</div>
                  <div className="text-white/50 text-sm font-mono uppercase tracking-widest">Lost context via chats</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
