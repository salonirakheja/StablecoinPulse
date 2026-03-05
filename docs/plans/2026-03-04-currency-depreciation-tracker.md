# Currency Depreciation Tracker — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Show 12-month local currency depreciation vs USD as a new column in the premium table.

**Architecture:** Fetch historical FX rate (12 months ago) from fawazahmed0/exchange-api, compare to current rate from open.er-api.com (already fetched), compute % change. Cache historical rates in Redis for 24h. Fail gracefully — if historical API is down, premium table works as before without the column.

**Tech Stack:** fawazahmed0/exchange-api (free, CDN-hosted), Upstash Redis, Next.js API route, React

---

### Task 1: Historical FX rate fetcher

**Files:**
- Create: `src/lib/historical-fx.ts`

Fetch rates for a given date from fawazahmed0/exchange-api. Primary + fallback endpoint. Returns a map of currency -> rate.

### Task 2: Extend premium API with depreciation data

**Files:**
- Modify: `src/app/api/premium/route.ts`

Add `depreciation12m` field to `CountryPremium` interface. Fetch historical rates (12 months ago), compute `((currentRate - historicalRate) / historicalRate) * 100` per country. Cache historical rates separately in Redis (24h TTL). If historical fetch fails, set depreciation to null for all countries.

### Task 3: Add "FX 12M" column to PremiumPanel

**Files:**
- Modify: `src/components/PremiumPanel.tsx`

New sortable column between country info and USDT column. Show depreciation as arrow + percentage (e.g., "↓ 33.0%"). Color: red for depreciation, green for appreciation. Add 'fx12m' to sort logic.

### Task 4: Add "Worst Currency" stat card

**Files:**
- Modify: `src/components/PremiumPanel.tsx`

New stat card in the summary stats bar showing the country with the worst depreciation. Replaces nothing — adds a 4th card. On mobile it scrolls horizontally (existing behavior).

### Task 5: Commit

```bash
git add -A
git commit -m "Add currency depreciation tracker — 12M FX change in premium table"
```
