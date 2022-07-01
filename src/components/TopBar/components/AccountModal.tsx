import React, { useCallback } from 'react'
import styled from 'styled-components'
import useWallet from '../../../hooks/useWallet'

import useTokenBalance from '../../../hooks/useTokenBalance'
import Button from '../../Button'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import Coins from '../../Coins'

import { useTranslation } from 'react-i18next'
import { getWen, getGovTokens } from '../../../utils/contract'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const { account, reset, explorerUrl, chainId } = useWallet()
  const wenAddress = getWen(chainId)
  const { share: shareAddress, sShare: sShareAddress } = getGovTokens(chainId)


  const handleSignOutClick = useCallback(() => {
    reset()
    onDismiss!()
  }, [onDismiss, reset])

  const { data: wenBalance } = useTokenBalance(wenAddress)
  const { data: shareBalance } = useTokenBalance(shareAddress)
  const { data: sShareBalance } = useTokenBalance(sShareAddress)
  const tokenBalances = chainId === 251 ? [
    { name: 'WEN', balance: wenBalance },
    { name: 'SHARE', balance: shareBalance },
    { name: 'sSHARE', balance: sShareBalance },
  ] : [
    { name: 'WEN', balance: wenBalance },
  ]

  return (
    <Modal>
      <ModalTitle text={t('wallet.my_account')} />
      <ModalContent>
        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            {tokenBalances.length ?
              tokenBalances.map(({ name, balance }) => (
                <StyledBalanceItem key={name}>
                  <StyledBalance key={name}>
                    <StyledText>{`${name} ${t('wallet.balance')}`}</StyledText>
                    <StyledValue>
                      <Coins coins={[name]} />
                      <Spacer width="5px"/>
                      <Value value={balance ? balance.toNumber() : 0} />
                    </StyledValue>
                  </StyledBalance>
                  {/* <StyledAction>
                    <Button 
                      onClick={() => {
                        return addTokenToWallet({
                          address: address,
                          symbol: name,
                          decimals: 9,
                          image: tokenImages[name],
                        })
                      }}
                      size="sm" 
                      text={t('wallet.add_to_wallet')} 
                      variant="secondary" 
                    />
                  </StyledAction>                  */}
                </StyledBalanceItem>
              )) : null
            }
          </StyledBalanceWrapper>
        </div>
        <Spacer />
        <Button
          href={`${explorerUrl}/address/${account}`}
          text={t('wallet.view')}
        />
        {/* <Button text="send STC" onClick={() => sendSTC()}/> */}

      </ModalContent>
      <ModalActions>
        <StyledBtns>
          <StyledButton onClick={onDismiss}>{t('cancel')}</StyledButton>
          <StyledButton onClick={handleSignOutClick}>{t('wallet.sign_out')}</StyledButton>
        </StyledBtns>
      </ModalActions>
    </Modal>
  )
}

const StyledValue = styled.div`
  display: flex;
  align-items: center;
`

const StyledBalanceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`

// const StyledAction = styled.div`
//   flex-basis: 30%;
// `

const StyledBalance = styled.div`
  align-items: start;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

const StyledBtns = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledButton = styled.div`
  flex-basis: 45%;
  border: 1px solid #41a558;
  font-size: 16px;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 48px;
  cursor: pointer;
  margin: 0 24px;

  &:hover {
    background: linear-gradient(95.78deg, #41A558 -0.9%, #44A69B 100%);
  }
`

const StyledText = styled.div`
  font-size: 12px;
  color: #A8B0C1;
  line-height: 24px;
`


export default AccountModal
