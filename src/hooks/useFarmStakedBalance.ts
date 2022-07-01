import useSWR from 'swr'
import useWallet from './useWallet'
import useStarcoinProvider from './useStarcoinProvider'
import { getFarmStakedBalance } from '../utils/farm'

const useFarmStakedBalance = (poolAddress: string) => {
  const { account } = useWallet()
  const provider = useStarcoinProvider()

  return useSWR(
    provider && account ? [provider.connection.url, poolAddress, account, 'fetchFarmStakedBalance'] : null,
    async () => {
      try {
        return await getFarmStakedBalance(provider, poolAddress, account)
      }
      catch (e) {
        console.error('useFarmStakedBalance', e)
      }
    },
    {
      refreshInterval: 5000,
    }
  )
}

export default useFarmStakedBalance
