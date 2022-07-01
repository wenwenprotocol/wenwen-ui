import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import { getAssetPoolInfo, isDeprecated } from '../utils/lendingPool'

const useAssetPoolInfo = (poolAddress: string) => {

  const provider = useStarcoinProvider()

  return useSWR(
    provider ? [provider.connection.url, poolAddress, 'fetchAssetPoolInfo'] : null,
    async () => {
      try {
        const deprecated = await isDeprecated(provider, poolAddress)
        const poolInfo = await getAssetPoolInfo(provider, poolAddress)
        return {
          ...poolInfo,
          deprecated,
        }
      }
      catch (e) {
        console.error('useAssetPoolInfo', e)
      }
    }
  )
}

export default useAssetPoolInfo
