import { useCallback } from 'react'
import useWallet from '../hooks/useWallet'
import useStarcoinProvider from './useStarcoinProvider'
import { harvest } from '../utils/farm'

const useReward = (poolAddress: string) => {
  const { account } = useWallet()
  const provider = useStarcoinProvider()

  const handleReward = useCallback(async () => {
    const txHash = await harvest(provider, poolAddress, account)
    return txHash
  }, [account, poolAddress, provider])

  return { onReward: handleReward }
}

export default useReward
