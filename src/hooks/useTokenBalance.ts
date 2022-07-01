import useSWR from 'swr'
import useWallet from './useWallet'
import useStarcoinProvider from './useStarcoinProvider'
import { getBalance } from '../utils/provider'

const useTokenBalance = (tokenAddress?: string) => {
  const { account } = useWallet()
  const provider = useStarcoinProvider()

  return useSWR(
    provider && account ? [tokenAddress, account, 'fetchTokenBalance'] : null,
    async () => {
      try {
        if (tokenAddress)
          return await getBalance(provider, account, tokenAddress)
        else
          return await getBalance(provider, account)
      }
      catch (e) {
        console.error('useTokenBalance', e)
      }
    },
    {
      refreshInterval: 5000,
    }
  )
}

export default useTokenBalance
