import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import useUnclaimedSShare from '../../../hooks/useUnclaimedSShare'
import useWallet from '../../../hooks/useWallet'
import useStarcoinProvider from '../../../hooks/useStarcoinProvider'
import useStakingRevenue from '../../../hooks/useStakingRevenue'
import useTxModal from '../../../hooks/useTxModal'
// import useTxEvents from '../../../hooks/useTxEvents'

import Card from '../../../components/Card'
import CardTitle from '../../../components/CardTitle'
import CardContent from '../../../components/CardContent'
import CardAction from '../../../components/CardAction'
import DataItem from '../../../components/DataItem'
import Button from '../../../components/Button'
import TransactionModal from '../../../components/TransactionModal'

import { getStaking } from '../../../utils/contract'
import { StakingProps } from '../types'
import { claim } from '../../../utils/staking'

const StakingInfo: React.FC<StakingProps> = ({ shareBalance, sShareBalance, exchangeRate, shareTotalBalance }) => {
  const { t } = useTranslation()
  const { account, chainId } = useWallet()

  const stakingAddress = getStaking(chainId)
  const provider = useStarcoinProvider()

  const { data: unclaimedInfo }  = useUnclaimedSShare(stakingAddress)
  // const { data: events } = useTxEvents('DepositEvent')
  const { data: stakingRevenue } = useStakingRevenue()

  const stakingApr = useMemo(() => {
    if (stakingRevenue && shareTotalBalance) {
      return stakingRevenue.div(shareTotalBalance).div(30).times(365 * 100)
    }
  }, [stakingRevenue, shareTotalBalance])


  const stakingInfo = [
    { 
      name: `SHARE ${t('stake.wallet_balance')}`, 
      value: account ? shareBalance && `${shareBalance.toFormat(4)}` : '-'
    },
    { 
      name: `sSHARE ${t('stake.wallet_balance')}`, 
      value: account ? sShareBalance && `${sShareBalance.toFormat(4)}` : '-'
    },
    { 
      name: t('stake.exchange_rate'), 
      value: exchangeRate && `1 sSHARE = ${exchangeRate.toFormat(4)} SHARE`
    },
    { 
      name: t('stake.apr'), 
      value: stakingApr && `${stakingApr.toFormat(2)}%`,
      tip: t('stake.apr_tip'),
    },
  ]

  const unlockTime = useMemo(() => unclaimedInfo ? new Date(unclaimedInfo.unlockTime) : null, [unclaimedInfo])
  const lockStatus = useMemo(() => unclaimedInfo ? Date.now() <= unclaimedInfo.unlockTime : true, [unclaimedInfo])
  const locked = useMemo(() => unclaimedInfo ? unclaimedInfo.balance : null, [unclaimedInfo])

  const lockedInfo = [
    { 
      name: t('stake.locked'), 
      value: account ? locked && `${locked.toFormat(4)}` : '-',
      tip: t('stake.locked_tip'),

    },
    { 
      name: t('stake.unlock_time'), 
      value: account ? unlockTime && locked && !locked.isZero() && unlockTime.toLocaleString() : '-',
      tip: t('stake.unlock_time_tip'),
    },
  ]

  const [txStatus, submitClaim] = useTxModal(claim, <TransactionModal />)

  const onClaim = async () => {
    if (!lockStatus && locked && locked.gt(0)) {
      await submitClaim(provider, stakingAddress, account)
    }
  }

  return (
    <Card height={650}>
      <CardTitle text={t('stake.info')}/>
      <CardContent>
        {stakingInfo.map(item => (
          <DataItem
            key={item.name}
            indicator={item.name}
            value={item.value}
            tip={item.tip}
          />
        ))}
      </CardContent>
      <CardTitle text={t('stake.claim')}/>
      <CardContent>
        {lockedInfo.map(item => (
          <DataItem
            key={item.name}
            indicator={item.name}
            value={item.value}
            tip={item.tip}
          />
        ))}
      </CardContent>
      <CardAction>
        <StyledButton>
          <Button
            disabled={txStatus === 'pending' || lockStatus || !(locked && locked.gt(0))}
            text={t('stake.claim')} 
            size='sm'
            onClick={onClaim}
          />
        </StyledButton>
      </CardAction>
    </Card>
  )
}

const StyledButton = styled.div`
  flex-basis: 30%;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    flex-basis: 100%;
  }
`

export default StakingInfo