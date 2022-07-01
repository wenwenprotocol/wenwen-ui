import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import { getStakingInfo } from '../utils/staking'

const useStakinglInfo = (poolAddress: string) => {

  const provider = useStarcoinProvider()

  return useSWR(
    provider ? [provider.connection.url, poolAddress, 'fetchStakingInfo'] : null,
    async () => {
      try {
        return await getStakingInfo(provider, poolAddress)
      }
      catch (e) {
        console.error('useStakingInfo', e)
      }
    },
    {
      refreshInterval: 60000,
    }
  )
}

export default useStakinglInfo
