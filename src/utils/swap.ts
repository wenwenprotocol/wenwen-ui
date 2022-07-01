import { Provider } from '../contexts/StarcoinProvider/StarcoinProvider'
import { Address } from './provider'
import { rawToBn } from '.'

export const getStarSwapReserves = async (
  provider: Provider,
  swapAddress: Address,
  inputTokenAddress: Address, 
  outputTokenAddress: Address
) => {
  const [inputTokenVal, outputTokenVal] = await provider.call({
    function_id: `${swapAddress}::TokenSwapRouter::get_reserves`,
    type_args: [inputTokenAddress, outputTokenAddress],
    args: [],
  }) as [number, number]
  return [rawToBn(inputTokenVal), rawToBn(outputTokenVal)]
}

export const getKikoSwapReserves = async (
  provider: Provider,
  swapAddress: Address,
  inputTokenAddress: Address, 
  outputTokenAddress: Address
) => {
  const [inputTokenVal, outputTokenVal] = await provider.call({
    function_id: `${swapAddress}::SwapPair::get_reserves`,
    type_args: [inputTokenAddress, outputTokenAddress],
    args: [],
  }) as [number, number]
  return [rawToBn(inputTokenVal), rawToBn(outputTokenVal)]
}