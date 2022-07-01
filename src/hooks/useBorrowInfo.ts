import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import { getAssetPoolBorrowInfo } from '../utils/lendingPool'

const useBorrowInfo = (poolAddress: string) => {

  const provider = useStarcoinProvider()

  return useSWR(
    provider && poolAddress ? [provider.connection.url, poolAddress, 'fetchBorrowInfo'] : null,
    async () => {
      try {
        return await getAssetPoolBorrowInfo(provider, poolAddress)
      }
      catch (e) {
        console.error('useBorrowInfo', e)
      }
    }
  )
}

export default useBorrowInfo