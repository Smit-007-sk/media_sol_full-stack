"use client";

import { Cpu, ShieldCheck, Server, Lock, HardDrive, CpuIcon } from "lucide-react";

export default function AetheriaArchitecture() {
  const specs = [
    {
      icon: Server,
      title: "Multi-Region Edge Clusters",
      desc: "Distributed compute nodes across 35 global edge regions ensuring < 12ms round-trip latency.",
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Encryption",
      desc: "Prompts and model weights are encrypted in-transit and at-rest. Zero data retention by default.",
    },
    {
      icon: HardDrive,
      title: "High-Throughput Vector DB",
      desc: "Native integration with Pinecone, Qdrant, and Milvus supporting 10B+ vector embeddings.",
    },
    {
      icon: CpuIcon,
      title: "Multi-GPU H100 Cluster",
      desc: "NVIDIA H100 Tensor Core GPU clusters optimized for ultra-low latency transformer inference.",
    },
  ];

  return (
    <section className="py-20 bg-[#07080D] text-white font-mono border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="space-y-3 max-w-2xl mx-auto mb-16">
          <div className="text-xs text-[#10B981] font-bold tracking-widest uppercase font-mono">
            // ENTERPRISE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Built for Mission-Critical <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">AI Workloads</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-sans">
            Bank-grade isolation, automated failover, and sub-second model checkpointing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#0E101A] p-7 rounded-2xl border border-purple-900/40 text-left hover:border-purple-500/60 transition-colors space-y-4 shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-800/60 text-[#10B981] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
