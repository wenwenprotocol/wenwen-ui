import React, { createContext, useEffect, useState } from 'react'
import { providers} from '@starcoin/starcoin'
import useWallet from '../../hooks/useWallet'
import { getStarcoinRpcUrl } from '../../utils/chain'

export type Provider = providers.Web3Provider | providers.JsonRpcProvider

export interface ProviderContext {
  provider?: Provider
}

export const Context = createContext<ProviderContext>({
  provider: undefined,
})

declare global {
  interface Window {
    starcoin: any
  }
}

const StarcoinProvider: React.FC = ({ children }) => {
  const { chainId } = useWallet()
  const [provider, setProvider] = useState<any>()

  const { starcoin } = window

  useEffect(() => {
    const rpc = getStarcoinRpcUrl(chainId)
    let starcoinProvider
    if (starcoin && chainId) {
      // We must specify the network as 'any' for starcoin to allow network changes
      starcoinProvider = new providers.Web3Provider(starcoin, 'any')
    }
    else {
      starcoinProvider = new providers.JsonRpcProvider(rpc)
    }
    setProvider(starcoinProvider)
  }, [starcoin, chainId])

  return <Context.Provider value={{ provider }}>{children}</Context.Provider>
}

export default StarcoinProvider