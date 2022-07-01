import React, { useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'react-i18next'
import useWallet from '../../../hooks/useWallet'
import useStarcoinProvider from '../../../hooks/useStarcoinProvider'
import useTokenInput from '../../../hooks/useTokenInput'
import useModal from '../../../hooks/useModal'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useTxModal from '../../../hooks/useTxModal'

import { PositionData, PoolData } from '../types'
import Button from '../../../components/Button'
import CardContent from '../../../components/CardContent'
import CardAction from '../../../components/CardAction'
import TokenInput from '../../../components/TokenInput'
import Icon from '../../../components/Icon'
import ArrowDown from '../../../components/icons/ArrowDown'
import DataItem from '../../../components/DataItem'
import Spacer from '../../../components/Spacer'
import WalletProviderModal from '../../../components/WalletProviderModal'
import Coins from '../../../components/Coins'
import PositionHealth from './PositionHealth'
import TransactionModal from '../../../components/TransactionModal'

import { getAsset, getWen } from '../../../utils/contract'
import { cook } from '../../../utils/lendingPool'
import { ACTION_TYPE } from '../../../constants/variables'
import { isValid } from '../../../utils'

interface RepayProps {
  positionData: PositionData & PoolData
}

const Repay: React.FC<RepayProps> = ({ positionData }) => {
  const { assetName } = useParams<any>()
  const { account, chainId } = useWallet()
  const { poolAddress, symbol } = getAsset(assetName, chainId)
  const provider = useStarcoinProvider()
  const { t } = useTranslation()

  const wenAddress = getWen(chainId)
  const { data: wenBalance } = useTokenBalance(wenAddress)

  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  let liqThreshold: BigNumber
  let collateral: BigNumber
  let borrowed: BigNumber
  let price: BigNumber
  let borrowedPart: BigNumber
  let interestRate: BigNumber
  let collatVal: BigNumber
  if (positionData) {
    ({ collateral, borrowed, price, borrowedPart, interestRate, liqThreshold, collatVal } = positionData)
  }

  const { 
    val: repayVal,
    maxVal: maxRepayVal,
    setVal: setRepayVal,
    setMaxVal: setMaxRepayVal,
    handleInputChange: handleRepayChange,
    handleSelectMax: handleRepaySelectMax
  } = useTokenInput()

  const { 
    val: removeCollatVal,
    maxVal: maxRemoveCollatVal,
    setVal: setRemoveCollatVal,
    setMaxVal: setMaxRemoveCollatVal,
    handleInputChange: handleRemoveCollatChange,
    // handleSelectMax: handleRemoveCollatSelectMax
  } = useTokenInput()

  // max wen available to repay
  const wenBalanceVal = useMemo(() => { 
    return wenBalance && borrowed ? BigNumber.min(wenBalance, borrowed).toString() : '0'
  }, [wenBalance, borrowed])

  useEffect(() => {
    setMaxRepayVal(wenBalanceVal)
  }, [wenBalanceVal, setMaxRepayVal])

  // max collateral available to withdraw
  const maxRemoveAmount = useMemo(() => {
    if (positionData) {
      return collatVal.times(liqThreshold).minus(borrowed).plus(repayVal || 0).div(price).div(liqThreshold)
    }
    else return new BigNumber(0)
  }, [repayVal, price, liqThreshold, positionData, collatVal, borrowed])

  useEffect(() => {
    setMaxRemoveCollatVal(maxRemoveAmount.decimalPlaces(9, 5).toString())
  }, [maxRemoveAmount, setMaxRemoveCollatVal])

  // set a smaller value when select max because available to borrow value decreases along with the time
  const scaledMaxRemoveCollatVal = useMemo(() => {
    if (interestRate && borrowed) {
      const interest = interestRate.div(365 * 24).times(borrowed)
      const scaledMaxVal = maxRemoveAmount.minus(interest)
      return BigNumber.max(scaledMaxVal, 0).decimalPlaces(9, 5).toString()
    }
    else return '0'
  }, [maxRemoveAmount, interestRate, borrowed])

  const handleRemoveCollatSelectMax = () => {
    setRemoveCollatVal(scaledMaxRemoveCollatVal)
  }

  // calculate expected number when there is a valid input
  const expectedWenBorrowed = useMemo(() => { 
    return borrowed ? borrowed.minus(repayVal || 0) : new BigNumber(0)
  }, [borrowed, repayVal])

  const expectedLiqPrice = useMemo(() => {
    if (collateral && liqThreshold) {
      const expectedCollatVal = BigNumber.max(collateral.minus(removeCollatVal || 0), 0)
      return expectedWenBorrowed.div(expectedCollatVal.times(liqThreshold))
    }
    else return new BigNumber(0)
  }, [removeCollatVal, collateral, liqThreshold, expectedWenBorrowed])

  const expectedData = [
    { name: t('borrow.wen_amount'), value: `$${expectedWenBorrowed.toFormat(4)}` },
    { name: t('borrow.expected_liq_price'), value: `$${!expectedLiqPrice.isNaN() && expectedLiqPrice.isFinite() ? expectedLiqPrice.toFormat(4) : '0'}` },
    { name: t('borrow.expected_position_health'), value: <PositionHealth liqPrice={expectedLiqPrice} price={price} /> },
  ]

  const [txStatus, submitCook] = useTxModal(cook, <TransactionModal />)

  const handleButtonText = useCallback(() => {
    if (txStatus === 'pending') return t('pending')
    if (repayVal && removeCollatVal) return t('borrow.repay_and_remove')
    else if (repayVal) return t('borrow.repay')
    else if (removeCollatVal) return t('borrow.remove_collateral')
    else return t('borrow.enter')
  }, [txStatus, repayVal, removeCollatVal, t])

  const repayInputError = useCallback(() => {
    if (wenBalance && wenBalance.lt(repayVal)) {
      return t('borrow.insufficient_bal')
    }
    else if (new BigNumber(maxRepayVal).lt(repayVal)) {
      return `${t('borrow.cannot_gt')} ${maxRepayVal}`
    }
    else return ''
  }, [wenBalance, maxRepayVal, repayVal, t])

  const removeCollatInputError = useCallback(() => {
    if (new BigNumber(maxRemoveCollatVal).lt(removeCollatVal)) {
      return `${t('borrow.cannot_gt')} ${maxRemoveCollatVal}`
    }
    else return ''
  }, [maxRemoveCollatVal, removeCollatVal, t])

  const replayValToPart = () => {
    const repayPart = borrowedPart.div(borrowed.plus(interestRate.div(365 * 24).times(borrowed))).times(repayVal)
    return BigNumber.min(repayPart, borrowedPart).decimalPlaces(9, 5).toString()
  }

  const action = async () => {
    if (isValid(repayVal) && isValid(removeCollatVal) && !repayInputError() && !removeCollatInputError()) {
      await submitCook({
        provider,
        poolAddress,
        account,
        actions: [ACTION_TYPE.REPAY, ACTION_TYPE.REMOVE_COLLATERAL],
        repayPart: replayValToPart(),
        repayTo: account,
        removeCollateralAmount: removeCollatVal,
        removeCollateralTo: account,
      })
    }
    else if (isValid(repayVal) && !repayInputError()) {
      // console.log(replayValToPart(), borrowedPart.div(borrowed).toString())
      await submitCook({
        provider,
        poolAddress,
        account,
        actions: [ACTION_TYPE.REPAY],
        repayPart: replayValToPart(),
        repayTo: account,
      })
    }
    else if (isValid(removeCollatVal) && !removeCollatInputError()) {
      await submitCook({
        provider,
        poolAddress,
        account,
        actions: [ACTION_TYPE.REMOVE_COLLATERAL],
        removeCollateralAmount: removeCollatVal,
        removeCollateralTo: account,
      })
    }
    setRepayVal('')
    setRemoveCollatVal('')
  }

  return (
    <StyledCard>
      <CardContent>
        <InputTitle>{t('borrow.repay_wen')}</InputTitle>
        <TokenInput
          value={repayVal}
          onSelectMax={handleRepaySelectMax}
          onChange={handleRepayChange}
          max={maxRepayVal}
          symbol='WEN'
          label={`WEN ${t('borrow.available_to_repay')}`}
          icon={<Coins coins={['WEN']}>WEN</Coins>}
          error={repayInputError()}
        />
        <ArrowSpacer><Icon size={16}><ArrowDown /></Icon></ArrowSpacer>
        <InputTitle>{t('borrow.remove_collateral')}</InputTitle>
        <TokenInput
          value={removeCollatVal}
          onSelectMax={handleRemoveCollatSelectMax}
          onChange={handleRemoveCollatChange}
          max={maxRemoveCollatVal}
          symbol={symbol}
          icon={<Coins coins={[symbol]}>{symbol}</Coins>}
          error={removeCollatInputError()}
          label={`${symbol} ${t('borrow.available_to_withdraw')}`}
        />
        <Spacer />
        {expectedData.map(item => (
          <DataItem
            key={item.name}
            indicator={item.name}
            value={item.value}
          />
        ))}        
      </CardContent>
      <CardAction>
        <StyledButton>
          {account ? <Button
            disabled={txStatus === 'pending' || (!isValid(repayVal) && !isValid(removeCollatVal)) || repayInputError() || removeCollatInputError()}
            text={handleButtonText()}
            onClick={action}
          /> : 
          <Button
            onClick={onPresentWalletProviderModal}
            text={t('wallet.unlock')}
          />}
        </StyledButton>
      </CardAction>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  height: 680px;
  border: 1px solid ${props => props.theme.color.divider};
  display: flex;
  flex-direction: column;
`

const InputTitle = styled.div`
  color: ${(props) => props.theme.color.white};
  font-size: 18px;
  margin-bottom: ${(props) => props.theme.spacing[3]}px;
`

const ArrowSpacer = styled.div`
  color: ${(props) => props.theme.color.grey[200]};
  display: flex;
  justify-content: center;
  padding: 10px;
`

const StyledButton = styled.div`
  flex-basis: 50%;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    flex-basis: 100%;
  }
`

export default Repay