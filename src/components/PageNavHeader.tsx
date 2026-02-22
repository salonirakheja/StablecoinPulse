import Link from 'next/link';

type ActivePage = 'blog' | 'about';

export default function PageNavHeader({ activePage }: { activePage: ActivePage }) {
  const navButtonClass = (page: ActivePage) =>
    `px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-mono tracking-wider backdrop-blur-md border transition-all duration-200 ${
      activePage === page
        ? 'border-[rgba(0,245,255,0.4)] text-[#00F5FF]'
        : 'border-[rgba(0,245,255,0.15)] text-[#7070AA] hover:text-[#00F5FF] hover:border-[rgba(0,245,255,0.3)]'
    }`;

  return (
    <header className="border-b border-[rgba(0,245,255,0.1)] px-6 py-4 md:px-16 lg:px-24">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-sm font-bold tracking-[0.25em] text-[#E0E0FF]"
            style={{ textShadow: '0 0 20px rgba(0,245,255,0.4), 0 0 40px rgba(0,245,255,0.15)' }}
          >
            STABLECOIN PULSE
          </h1>
          <p className="text-[10px] font-mono tracking-[0.15em] text-[#7070AA] mt-0.5">
            {activePage === 'blog' ? 'BLOG' : 'ABOUT'}
          </p>
        </div>
        <div className="flex items-center gap-1.5 md:gap-3">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-mono tracking-wider backdrop-blur-md border border-[rgba(0,245,255,0.15)] text-[#7070AA] hover:text-[#00F5FF] hover:border-[rgba(0,245,255,0.3)] transition-all duration-200"
            style={{ background: 'rgba(5, 5, 25, 0.6)' }}
          >
            VOLUME
          </Link>
          <Link
            href="/?view=regulation"
            className="px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-mono tracking-wider backdrop-blur-md border border-[rgba(0,245,255,0.15)] text-[#7070AA] hover:text-[#00F5FF] hover:border-[rgba(0,245,255,0.3)] transition-all duration-200"
            style={{ background: 'rgba(5, 5, 25, 0.6)' }}
          >
            REGULATION
          </Link>
          {activePage === 'blog' ? (
            <span
              className={navButtonClass('blog')}
              style={{ background: 'rgba(5, 5, 25, 0.6)' }}
            >
              BLOG
            </span>
          ) : (
            <Link
              href="/blog"
              className={navButtonClass('blog')}
              style={{ background: 'rgba(5, 5, 25, 0.6)' }}
            >
              BLOG
            </Link>
          )}
          {activePage === 'about' ? (
            <span
              className={navButtonClass('about')}
              style={{ background: 'rgba(5, 5, 25, 0.6)' }}
            >
              ABOUT
            </span>
          ) : (
            <Link
              href="/about"
              className={navButtonClass('about')}
              style={{ background: 'rgba(5, 5, 25, 0.6)' }}
            >
              ABOUT
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
