import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import { getFeeInfo } from '../utils/lendingPool'

const useFeeInfo = (poolAddress: string) => {

  const provider = useStarcoinProvider()

  return useSWR(
    provider ? [poolAddress, 'fetchFeeInfo'] : null,
    async () => {
      try {
        return await getFeeInfo(provider, poolAddress)
      }
      catch (e) {
        console.error('useFeeInfo', e)
      }
    }
  )
}

export default useFeeInfo
