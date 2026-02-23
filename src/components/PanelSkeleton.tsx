'use client';

export default function PanelSkeleton() {
  return (
    <div
      className="fixed z-40 backdrop-blur-md border border-[rgba(0,245,255,0.12)] rounded-xl overflow-hidden
        max-md:hidden md:top-20 md:right-6 md:w-72"
      style={{ background: 'rgba(5, 5, 25, 0.85)' }}
    >
      {/* Header area */}
      <div className="px-4 pt-4 pb-2 border-b border-[rgba(0,245,255,0.08)]">
        {/* Title placeholder */}
        <div className="h-2.5 w-40 rounded bg-[rgba(0,245,255,0.06)] animate-pulse mb-2" />
        {/* Global volume placeholder */}
        <div className="h-5 w-28 rounded bg-[rgba(0,245,255,0.06)] animate-pulse mb-1" />
        {/* Updated time placeholder */}
        <div className="h-2 w-24 rounded bg-[rgba(0,245,255,0.06)] animate-pulse mt-1" />
      </div>

      {/* Row placeholders */}
      <div className="p-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 px-2 py-2">
            {/* Rank */}
            <div className="h-2.5 w-3 rounded bg-[rgba(0,245,255,0.06)] animate-pulse" />
            {/* Flag circle */}
            <div className="h-5 w-5 rounded-full bg-[rgba(0,245,255,0.06)] animate-pulse flex-shrink-0" />
            {/* Country name + exchange */}
            <div className="flex-1 min-w-0 space-y-1">
              <div
                className="h-2.5 rounded bg-[rgba(0,245,255,0.06)] animate-pulse"
                style={{ width: `${60 + ((i * 17) % 30)}%` }}
              />
              <div className="h-2 w-12 rounded bg-[rgba(0,245,255,0.06)] animate-pulse" />
            </div>
            {/* Volume */}
            <div className="flex flex-col items-end gap-0.5">
              <div className="h-2.5 w-12 rounded bg-[rgba(0,245,255,0.06)] animate-pulse" />
              <div className="w-16 h-1 rounded-full bg-[rgba(0,245,255,0.06)] animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
