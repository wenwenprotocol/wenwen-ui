import React, { useState, useEffect, useMemo } from 'react'
import Context from './context'
import { Account, ChainId } from './types'
import StarMaskOnboarding from '@starcoin/starmask-onboarding'
import { KNOWN_CHAINS } from './chain'

import { 
  requestAccounts, 
  getAccounts, 
  getChainId,
  onChainChanged,
  onAccountsChanged
} from './utils'

const WalletPrivider: React.FC = ({ children }) => {

  const { isStarMaskInstalled } = StarMaskOnboarding

  const [account, setAccount] = useState<Account>(null)
  const [chainId, setChainId] = useState<ChainId>(undefined)

  const connect = async () => {  
    try {
      const accounts = await requestAccounts()
      setAccount(accounts[0])
    } catch (error) {
      console.error(error)
    }
  }

  const reset = () => {
    setAccount(null)
  }

  const getAccount = async () => {
    try {
      const accounts = await getAccounts()
      setAccount(accounts[0])
    } catch (err) {
      console.error(err)
    }
  }

  const getNetworkId = async () => {
    try {
      const chainInfo = await getChainId()
      setChainId(chainInfo.id)
    } catch (err) {
      console.error(err)
    }
  }

  const subscribeEvents = () => {
    onChainChanged((chainId) => {
      console.warn('chainChanged', parseInt(chainId))
      setChainId(parseInt(chainId))
    })

    onAccountsChanged((accounts) => {
      console.warn('accountsChanged', accounts)
      setAccount(accounts[0])
    })
  }

  useEffect(() => {
    if (isStarMaskInstalled()) {
      getNetworkId()
      getAccount()
      subscribeEvents()
    }
  }, [isStarMaskInstalled])

  const wallet = useMemo(() => ({
    account,
    chainId,
    connect,
    reset,
    networkName: chainId
    ? KNOWN_CHAINS.get(chainId)?.type || 'unknown'
    : null,
    explorerUrl: chainId
    ? KNOWN_CHAINS.get(chainId)?.explorerUrl : null
  }), [account, chainId])

  return (
    <Context.Provider
      value={{
        wallet,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default WalletPrivider
