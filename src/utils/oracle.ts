import { Provider } from '../contexts/StarcoinProvider/StarcoinProvider'
import BigNumber from 'bignumber.js'

export const getOraclePrice = async (
  provider: Provider,
  oracleAddress: string,
) => {
  const [price, scalingFactor] = await provider.call({
    function_id: `${oracleAddress}::get`,
    type_args: [],
    args: [],
  }) as [number, number]
  return new BigNumber(price).div(scalingFactor)
}