import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'react-i18next'
import useWallet from '../../../hooks/useWallet'
import useStake from '../../../hooks/useStake'
import useUnstake from '../../../hooks/useUnstake'
import useEarnings from '../../../hooks/useEarnings'
import useFarmPoolInfo from '../../../hooks/useFarmPoolInfo'
import useFarmStakedBalance from '../../../hooks/useFarmStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useFarmPoolReserves from '../../../hooks/useFarmPoolReserves'

import useModal from '../../../hooks/useModal'
import Harvest from './Harvest'
import Stake from './Stake'
import Pool from '../../../components/Pool'
import Button from '../../../components/Button'
import WalletProviderModal from '../../../components/WalletProviderModal'
import FarmPoolAsset from './FarmPoolAsset'
import { FarmPoolData } from '../types'

interface FarmPoolProps {
  data: FarmPoolData
  sharePrice: BigNumber
  inputTokenPrice: BigNumber
}

const FarmPool: React.FC<FarmPoolProps> = ({ data, sharePrice, inputTokenPrice }) => {
  const { t } = useTranslation()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  const { 
    name,
    source, 
    inputTokenSymbol, 
    outputTokenSymbol, 
    poolAddress, 
    lpName, 
    lpAddress,
    inputTokenAddress,
    outputTokenAddress,
    baseLink,
  } = data

  const { onStake } = useStake(poolAddress)
  const { onUnstake } = useUnstake(poolAddress)
  const { data: earnings } = useEarnings(poolAddress)
  const { data: poolInfo } = useFarmPoolInfo(poolAddress)
  const { data: stakedBalance } = useFarmStakedBalance(poolAddress)
  const { data: tokenBalance } = useTokenBalance(lpAddress)
  const { data: poolReserves } = useFarmPoolReserves(poolAddress, inputTokenAddress, outputTokenAddress, lpAddress, source)

  const stcAddress = useCallback((symbol: string, address: string) => {
    return symbol === 'STC' ? symbol : address
  }, [])

  const tvl = useMemo(() => {
    if (poolReserves && inputTokenPrice && !poolReserves.inputTokenAmount.isNaN()) {
      const { inputTokenAmount } = poolReserves
      return inputTokenAmount.times(inputTokenPrice).times(2)
    }
  }, [poolReserves, inputTokenPrice])

  const apr = useMemo(() => {
    if (sharePrice && poolInfo && tvl && tvl.gt(0)) {
      const { rewardPerDay } = poolInfo
      return rewardPerDay.times(sharePrice).times(365).div(tvl)
    }
  }, [sharePrice, poolInfo, tvl])

  const items = [
    { 
      label: '', 
      value: <FarmPoolAsset {...{ 
        name,
        source, 
        inputTokenSymbol,
        inputTokenAddress: stcAddress(inputTokenSymbol, inputTokenAddress), 
        outputTokenSymbol,
        outputTokenAddress: stcAddress(outputTokenSymbol, outputTokenAddress),
        baseLink
      }} />
    },
    { label: t('farm.tvl'), value: tvl && `$${tvl.toFormat(2)}` },
    { label: `SHARE ${t('farm.rewards')}`, value: poolInfo && `${poolInfo.rewardPerDay.toFormat(0)} / Day` },
    { label: t('farm.apr'), value: apr && `${apr.toFormat(2)}%` },
    { label: `${t('farm.earned')} SHARE`, value: account ? earnings && earnings.toFormat(2) : '-' },
  ]

  const stakeInfo = {
    tokenName: lpName,
    tokenBalance,
    stakedBalance,
    onStake,
    onUnstake,
  }

  const [active, setActive] = useState(false)

  const handleToggle = () => {
    setActive(!active)
  }

  return (
    <PoolDropdown>
      <Pool 
        items={items} 
        displayChevron={true} 
        active={active}
        onClick={handleToggle}
      />
      <PoolCard className={active ? 'active' : ''}>
        {account ?
          <>
            <PoolCardAction>
              <Stake {...stakeInfo} />
            </PoolCardAction>
            <PoolCardAction>
              <Harvest earnings={earnings} poolAddress={poolAddress} />
            </PoolCardAction>
          </> :
          <PoolCardAction>
            <Button
              onClick={onPresentWalletProviderModal}
              text={t('wallet.unlock')}
            />
          </PoolCardAction>
        }
      </PoolCard>
    </PoolDropdown>
  )
}

const PoolDropdown = styled.div`
  width: 100%;
`

const PoolCard = styled.div`
  display: flex;
  justify-content: center;
  height: 0;
  overflow: hidden;
  transition: all .2s ease;
  &.active {
    height: 200px;
    border-bottom: 1px solid ${props => props.theme.color.divider};
  }
`

const PoolCardAction = styled.div`
  display: flex;
  padding: ${props => props.theme.spacing[4]}px;
  align-items: center;
`

export default FarmPool