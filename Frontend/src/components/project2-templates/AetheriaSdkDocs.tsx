"use client";

import { useState } from "react";
import { Code2, Copy, CheckCircle2 } from "lucide-react";

export default function AetheriaSdkDocs() {
  const [lang, setLang] = useState<"python" | "ts" | "curl">("python");
  const [copied, setCopied] = useState(false);

  const snippets = {
    python: `import aetheria

client = aetheria.Client(api_key="aeth_sec_key_99482")

# Stream Neural Completions
stream = client.chat.completions.create(
    model="aetheria-quantum-v4",
    messages=[{"role": "user", "content": "Synthesize AI pipeline"}],
    stream=True
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="")`,
    ts: `import { Aetheria } from "@aetheria/sdk";

const client = new Aetheria({ apiKey: process.env.AETHERIA_KEY });

const stream = await client.chat.stream({
  model: "aetheria-quantum-v4",
  prompt: "Synthesize AI pipeline",
  temperature: 0.2,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text);
}`,
    curl: `curl https://api.aetheria.ai/v1/chat/completions \\
  -H "Authorization: Bearer aeth_sec_key_99482" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "aetheria-quantum-v4",
    "messages": [{"role": "user", "content": "Synthesize AI pipeline"}]
  }'`,
  };

  const copyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 bg-[#0A0B12] text-white font-mono border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="text-xs text-purple-400 font-bold tracking-widest uppercase font-mono">
              // MULTI-LANGUAGE SDKS
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Developer-First SDKs &amp; Instant Integrations
            </h2>

            <p className="text-sm text-gray-400 font-sans leading-relaxed">
              Integrate Aetheria AI in under 3 minutes. Supported natively in Python, Node.js/TypeScript, Go, Rust, and cURL REST endpoints.
            </p>

            <div className="space-y-3 font-sans text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Automatic retry logic &amp; exponential backoff</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Native TypeScript types &amp; Pydantic validation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero-dependency lightweight HTTP client</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0D0E15] rounded-3xl border border-purple-900/50 p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLang("python")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${lang === "python" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  Python
                </button>
                <button
                  onClick={() => setLang("ts")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${lang === "ts" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  TypeScript
                </button>
                <button
                  onClick={() => setLang("curl")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${lang === "curl" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"}`}
                >
                  cURL
                </button>
              </div>

              <button
                onClick={copyCode}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <pre className="mt-4 p-4 rounded-xl bg-[#05060A] text-xs text-emerald-300 font-mono overflow-x-auto leading-relaxed border border-purple-950">
              {snippets[lang]}
            </pre>
          </div>

        </div>

      </div>
    </section>
  );
}
