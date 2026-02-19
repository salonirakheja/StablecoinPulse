'use client';

export default function HoverCard({
  title,
  source,
  icon,
  children,
}: {
  title: string;
  source: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="group rounded-xl border border-[rgba(0,245,255,0.15)] backdrop-blur-md px-5 py-5 transition-all duration-200 ease-in-out hover:border-[rgba(0,245,255,0.4)] hover:shadow-[0_0_20px_rgba(0,245,255,0.15)]"
      style={{ background: 'rgba(5, 5, 25, 0.85)' }}
    >
      <div className="mb-3 w-9 h-9 rounded-lg border border-[rgba(0,245,255,0.15)] flex items-center justify-center transition-transform duration-200 ease-in-out group-hover:scale-110" style={{ background: 'rgba(0,245,255,0.05)' }}>
        {icon}
      </div>
      <h3 className="text-xs font-mono tracking-wider text-[#E0E0FF] mb-1">{title}</h3>
      <p className="text-[10px] font-mono tracking-wider text-[#00F5FF] mb-3">{source}</p>
      <p className="text-xs text-[#7070AA] leading-relaxed">{children}</p>
    </div>
  );
}
