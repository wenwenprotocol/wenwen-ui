import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import useWallet from './useWallet'
import { getOraclePrice } from '../utils/oracle'
import { getStcOracle } from '../utils/contract'

const useStcPrice = () => {

  const provider = useStarcoinProvider()
  const { chainId } = useWallet()
  const stcOracleAddress = getStcOracle(chainId)

  return useSWR(
    provider ? 'fetchStcPrice' : null,
    async () => {
      try {
        return await getOraclePrice(provider, stcOracleAddress)
       }
      catch (e) {
        console.error('useStcPrice', e)
      }
    },
    {
      refreshInterval: 60000,
    }
  )
}

export default useStcPrice
