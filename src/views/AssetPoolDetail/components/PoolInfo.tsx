import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import useWallet from '../../../hooks/useWallet'
import DataItem from '../../../components/DataItem'
import CardTitle from '../../../components/CardTitle'
import CardContent from '../../../components/CardContent'
import { PoolData } from '../types'

interface PoolInfoProps {
  poolData: PoolData
}

const PoolInfo: React.FC<PoolInfoProps> = ({ poolData })=> {
  const { t } = useTranslation()
  const { account } = useWallet()

  let collatRate, borrowFee, interestRate, liqFee
  if (poolData) {
    ({ collatRate, borrowFee, interestRate, liqFee } = poolData)
  }

  const uiPoolData = [
    { 
      name: t('borrow.max_callat_ratio'), 
      value: account ? collatRate && `${collatRate.times(100).toString()}%`: '-',
      tip: t('borrow.max_callat_ratio_tip'),
    },
    { 
      name: t('borrow.borrow_fee'), 
      value: account ? borrowFee && `${borrowFee.times(100).toString()}%` : '-',
      tip: t('borrow.borrow_fee_tip'),
    },
    { 
      name: t('borrow.interest_rate'), 
      value: account ? interestRate && `${interestRate.times(100).toString()}%` : '-',
      tip: t('borrow.interest_rate_tip'),
    },
    { 
      name: t('borrow.liquidation_fee'), 
      value: account ? liqFee && `${liqFee.times(100).toString()}%` : '-',
      tip: t('borrow.liquidation_fee_tip'),
    },
  ]

  return (
    <StyledCard>
      <CardTitle text={t('borrow.pool_info')} />
      <CardContent>
        {uiPoolData.map(item => (
          <DataItem
            key={item.name}
            indicator={item.name}
            value={item.value}
            tip={item.tip}
          />
        ))}
      </CardContent>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  height: 350px;
  border: 1px solid ${props => props.theme.color.divider};
  display: flex;
  flex-direction: column;
`
export default PoolInfo