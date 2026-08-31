"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AetheriaFaq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Aetheria achieve sub-12ms inference latency?",
      a: "By leveraging proprietary kernel fusion, multi-GPU H100 memory quantization, and dynamic model routing across 35 edge nodes.",
    },
    {
      q: "Is my proprietary training data used for model training?",
      a: "No. Aetheria operates under strict zero-knowledge data retention. Your prompts and fine-tuned weights remain 100% private.",
    },
    {
      q: "Can I bring my own vector database or fine-tuned model?",
      a: "Yes. Aetheria provides one-click connectors for Pinecone, Milvus, Qdrant, Weaviate, and custom PyTorch weights.",
    },
    {
      q: "What SLAs are guaranteed for Enterprise customers?",
      a: "Enterprise Matrix plans include a 99.99% uptime SLA, dedicated VPC isolation, and 24/7 priority support.",
    },
  ];

  return (
    <section className="py-20 bg-[#07080D] text-white font-mono border-b border-purple-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="space-y-3 mb-16">
          <span className="text-xs text-purple-400 font-bold uppercase tracking-widest">// FAQ &amp; SUPPORT</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4 text-left font-sans">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#0D0E15] rounded-2xl border border-purple-900/40 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 flex items-center justify-between font-mono font-bold text-sm text-white hover:text-purple-300 text-left focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-purple-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-gray-400 font-sans leading-relaxed border-t border-purple-950 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
