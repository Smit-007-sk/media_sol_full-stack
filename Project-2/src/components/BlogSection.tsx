"use client";

import { Clock, ArrowRight } from "lucide-react";

export default function BlogSection() {
  const posts = [
    {
      title: "10 Website Design Trends Dominating 2026 for High Conversion",
      category: "Design Strategy",
      date: "Aug 22, 2026",
      readTime: "5 min read",
      excerpt: "Discover the latest UI/UX principles, luxury micro-interactions, and visual storytelling techniques that keep visitors engaged.",
      imageGradient: "from-[#0F382C] to-[#1E4D3E]",
    },
    {
      title: "Why Next.js App Router Is Essential for Modern Enterprise SEO",
      category: "Engineering",
      date: "Aug 18, 2026",
      readTime: "4 min read",
      excerpt: "Learn how server components, automatic code splitting, and edge rendering propel your website to top search engine ranks.",
      imageGradient: "from-[#B88E44] to-[#8C6422]",
    },
    {
      title: "How to Optimize Your Mobile UX to Reduce Cart Abandonment",
      category: "E-Commerce",
      date: "Aug 12, 2026",
      readTime: "6 min read",
      excerpt: "Practical tactics to streamline mobile checkout flows, reduce touch friction, and boost mobile customer retention.",
      imageGradient: "from-[#1F2421] to-[#3B423D]",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-[#F6F1E6]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="space-y-3 max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#B88E44]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#B88E44] uppercase font-sans">
              INSIGHTS & BLOG
            </span>
            <span className="w-8 h-px bg-[#B88E44]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F2421]">
            Latest Digital News
          </h2>

          <p className="text-base text-[#5C645E]">
            Expert articles and guides on modern web development, UI design, and brand growth.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E5DACB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left"
            >
              {/* Graphic Banner Header */}
              <div className={`h-48 w-full bg-gradient-to-r ${post.imageGradient} p-6 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                <span className="text-xs font-bold bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full w-max border border-white/20">
                  {post.category}
                </span>

                <div className="flex items-center justify-between text-xs text-gray-200">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2421] group-hover:text-[#B88E44] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#5C645E] mt-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0E6D8]">
                  <a
                    href="#blog"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0F382C] group-hover:text-[#B88E44] transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
