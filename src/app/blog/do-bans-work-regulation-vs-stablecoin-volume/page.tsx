import type { Metadata } from 'next';
import Link from 'next/link';
import PageNavHeader from '@/components/PageNavHeader';

export const metadata: Metadata = {
  title: 'Do Bans Work? Regulation Status vs Stablecoin Volume Across 81 Countries | Stablecoin Pulse',
  description:
    'Restricted countries generate 2.2x more stablecoin volume per country than regulated ones. We cross-referenced regulation status against estimated volumes for 81 countries.',
  openGraph: {
    title: 'Do Bans Work? Regulation Status vs Stablecoin Volume Across 81 Countries',
    description:
      'China is banned but ranks #2 globally. Nigeria is restricted but outranks Spain. We analyzed regulation vs volume across 81 countries.',
    type: 'article',
  },
  keywords: [
    'stablecoin regulation',
    'crypto ban effectiveness',
    'stablecoin volume by country',
    'China crypto ban',
    'Nigeria crypto ban',
    'stablecoin adoption',
    'crypto regulation vs adoption',
    'stablecoin volume ranking',
    'do crypto bans work',
    'stablecoin regulation map',
  ],
};

type CountryData = {
  name: string;
  iso2: string;
  rank: number;
  volumeShare: string;
  note: string;
};

const restrictedCountries: CountryData[] = [
  { name: 'China', iso2: 'CN', rank: 2, volumeShare: '7.9%', note: 'All crypto transactions banned since 2021. Yet Chinese-origin exchanges (OKX, Gate.io, HTX, MEXC) still attribute massive user bases to China. VPN usage and OTC desks keep it the #2 market globally, generating more volume than Germany, France, and Australia combined.' },
  { name: 'Vietnam', iso2: 'VN', rank: 7, volumeShare: '3.6%', note: 'The State Bank restricts banking services for crypto, yet Vietnam has a stablecoin bias of 0.95, meaning 95% of all crypto activity is stablecoin-related. Ranks above Singapore, which has one of the world\'s most comprehensive regulatory frameworks.' },
  { name: 'Russia', iso2: 'RU', rank: 6, volumeShare: '3.6%', note: 'Domestic crypto payments banned, yet Russia generates over 2x the volume of Japan, a fully regulated G7 economy. Sanctions and capital flight have only deepened stablecoin demand.' },
  { name: 'Nigeria', iso2: 'NG', rank: 10, volumeShare: '3.0%', note: 'The CBN restricted banking integration with crypto, yet Nigeria has the deepest P2P market in Africa with a stablecoin bias of 0.94. Generates more volume than Spain, Netherlands, and Switzerland combined. The SEC is now licensing VASPs, effectively conceding the ban failed.' },
  { name: 'Egypt', iso2: 'EG', rank: 30, volumeShare: '1.1%', note: 'Crypto trading restricted by the Central Bank. Currency devaluation has pushed users to stablecoins as a store of value despite the regulatory stance.' },
  { name: 'Bangladesh', iso2: 'BD', rank: 36, volumeShare: '0.5%', note: 'The central bank penalizes crypto holders, yet Bangladesh still generates more stablecoin volume than Switzerland, a country that pioneered DLT regulation.' },
];

const partialCountries: CountryData[] = [
  { name: 'United States', iso2: 'US', rank: 1, volumeShare: '12.2%', note: 'The world\'s largest stablecoin market operates under a patchwork of state and federal rules. No comprehensive stablecoin legislation yet, but trading is legal and widespread.' },
  { name: 'India', iso2: 'IN', rank: 3, volumeShare: '5.4%', note: 'A 30% crypto tax and 1% TDS haven\'t eliminated demand. India generates more volume than all of Oceania and more than any single EU country. The RBI opposes stablecoins threatening INR sovereignty, but the market persists.' },
  { name: 'Turkey', iso2: 'TR', rank: 4, volumeShare: '4.6%', note: 'Crypto payments banned since 2021, but trading is legal. Lira depreciation has made USDT a de facto savings vehicle. Turkey generates more than France and Australia combined, with a stablecoin bias of 0.94.' },
  { name: 'Indonesia', iso2: 'ID', rank: 12, volumeShare: '2.5%', note: 'Crypto regulated as a commodity under Bappebti. A structured framework that allows trading while restricting payments.' },
  { name: 'Thailand', iso2: 'TH', rank: 14, volumeShare: '2.2%', note: 'SEC Thailand regulates crypto exchanges but banned crypto for payments. A partial approach that keeps trading volumes healthy.' },
  { name: 'Argentina', iso2: 'AR', rank: 20, volumeShare: '1.9%', note: 'One of the highest per-capita stablecoin usage rates globally. USDT/DAI adoption as an inflation hedge against the peso rivals Hong Kong and exceeds Japan in volume, both fully regulated.' },
];

const regulatedCountries: CountryData[] = [
  { name: 'United Kingdom', iso2: 'GB', rank: 5, volumeShare: '4.4%', note: 'FCA-regulated market. The highest-ranked fully regulated country globally, but still trails the US, China, India, and Turkey.' },
  { name: 'Brazil', iso2: 'BR', rank: 8, volumeShare: '3.5%', note: 'Crypto regulated under BCB framework. Strong institutional adoption and deep real/USDT liquidity make it the top regulated market in the developing world.' },
  { name: 'Germany', iso2: 'DE', rank: 9, volumeShare: '3.4%', note: 'BaFin-licensed, MiCA-compliant. A fully regulated European market that still generates less volume than banned China or restricted Vietnam.' },
  { name: 'Singapore', iso2: 'SG', rank: 11, volumeShare: '2.6%', note: 'MAS Payment Services Act, one of the most comprehensive frameworks globally. Yet ranks below restricted Vietnam (3.6%) in volume.' },
  { name: 'South Korea', iso2: 'KR', rank: 13, volumeShare: '2.3%', note: 'VASP registration required. A developed, regulated market with moderate volume relative to its economic size.' },
  { name: 'Japan', iso2: 'JP', rank: 23, volumeShare: '1.5%', note: 'The cautionary tale. Only bank-issued stablecoins permitted, USDT unavailable on licensed exchanges. Japan has the lowest stablecoin bias (0.55) of any major market, ranking below Argentina, Philippines, and Pakistan.' },
];

const unclearCountries: CountryData[] = [
  { name: 'Ukraine', iso2: 'UA', rank: 15, volumeShare: '2.3%', note: 'Crypto-friendly in practice but no finalized regulatory framework. Stablecoin bias of 0.96, the highest globally, reflects wartime demand for dollar-denominated savings.' },
  { name: 'Pakistan', iso2: 'PK', rank: 24, volumeShare: '1.5%', note: 'No legal crypto framework exists. Despite regulatory ambiguity, Pakistan still generates meaningful stablecoin volume, driven by remittance demand and limited banking access.' },
];

export default function BansPostPage() {
  return (
    <div className="min-h-screen bg-[#030308]">
      <PageNavHeader activePage="blog" />

      <article className="px-6 md:px-16 lg:px-24 pb-20">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-[#7070AA] hover:text-[#00F5FF] transition-colors mt-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          ALL POSTS
        </Link>

        {/* Title block */}
        <header className="relative pt-8 pb-12 overflow-hidden">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-30 blur-[100px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(0,245,255,0.4) 0%, rgba(77,77,255,0.2) 50%, transparent 70%)' }}
          />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <time className="text-[11px] font-mono tracking-wider text-[#7070AA]">March 2, 2026</time>
              <span className="text-[10px] text-[#7070AA]">&bull;</span>
              <span className="text-[11px] font-mono tracking-wider text-[#7070AA]">10 min read</span>
            </div>
            <h2
              className="text-2xl md:text-4xl font-bold tracking-tight text-[#E0E0FF] max-w-2xl leading-tight"
              style={{ textShadow: '0 0 30px rgba(0,245,255,0.2)' }}
            >
              Do Bans Work? Regulation Status vs Stablecoin Volume Across 81 Countries
            </h2>
            <p className="text-sm text-[#7070AA] mt-4 max-w-2xl leading-relaxed">
              We cross-referenced regulation status against estimated stablecoin volumes for 81 countries. The data tells a clear story: bans don&apos;t stop usage.
            </p>
          </div>
        </header>

        {/* Intro */}
        <section className="max-w-2xl mb-12">
          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-4">
            China banned all crypto transactions in 2021. It&apos;s the <strong className="text-[#E0E0FF]">#2 stablecoin market in the world</strong>.
            Nigeria restricted banking integration with crypto. It generates more volume than <strong className="text-[#E0E0FF]">Spain, the Netherlands, and Switzerland combined</strong>.
            Vietnam restricts banking services for crypto. It ranks <strong className="text-[#E0E0FF]">above Singapore</strong>, which has one of the most comprehensive regulatory frameworks on earth.
          </p>
          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-4">
            We took the <strong className="text-[#E0E0FF]">81 countries</strong> in our{' '}
            <Link href="/?view=regulation" className="text-[#00F5FF] hover:underline">Regulation Map</Link>,
            categorized each by regulatory status (regulated, partial, restricted, or unclear), and compared their estimated stablecoin volumes.
            The question was simple: does banning stablecoins actually reduce their use?
          </p>
          <p className="text-sm text-[#B0B0DD] leading-relaxed">
            The answer, overwhelmingly, is no.
          </p>
        </section>

        {/* Overview stats */}
        <section className="mb-16">
          <div
            className="rounded-xl border border-[rgba(0,245,255,0.15)] backdrop-blur-md px-6 py-6"
            style={{ background: 'rgba(5, 5, 25, 0.85)' }}
          >
            <h3 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
              Overview
            </h3>
            <p className="text-sm text-[#B0B0DD] mb-6">
              Regulation status vs estimated stablecoin volume across 81 countries, as of March 2026.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard label="Countries Analyzed" value="81" color="#00F5FF" />
              <StatCard label="Restricted in Top 10" value="4 of 10" color="#FF1493" />
              <StatCard label="Volume from Bans" value="20.7%" color="#FFB800" sub="of global total" />
              <StatCard label="Restricted vs Regulated" value="2.2x" color="#39FF14" sub="per-country volume" />
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="max-w-2xl mb-16">
          <h3 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
            Key Takeaways
          </h3>
          <ul className="space-y-4">
            <Takeaway>
              <strong className="text-[#E0E0FF]">Restricted countries generate 2.2x more stablecoin volume per country than regulated ones.</strong>{' '}
              The 10 restricted nations average 2.07% of global volume each, compared to 0.95% for the 34 regulated countries. Even excluding China, restricted countries average 1.42% each.
            </Takeaway>
            <Takeaway>
              <strong className="text-[#E0E0FF]">4 of the top 10 stablecoin markets globally are restricted.</strong>{' '}
              China (#2), Russia (#6), Vietnam (#7), and Nigeria (#10) have all attempted to restrict crypto. Combined, they account for 18.1% of global volume.
            </Takeaway>
            <Takeaway>
              <strong className="text-[#E0E0FF]">Japan shows that regulation can suppress volume, not just enable it.</strong>{' '}
              Japan&apos;s strict requirement for bank-issued stablecoins has given it the lowest stablecoin bias (0.55) of any major market. A G7 economy ranks below Argentina, the Philippines, and Pakistan.
            </Takeaway>
            <Takeaway>
              <strong className="text-[#E0E0FF]">Regulatory uncertainty suppresses more than outright bans.</strong>{' '}
              The 17 &ldquo;unclear&rdquo; countries average just 0.39% of volume each, lower than any other category. No unclear country ranks in the top 12. Ambiguity deters more than prohibition.
            </Takeaway>
          </ul>
        </section>

        {/* The Numbers */}
        <section className="max-w-2xl mb-16">
          <h3 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
            The Numbers
          </h3>
          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-6">
            We grouped all 81 countries by their regulation status and calculated the share of global stablecoin volume attributable to each group.
          </p>

          <div className="space-y-3 mb-8">
            <StatusBar label="Partial" count={20} share={40.4} color="#FFB800" avg="2.02%" />
            <StatusBar label="Regulated" count={34} share={32.3} color="#39FF14" avg="0.95%" />
            <StatusBar label="Restricted" count={10} share={20.7} color="#FF1493" avg="2.07%" />
            <StatusBar label="Unclear" count={17} share={6.6} color="#A0A0B8" avg="0.39%" />
          </div>

          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-4">
            The &ldquo;partial&rdquo; category leads because it includes the <strong className="text-[#E0E0FF]">United States (12.2%)</strong>,{' '}
            <strong className="text-[#E0E0FF]">India (5.4%)</strong>, and <strong className="text-[#E0E0FF]">Turkey (4.6%)</strong>,
            markets where trading is legal but payments or full regulatory clarity are missing.
          </p>
          <p className="text-sm text-[#B0B0DD] leading-relaxed">
            But the per-country average tells the real story. The 10 restricted countries punch far above their weight.
            One in five stablecoin dollars flows through a country where stablecoins are officially restricted or banned.
          </p>
        </section>

        {/* Regional Patterns */}
        <section className="max-w-2xl mb-16">
          <h3 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
            Regional Patterns
          </h3>
          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-4">
            The relationship between bans and volume plays out differently by region:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-2.5 text-sm text-[#B0B0DD] leading-relaxed">
              <span className="text-[#FF1493] mt-0.5 shrink-0">&#9670;</span>
              <span><strong className="text-[#E0E0FF]">Africa:</strong> 65% of the continent&apos;s stablecoin volume comes from restricted countries (Nigeria, Egypt, Morocco). Bans have most spectacularly failed here.</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-[#B0B0DD] leading-relaxed">
              <span className="text-[#FF1493] mt-0.5 shrink-0">&#9670;</span>
              <span><strong className="text-[#E0E0FF]">East Asia:</strong> Over half the region&apos;s volume comes from one banned country: China. Its 7.9% share exceeds all of Eastern Europe&apos;s regulated countries combined.</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-[#B0B0DD] leading-relaxed">
              <span className="text-[#39FF14] mt-0.5 shrink-0">&#9670;</span>
              <span><strong className="text-[#E0E0FF]">Western Europe:</strong> 100% regulated, 14.6% of global volume. The one region where regulation tracks with meaningful adoption.</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-[#B0B0DD] leading-relaxed">
              <span className="text-[#FFB800] mt-0.5 shrink-0">&#9670;</span>
              <span><strong className="text-[#E0E0FF]">Eastern Europe:</strong> Nearly half the region&apos;s volume comes from restricted Russia (3.6%). Ukraine (unclear, 2.3%) drives most of the rest, powered by wartime demand for dollar savings.</span>
            </li>
          </ul>
        </section>

        {/* Country breakdown intro */}
        <section className="max-w-2xl mb-12">
          <h3 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
            Country Breakdown
          </h3>
          <p className="text-sm text-[#B0B0DD] leading-relaxed">
            Below we highlight the most telling examples from each regulation category. Volume shares are estimated from
            exchange redistribution data and calibrated against real CoinGecko stablecoin volumes. Rankings are out of 81 countries.
            Explore the full dataset on the{' '}
            <Link href="/?view=regulation" className="text-[#00F5FF] hover:underline">Regulation Map</Link>.
          </p>
        </section>

        {/* Restricted */}
        <CountrySection
          title="Restricted"
          description="These countries have explicitly banned or severely restricted crypto transactions. By the logic of prohibition, they should have near-zero stablecoin activity. They don't."
          color="#FF1493"
          subtitle="10 countries, 20.7% of global volume"
          countries={restrictedCountries}
        />

        {/* Partial */}
        <CountrySection
          title="Partial"
          description="Trading is legal, but payments, taxation, or full regulatory clarity is missing. This category includes the world's three largest stablecoin markets."
          color="#FFB800"
          subtitle="20 countries, 40.4% of global volume"
          countries={partialCountries}
        />

        {/* Regulated */}
        <CountrySection
          title="Regulated"
          description="Clear legal frameworks for stablecoin trading and issuance. These countries have done the regulatory work. The volume data shows it doesn't guarantee dominance."
          color="#39FF14"
          subtitle="34 countries, 32.3% of global volume"
          countries={regulatedCountries}
        />

        {/* Unclear */}
        <CountrySection
          title="Unclear"
          description="No definitive regulatory stance. This category has the lowest per-country volume, suggesting that ambiguity deters more than prohibition."
          color="#A0A0B8"
          subtitle="17 countries, 6.6% of global volume"
          countries={unclearCountries}
        />

        {/* Why bans fail */}
        <section className="max-w-2xl mb-16">
          <h3 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
            Why Bans Fail
          </h3>
          <p className="text-sm text-[#B0B0DD] leading-relaxed mb-4">
            The pattern is consistent across every region. Three forces explain why restricting stablecoins tends to increase rather than decrease usage:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-2.5 text-sm text-[#B0B0DD] leading-relaxed">
              <span className="text-[#00F5FF] mt-0.5 shrink-0">1.</span>
              <span><strong className="text-[#E0E0FF]">Bans signal the problem stablecoins solve.</strong> Countries that ban crypto typically have capital controls, currency instability, or inflation. These are exactly the conditions that drive stablecoin demand. The ban is a symptom of the same forces that create the market.</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-[#B0B0DD] leading-relaxed">
              <span className="text-[#00F5FF] mt-0.5 shrink-0">2.</span>
              <span><strong className="text-[#E0E0FF]">P2P markets are ban-resistant.</strong> When centralized exchanges are blocked, peer-to-peer trading fills the gap. Nigeria&apos;s Binance P2P market is deeper than many regulated countries&apos; entire exchange ecosystems.</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-[#B0B0DD] leading-relaxed">
              <span className="text-[#00F5FF] mt-0.5 shrink-0">3.</span>
              <span><strong className="text-[#E0E0FF]">Stablecoins are harder to restrict than speculative crypto.</strong> Governments can discourage speculation. They struggle to restrict something that functions as basic dollar savings, especially when the local currency is losing value.</span>
            </li>
          </ul>
        </section>

        {/* Methodology */}
        <section className="max-w-2xl mb-16">
          <h3 className="text-[13px] font-mono tracking-[0.25em] text-[#00F5FF] uppercase mb-5">
            Methodology
          </h3>
          <div
            className="rounded-xl border border-[rgba(0,245,255,0.1)] backdrop-blur-md px-6 py-5"
            style={{ background: 'rgba(5, 5, 25, 0.85)' }}
          >
            <div className="space-y-4 text-sm text-[#B0B0DD] leading-relaxed">
              <div>
                <p className="text-[11px] font-mono tracking-wider text-[#7070AA] mb-1">VOLUME DATA</p>
                <p>
                  Estimated 24h stablecoin volumes per country are computed by redistributing real{' '}
                  <strong className="text-[#E0E0FF]">CoinGecko exchange volumes</strong> across countries using exchange-level
                  user distribution data, weighted by each country&apos;s stablecoin trading bias.
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono tracking-wider text-[#7070AA] mb-1">REGULATION DATA</p>
                <p>
                  Regulation statuses are manually researched and maintained for{' '}
                  <strong className="text-[#E0E0FF]">81 countries</strong> based on official government
                  publications, central bank directives, and financial authority guidelines.
                </p>
              </div>
              <div>
                <p className="text-[11px] font-mono tracking-wider text-[#7070AA] mb-1">LIMITATIONS</p>
                <p>
                  Volume estimates are approximations based on exchange user distribution, not direct measurement.
                  True volumes may differ. Regulation status is a simplification; many countries have nuanced, evolving stances.
                  This analysis shows correlation, not causation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-0 h-px bg-[rgba(255,255,255,0.08)] mb-12" />

        {/* CTA */}
        <section className="flex flex-col items-center text-center pt-4 pb-8">
          <p className="text-sm text-[#7070AA] mb-6 max-w-md">
            Explore the full regulation map across 81 countries. See which nations restrict, regulate, or ignore stablecoins.
          </p>
          <Link
            href="/?view=regulation"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-mono tracking-wider text-[#030308] font-bold transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #00F5FF 0%, #4D4DFF 100%)',
              boxShadow: '0 0 30px rgba(0,245,255,0.3), 0 0 60px rgba(0,245,255,0.1)',
            }}
          >
            EXPLORE THE REGULATION MAP
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </article>

      {/* Footer */}
      <footer className="border-t border-[rgba(0,245,255,0.1)] px-6 md:px-16 lg:px-24 py-8">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-mono tracking-[0.15em] text-[#7070AA]">STABLECOIN PULSE</p>
          <Link
            href="/blog"
            className="text-[11px] font-mono tracking-wider text-[#7070AA] hover:text-[#00F5FF] transition-colors"
          >
            &larr; ALL POSTS
          </Link>
        </div>
      </footer>
    </div>
  );
}

function StatCard({ label, value, color, sub }: { label: string; value: string; color: string; sub?: string }) {
  return (
    <div
      className="rounded-lg border px-4 py-3 text-center"
      style={{
        borderColor: `${color}33`,
        background: `${color}08`,
      }}
    >
      <p className="text-2xl font-bold" style={{ color }}>
        {value}
      </p>
      <p className="text-[10px] font-mono tracking-wider text-[#7070AA] mt-1">
        {label.toUpperCase()}
      </p>
      {sub && (
        <p className="text-[9px] font-mono text-[#7070AA] mt-0.5">{sub}</p>
      )}
    </div>
  );
}

function StatusBar({ label, count, share, color, avg }: { label: string; count: number; share: number; color: string; avg: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-20 shrink-0">
        <span className="text-xs font-mono font-medium" style={{ color }}>{label}</span>
        <span className="text-[10px] text-[#7070AA] ml-1">({count})</span>
      </div>
      <div className="flex-1 h-6 rounded-md bg-[rgba(255,255,255,0.03)] overflow-hidden relative">
        <div
          className="h-full rounded-md flex items-center px-2"
          style={{ width: `${Math.max(share, 5)}%`, background: `${color}30`, borderRight: `2px solid ${color}` }}
        >
          <span className="text-[11px] font-mono font-bold" style={{ color }}>{share}%</span>
        </div>
      </div>
      <span className="text-[10px] font-mono text-[#7070AA] w-16 text-right shrink-0">{avg}/country</span>
    </div>
  );
}

function CountrySection({
  title,
  description,
  color,
  subtitle,
  countries,
}: {
  title: string;
  description: string;
  color: string;
  subtitle: string;
  countries: CountryData[];
}) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-2">
        <span
          className="block h-3 w-3 rounded-full shrink-0"
          style={{ background: color, boxShadow: `0 0 10px ${color}66` }}
        />
        <h3
          className="text-[13px] font-mono tracking-[0.25em] uppercase"
          style={{ color }}
        >
          {title}
        </h3>
      </div>
      <p className="text-[11px] font-mono text-[#7070AA] mb-4 ml-6">{subtitle}</p>
      <p className="text-sm text-[#7070AA] leading-relaxed max-w-2xl mb-6">
        {description}
      </p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {countries.map((country) => (
          <CountryCard key={country.iso2} country={country} color={color} />
        ))}
      </div>
    </section>
  );
}

function CountryCard({ country, color }: { country: CountryData; color: string }) {
  return (
    <div
      className="rounded-xl border border-[rgba(0,245,255,0.1)] backdrop-blur-md px-5 py-4"
      style={{ background: 'rgba(5, 5, 25, 0.85)' }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://flagcdn.com/20x15/${country.iso2.toLowerCase()}.png`}
          alt={`${country.name} flag`}
          width={20}
          height={15}
          className="rounded-sm"
        />
        <h4 className="text-sm font-bold text-[#E0E0FF]">{country.name}</h4>
        <span className="text-[10px] font-mono text-[#7070AA] ml-auto">{country.iso2}</span>
      </div>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-[#7070AA]">RANK</span>
          <span className="text-sm font-bold font-mono" style={{ color }}>
            #{country.rank}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-[#7070AA]">VOLUME</span>
          <span className="text-sm font-bold font-mono" style={{ color }}>
            {country.volumeShare}
          </span>
        </div>
      </div>
      <p className="text-xs text-[#B0B0DD] leading-relaxed">{country.note}</p>
    </div>
  );
}

function Takeaway({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-sm text-[#B0B0DD] leading-relaxed">
      <span className="text-[#00F5FF] mt-0.5 shrink-0">&#9670;</span>
      <span>{children}</span>
    </li>
  );
}
