import { Provider } from '../contexts/StarcoinProvider/StarcoinProvider'
import { utils } from '@starcoin/starcoin'
import { arrayify } from '@ethersproject/bytes'
import { Address, serializeU128, serializeScriptFunction } from './provider'
import { decToBn, rawToBn } from '.'
import BigNumber from 'bignumber.js'

export const getSShareTotalSupply = async (
  provider: Provider,
  poolAddress: Address, 
) => {
  const [totalSupply] = await provider.call({
    function_id: `${poolAddress}::total_supply`,
    type_args: [],
    args: [],
  }) as [number]
  return rawToBn(totalSupply)
}

export const getShareTotalBalance = async (
  provider: Provider,
  poolAddress: Address, 
) => {
  const [balance] = await provider.call({
    function_id: `${poolAddress}::balance`,
    type_args: [],
    args: [],
  }) as [number]
  return rawToBn(balance)
}

export const getTotalUnclaimed = async (
  provider: Provider,
  poolAddress: Address,
) => {
  const [balance] = await provider.call({
    function_id: `${poolAddress}::locked_balance`,
    type_args: [],
    args: [],
  }) as [number]
  return rawToBn(balance)
}

export const getUnclaimed = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
) => {
  const [balance, unlockTime] = await provider.call({
    function_id: `${poolAddress}::balance_of`,
    type_args: [],
    args: [account],
  }) as [number, number]
  return {
    balance: rawToBn(balance),
    unlockTime: unlockTime * 1000,
  }
}

export const getStakingInfo = async (
  provider: Provider,
  poolAddress: Address, 
) => {
  const sShareTotalSupply = await getSShareTotalSupply(provider, poolAddress)
  const shareTotalBalance = await getShareTotalBalance(provider, poolAddress)
  const exchangeRate = shareTotalBalance.div(sShareTotalSupply)
  // console.log(sShareTotalSupply.toString())
  return {
    sShareTotalSupply,
    shareTotalBalance,
    exchangeRate: exchangeRate.isNaN() ? new BigNumber(1) : exchangeRate,
  }
}

export const mint = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
  amount: string,
) => {
  const functionId = `${poolAddress}::mint`
  const seArgs = [
    arrayify(serializeU128(decToBn(amount).toString())),
  ]
  const scriptFunction = utils.tx.encodeScriptFunction(functionId, [], seArgs)
  const transactionHash = await provider.getSigner(account).sendUncheckedTransaction({
    data: serializeScriptFunction(scriptFunction),
  })
  return transactionHash
}

export const burn = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
  amount: string,
) => {
  const functionId = `${poolAddress}::burn`
  const seArgs = [
    arrayify(serializeU128(decToBn(amount).toString())),
  ]
  const scriptFunction = utils.tx.encodeScriptFunction(functionId, [], seArgs)
  const transactionHash = await provider.getSigner(account).sendUncheckedTransaction({
    data: serializeScriptFunction(scriptFunction),
  })
  return transactionHash
}

export const claim = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
) => {
  const functionId = `${poolAddress}::claim`
  const scriptFunction = utils.tx.encodeScriptFunction(functionId, [], [])
  const transactionHash = await provider.getSigner(account).sendUncheckedTransaction({
    data: serializeScriptFunction(scriptFunction),
  })
  return transactionHash
}

export const getStakingRevenue = async (
  provider: Provider,
  recordAddress: Address, 
) => {
  const [revenue] = await provider.call({
    function_id: `${recordAddress}::latest_30_days_data`,
    type_args: [],
    args: [],
  }) as [number]
  return rawToBn(revenue)
}