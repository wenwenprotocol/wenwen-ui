import { 
  assets, 
  wen, 
  share, 
  sShare, 
  staking, 
  farms, 
  swaps, 
  pairs, 
  stcOracle,
  record, 
} from '../constants/contractAddresses'

const DEFAULT_CHAIN_ID = 1

export const getFarmPools = (chainId: number = DEFAULT_CHAIN_ID)  => {
  return [
    {
      name: 'STC-WEN',
      source: 'StarSwap',
      baseLink: 'https://old.starswap.xyz/#/add/v2',
      lpName: 'STC-WEN LP',
      inputTokenSymbol: 'STC',
      outputTokenSymbol: 'WEN',
      lpAddress: pairs[chainId].STC_WEN_STARSWAP,
      inputTokenAddress: '0x1::STC::STC',
      outputTokenAddress: wen[chainId],
      poolAddress: farms[chainId].STC_WEN_STARSWAP,
    },
    {
      name: 'STC-SHARE',
      source: 'StarSwap',
      baseLink: 'https://old.starswap.xyz/#/add/v2',
      lpName: 'STC-SHARE LP',
      inputTokenSymbol: 'STC',
      outputTokenSymbol: 'SHARE',
      lpAddress: pairs[chainId].STC_WEN_STARSWAP,
      inputTokenAddress: '0x1::STC::STC',
      outputTokenAddress: share[chainId],
      poolAddress: farms[chainId].STC_SHARE_STARSWAP,
    },
    // {
    //   name: 'STC-WEN',
    //   source: 'KikoSwap',
    //   baseLink: 'https://kikoswap.com/liquidity',
    //   lpName: 'STC-WEN LP',
    //   inputTokenSymbol: 'STC',
    //   outputTokenSymbol: 'WEN',
    //   lpAddress: pairs[chainId].STC_WEN_KIKOSWAP,
    //   inputTokenAddress: '0x1::STC::STC',
    //   outputTokenAddress: wen[chainId],
    //   poolAddress: farms[chainId].STC_WEN_KIKOSWAP,
    // },
    // {
    //   name: 'STC-SHARE',
    //   source: 'KikoSwap',
    //   baseLink: 'https://kikoswap.com/liquidity',
    //   lpName: 'STC-SHARE LP',
    //   inputTokenSymbol: 'STC',
    //   outputTokenSymbol: 'SHARE',
    //   lpAddress: pairs[chainId].STC_SHARE_KIKOSWAP,
    //   inputTokenAddress: '0x1::STC::STC',
    //   outputTokenAddress: share[chainId],
    //   poolAddress: farms[chainId].STC_SHARE_KIKOSWAP,
    // },
  ]
}

export const getStarSwap = (chainId: number = DEFAULT_CHAIN_ID) => {
  return swaps[chainId].StarSwap
}

export const getKikoSwap = (chainId: number = DEFAULT_CHAIN_ID) => {
  return swaps[chainId].KikoSwap
}

export const getAssets = (chainId: number = DEFAULT_CHAIN_ID) => {
  return assets[chainId]
}

export const getAsset = (name: string, chainId: number = DEFAULT_CHAIN_ID) => {
  return assets[chainId].find(asset => asset.name === name)
}

export const getWen = (chainId: number = DEFAULT_CHAIN_ID) => {
  return wen[chainId]
}

export const getGovTokens = (chainId: number = DEFAULT_CHAIN_ID) => {
  return {
    share: share[chainId],
    sShare: sShare[chainId],
  }
}

export const getStaking = (chainId: number = DEFAULT_CHAIN_ID) => {
  return staking[chainId]
}

export const getStcOracle = (chainId: number = 1) => {
  return stcOracle[chainId]
}

export const getRecord = (chainId: number = 1) => {
  return record[chainId]
}