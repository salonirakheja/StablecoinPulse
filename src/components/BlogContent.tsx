'use client';

import Link from 'next/link';

const posts = [
  {
    slug: 'stablecoin-regulations-by-country-2025',
    title: 'Stablecoin Regulations by Country (2025)',
    date: '2025-02-20',
    description:
      'A comprehensive guide to stablecoin regulation across 80+ countries. Which nations have clear frameworks, which restrict crypto entirely, and where the rules are still being written.',
    readingTime: '12 min read',
  },
];

export default function BlogContent() {
  return (
    <div className="min-h-screen bg-[#030308]">
      {/* Hero */}
      <section className="relative px-6 pt-20 pb-16 md:px-16 lg:px-24 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30 blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(0,245,255,0.4) 0%, rgba(77,77,255,0.2) 50%, transparent 70%)' }}
        />
        <div className="relative">
          <p className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] mb-4">DATA-DRIVEN INSIGHTS</p>
          <h2
            className="text-2xl md:text-4xl font-bold tracking-tight text-[#E0E0FF] max-w-xl leading-tight"
            style={{ textShadow: '0 0 30px rgba(0,245,255,0.2)' }}
          >
            Stablecoin research &amp; analysis
          </h2>
          <p className="text-sm text-[#7070AA] mt-4 max-w-lg leading-relaxed">
            Deep dives into regulation, adoption patterns, and market data across 80+ countries.
          </p>
        </div>
      </section>

      {/* Posts */}
      <main className="px-6 md:px-16 lg:px-24 pb-20">
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article
                className="rounded-xl border border-[rgba(0,245,255,0.1)] backdrop-blur-md px-6 py-6 transition-all duration-200 group-hover:border-[rgba(0,245,255,0.3)] group-hover:shadow-[0_0_30px_rgba(0,245,255,0.08)]"
                style={{ background: 'rgba(5, 5, 25, 0.85)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <time className="text-[11px] font-mono tracking-wider text-[#7070AA]">
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                  <span className="text-[10px] font-mono tracking-wider text-[#7070AA]">&bull;</span>
                  <span className="text-[11px] font-mono tracking-wider text-[#7070AA]">{post.readingTime}</span>
                </div>
                <h3 className="text-lg font-bold text-[#E0E0FF] mb-2 group-hover:text-[#00F5FF] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-[#7070AA] leading-relaxed mb-4 max-w-2xl">
                  {post.description}
                </p>
                <span className="text-xs font-mono tracking-wider text-[#00F5FF] group-hover:tracking-[0.3em] transition-all duration-200">
                  READ &rarr;
                </span>
              </article>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[rgba(0,245,255,0.1)] px-6 md:px-16 lg:px-24 py-8">
        <p className="text-[10px] font-mono tracking-[0.15em] text-[#7070AA]">STABLECOIN PULSE</p>
      </footer>
    </div>
  );
}
