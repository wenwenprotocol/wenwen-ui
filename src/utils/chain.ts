import { supportedChainIds } from "../constants/supportedChain"

export const getStarcoinRpcUrl = (chainId: number) => {
  switch (chainId) {
    case 1:
      return `https://main-seed.starcoin.org`
    case 251:
      return `https://barnard-seed.starcoin.org`
    default:
      return 'https://main-seed.starcoin.org'
  }
}

export const isSupportedChainId = (chainId: number) => {
  return supportedChainIds.has(chainId)
}