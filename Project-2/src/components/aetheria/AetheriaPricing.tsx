"use client";

import { Check } from "lucide-react";

export default function AetheriaPricing() {
  const plans = [
    {
      name: "Developer",
      price: "$0",
      period: "forever free",
      desc: "Ideal for sandbox experiments & individual developers.",
      features: [
        "100,000 Model Tokens / mo",
        "Community Discord Support",
        "Sub-30ms Inference Speed",
        "REST API Access",
      ],
      cta: "Start Building Free",
      highlight: false,
    },
    {
      name: "Growth Engine",
      price: "$49",
      period: "per month",
      desc: "For scaling startups requiring high-throughput LLM pipelines.",
      features: [
        "10,000,000 Model Tokens / mo",
        "Priority Model Routing",
        "Sub-15ms Latency Guarantee",
        "Dedicated Vector Store Sync",
        "24/7 Slack Support",
      ],
      cta: "Deploy Growth Plan",
      highlight: true,
    },
    {
      name: "Enterprise Matrix",
      price: "Custom",
      period: "unlimited compute",
      desc: "Dedicated VPC deployment with custom fine-tuned weights.",
      features: [
        "Unlimited Neural Compute",
        "Zero-Retention Data Isolation",
        "Custom Model Weight Fine-Tuning",
        "SLA 99.99% Uptime Guarantee",
        "Dedicated Solutions Architect",
      ],
      cta: "Contact Enterprise",
      highlight: false,
    },
  ];

  return (
    <section id="docs" className="py-20 bg-[#08090E] text-white font-mono border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl mx-auto mb-16">
          <div className="text-xs text-purple-400 font-bold tracking-widest uppercase">
            // DEPLOYMENT TIERS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Transparent <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">Compute Pricing</span>
          </h2>
          <p className="text-sm text-gray-400 font-sans">
            Pay only for the neural compute tokens you consume. No hidden setup fees.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 text-left border flex flex-col justify-between relative transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-b from-[#1E1B4B] via-[#0E101A] to-[#0A0B12] border-purple-500 shadow-2xl shadow-purple-900/50 scale-105"
                  : "bg-[#0D0E15] border-purple-900/40 hover:border-purple-600/50"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-emerald-400 text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-gray-400 font-sans">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  <span className="text-xs text-purple-400">{plan.period}</span>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-800">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-xs text-gray-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all ${
                    plan.highlight
                      ? "bg-gradient-to-r from-purple-600 to-emerald-500 text-white hover:opacity-90 shadow-lg shadow-purple-900/50"
                      : "bg-gray-900 text-purple-300 hover:text-white border border-purple-800/50 hover:bg-purple-950"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
