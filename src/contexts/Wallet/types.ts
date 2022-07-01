export type Account = string
export type ChainId = number | undefined

export type Status = 'connected' | 'disconnected' | 'connecting' | 'error'

export interface Wallet {
  account: Account | null
  // balance: string
  chainId: ChainId
  connect: () => Promise<void>
  // error: Error | null
  // provider?: any
  // isConnected: () => boolean
  networkName: string | null
  explorerUrl: string | null
  reset: () => void
  // status: Status
}

export type Currency = {
  name: string
  symbol: string
  decimals: number
}

export type ChainInformation = {
  id: number
  nativeCurrency: Currency
  type: string
  fullName: string
  shortName: string
  explorerUrl?: string
}

export type chainNameOnly = {
  id: number
  type: string
}