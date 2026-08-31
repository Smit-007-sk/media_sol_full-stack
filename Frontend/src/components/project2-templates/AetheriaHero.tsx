"use client";

import { useState } from "react";
import { Terminal, Sparkles, Code2, Activity, Play, CheckCircle2, Copy } from "lucide-react";

export default function AetheriaHero() {
  const [activeTab, setActiveTab] = useState<"terminal" | "api" | "logs">("terminal");
  const [prompt, setPrompt] = useState("aetheria deploy --model quantum-v4 --region us-east --auto-scale");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative bg-[#07080D] text-white py-20 lg:py-28 overflow-hidden font-mono border-b border-purple-900/30">
      {/* Background Cyber Glow Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-purple-900/25 via-indigo-600/20 to-emerald-500/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#2e1065_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* Top Centered Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-700/50 text-purple-300 text-xs font-bold uppercase tracking-widest mx-auto">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>AETHERIA NEURAL OS // VERSION 4.2</span>
        </div>

        {/* Big Centered Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight max-w-4xl mx-auto">
          The Autonomous <br />
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            AI Command Center
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed">
          Deploy, monitor, and scale generative AI models with a single command. Sub-12ms latency, automated RAG vector sync, and zero-trust encryption.
        </p>

        {/* FULL-WIDTH CENTERED TABBED TERMINAL HUD CONSOLE */}
        <div className="mt-10 bg-[#0D0E17] rounded-3xl border border-purple-500/40 p-4 sm:p-6 shadow-2xl text-left max-w-4xl mx-auto">
          
          {/* Console Top Bar with Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs text-gray-400 font-bold ml-2 hidden sm:inline">aetheria-shell v4.2</span>
            </div>

            {/* Tab Selector Buttons */}
            <div className="flex items-center gap-1 bg-[#05060A] p-1 rounded-xl border border-gray-800 text-xs">
              <button
                onClick={() => setActiveTab("terminal")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeTab === "terminal" ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>CLI Terminal</span>
              </button>

              <button
                onClick={() => setActiveTab("api")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeTab === "api" ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>API SDK</span>
              </button>

              <button
                onClick={() => setActiveTab("logs")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeTab === "logs" ? "bg-purple-600 text-white shadow-md" : "text-gray-400 hover:text-white"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Telemetry Logs</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              title="Copy snippet"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Console Tab Content */}
          <div className="pt-4 pb-2">
            {activeTab === "terminal" && (
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="text-gray-400">
                  <span className="text-purple-400 font-bold">$</span> {prompt}
                </div>
                <div className="p-3 bg-[#05060A] rounded-xl border border-purple-900/40 text-emerald-400 leading-relaxed">
                  <div>[2026-08-25 16:24:10] Initializing Quantum Cluster...</div>
                  <div>[2026-08-25 16:24:11] Syncing Vector Index (1,240,000 documents)</div>
                  <div>[2026-08-25 16:24:12] Model Route Established: <span className="text-purple-300 font-bold">aetheria-v4-quantum</span></div>
                  <div>[2026-08-25 16:24:12] Latency Check: <span className="text-emerald-300 font-bold">11.4ms</span> | Health: <span className="text-emerald-300 font-bold">100% OK</span></div>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div className="font-mono text-xs sm:text-sm text-indigo-300 bg-[#05060A] p-4 rounded-xl border border-indigo-900/40 leading-relaxed overflow-x-auto">
                <pre>{`import { AetheriaClient } from "@aetheria/sdk";

const aetheria = new AetheriaClient({ apiKey: process.env.AETHERIA_KEY });

const response = await aetheria.chat.completions.create({
  model: "aetheria-quantum-v4",
  messages: [{ role: "user", content: "Optimize system design" }],
  stream: true,
  guardrails: { piiMasking: true }
});`}</pre>
              </div>
            )}

            {activeTab === "logs" && (
              <div className="font-mono text-xs text-gray-300 bg-[#05060A] p-4 rounded-xl border border-gray-800 space-y-1.5">
                <div className="flex items-center justify-between text-emerald-400">
                  <span>POST /v1/chat/completions</span>
                  <span>200 OK (11.8ms)</span>
                </div>
                <div className="flex items-center justify-between text-emerald-400">
                  <span>POST /v1/embeddings/create</span>
                  <span>200 OK (8.2ms)</span>
                </div>
                <div className="flex items-center justify-between text-purple-400">
                  <span>SYSTEM_HEALTH_CHECK</span>
                  <span>ALL NODES OPERATIONAL</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
