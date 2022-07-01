import useSWR from 'swr'
import BigNumber from 'bignumber.js'
import useStarcoinProvider from './useStarcoinProvider'
import useWallet from './useWallet'
import { getStarSwapReserves } from '../utils/swap'
import { getGovTokens, getStarSwap } from '../utils/contract'
import { getOraclePrice } from '../utils/oracle'
import { getStcOracle } from '../utils/contract'

const useSharePrice = () => {

  const provider = useStarcoinProvider()
  const { chainId } = useWallet()
  const swapAddress = getStarSwap(chainId)
  const stcOracleAddress = getStcOracle(chainId)
  const { share: shareAddress } = getGovTokens(chainId)
  const stcAddress = '0x1::STC::STC'

  return useSWR(
    provider ? [provider.connection.url, 'fetchSharePrice'] : null,
    async () => {
      try {
        const [shareAmount, stcAmount] = await getStarSwapReserves(provider, swapAddress, shareAddress, stcAddress)
        const stcPrice = await getOraclePrice(provider, stcOracleAddress)
        const price = stcAmount.div(shareAmount).times(stcPrice)
        return !price.isNaN() ? price : new BigNumber(0) 
      }
      catch (e) {
        console.error('useSharePrice', e)
      }
    },
    {
      refreshInterval: 60000,
    }
  )
}

export default useSharePrice
