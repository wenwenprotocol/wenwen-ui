import BigNumber from 'bignumber.js'

export interface StakingProps {
  shareBalance: BigNumber
  sShareBalance: BigNumber
  exchangeRate: BigNumber
  shareTotalBalance: BigNumber
  onSwitch: () => void
}