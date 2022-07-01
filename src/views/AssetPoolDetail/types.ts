import BigNumber from 'bignumber.js'

export interface PoolData {
  collatRate: BigNumber
  borrowFee: BigNumber
  interestRate: BigNumber
  liqFee: BigNumber
  liqThreshold: BigNumber
  totalLeftToBorrow: BigNumber
  deprecated: boolean
}
export interface PositionData extends PoolData {
  collateral: BigNumber
  collatVal: BigNumber
  borrowed: BigNumber
  liqPrice: BigNumber
  leftToBorrow: BigNumber
  price: BigNumber
  borrowedPart: BigNumber
}