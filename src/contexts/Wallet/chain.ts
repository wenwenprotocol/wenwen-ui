import { ChainInformation, Currency } from './types'

const STC: Currency = {
  name: 'STC',
  symbol: 'STC',
  decimals: 18,
}

export const KNOWN_CHAINS = new Map<number, ChainInformation>([
  [
    1,
    {
      id: 1,
      nativeCurrency: STC,
      type: 'main',
      fullName: 'Starcoin Mainnet',
      shortName: 'Mainnet',
      explorerUrl: `https://stcscan.io/main`,
    },
  ],
  [
    251,
    {
      id: 251,
      nativeCurrency: STC,
      type: 'barnard',
      fullName: 'Starcoin Barnard',
      shortName: 'Barnard',
      explorerUrl: `https://stcscan.io/barnard`,
    },
  ],
])