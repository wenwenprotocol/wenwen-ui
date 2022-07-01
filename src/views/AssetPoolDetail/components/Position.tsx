import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'react-i18next'
import useWallet from '../../../hooks/useWallet'
import { PositionData } from '../types'
import CardTitle from '../../../components/CardTitle'
import CardContent from '../../../components/CardContent'
import DataItem from '../../../components/DataItem'

interface PositionProps {
  assetSymbol: string
  positionData: PositionData
}

const Position: React.FC<PositionProps> = ({ positionData, assetSymbol }) => {
  const { t } = useTranslation()
  const { account } = useWallet()

  let collateral: BigNumber
  let collatVal: BigNumber
  let borrowed: BigNumber
  let leftToBorrow: BigNumber
  let price: BigNumber
  let liqPrice: BigNumber
  let totalLeftToBorrow: BigNumber
  let deprecated: boolean
  if (positionData) {
    ({ collateral, collatVal, borrowed, leftToBorrow, price, liqPrice, totalLeftToBorrow, deprecated } = positionData)
  }

  const uiPositionData = [
    { 
      name: t('borrow.collat_deposited'), 
      value: account ? collateral && collateral.toFormat(4) : '-',
      tip: t('borrow.collat_deposited_tip'),
    },
    { 
      name: t('borrow.collat_val'), 
      value: account ? collatVal && `$${collatVal.toFormat(4)}` : '-',
      tip: t('borrow.collat_val_tip'), 
    },
    { 
      name: t('borrow.wen_borrowed'), 
      value: account ? borrowed && `$${borrowed.toFormat(4)}` : '-',
      tip: t('borrow.wen_borrowed_tip'),
    },
    { 
      name: t('borrow.liquidation_price'), 
      value: account ? liqPrice && `$${!liqPrice.isNaN() ? liqPrice.toFormat(4) : '0'}` : '-',
      tip: t('borrow.liquidation_price_tip'), 
    },
    { 
      name: t('borrow.left_to_borrow'), 
      value: account ? positionData && 
          (!deprecated ? BigNumber.min(leftToBorrow, totalLeftToBorrow).toFormat(4) : '0') : '-',
      tip: t('borrow.left_to_borrow_tip'), 
    },
  ]

  return (
    <StyledCard>
      <CardTitle text={t('borrow.position')} />
      <CardContent>
        <PositionContainer>
          <PositionDataBox>
            {uiPositionData.map(item => (
              <DataItem
                key={item.name}
                indicator={item.name}
                value={item.value}
                tip={item.tip}
              />
            ))}
          </PositionDataBox>
          <ExchangeRateBox>
            <RateValue>
              {`1 WEN = 1 USD`}
            </RateValue>
            <RateValue>
              {`1 ${assetSymbol} = ${price ? price.toFormat(4) : '-'} WEN`}
            </RateValue>
          </ExchangeRateBox>
        </PositionContainer>
      </CardContent>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  height: 680px;
  border: 1px solid ${props => props.theme.color.divider};
  display: flex;
  flex-direction: column;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    height: 480px;
  }
`

const PositionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const PositionDataBox = styled.div`
`

const ExchangeRateBox = styled.div`
  display: flex;
  flex-direction: column;
`

const RateValue = styled.div`
  text-align: center;
  padding: 5px;
  font-family: 'DDIN';
`

export default Position