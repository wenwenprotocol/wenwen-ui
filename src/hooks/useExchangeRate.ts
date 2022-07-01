import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import { getExchangeRate } from '../utils/lendingPool'

const useExchangeRate = (poolAddress: string) => {

  const provider = useStarcoinProvider()

  return useSWR(
    provider ? [poolAddress, 'fetchExchangeRate'] : null,
    async () => {
      try {
        return await getExchangeRate(provider, poolAddress)
      }
      catch (e) {
        console.error('useExchangeRate', e)
      }
    },
    {
      refreshInterval: 60000,
    }
  )
}

export default useExchangeRate