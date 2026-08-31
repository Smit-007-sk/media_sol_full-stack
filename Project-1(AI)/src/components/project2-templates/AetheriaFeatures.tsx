"use client";

import { Check, X, ArrowRight, Cpu, Network, Zap, Shield, Layers } from "lucide-react";

export default function AetheriaFeatures() {
  const comparison = [
    { feature: "Inference Latency", aetheria: "< 12ms", traditional: "150ms - 800ms" },
    { feature: "Multi-Model Auto Routing", aetheria: true, traditional: false },
    { feature: "Native Vector Store Sync", aetheria: true, traditional: false },
    { feature: "Zero-Knowledge Data Privacy", aetheria: true, traditional: false },
    { feature: "Autonomous Agent Swarms", aetheria: true, traditional: false },
    { feature: "Real-Time SSE Streaming", aetheria: true, traditional: true },
  ];

  const pipeline = [
    { step: "01", title: "Input Prompt", desc: "User or API trigger event" },
    { step: "02", title: "Vector Embed", desc: "Sub-ms RAG context retrieval" },
    { step: "03", title: "Model Route", desc: "Auto-balances LLM cost & speed" },
    { step: "04", title: "Synthesize", desc: "Zero-trust safety filter" },
    { step: "05", title: "Stream Output", desc: "Instant WebSockets token stream" },
  ];

  return (
    <section className="py-20 bg-[#0A0B12] text-white font-mono border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. 5-Step Neural Execution Pipeline */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs text-purple-400 font-bold uppercase tracking-widest">// NEURAL EXECUTION PIPELINE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How Aetheria Executes in Milliseconds</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {pipeline.map((item, idx) => (
              <div key={idx} className="bg-[#0E101A] p-5 rounded-2xl border border-purple-900/40 text-left relative group hover:border-purple-500 transition-colors">
                <span className="text-2xl font-extrabold text-purple-500">{item.step}</span>
                <h4 className="font-bold text-white text-base mt-2">{item.title}</h4>
                <p className="text-xs text-gray-400 font-sans mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Feature Matrix Comparison Table */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">// BENCHMARK COMPARISON</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Aetheria vs Legacy AI Providers</h2>
          </div>

          <div className="bg-[#0D0E15] rounded-3xl border border-purple-900/50 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#121422] border-b border-purple-900/40 text-purple-300">
                    <th className="p-4 sm:p-5 font-bold">CAPABILITY FEATURE</th>
                    <th className="p-4 sm:p-5 font-bold text-emerald-400 bg-purple-950/40">AETHERIA NEURAL OS</th>
                    <th className="p-4 sm:p-5 font-bold text-gray-400">TRADITIONAL APIS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {comparison.map((row, idx) => (
                    <tr key={idx} className="hover:bg-purple-950/20 transition-colors">
                      <td className="p-4 sm:p-5 font-semibold text-gray-200">{row.feature}</td>
                      <td className="p-4 sm:p-5 font-bold text-emerald-300 bg-purple-950/20">
                        {typeof row.aetheria === "boolean" ? (
                          row.aetheria ? <Check className="w-5 h-5 text-emerald-400" /> : <X className="w-5 h-5 text-rose-500" />
                        ) : (
                          row.aetheria
                        )}
                      </td>
                      <td className="p-4 sm:p-5 text-gray-400">
                        {typeof row.traditional === "boolean" ? (
                          row.traditional ? <Check className="w-5 h-5 text-emerald-400" /> : <X className="w-5 h-5 text-rose-500" />
                        ) : (
                          row.traditional
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
