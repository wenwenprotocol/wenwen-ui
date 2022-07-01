import { useCallback } from 'react'
import useWallet from './useWallet'
import useStarcoinProvider from './useStarcoinProvider'
import { stake } from '../utils/farm'

const useStake = (poolAddress: string) => {
  const { account } = useWallet()
  const provider = useStarcoinProvider()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        provider,
        poolAddress,
        account,
        amount,
      )
      return txHash
    },
    [account, provider, poolAddress],
  )

  return { onStake: handleStake }
}

export default useStake
