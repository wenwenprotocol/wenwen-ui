import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import { getPositionInfo } from '../utils/lendingPool'
import useWallet from './useWallet'
import { getAsset } from '../utils/contract'

const usePosition = (assetName: string) => {

  const { account, chainId } = useWallet()
  const provider = useStarcoinProvider()
  const asset = getAsset(assetName, chainId)

  return useSWR(
    provider && account && asset ? [account, assetName, 'fetchPosition'] : null,
    async () => {
      try {
        return await getPositionInfo(provider, account, asset)
      }
      catch (e) {
        console.error('usePosition', e)
      }
    },
    {
      refreshInterval: 5000,
    }
  )
}

export default usePosition