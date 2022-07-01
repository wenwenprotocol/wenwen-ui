import useSWR from 'swr'
import useWallet from './useWallet'
import useStarcoinProvider from './useStarcoinProvider'
import { getEarning } from '../utils/farm'

const useEarnings = (poolAddress: string) => {
  const { account } = useWallet()
  const provider = useStarcoinProvider()

  return useSWR(
    provider && account ? [provider.connection.url, poolAddress, account, 'fetchReward'] : null,
    async () => {
      try {
        return await getEarning(provider, poolAddress, account)
      }
      catch (e) {
        console.error('useEarnings', e)
      }
    },
    {
      refreshInterval: 5000,
    }
  )
}

export default useEarnings
