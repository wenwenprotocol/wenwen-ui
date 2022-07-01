import useSWR from 'swr'
import useStarcoinProvider from './useStarcoinProvider'
import { getFarmTotalStaked, getMarketCap } from '../utils/farm'
import { getStarSwapReserves, getKikoSwapReserves } from '../utils/swap'
import { getStarSwap, getKikoSwap } from '../utils/contract'
import useWallet from './useWallet'

const useFarmPoolReserves = (
  poolAddress: string, 
  inputTokenAddress: string,
  outputTokenAddress: string,
  lpAddress: string,
  source: string
) => {

  const provider = useStarcoinProvider()
  const { chainId } = useWallet()

  const starSwap = getStarSwap(chainId)
  const kikoSwap = getKikoSwap(chainId)

  return useSWR(
    provider ? [provider.connection.url, poolAddress, 'fetchFarmPoolReserves'] : null,
    async () => {
      try {
        // console.log({ poolAddress, inputTokenAddress, outputTokenAddress, lpAddress})
        const lpTotalStaked = await getFarmTotalStaked(provider, poolAddress)
        const lpMarketCap = await getMarketCap(provider, lpAddress)
        let inputTokenAmount, outputTokenAmount
        if (source === 'StarSwap') {
          [inputTokenAmount, outputTokenAmount] = await getStarSwapReserves(provider, starSwap, inputTokenAddress, outputTokenAddress)
        }
        else if (source === 'KikoSwap') {
          [inputTokenAmount, outputTokenAmount] = await getKikoSwapReserves(provider, kikoSwap, inputTokenAddress, outputTokenAddress)
        }
        const ratio = lpTotalStaked.dividedBy(lpMarketCap)
        // console.log(inputTokenAmount.toString(), outputTokenAmount.toString(), poolAddress.toString())
        return {
          inputTokenAmount: inputTokenAmount.times(ratio),
          outputTokenAmount: outputTokenAmount.times(ratio),
        }
      }
      catch (e) {
        console.error('useFarmPoolReserves', e)
      }
    },
    {
      refreshInterval: 60000,
    }
  )
}

export default useFarmPoolReserves
