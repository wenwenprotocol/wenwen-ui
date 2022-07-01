import { Provider } from '../contexts/StarcoinProvider/StarcoinProvider'
import { utils } from '@starcoin/starcoin'
import { arrayify } from '@ethersproject/bytes'
import BigNumber from 'bignumber.js'
import { Address, serializeU128, serializeScriptFunction, serializeVectorU8 } from './provider'
import { decToBn, rawToBn } from '.'
import { Asset } from '../constants/contractAddresses'
import { INTEGERS } from '../constants/variables'
// import { getOraclePrice } from './oracle'

export const getAssetPoolInfo = async (
  provider: Provider,
  address: Address, 
) => {
  const [collatRate, liqThreshold, liqMultiplier, borrowFee, interestRate] = await provider.call({
    function_id: `${address}::settings`,
    type_args: [],
    args: [],
  }) as [number, number, number, number, number]
  // console.log({collatRate, liqThreshold, liqMultiplier, borrowFee, interestRate})
  return {
    collatRate: rawToBn(collatRate, 5),
    liqThreshold: rawToBn(liqThreshold, 5),
    liqMultiplier: rawToBn(liqMultiplier, 5),
    borrowFee: rawToBn(borrowFee, 5),
    interestRate: rawToBn(interestRate, 5)
  }
}

export const getAssetPoolCollateralInfo = async (
  provider: Provider,
  poolAddress: Address, 
) => {
  const [collateral] = await provider.call({
    function_id: `${poolAddress}::collateral_info`,
    type_args: [],
    args: [],
  }) as [number]
  return rawToBn(collateral)
}

export const getAssetPoolBorrowInfo = async (
  provider: Provider,
  poolAddress: Address, 
) => {
  const [borrowedPart, borrowed, leftToBorrow] = await provider.call({
    function_id: `${poolAddress}::borrow_info`,
    type_args: [],
    args: [],
  }) as [number, number, number]
  // console.log({borrowedPart, borrowed, leftToBorrow})
  return {
    borrowedPart: rawToBn(borrowedPart),
    borrowed: rawToBn(borrowed),
    leftToBorrow: rawToBn(leftToBorrow),
  }
}

export const getMinBorrow = async (
  provider: Provider,
  poolAddress: Address, 
) => {
  const [minBorrow] = await provider.call({
    function_id: `${poolAddress}::get_min_borrow`,
    type_args: [],
    args: [],
  }) as [number]
  // console.log({minBorrow})
  return rawToBn(minBorrow)
}

export const getAssetPoolPosition = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
) => {
  const [collateral, borrowedPart, borrowed] = await provider.call({
    function_id: `${poolAddress}::position`,
    type_args: [],
    args: [account],
  }) as [number, number, number]
  // console.log({collateral, borrowedPart, borrowed})
  return {
    collateral: rawToBn(collateral),
    borrowedPart: rawToBn(borrowedPart),
    borrowed: rawToBn(borrowed),
  }
}

/**
 * Return exchange rate in the form of WEN/Asset
 * @param provider 
 * @param poolAddress 
 * @returns 
 */
export const getExchangeRate = async (
  provider: Provider,
  poolAddress: Address,
) => {
  const [rate, decimals] = await provider.call({
    function_id: `${poolAddress}::get_exchange_rate`,
    type_args: [],
    args: [],
  }) as [number, number]
  return new BigNumber(decimals).div(rate)
}

export const getLatestExchangeRate = async (
  provider: Provider,
  poolAddress: Address,
) => {
  const [rate, decimals] = await provider.call({
    function_id: `${poolAddress}::latest_exchange_rate`,
    type_args: [],
    args: [],
  }) as [number, number]
  return new BigNumber(decimals).div(rate)
}

/**
 * Interact with a asset pool: add and remove collateral, borrow and repay
 * ADD_COLLATERAL = 1
 * REMOVE_COLLATERAL = 2
 * BORROW = 3
 * REPAY = 4
 * @param opitons
 * @returns transactionHash
 */
export const cook = async ({
  provider,
  poolAddress,
  account,
  actions,
  collateralAmount = '0',
  removeCollateralAmount = '0',
  removeCollateralTo = '0x00000000000000000000000000000000',
  borrowAmount = '0',
  borrowTo = '0x00000000000000000000000000000000',
  repayPart = '0',
  repayTo = '0x00000000000000000000000000000000'
}: {
  provider: Provider
  poolAddress: Address
  account: Address
  actions: number[]
  collateralAmount?: string,
  removeCollateralAmount?: string,
  removeCollateralTo?: Address,
  borrowAmount?: string,
  borrowTo?: Address,
  repayPart?: string,
  repayTo?: Address
}) => {
  const functionId = `${poolAddress}::cook`
  const seArgs = [
    arrayify(serializeVectorU8(actions)),
    arrayify(serializeU128(decToBn(collateralAmount).toString())),
    arrayify(serializeU128(decToBn(removeCollateralAmount).toString())),
    arrayify(removeCollateralTo),
    arrayify(serializeU128(decToBn(borrowAmount).toString())),
    arrayify(borrowTo),
    arrayify(serializeU128(decToBn(repayPart).toString())),
    arrayify(repayTo),
  ]
  const scriptFunction = utils.tx.encodeScriptFunction(functionId, [], seArgs)
  const transactionHash = await provider.getSigner(account).sendUncheckedTransaction({
    data: serializeScriptFunction(scriptFunction),
  })
  return transactionHash
}

export const addCollateral = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
  amount: string
) => {
  const functionId = `${poolAddress}::add_collateral`
  const seArgs = [
    arrayify(serializeU128(decToBn(amount).toString())),
  ]
  const scriptFunction = utils.tx.encodeScriptFunction(functionId, [], seArgs)
  const transactionHash = await provider.getSigner(account).sendUncheckedTransaction({
    data: serializeScriptFunction(scriptFunction),
  })
  return transactionHash
}

export const removeCollateral = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
  receiver: Address,
  amount: string
) => {
  const functionId = `${poolAddress}::remove_collateral`
  const seArgs = [
    arrayify(receiver),
    arrayify(serializeU128(decToBn(amount).toString())),
  ]
  const scriptFunction = utils.tx.encodeScriptFunction(functionId, [], seArgs)
  const transactionHash = await provider.getSigner(account).sendUncheckedTransaction({
    data: serializeScriptFunction(scriptFunction),
  })
  return transactionHash
}

export const borrow = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
  receiver: Address,
  amount: string
) => {
  const functionId = `${poolAddress}::borrow`
  const seArgs = [
    arrayify(receiver),
    arrayify(serializeU128(decToBn(amount).toString())),
  ]
  const scriptFunction = utils.tx.encodeScriptFunction(functionId, [], seArgs)
  const transactionHash = await provider.getSigner(account).sendUncheckedTransaction({
    data: serializeScriptFunction(scriptFunction),
  })
  return transactionHash
}

export const repay = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
  receiver: Address,
  part: string
) => {
  const functionId = `${poolAddress}::repay`
  const seArgs = [
    arrayify(receiver),
    arrayify(serializeU128(decToBn(part).toString())),
  ]
  const scriptFunction = utils.tx.encodeScriptFunction(functionId, [], seArgs)
  const transactionHash = await provider.getSigner(account).sendUncheckedTransaction({
    data: serializeScriptFunction(scriptFunction),
  })
  return transactionHash
}

export const isSolvent = async (
  provider: Provider,
  poolAddress: Address,
  account: Address,
  exchangeRate: string
) => {
  const [isSolvent] = await provider.call({
    function_id: `${poolAddress}::is_solvent`,
    type_args: [],
    args: [account, `${exchangeRate}u128`],
  }) as [boolean]
  return isSolvent
}

export const isDeprecated = async (
  provider: Provider,
  poolAddress: Address,
) => {
  const [isDeprecated] = await provider.call({
    function_id: `${poolAddress}::is_deprecated`,
    type_args: [],
    args: [],
  }) as [boolean]
  return isDeprecated
}

export const getFeeInfo = async (
  provider: Provider,
  poolAddress: Address,
) => {
  const [address, interest, lastUpdateTime] = await provider.call({
    function_id: `${poolAddress}::fee_info`,
    type_args: [],
    args: [],
  }) as [string, number, number]
  // console.log({address, interest, lastUpdateTime})
  return {
    address,
    interest: rawToBn(interest),
    lastUpdateTime: lastUpdateTime * 1000,
  }
}

export const getPositionInfo = async (
  provider: Provider,
  account: Address,
  asset: Asset,
) => {

  const poolInfo = await getAssetPoolInfo(provider, asset.poolAddress)
  const poolTotal = await getAssetPoolBorrowInfo(provider, asset.poolAddress)
  const position = await getAssetPoolPosition(provider, asset.poolAddress, account)
  // const price = await getExchangeRate(provider, asset.poolAddress)
  // const price = await getOraclePrice(provider, asset.oracleAddress)
  const price = await getLatestExchangeRate(provider, asset.poolAddress)
  const feeInfo = await getFeeInfo(provider, asset.poolAddress)
  const deprecated = await isDeprecated(provider, asset.poolAddress)

  const liqFee = poolInfo.liqMultiplier.minus(1)
  const collatVal = position.collateral.times(price)
  const timeInSec = (Date.now() - feeInfo.lastUpdateTime) / 1000
  const totalInterest = poolInfo.interestRate.div(INTEGERS.ONE_YEAR_IN_SECONDS).times(timeInSec).times(poolTotal.borrowed)
  const borrowed = poolTotal.borrowed.plus(totalInterest).times(position.borrowedPart).div(poolTotal.borrowedPart)
  const liqPrice = borrowed.div(position.collateral.times(poolInfo.liqThreshold))
  const leftToBorrow = BigNumber.max(collatVal.times(poolInfo.collatRate).minus(borrowed).times(new BigNumber(1).minus(poolInfo.borrowFee)), 0)
  // console.log(poolPrice.toString(), price.toString())

  return {
    deprecated,
    ...poolInfo,
    ...position,
    ...asset,
    price,
    liqFee,
    collatVal,
    borrowed: borrowed.isNaN() ? new BigNumber(0) : borrowed,
    liqPrice,
    leftToBorrow: leftToBorrow.isNaN() ? new BigNumber(0) : leftToBorrow,
    totalLeftToBorrow: poolTotal.leftToBorrow,
  }
}
