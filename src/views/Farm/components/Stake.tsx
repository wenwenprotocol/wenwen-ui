import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'

import Button from '../../../components/Button'
import IconButton from '../../../components/IconButton'
import Value from '../../../components/Value'
import WalletProviderModal from '../../../components/WalletProviderModal'

import useWallet from '../../../hooks/useWallet'
import useModal from '../../../hooks/useModal'
import useTxModal from '../../../hooks/useTxModal'

import ActionModal from './ActionModal'
import Spacer from '../../../components/Spacer'
import TransactionModal from '../../../components/TransactionModal'
import { useTranslation } from 'react-i18next'

interface StakeProps {
  tokenName: string
  tokenBalance: BigNumber
  stakedBalance: BigNumber
  onStake: (amount: string) => Promise<string | void>
  onUnstake: (amount: string) => Promise<string | void>
  onClick?: () => void
}

const Stake: React.FC<StakeProps> = ({ 
  tokenName,
  tokenBalance,
  stakedBalance,
  onStake,
  onUnstake,
  onClick,
}) => {
  const { t } = useTranslation()

  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  const [txStatus, stake] = useTxModal(onStake, <TransactionModal />)


  const [onPresentDeposit] = useModal(
    <ActionModal
      max={tokenBalance}
      onConfirm={stake}
      tokenName={tokenName}
      title={t('farm.deposit_token', { tokenName })}
    />,
    'depositModal'
  )

  const [onPresentWithdraw] = useModal(
    <ActionModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={tokenName}
      title={t('farm.withdraw_token', { tokenName })}
    />,
    'withdrawModal'
  )

  return (
    <StyledMod>
      <StyledModBd onClick={onClick}>
        <StyledDesc>{`${t('farm.your_staked')} ${tokenName}`}</StyledDesc>
        <StyledValue>
          <Value value={stakedBalance ? stakedBalance.toNumber() : 0} />
        </StyledValue>         
      </StyledModBd>
      <StyledModFt>
        {!!account ? 
          <>
            {<StyledBtns>
              <Button
                disabled={!stakedBalance || stakedBalance.isZero() || txStatus === 'pending'}
                text={t('farm.unstake')}
                onClick={onPresentWithdraw}
              />
              <Spacer width="10%"/>
              <IconButton onClick={onPresentDeposit}>
                +
              </IconButton>
            </StyledBtns>}
          </> : 
          <Button
            onClick={onPresentWalletProviderModal}
            text={t('wallet.unlock')}
          />}
      </StyledModFt>
    </StyledMod>
  )
}

const StyledMod = styled.div``

const StyledModBd = styled.div``

const StyledDesc = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #A8B0C1;
  margin-bottom: 10px;
`

const StyledValue = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
`

const StyledModFt = styled.div`
  margin-top: 20px;
`

const StyledBtns = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default Stake
