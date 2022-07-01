import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import { getFarmPoolInfo } from '../utils/farm'

const useFarmPoolInfo = (poolAddress: string) => {

  const provider = useStarcoinProvider()

  return useSWR(
    provider ? [provider.connection.url, poolAddress, 'fetchFarmPoolInfo'] : null,
    async () => {
      try {
        return await getFarmPoolInfo(provider, poolAddress)
      }
      catch (e) {
        console.error('useFarmPoolInfo', e)
      }
    }
  )
}

export default useFarmPoolInfo
