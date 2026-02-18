// Takes real on-chain stablecoin amounts per chain (from DefiLlama)
// and distributes them to countries using chain→country models.
//
// This gives us a second, independent estimate of per-country stablecoin volume
// that we blend with the exchange-based estimate.

import { CHAIN_DISTRIBUTIONS } from '@/data/chain-country-distribution';
import { LiveStablecoinData } from './defillama';

export interface OnChainCountryEstimate {
  country: string;
  usdtVolume: number;
  usdcVolume: number;
}

export function distributeOnChainToCountries(
  liveData: LiveStablecoinData
): Map<string, OnChainCountryEstimate> {
  const countryEstimates = new Map<string, OnChainCountryEstimate>();

  function addToCountry(country: string, usdt: number, usdc: number) {
    const existing = countryEstimates.get(country);
    if (existing) {
      existing.usdtVolume += usdt;
      existing.usdcVolume += usdc;
    } else {
      countryEstimates.set(country, {
        country,
        usdtVolume: usdt,
        usdcVolume: usdc,
      });
    }
  }

  const { chainBreakdown } = liveData;

  // For each chain, distribute its USDT and USDC amounts to countries
  for (const [chain, amounts] of Object.entries(chainBreakdown)) {
    const distribution = CHAIN_DISTRIBUTIONS[chain];
    if (!distribution) continue;

    for (const region of distribution) {
      // Each country in the region gets an equal split of the region's share
      const perCountry = region.countries.length;
      const usdtPerCountry = (amounts.usdt * region.share) / perCountry;
      const usdcPerCountry = (amounts.usdc * region.share) / perCountry;

      for (const country of region.countries) {
        addToCountry(country, usdtPerCountry, usdcPerCountry);
      }
    }
  }

  return countryEstimates;
}

/**
 * Compute blended per-country stablecoin weights by combining:
 * 1. Exchange-based volume (from CoinGecko) — tells us WHERE trading happens
 * 2. On-chain distribution (from DefiLlama) — tells us WHERE stablecoins ARE
 *
 * The blend uses exchange data for country ranking (more accurate for geography)
 * and on-chain data for USDT vs USDC split (more accurate for stablecoin mix).
 */
export function computeBlendedWeights(
  exchangeVolumeUsd: number,
  countryName: string,
  onChainEstimates: Map<string, OnChainCountryEstimate>,
): { usdt: number; usdc: number; dai: number; all: number } | null {
  const onChain = onChainEstimates.get(countryName);

  if (!onChain || (onChain.usdtVolume + onChain.usdcVolume === 0)) {
    return null;
  }

  // On-chain tells us the USDT/USDC ratio for this country
  const totalOnChain = onChain.usdtVolume + onChain.usdcVolume;
  const usdtRatio = onChain.usdtVolume / totalOnChain;
  const usdcRatio = onChain.usdcVolume / totalOnChain;

  // Scale the total stablecoin share: on-chain market cap is a proxy for
  // what % of a country's trading involves stablecoins. Countries with
  // large on-chain stablecoin presence relative to their exchange volume
  // likely have higher stablecoin dominance.
  //
  // We cap the total stablecoin share between 0.60 and 0.96
  const onChainTotal = onChain.usdtVolume + onChain.usdcVolume;
  const stablecoinIntensity = Math.min(Math.max(
    onChainTotal / (exchangeVolumeUsd || onChainTotal || 1),
    0.60
  ), 0.96);

  // Apply the on-chain-derived ratios to get per-coin weights
  const all = stablecoinIntensity;
  const usdt = all * usdtRatio * 0.92;  // 0.92 = USDT/USDC don't cover 100%, leave room for others
  const usdc = all * usdcRatio * 0.92;
  const dai = all * 0.02;  // DAI is tiny everywhere, flat estimate

  return { usdt, usdc, dai, all };
}
