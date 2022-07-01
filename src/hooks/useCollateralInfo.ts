import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import { getAssetPoolCollateralInfo, getLatestExchangeRate } from '../utils/lendingPool'

const useCollateralInfo = (poolAddress: string) => {

  const provider = useStarcoinProvider()

  return useSWR(
    provider ? [provider.connection.url, poolAddress, 'fetchCollateralInfo'] : null,
    async () => {
      try {
        const collateral = await getAssetPoolCollateralInfo(provider, poolAddress)
        const price = await getLatestExchangeRate(provider, poolAddress)
        return {
          collateral,
          price,
          collatVal: collateral.times(price)
        }
      }
      catch (e) {
        console.error('useCollateralInfo', e)
      }
    }
  )
}

export default useCollateralInfo
