"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Types ─── */

type Message = {
  id: string;
  role: "user" | "ai" | "system";
  content: string;
  type?: "text" | "proposal";
};

type Task = {
  id: string;
  text: string;
  status: "queued" | "running" | "done";
};

type FlowOption = {
  intent: string;
  question: string;
  answers: [string, string];
  scope: string;
  context: string;
  tasks: string[];
};

/* ─── Placeholder flows ─── */

const FLOWS: FlowOption[] = [
  {
    intent: "Lorem ipsum task alpha",
    question:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco?",
    answers: ["Option A placeholder", "Option B placeholder"],
    scope:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
    context: "docs/context/reference-alpha.md",
    tasks: [
      "Step A placeholder",
      "Step B placeholder",
      "Step C placeholder",
    ],
  },
  {
    intent: "Amet consectetur task beta",
    question:
      "Duis aute irure dolor in reprehenderit in voluptate velit?",
    answers: ["Option C placeholder", "Option D placeholder"],
    scope:
      "Excepteur sint occaecat cupidatat non proident sunt in culpa.",
    context: "docs/context/reference-beta.md",
    tasks: ["Step D placeholder", "Step E placeholder", "Step F placeholder"],
  },
  {
    intent: "Adipiscing elit task gamma",
    question:
      "Sed ut perspiciatis unde omnis iste natus error sit?",
    answers: ["Option E placeholder", "Option F placeholder"],
    scope:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit.",
    context: "docs/context/reference-gamma.md",
    tasks: [
      "Step G placeholder",
      "Step H placeholder",
      "Step I placeholder",
    ],
  },
];

/* ─── Icons (inline SVGs to avoid extra imports) ─── */

function BotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function DashboardIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function ZapIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  );
}

function RocketIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

/* ─── Lane component ─── */

function Lane({
  title,
  icon: Icon,
  color,
  tasks,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  tasks: Task[];
}) {
  const isLive = title === "Live";
  const bgStyle = {
    background: isLive
      ? `linear-gradient(180deg, ${color}0a 0%, rgba(24,24,27,0.5) 100%)`
      : `rgba(24,24,27,0.5)`,
    borderColor: isLive ? `${color}20` : `rgba(255,255,255,0.05)`,
  };

  return (
    <div
      className="flex flex-col h-full rounded-xl md:rounded-[1.5rem] border p-3 md:p-5 shadow-inner backdrop-blur-sm relative overflow-hidden"
      style={bgStyle}
    >
      {isLive && (
        <div
          className="absolute top-0 left-0 w-full h-[1px]"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
          }}
        />
      )}

      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6">
        <div
          className="p-1 md:p-1.5 rounded-lg border"
          style={{ backgroundColor: `${color}10`, borderColor: `${color}30` }}
        >
          <Icon className="w-3 h-3 md:w-4 md:h-4" style={{ color }} />
        </div>
        <span className="font-mono text-[10px] md:text-sm font-semibold uppercase tracking-wider text-white">
          {title}
        </span>
        <span className="ml-auto font-mono text-[8px] md:text-[10px] text-[#9898a4] bg-[#0a0a0b] px-1.5 md:px-2 py-0.5 md:py-1 rounded-md border border-white/5">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 relative overflow-visible">
        {tasks.map((t) => (
          <motion.div
            layout
            layoutId={t.id}
            key={t.id}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
              mass: 1,
            }}
            className="bg-[#111113] border border-white/5 p-2.5 md:p-4 rounded-lg md:rounded-xl shadow-lg hover:border-white/10 relative group"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                {t.status === "done" ? (
                  <CheckIcon className="w-4 h-4 text-[#22c55e]" />
                ) : t.status === "running" ? (
                  <LoaderIcon className="w-4 h-4 text-[#22d3ee] animate-spin" />
                ) : (
                  <div className="w-4 h-4 rounded-sm border-2 border-white/20" />
                )}
              </div>
              <span
                className={`text-[10px] md:text-sm leading-snug ${t.status === "done" ? "text-[#787882]" : "text-[#c8c8d0] font-medium"}`}
              >
                {t.text}
              </span>
            </div>

            {t.status === "running" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden rounded-b-xl">
                <motion.div
                  className="h-full bg-[#22d3ee]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main component ─── */

export default function GovernanceDemo() {
  const [resetKey, setResetKey] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "system",
      content: "Lorem ipsum — what would you like to do?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [stage, setStage] = useState<
    "intent" | "interview" | "proposal" | "workboard" | "done"
  >("intent");
  const [selectedFlow, setSelectedFlow] = useState<FlowOption | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      scrollContainerRef.current &&
      (stage === "intent" || stage === "interview" || stage === "proposal")
    ) {
      const container = scrollContainerRef.current;
      requestAnimationFrame(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [messages, isTyping, stage]);

  useEffect(() => {
    if (stage === "workboard") {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setTasks((prev) => {
          const newTasks = [...prev];
          if (step === 1) {
            newTasks[0] = { ...newTasks[0], status: "running" };
          } else if (step === 2) {
            newTasks[0] = { ...newTasks[0], status: "done" };
            newTasks[1] = { ...newTasks[1], status: "running" };
          } else if (step === 3) {
            newTasks[1] = { ...newTasks[1], status: "done" };
            newTasks[2] = { ...newTasks[2], status: "running" };
          } else if (step === 4) {
            newTasks[2] = { ...newTasks[2], status: "done" };
            setStage("done");
            clearInterval(interval);
          }
          return newTasks;
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const handleApproveProposal = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: "user",
        content: "Approved. Proceed.",
      },
    ]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const generatedTasks = (selectedFlow?.tasks ?? []).map((t, i) => ({
        id: `task-${i}`,
        text: t,
        status: "queued" as const,
      }));
      setTasks(generatedTasks);
      setStage("workboard");
    }, 1000);
  };

  const handleReset = () => {
    const nextKey = resetKey + 1;
    setResetKey(nextKey);
    setStage("intent");
    setSelectedFlow(null);
    setTasks([]);
    setIsTyping(false);
    setMessages([
      {
        id: `initial-${nextKey}`,
        role: "system",
        content: "Lorem ipsum — what would you like to do?",
      },
    ]);
  };

  return (
    <section ref={ref} className="relative z-10 py-32 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs tracking-widest text-cyan-400/60 uppercase mb-4">
            Demo Section Eyebrow
          </p>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
            Interactive demo headline here.
          </h2>
          <p className="text-white/40 mt-3 text-sm max-w-lg mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto w-full max-w-4xl"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-[#22d3ee]/5 blur-[120px]" />

          <div className="relative flex flex-col bg-[#0c0c0e] rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden h-[500px] md:h-[550px] z-10">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/10 border border-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10 border border-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10 border border-white/10" />
              </div>
              <span className="ml-3 font-mono text-xs text-white/30">
                {stage === "workboard" || stage === "done"
                  ? "platform-workboard"
                  : "platform-system"}
              </span>

              <div className="ml-auto flex items-center gap-4">
                {stage === "done" && (
                  <button
                    onClick={handleReset}
                    className="text-[10px] font-mono uppercase tracking-widest font-bold text-[#22d3ee] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  >
                    Restart <ArrowRightIcon className="w-3 h-3 rotate-180" />
                  </button>
                )}
                <span
                  className={`h-2 w-2 rounded-full ${stage === "workboard" || stage === "done" ? "bg-[#22c55e]" : "bg-[#22d3ee] animate-pulse"}`}
                />
              </div>
            </div>

            {/* Project context bar */}
            <div className="flex items-center gap-2 px-6 py-2 bg-[#111113]/40 border-b border-white/5 relative z-20">
              <FolderIcon className="w-3 h-3 text-[#787882]" />
              <span className="font-mono text-[10px] text-[#787882] tracking-wide">
                Project:{" "}
                <span className="text-[#9898a4]">project-placeholder</span>
              </span>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden flex flex-col z-10">
              <AnimatePresence mode="popLayout">
                {stage === "workboard" || stage === "done" ? (
                  <motion.div
                    key={`workboard-${resetKey}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col p-4 md:p-8 bg-[#0c0c0e]"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-white text-xl md:text-2xl font-semibold flex items-center gap-3">
                          Live Execution
                          {stage !== "done" && (
                            <LoaderIcon className="w-5 h-5 text-[#22d3ee] animate-spin" />
                          )}
                        </h3>
                        <p className="text-sm text-[#787882] mt-1">
                          Workers are processing your request.
                        </p>
                      </div>
                      {stage === "done" && (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-mono font-bold uppercase tracking-wider">
                          <CheckIcon className="w-3.5 h-3.5" /> All tasks
                          complete
                        </span>
                      )}
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-3 md:gap-6 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                      <Lane
                        title="Queued"
                        icon={DashboardIcon}
                        color="#f59e0b"
                        tasks={tasks.filter((t) => t.status === "queued")}
                      />
                      <Lane
                        title="Live"
                        icon={ZapIcon}
                        color="#22d3ee"
                        tasks={tasks.filter((t) => t.status === "running")}
                      />
                      <Lane
                        title="Shipped"
                        icon={RocketIcon}
                        color="#22c55e"
                        tasks={tasks.filter((t) => t.status === "done")}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`chat-${resetKey}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <div
                      ref={scrollContainerRef}
                      className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full"
                    >
                      <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`flex gap-3 md:gap-4 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            {msg.role !== "user" && (
                              <div className="w-8 h-8 rounded-full bg-[#18181b] border border-white/10 flex items-center justify-center shrink-0 shadow-sm">
                                <BotIcon className="w-4 h-4 text-[#22d3ee]" />
                              </div>
                            )}

                            <div
                              className={`max-w-[90%] md:max-w-[85%] ${
                                msg.role === "user"
                                  ? "bg-gradient-to-br from-[#22d3ee] to-[#0ea5e9] text-black shadow-[0_4px_20px_rgba(34,211,238,0.2)] rounded-2xl px-5 py-3.5"
                                  : "bg-[#18181b] border border-white/5 text-[#c8c8d0] shadow-sm rounded-2xl px-5 py-3.5"
                              } text-sm leading-relaxed ${msg.type ? "w-full" : ""}`}
                            >
                              {msg.content}

                              {msg.type === "proposal" && (
                                <motion.div
                                  initial={{ opacity: 0, marginTop: 0 }}
                                  animate={{ opacity: 1, marginTop: 16 }}
                                  className="bg-[#0a0a0b]/80 border border-white/10 rounded-xl p-5 space-y-4 shadow-inner"
                                >
                                  <h4 className="font-semibold text-white flex items-center gap-2 text-base">
                                    <SparklesIcon className="w-4 h-4 text-[#22d3ee]" />
                                    Proposal
                                  </h4>
                                  <div className="space-y-3">
                                    <div>
                                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#22d3ee] block mb-1">
                                        Scope
                                      </span>
                                      <div className="text-sm text-[#9898a4] leading-relaxed bg-[#111113] p-3 rounded-lg border border-white/5">
                                        {selectedFlow?.scope ?? ""}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#22d3ee] block mb-1">
                                        Context Loaded
                                      </span>
                                      <div className="text-xs font-mono text-[#787882] bg-[#111113] p-2 rounded-lg border border-white/5 truncate flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-[#22c55e] rounded-full" />
                                        {selectedFlow?.context ?? "docs/context/reference.md"}
                                      </div>
                                    </div>
                                  </div>
                                  {stage === "proposal" && (
                                    <button
                                      onClick={handleApproveProposal}
                                      className="mt-6 w-full py-3.5 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all cursor-pointer"
                                    >
                                      Approve & Execute
                                    </button>
                                  )}
                                </motion.div>
                              )}
                            </div>

                            {msg.role === "user" && (
                              <div className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center shrink-0 border border-white/10 shadow-sm">
                                <UserIcon className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </motion.div>
                        ))}
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex gap-3 md:gap-4"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#18181b] flex items-center justify-center shrink-0 border border-white/10 shadow-sm">
                              <BotIcon className="w-4 h-4 text-[#22d3ee]" />
                            </div>
                            <div className="bg-[#18181b] border border-white/5 rounded-2xl px-5 py-3.5 flex items-center gap-1.5 h-[48px]">
                              <span
                                className="w-1.5 h-1.5 bg-[#22d3ee]/60 rounded-full animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              />
                              <span
                                className="w-1.5 h-1.5 bg-[#22d3ee]/60 rounded-full animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              />
                              <span
                                className="w-1.5 h-1.5 bg-[#22d3ee]/60 rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Intent Option Cards */}
                    {stage === "intent" && !isTyping && (
                      <div className="p-4 md:p-6 bg-[#0a0a0b]/80 border-t border-white/5 relative z-10 backdrop-blur-md">
                        <div className="max-w-3xl mx-auto space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#787882] mb-2 block">
                            Choose your intent
                          </span>
                          {FLOWS.map((flow) => (
                            <button
                              key={flow.intent}
                              onClick={() => {
                                setSelectedFlow(flow);
                                setMessages((prev) => [
                                  ...prev,
                                  {
                                    id: Date.now().toString(),
                                    role: "user",
                                    content: flow.intent,
                                  },
                                ]);
                                setIsTyping(true);
                                setTimeout(() => {
                                  setIsTyping(false);
                                  setMessages((prev) => [
                                    ...prev,
                                    {
                                      id: (Date.now() + 1).toString(),
                                      role: "ai",
                                      content: flow.question,
                                    },
                                  ]);
                                  setStage("interview");
                                }, 1000);
                              }}
                              className="w-full text-left rounded-xl border border-white/10 bg-[#18181b] px-5 py-3.5 text-sm text-[#c8c8d0] transition-all duration-200 hover:border-[#22d3ee]/40 hover:bg-[#1f1f23] hover:text-white cursor-pointer"
                            >
                              {flow.intent}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interview Answer Options */}
                    {stage === "interview" && !isTyping && selectedFlow && (
                      <div className="p-4 md:p-6 bg-[#0a0a0b]/80 border-t border-white/5 relative z-10 backdrop-blur-md">
                        <div className="max-w-3xl mx-auto space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#787882] mb-2 block">
                            Your answer
                          </span>
                          {selectedFlow.answers.map((answer) => (
                            <button
                              key={answer}
                              onClick={() => {
                                setMessages((prev) => [
                                  ...prev,
                                  {
                                    id: Date.now().toString(),
                                    role: "user",
                                    content: answer,
                                  },
                                ]);
                                setIsTyping(true);
                                setTimeout(() => {
                                  setIsTyping(false);
                                  setMessages((prev) => [
                                    ...prev,
                                    {
                                      id: (Date.now() + 1).toString(),
                                      role: "ai",
                                      content:
                                        "Lorem ipsum — proposal drafted based on context analysis.",
                                      type: "proposal",
                                    },
                                  ]);
                                  setStage("proposal");
                                }, 1200);
                              }}
                              className="w-full text-left rounded-xl border border-white/10 bg-[#18181b] px-5 py-3.5 text-sm text-[#c8c8d0] transition-all duration-200 hover:border-[#22d3ee]/40 hover:bg-[#1f1f23] hover:text-white cursor-pointer"
                            >
                              {answer}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <p className="text-[10px] text-[#787882] text-center mt-3 font-mono">
          * Simulated workflow for demonstration purposes
        </p>
      </div>
    </section>
  );
}
