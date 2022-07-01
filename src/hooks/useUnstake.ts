import { useCallback } from 'react'
import useWallet from './useWallet'
import useStarcoinProvider from './useStarcoinProvider'
import { unstake } from '../utils/farm'

const useUnstake = (poolAddress: string) => {
  const { account } = useWallet()
  const provider = useStarcoinProvider()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(
        provider, 
        poolAddress, 
        account, 
        amount
      )
      return txHash
    },
    [account, poolAddress, provider],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
