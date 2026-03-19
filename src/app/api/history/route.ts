import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  if (!redis) {
    return NextResponse.json({ error: 'Redis not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const iso2 = searchParams.get('iso2')?.toUpperCase();
  const days = Math.min(parseInt(searchParams.get('days') || '30'), 90);

  try {
    // Get the snapshot index
    const index = await redis.get<string[]>('snapshot:index');
    if (!index || index.length === 0) {
      return NextResponse.json({
        data: [],
        availableDates: [],
        message: 'No snapshots yet. Data collection starts daily.',
      });
    }

    // Get the most recent N dates
    const recentDates = index.slice(-days);

    // Fetch snapshots for those dates
    const snapshots = await Promise.all(
      recentDates.map(async (date) => {
        const raw = await redis!.get<string>(`snapshot:${date}`);
        if (!raw) return null;
        try {
          return typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch {
          return null;
        }
      })
    );

    const validSnapshots = snapshots.filter(Boolean);

    // If iso2 specified, filter to just that country's data
    if (iso2) {
      const countryHistory = validSnapshots.map((snap) => {
        const volume = snap.volumes?.find((v: { iso2: string }) => v.iso2 === iso2);
        const premium = snap.premiums?.find((p: { iso2: string }) => p.iso2 === iso2);
        return {
          date: snap.date,
          volumeUsd: volume?.volumeUsd ?? null,
          usdtPremiumPct: premium?.usdtPremiumPct ?? null,
          usdcPremiumPct: premium?.usdcPremiumPct ?? null,
          officialRate: premium?.officialRate ?? null,
          depreciation12m: premium?.depreciation12m ?? null,
        };
      });

      return NextResponse.json({
        iso2,
        days: recentDates.length,
        data: countryHistory,
      });
    }

    // Return summary of all snapshots
    const summary = validSnapshots.map((snap) => ({
      date: snap.date,
      countriesWithVolume: snap.meta?.countriesWithVolume ?? 0,
      countriesWithPremium: snap.meta?.countriesWithPremium ?? 0,
      totalGlobalVolume: snap.meta?.totalGlobalVolume ?? 0,
    }));

    return NextResponse.json({
      totalSnapshots: validSnapshots.length,
      availableDates: recentDates,
      data: summary,
    });
  } catch (error) {
    console.error('History API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch history' },
      { status: 500 }
    );
  }
}
