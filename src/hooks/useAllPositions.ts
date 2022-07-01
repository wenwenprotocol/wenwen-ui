import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import useWallet from './useWallet'
import { getAssets } from '../utils/contract'
import { getPositionInfo } from '../utils/lendingPool'

const useAllPositions = () => {

  const { account, chainId } = useWallet()
  const provider = useStarcoinProvider()
  const assets = getAssets(chainId)

  return useSWR(
    provider && account && assets ? [provider.connection.url, account, 'fetchAllPositions'] : null,
    async () => {
      try {
        return await Promise.all(
          assets.map(asset => 
            getPositionInfo(provider, account, asset)
          )
        )
      }
      catch (e) {
        console.error('useAllPositions', e)
      }
    },
    {
      refreshInterval: 60000,
    }
  )
}

export default useAllPositions