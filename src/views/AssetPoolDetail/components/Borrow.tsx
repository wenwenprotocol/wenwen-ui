import React, { useEffect, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'react-i18next'
import useWallet from '../../../hooks/useWallet'
import useStarcoinProvider from '../../../hooks/useStarcoinProvider'
import useTokenInput from '../../../hooks/useTokenInput'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useModal from '../../../hooks/useModal'
import useTxModal from '../../../hooks/useTxModal'
import useBorrowInfo from '../../../hooks/useMinBorrow'

import { PoolData, PositionData } from '../types'
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

import { getAsset } from '../../../utils/contract'
import { cook } from '../../../utils/lendingPool'
import { ACTION_TYPE } from '../../../constants/variables'
import { isValid } from '../../../utils'
interface BorrowProps {
  positionData: PositionData & PoolData
}

const Borrow: React.FC<BorrowProps> = ({ positionData }) => {
  const { assetName } = useParams<any>()
  const { account, chainId } = useWallet()
  const { poolAddress, tokenAddress, symbol } = getAsset(assetName, chainId)
  const provider = useStarcoinProvider()
  const { t } = useTranslation()

  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  let collatRate: BigNumber
  let liqThreshold: BigNumber
  let collateral: BigNumber
  let collatVal: BigNumber
  let borrowed: BigNumber
  let price: BigNumber
  let borrowFee: BigNumber
  let interestRate: BigNumber
  let totalLeftToBorrow: BigNumber
  let deprecated: boolean
  if (positionData) {
    ({ collatRate, collateral, collatVal, borrowed, price, borrowFee, interestRate, liqThreshold, deprecated, totalLeftToBorrow } = positionData)
  }

  const { data: tokenBalance } = useTokenBalance(tokenAddress)
  const { data: minBorrow } = useBorrowInfo(poolAddress)

  const { 
    val: depositVal,
    maxVal: maxDepositVal,
    setVal: setDepositVal,
    setMaxVal: setMaxDepositVal,
    handleInputChange: handleDepositChange,
    handleSelectMax: handleDepositSelectMax,
  } = useTokenInput()

  const { 
    val: borrowVal,
    maxVal: maxBorrowVal,
    setVal: setBorrowVal,
    setMaxVal: setMaxBorrowVal,
    handleInputChange: handleBorrowChange,
  } = useTokenInput()

  // wallet balance
  const tokenBalanceVal = useMemo(() => { 
    return tokenBalance ? BigNumber.max(tokenBalance.minus(0.05), 0).toString() : '0'
  }, [tokenBalance])

  useEffect(() => {
    setMaxDepositVal(tokenBalanceVal)
  }, [tokenBalanceVal, setMaxDepositVal])

  // max to borrow
  const maxBorrowAmount = useMemo(() => {
    if (positionData) {
      return !deprecated ? BigNumber.min(BigNumber.max(collatVal.plus(price.times(depositVal || 0))
              .times(collatRate).minus(borrowed)
              .times(new BigNumber(1).minus(borrowFee)), 0), totalLeftToBorrow) : new BigNumber(0) // minus borrow fee
    }
    else return new BigNumber(0)
  }, [collatVal, price, depositVal, collatRate, borrowed, borrowFee, deprecated, totalLeftToBorrow, positionData]) 

  useEffect(() => {
    setMaxBorrowVal(maxBorrowAmount.decimalPlaces(9, 5).toString())
  }, [maxBorrowAmount, setMaxBorrowVal])

  // set a smaller value when select max because available to borrow value decreases along with the time
  const scaledMaxBorrowVal = useMemo(() => {
    if (interestRate && borrowed) {
      const interest = interestRate.div(365 * 24).times(borrowed)
      const scaledMaxVal = maxBorrowAmount.minus(interest)
      return BigNumber.max(scaledMaxVal, 0).decimalPlaces(9, 5).toString()
    }
    else return '0'
  }, [maxBorrowAmount, interestRate, borrowed])

  const handleBorrowSelectMax = () => {
    setBorrowVal(scaledMaxBorrowVal)
  }

  // calculate expected number when there is a valid input
  const expectedWenBorrowed = useMemo(() => { 
    return borrowed &&  borrowFee ? borrowed.plus(borrowFee.plus(1).times(borrowVal || 0)) : new BigNumber(0)
  }, [borrowed, borrowVal, borrowFee])

  const expectedLiqPrice = useMemo(() => {
    if (collateral && liqThreshold) {
      const expectedCollatVal = collateral.plus(depositVal || 0)
      return expectedWenBorrowed.div(expectedCollatVal.times(liqThreshold))
    }
    else return new BigNumber(0)
  }, [depositVal, collateral, liqThreshold, expectedWenBorrowed])

  const expectedData = [
    { name: t('borrow.wen_amount'), value: `$${expectedWenBorrowed.toFormat(4)}` },
    { name: t('borrow.expected_liq_price'), value: `$${!expectedLiqPrice.isNaN() ? expectedLiqPrice.toFormat(4): '0'}` },
    { name: t('borrow.expected_position_health'), value: <PositionHealth liqPrice={expectedLiqPrice} price={price} /> },
  ]
  
  const [txStatus, submitCook] = useTxModal(cook, <TransactionModal />)

  const handleButtonText = useCallback(() => {
    if (txStatus === 'pending') return t('pending')
    if (depositVal && borrowVal) return t('borrow.add_and_borrow')
    else if (depositVal) return t('borrow.add_collateral')
    else if (borrowVal) return t('borrow.borrow')
    else return t('borrow.enter')
  }, [txStatus, depositVal, borrowVal, t])

  const depositInputError = useCallback(() => {
    if (tokenBalance && tokenBalance.lt(depositVal)) {
      return t('borrow.insufficient_bal')
    }
    else if (new BigNumber(maxDepositVal).lt(depositVal)) {
      return `${t('borrow.cannot_gt')} ${maxDepositVal}`
    }
    else return ''
  }, [tokenBalance, maxDepositVal, depositVal, t])

  const borrowInputError = useCallback(() => {
    if (new BigNumber(maxBorrowVal).lt(borrowVal)) {
      return `${t('borrow.cannot_gt')} ${maxBorrowVal}`
    }
    else if (minBorrow && minBorrow.gt(borrowVal)) {
      return `${t('borrow.cannot_lt')} ${minBorrow.toFixed(2)}`
    }
    else return ''
  }, [maxBorrowVal, borrowVal, minBorrow, t])

  const action = async () => {
    if (isValid(depositVal) && isValid(borrowVal) && !depositInputError() && !borrowInputError()) {
      await submitCook({
        provider,
        poolAddress,
        account,
        actions: [ACTION_TYPE.ADD_COLLATERAL, ACTION_TYPE.BORROW],
        collateralAmount: depositVal,
        borrowAmount: borrowVal,
        borrowTo: account,
      })
    }
    else if (isValid(depositVal) && !depositInputError()) {
      await submitCook({
        provider,
        poolAddress,
        account,
        actions: [ACTION_TYPE.ADD_COLLATERAL],
        collateralAmount: depositVal
      })
    }
    else if (isValid(borrowVal) && !borrowInputError()) {
      await submitCook({
        provider,
        poolAddress,
        account,
        actions: [ACTION_TYPE.BORROW],
        borrowAmount: borrowVal,
        borrowTo: account,
      })
    }
    setDepositVal('')
    setBorrowVal('')
  }

  return (
    <StyledCard>
      <CardContent>
        <InputTitle>{t('borrow.deposit_collateral')}</InputTitle>
        <TokenInput
          value={depositVal}
          onSelectMax={handleDepositSelectMax}
          onChange={handleDepositChange}
          max={maxDepositVal}
          symbol={symbol}
          label={`${symbol} ${t('borrow.available_to_deposit')}`}
          icon={<Coins coins={[symbol]}>{symbol}</Coins>}
          error={depositInputError()}
        />
        <ArrowSpacer><Icon size={16}><ArrowDown /></Icon></ArrowSpacer>
        <InputTitle>{t('borrow.borrow_wen')}</InputTitle>
        <TokenInput
          value={borrowVal}
          onSelectMax={handleBorrowSelectMax}
          onChange={handleBorrowChange}
          max={maxBorrowVal}
          symbol='WEN'
          label={t('borrow.available_to_borrow')}
          icon={<Coins coins={['WEN']}>WEN</Coins>}
          error={borrowInputError()}
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
            disabled={txStatus === 'pending' || (!isValid(depositVal) && !isValid(borrowVal)) || depositInputError() || borrowInputError() || deprecated}
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

export default Borrow