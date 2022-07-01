import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import useWallet from './useWallet'
import { getUnclaimed } from '../utils/staking'

const useUnclaimedSShare = (poolAddress: string) => {

  const provider = useStarcoinProvider()
  const { account } = useWallet()

  return useSWR(
    provider && account ? [provider.connection.url, account, poolAddress, 'fetchUnclaimedSShare'] : null,
    async () => {
      try {
        return await getUnclaimed(provider, poolAddress, account)
      }
      catch (e) {
        console.error('useUnclaimedSShare', e)
      }
    },
    {
      refreshInterval: 5000,
    }
  )
}

export default useUnclaimedSShare
