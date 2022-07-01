import React, { useState, useEffect, useCallback, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'react-i18next'
import useWallet from '../../../hooks/useWallet'
import useStarcoinProvider from '../../../hooks/useStarcoinProvider'
import useTokenInput from '../../../hooks/useTokenInput'
import useModal from '../../../hooks/useModal'
import useTxModal from '../../../hooks/useTxModal'
import TransactionModal from '../../../components/TransactionModal'

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

import { getStaking } from '../../../utils/contract'
import { mint } from '../../../utils/staking'
import { StakingProps } from '../types'
import { isValid } from '../../../utils'

const Stake: React.FC<StakingProps> = ({ shareBalance, exchangeRate, onSwitch }) => {
  const { t } = useTranslation()
  const { account, chainId } = useWallet()
  const provider = useStarcoinProvider()
  const stakingAddress = getStaking(chainId)

  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  const { 
    val: stakeVal,
    maxVal: maxStakeVal,
    setVal: setStakeVal,
    setMaxVal: setMaxStakeVal,
    handleInputChange: handleStakeChange,
    handleSelectMax: handleStakeSelectMax
  } = useTokenInput()

  const [expectedVal, setExpectedVal] = useState('')

  useEffect(() => {
    setMaxStakeVal(shareBalance ? shareBalance.toString() : '0')
  }, [shareBalance, setMaxStakeVal])

  const expectedSShare = useMemo(() => {
    if (exchangeRate && stakeVal) {
      return new BigNumber(stakeVal).div(exchangeRate).decimalPlaces(9, 5).toString()
    } 
    else return ''
  }, [stakeVal, exchangeRate])

  useEffect(() => {
    setExpectedVal(expectedSShare)
  }, [expectedSShare, setExpectedVal])

  const stakeInputError = useCallback(() => {
    if (shareBalance && shareBalance.lt(stakeVal)) {
      return t('stake.insufficient_bal')
    }
    else return ''
  }, [shareBalance, stakeVal, t])

  const [txStatus, stake] = useTxModal(mint, <TransactionModal />)

  const onStake = async () => {
    if (isValid(stakeVal) && !stakeInputError()) {
      await stake(provider, stakingAddress, account, stakeVal)
      setStakeVal('')
    }
  }


  const handleButtonText = useCallback(() => {
    if (txStatus === 'pending') return t('pending')
    if (stakeVal) return t('stake.stake')
    else return t('borrow.enter')
  }, [txStatus, stakeVal, t])

  return (
    <Card height={650}>
      <CardTitle text={t('stake.stake_share')}/>
      <CardContent>
        <TokenInput
          value={stakeVal}
          onSelectMax={handleStakeSelectMax}
          onChange={handleStakeChange}
          max={maxStakeVal}
          symbol='SHARE'
          label={`SHARE ${t('stake.wallet_balance')}`}
          icon={<Coins coins={['SHARE']}>SHARE</Coins>}
          error={stakeInputError()}
        />
        <InputSwicher>
          <ArrowButton onClick={onSwitch}>
            <Icon size={24}><SwitchVertical /></Icon>
          </ArrowButton>        
        </InputSwicher>
        <TokenInput
          value={expectedVal}
          onChange={() => {}}
          symbol='sSHARE'
          label={`sSHARE ${t('stake.wallet_balance')}`}
          icon={<Coins coins={['sSHARE']}>sSHARE</Coins>}
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
            disabled={txStatus === 'pending' || !isValid(stakeVal) || stakeInputError()}
            text={handleButtonText()}
            onClick={onStake}
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

export default Stake