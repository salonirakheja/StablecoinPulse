import BackgroundGrid from '@/components/BackgroundGrid';

export default function CountryLoading() {
  return (
    <div className="min-h-screen bg-[#030308] text-[#E0E0FF] relative">
      <BackgroundGrid />
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-6 md:px-8 md:py-10 animate-pulse">
        {/* Back link placeholder */}
        <div className="h-4 w-32 rounded bg-[rgba(112,112,170,0.15)] mb-6" />

        {/* Header placeholder */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-9 rounded-md bg-[rgba(112,112,170,0.15)]" />
          <div>
            <div className="h-7 w-48 rounded bg-[rgba(112,112,170,0.15)] mb-2" />
            <div className="h-4 w-24 rounded bg-[rgba(112,112,170,0.1)]" />
          </div>
        </div>

        {/* Stat cards placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl px-4 py-3 border border-[rgba(0,245,255,0.12)] h-[88px]"
              style={{ background: 'rgba(5, 5, 25, 0.8)' }}
            >
              <div className="h-3 w-16 rounded bg-[rgba(112,112,170,0.15)] mb-3" />
              <div className="h-5 w-20 rounded bg-[rgba(112,112,170,0.2)]" />
            </div>
          ))}
        </div>

        {/* Regulation section placeholder */}
        <div
          className="rounded-xl px-5 py-4 mb-6 border border-[rgba(0,245,255,0.12)] h-32"
          style={{ background: 'rgba(5, 5, 25, 0.8)' }}
        >
          <div className="h-3 w-20 rounded bg-[rgba(112,112,170,0.15)] mb-4" />
          <div className="h-3 w-full rounded bg-[rgba(112,112,170,0.1)] mb-2" />
          <div className="h-3 w-3/4 rounded bg-[rgba(112,112,170,0.1)]" />
        </div>

        {/* Timeline placeholder */}
        <div
          className="rounded-xl px-5 py-4 mb-6 border border-[rgba(0,245,255,0.12)] h-48"
          style={{ background: 'rgba(5, 5, 25, 0.8)' }}
        >
          <div className="h-3 w-32 rounded bg-[rgba(112,112,170,0.15)] mb-4" />
          <div className="pl-4 border-l border-[rgba(0,245,255,0.08)] space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="h-3 w-16 rounded bg-[rgba(112,112,170,0.12)] mb-1" />
                <div className="h-3 w-full rounded bg-[rgba(112,112,170,0.08)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
