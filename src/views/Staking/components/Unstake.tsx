import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import useWallet from '../../../hooks/useWallet'
import useStarcoinProvider from '../../../hooks/useStarcoinProvider'
import useTokenInput from '../../../hooks/useTokenInput'
import useModal from '../../../hooks/useModal'
import useTxModal from '../../../hooks/useTxModal'

import Card from '../../../components/Card'
import CardTitle from '../../../components/CardTitle'
import CardContent from '../../../components/CardContent'
import CardAction from '../../../components/CardAction'
import TokenInput from '../../../components/TokenInput'
import WalletProviderModal from '../../../components/WalletProviderModal'
import Coins from '../../../components/Coins'
import Icon from '../../../components/Icon'
import SwitchVertical from '../../../components/icons/SwitchVertical'
import Button from '../../../components/Button'
import { ArrowButton, Tip, StyledButton, InputSwicher } from './Styled'
import TransactionModal from '../../../components/TransactionModal'

import { getStaking } from '../../../utils/contract'
import { burn } from '../../../utils/staking'
import { StakingProps } from '../types'
import { isValid } from '../../../utils'

const Unstake: React.FC<StakingProps> = ({ sShareBalance, exchangeRate, onSwitch }) => {
  const { t } = useTranslation()
  const { account, chainId } = useWallet()
  const provider = useStarcoinProvider()
  const stakingAddress = getStaking(chainId)

  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  const { 
    val: unstakeVal,
    maxVal: maxUnstakeVal,
    setVal: setUnstakeVal,
    setMaxVal: setMaxUnstakeVal,
    handleInputChange: handleUnstakeChange,
    handleSelectMax: handleUnstakeSelectMax
  } = useTokenInput()

  const [expectedVal, setExpectedVal] = useState('')

  useEffect(() => {
    setMaxUnstakeVal(sShareBalance ? sShareBalance.toString() : '0')
  }, [sShareBalance, setMaxUnstakeVal])

  const expectedShare = useMemo(() => {
    if (exchangeRate && unstakeVal) {
      return exchangeRate.times(unstakeVal).decimalPlaces(9, 5).toString()
    } 
    else return ''
  }, [unstakeVal, exchangeRate])

  useEffect(() => {
    setExpectedVal(expectedShare)
  }, [expectedShare, setExpectedVal])

  const [txStatus, submitBurn] = useTxModal(burn, <TransactionModal />)

  const handleButtonText = useCallback(() => {
    if (txStatus === 'pending') return t('pending')
    if (unstakeVal) return t('stake.unstake')
    else return t('borrow.enter')
  }, [txStatus, unstakeVal, t])

  const unstakeInputError = useCallback(() => {
    if (sShareBalance && sShareBalance.lt(unstakeVal)) {
      return t('stake.insufficient_bal')
    }
    else return ''
  }, [sShareBalance, unstakeVal, t])

  const unstake = async () => {
    if (isValid(unstakeVal) && !unstakeInputError()) {
      await submitBurn(provider, stakingAddress, account, unstakeVal)
      setUnstakeVal('')
    }
  }


  return (
    <Card height={650}>
      <CardTitle text={t('stake.unstake_share')}/>
      <CardContent>
        <TokenInput
          value={unstakeVal}
          onSelectMax={handleUnstakeSelectMax}
          onChange={handleUnstakeChange}
          max={maxUnstakeVal}
          symbol='sSHARE'
          label={`sSHARE ${t('stake.wallet_balance')}`}
          icon={<Coins coins={['sSHARE']}>sSHARE</Coins>}
          error={unstakeInputError()}
        />
        <InputSwicher>
          <ArrowButton onClick={onSwitch}>
            <Icon size={24}><SwitchVertical /></Icon>
          </ArrowButton>        
        </InputSwicher>
        <TokenInput
          value={expectedVal}
          onChange={() => {}}
          symbol='SHARE'
          label={`SHARE ${t('stake.wallet_balance')}`}
          icon={<Coins coins={['SHARE']}>SHARE</Coins>}
          disabled={true}
        />
        <Tip>
          <p>{t('stake.sshare_tip')}</p>
          <p>{t('stake.lock_tip')}</p>
        </Tip>
      </CardContent>
      <CardAction>
        <StyledButton>
          {account ? <Button
            disabled={txStatus === 'pending' || !isValid(unstakeVal) || unstakeInputError()}
            text={handleButtonText()}
            onClick={unstake}
          /> :
          <Button
            onClick={onPresentWalletProviderModal}
            text={t('wallet.unlock')}
          />}
        </StyledButton>
      </CardAction>
    </Card>
  )
}

export default Unstake