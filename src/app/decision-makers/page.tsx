"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, BarChart4, Globe2, Lock, Scale, Building2, Server, FolderSync } from 'lucide-react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import dynamic from 'next/dynamic';

const DecisionMakersGlobe = dynamic(() => import('@/components/canvas/DecisionMakersGlobe'), { ssr: false });

export default function DecisionMakersPage() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-white selection:bg-cyan-500/30 overflow-hidden font-sans">
      <Navbar />
      
      {/* Background 3D Scene */}
      <DecisionMakersGlobe />

      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-40 pb-20 pointer-events-none">
        <div className="pointer-events-auto">
          {/* HERO SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-sm bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-8 backdrop-blur-md">
              <Globe2 className="w-4 h-4" />
              <span>Enterprise Autonomy Control Plane</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-medium tracking-tight mb-8 leading-[1.1] text-white">
              Absolute Control. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">Zero Compromise.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
              Command your AI workforce with IAS Console. Gain complete visibility, governance, and verifiable ROI from your autonomous engineering teams without surrendering architectural oversight.
            </p>
            
            <div className="flex justify-center gap-6">
              <button className="px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-sm transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:shadow-[0_0_50px_rgba(34,211,238,0.4)]">
                Request Executive Demo
              </button>
            </div>
          </motion.div>

          {/* MARKET RISKS */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-40 font-sans"
          >
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center gap-4 mb-4">
                 <div className="h-px w-16 bg-gradient-to-l from-cyan-400/40 to-transparent" />
                 <div className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">The Market Moment</div>
                 <div className="h-px w-16 bg-gradient-to-r from-cyan-400/40 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.1]">
                The ground is shifting <br/>
                <span className="text-white/40">beneath enterprise AI.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
               {[
                { icon: Lock, title: "Platform consolidation", type: "Strategic Risk", text: "AI platforms are consolidating fast. The orchestration layer you don't own today becomes the vendor you can't leave tomorrow. Your workflows, your data, your team's muscle memory — all locked inside someone else's roadmap." },
                { icon: Scale, title: "Regulatory exposure", type: "Compliance Risk", text: "Regulators are catching up faster than most CTOs expect. AI-generated code shipping to production without traceability isn't a hypothetical compliance gap — it's a liability that's already being audited in regulated industries." }
              ].map((item, i) => (
                <div key={i} className="group relative rounded-xl border border-white/5 bg-[#111113]/60 p-8 transition-all duration-700 hover:border-red-500/30 backdrop-blur-md">
                   <div className="flex items-center justify-between mb-6">
                     <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-red-500/30 transition-colors">
                       <item.icon className="w-5 h-5 text-white/50 group-hover:text-red-400 transition-colors" />
                     </div>
                     <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold text-red-400/50 group-hover:text-red-400 transition-colors">{item.type}</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                   <p className="text-white/50 leading-relaxed text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* THREE PILLARS OF INFRASTRUCTURE */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mt-40 font-sans"
          >
            <div className="mb-12">
              <div className="inline-flex items-center gap-4 mb-4">
                 <div className="text-cyan-400 text-[10px] font-bold tracking-[0.3em] uppercase">The Product</div>
                 <div className="h-px w-16 bg-gradient-to-r from-cyan-400/40 to-transparent" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter leading-[1.1] mb-4">
                Three pillars of <br/>
                <span className="text-cyan-400">infrastructure.</span>
              </h2>
              <p className="text-white/50 text-lg">Three layers of infrastructure for how your organization works with AI agents.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Server, title: "Agent Framework", subtitle: "Your rules, deployed in hours", trust: "Runs locally.", desc: "Guardrails for any repo — context packs, quality gates, and decision policies included." },
                { icon: Building2, title: "Command Center", subtitle: "Full visibility for leadership", trust: "Links to commit SHA.", desc: "A live workboard showing what needs attention, what is running, and what shipped." },
                { icon: FolderSync, title: "Context Lake", subtitle: "Organizational memory", trust: "Scoped access.", desc: "Architecture decisions, constraints, and domain language — curated and synced automatically." }
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-xl bg-[#111113]/80 border border-white/5 backdrop-blur-md hover:border-cyan-500/30 transition-colors flex flex-col h-full group">
                  <div className="flex justify-between items-start mb-6">
                    <feature.icon className="w-8 h-8 text-cyan-400 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    <span className="text-xs font-mono text-cyan-400/50">{feature.trust}</span>
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-white/30 mb-2">{feature.subtitle}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/50 leading-relaxed text-sm mt-auto">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* GOVERNANCE & ROI */}
          <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group bg-[#111113]/60 border border-white/5 p-8 rounded-xl backdrop-blur-md hover:border-cyan-500/30 transition-all"
            >
              <div className="mb-6 inline-flex p-4 rounded-lg bg-black border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500">
                <ShieldCheck className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-medium text-white mb-4">Enterprise Governance</h3>
              <p className="text-white/60 leading-relaxed text-lg mb-6">
                Implement non-negotiable hard constraints within the project-context.md. Agents execute deterministically without ever deviating from protocol. Ensure compliance, styling, and framework rules are universally applied.
              </p>
              <ul className="space-y-3 text-sm font-mono text-white/50">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Strict Dependency Whitelists</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Automated Code Review Integration</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Enforced Architectural Patterns</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group bg-[#111113]/60 border border-white/5 p-8 rounded-xl backdrop-blur-md hover:border-cyan-500/30 transition-all"
            >
              <div className="mb-6 inline-flex p-4 rounded-lg bg-black border border-white/10 group-hover:border-cyan-500/50 transition-all duration-500">
                <BarChart4 className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-3xl font-medium text-white mb-4">Verifiable ROI</h3>
              <p className="text-white/60 leading-relaxed text-lg mb-6">
                Stop guessing the value of AI coding tools. Measure impact directly through the IAS Console. View cycle times, code quality metrics, and autonomous issue resolution rates in real-time.
              </p>
              <ul className="space-y-3 text-sm font-mono text-white/50">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Task Completion Tracking</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Human Intervention Ratios</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Predictable Engineering Budgets</li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mt-40 border-t border-white/5 pt-20 text-center"
          >
            <h2 className="text-sm font-mono uppercase tracking-widest text-white/40 mb-12">Trusted by visionary enterprise teams.</h2>
            <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="text-2xl font-bold tracking-widest">ACME CORP</div>
              <div className="text-2xl font-bold tracking-widest text-cyan-400">GLOBEX</div>
              <div className="text-2xl font-bold tracking-widest">SOYUZ</div>
              <div className="text-2xl font-bold tracking-widest">MASSIVE DYNAMIC</div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
