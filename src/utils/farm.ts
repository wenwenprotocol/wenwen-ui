import { arrayify  } from '@ethersproject/bytes'
import { utils } from '@starcoin/starcoin'
import { Provider } from '../contexts/StarcoinProvider/StarcoinProvider'
import BigNumber from 'bignumber.js'
import { INTEGERS } from '../constants/variables'
import { Address, serializeU128, serializeScriptFunction } from './provider'
import { decToBn, rawToBn } from '.'

export const getEarning = async (
  provider: Provider,
  poolAddress: Address, 
  account: Address,
) => {
  const [reward] = await provider.call({
    function_id: `${poolAddress}::pending`,
    type_args: [],
    args: [account],
  }) as [number]
  return rawToBn(reward)
}

export const getFarmStakedBalance = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
) => {
  const [balance] = await provider.call({
    function_id: `${poolAddress}::query_stake`,
    type_args: [],
    args: [account],
  }) as [number]
  return rawToBn(balance)
}

export const getFarmTotalStaked = async (
  provider: Provider,
  poolAddress: Address,
) => {
  const [totalStaked] = await provider.call({
    function_id: `${poolAddress}::query_farming_asset`,
    type_args: [],
    args: [],
  }) as [number]
  return rawToBn(totalStaked)
}

export const getMarketCap = async (
  provider: Provider,
  tokenAddress: Address,
) => {
  const [marketCap] = await provider.call({
    function_id: '0x1::Token::market_cap',
    type_args: [tokenAddress],
    args: [],
  }) as [number]
  return rawToBn(marketCap)
}

export const getFarmPoolInfo = async (
  provider: Provider,
  poolAddress: Address,
) => {
  const [rewardPerSecond, rewardPerPart, startTime, isAlive] = await provider.call({
    function_id: `${poolAddress}::query_farming_asset_setting`,
    type_args: [],
    args: [],
  }) as [number, number, number, boolean]

  return {
    rewardPerDay: rawToBn(rewardPerSecond).times(INTEGERS.ONE_DAY_IN_SECONDS),
    rewardPerPart: rawToBn(rewardPerPart),
    startTime: startTime * 1000,
    isAlive,
  }
}

export const harvest = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
) => {
  const functionId = `${poolAddress}::harvest`
  const scriptFunction = utils.tx.encodeScriptFunction(functionId, [], [])
  const transactionHash = await provider.getSigner(account).sendUncheckedTransaction({
    data: serializeScriptFunction(scriptFunction),
  })
  return transactionHash
}

export const stake = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
  amount: string,
) => {
  const functionId = `${poolAddress}::deposit`
  const seArgs = [arrayify(serializeU128(decToBn(amount).toString()))]
  const scriptFunction = utils.tx.encodeScriptFunction(functionId, [], seArgs)
  const transactionHash = await provider.getSigner(account).sendUncheckedTransaction({
    data: serializeScriptFunction(scriptFunction),
  })
  return transactionHash
}

export const unstake = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
  amount: string,
) => {
  const functionId = `${poolAddress}::withdraw`
  const seArgs = [arrayify(serializeU128(decToBn(amount).toString()))]
  const scriptFunction = utils.tx.encodeScriptFunction(functionId, [], seArgs)
  const transactionHash = await provider.getSigner(account).sendUncheckedTransaction({
    data: serializeScriptFunction(scriptFunction),
  })
  return transactionHash
}

export const getTokenPrice = async (
  provider: Provider,
  oracleAddress: Address,
  tokenName: string,
) => {
  const functionId = `${oracleAddress}::lastest_round_data`
  const [currentPrice, scale] = await provider.call({
    function_id: functionId,
    type_args: [`${oracleAddress}::${tokenName}_USD`],
    args: [],
  }) as [number, number]
  const [targetPrice] = await provider.call({
    function_id: functionId,
    type_args: [`${oracleAddress}::${tokenName}_USD_T`],
    args: [],
  }) as [number]
  return {
    tokenName,
    currentPrice: new BigNumber(currentPrice).dividedBy(scale).toNumber(),
    targetPrice: new BigNumber(targetPrice).dividedBy(scale).toNumber(),
  }
}