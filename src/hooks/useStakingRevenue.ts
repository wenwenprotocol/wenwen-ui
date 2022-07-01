import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import useWallet from './useWallet'
import { getRecord } from '../utils/contract'
import { getStakingRevenue } from '../utils/staking'

const useStakingRevenue = () => {

  const provider = useStarcoinProvider()
  const { chainId } = useWallet()
  const recordAddress = getRecord(chainId)

  return useSWR(
    provider ? [provider.connection.url, recordAddress, 'fetchStakingRevenue'] : null,
    async () => {
      try {
        return await getStakingRevenue(provider, recordAddress)
      }
      catch (e) {
        console.error('useStakingRevenue', e)
      }
    },
    {
      refreshInterval: 60000,
    }
  )
}

export default useStakingRevenue
