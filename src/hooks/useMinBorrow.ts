import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import { getMinBorrow } from '../utils/lendingPool'

const useMinBorrow = (poolAddress: string) => {

  const provider = useStarcoinProvider()

  return useSWR(
    provider ? [poolAddress, 'fetchMinBorrow'] : null,
    async () => {
      try {
        return await getMinBorrow(provider, poolAddress)
      }
      catch (e) {
        console.error('useMinBorrow', e)
      }
    }
  )
}

export default useMinBorrow