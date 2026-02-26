export interface PremiumCountry {
  name: string;
  iso2: string;
  fiat: string;
  fiatSymbol: string;
}

export const PREMIUM_COUNTRIES: PremiumCountry[] = [
  { name: 'Nigeria', iso2: 'NG', fiat: 'NGN', fiatSymbol: '₦' },
  { name: 'Argentina', iso2: 'AR', fiat: 'ARS', fiatSymbol: '$' },
  { name: 'Turkey', iso2: 'TR', fiat: 'TRY', fiatSymbol: '₺' },
  { name: 'Brazil', iso2: 'BR', fiat: 'BRL', fiatSymbol: 'R$' },
  { name: 'India', iso2: 'IN', fiat: 'INR', fiatSymbol: '₹' },
  { name: 'Kenya', iso2: 'KE', fiat: 'KES', fiatSymbol: 'KSh' },
  { name: 'Pakistan', iso2: 'PK', fiat: 'PKR', fiatSymbol: '₨' },
  { name: 'Egypt', iso2: 'EG', fiat: 'EGP', fiatSymbol: 'E£' },
  { name: 'Vietnam', iso2: 'VN', fiat: 'VND', fiatSymbol: '₫' },
  { name: 'Philippines', iso2: 'PH', fiat: 'PHP', fiatSymbol: '₱' },
  { name: 'Colombia', iso2: 'CO', fiat: 'COP', fiatSymbol: '$' },
  { name: 'Mexico', iso2: 'MX', fiat: 'MXN', fiatSymbol: '$' },
  { name: 'South Africa', iso2: 'ZA', fiat: 'ZAR', fiatSymbol: 'R' },
  { name: 'Ghana', iso2: 'GH', fiat: 'GHS', fiatSymbol: 'GH₵' },
  { name: 'Indonesia', iso2: 'ID', fiat: 'IDR', fiatSymbol: 'Rp' },
  { name: 'Ukraine', iso2: 'UA', fiat: 'UAH', fiatSymbol: '₴' },
];
