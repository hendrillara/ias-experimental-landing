"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AgentStatus = "running" | "done" | "blocked";

interface Agent {
  name: string;
  task: string;
  status: AgentStatus;
}

export default function DashboardDemo() {
  const [agents, setAgents] = useState<Agent[]>([
    { name: "worker-1", task: "task-alpha", status: "running" },
    { name: "worker-2", task: "task-beta", status: "done" },
    { name: "worker-3", task: "task-gamma", status: "blocked" },
  ]);
  const [decided, setDecided] = useState(false);
  const [shipped, setShipped] = useState([
    { id: "#341", desc: "fix: layout placeholder", time: "12:47 AM" },
    { id: "#342", desc: "feat: feature placeholder", time: "2:15 AM" },
    { id: "#343", desc: "test: testing placeholder", time: "4:30 AM" },
  ]);

  const handleDecision = () => {
    setDecided(true);
    setAgents((prev) =>
      prev.map((a) =>
        a.name === "worker-3" ? { ...a, status: "running" } : a
      )
    );
    setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) =>
          a.name === "worker-3" ? { ...a, status: "done" } : a
        )
      );
      setShipped((prev) => [
        ...prev,
        { id: "#344", desc: "refactor: strategy update", time: "now" },
      ]);
    }, 2000);
  };

  const statusIcon = (s: AgentStatus) =>
    s === "running" ? "●" : s === "done" ? "✓" : "⚠";
  const statusColor = (s: AgentStatus) =>
    s === "running" ? "text-blue-400" : s === "done" ? "text-green-400" : "text-yellow-400";

  return (
    <section className="relative z-10 py-32 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-12"
        >
          Interactive demo headline here.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-blue-400/15 rounded-xl bg-blue-400/5 backdrop-blur-sm overflow-hidden"
        >
          <div className="px-6 py-3 bg-blue-400/5 border-b border-blue-400/10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs text-blue-400/70 font-semibold">Platform Dashboard</span>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Agents</p>
              <div className="space-y-2">
                {agents.map((a) => (
                  <motion.div
                    key={a.name}
                    layout
                    className="flex items-center justify-between text-sm py-2 px-3 rounded bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className={statusColor(a.status)}>{statusIcon(a.status)}</span>
                      <span className="text-white/70">{a.name}</span>
                    </div>
                    <span className="text-white/40">{a.task}</span>
                    <motion.span
                      layout
                      className={`text-xs px-2 py-0.5 rounded ${
                        a.status === "done"
                          ? "bg-green-400/10 text-green-400"
                          : a.status === "running"
                          ? "bg-blue-400/10 text-blue-400"
                          : "bg-yellow-400/10 text-yellow-400"
                      }`}
                    >
                      {a.status}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {!decided && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border border-yellow-400/20 rounded-lg p-4 bg-yellow-400/5"
                >
                  <p className="text-xs text-yellow-400/80 uppercase tracking-widest mb-2">
                    Decision Request — worker-3
                  </p>
                  <p className="text-white/80 text-sm mb-1">Strategy A vs Strategy B for endpoint</p>
                  <div className="text-xs text-white/40 space-y-0.5 mb-4">
                    <p>• Current: Strategy A (3 consumers)</p>
                    <p>• Worker suggests: Strategy B (fewer steps)</p>
                    <p>• Risk: compatibility concern</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleDecision}
                      className="px-4 py-2 bg-blue-400/20 border border-blue-400/30 text-blue-400 text-xs rounded hover:bg-blue-400/30 transition-colors"
                    >
                      Approve A ✓
                    </button>
                    <button
                      onClick={handleDecision}
                      className="px-4 py-2 border border-white/15 text-white/50 text-xs rounded hover:border-white/30 transition-colors"
                    >
                      Approve B
                    </button>
                    <button
                      onClick={handleDecision}
                      className="px-4 py-2 border border-white/10 text-white/30 text-xs rounded hover:border-white/20 transition-colors"
                    >
                      Defer
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-3">Shipped Today</p>
              <div className="space-y-1.5">
                {shipped.map((s) => (
                  <motion.div
                    key={s.id}
                    layout
                    initial={s.time === "now" ? { opacity: 0, x: -10 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between text-xs py-1.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-white/60">{s.id}</span>
                      <span className="text-white/40">{s.desc}</span>
                    </div>
                    <span className="text-white/30">{s.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
