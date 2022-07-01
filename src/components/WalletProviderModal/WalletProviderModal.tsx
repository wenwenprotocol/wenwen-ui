import React, { useEffect } from 'react'
import styled from 'styled-components'
// import { useWallet } from 'use-wallet'
import useWallet from '../../hooks/useWallet'

import starmaskLogo from '../../assets/img/starcoin.svg'

import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'

import WalletCard from './components/WalletCard'
import { useTranslation } from 'react-i18next'
import StarMaskOnboarding from '@starcoin/starmask-onboarding'

const WalletProviderModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const { isStarMaskInstalled } = StarMaskOnboarding

  let onBoarding: StarMaskOnboarding
  try {
    onBoarding = new StarMaskOnboarding()
  } catch (error) {
    console.error(error)
  }

  const { account, connect } = useWallet()

  useEffect(
    () => {
      if (account) {
        onDismiss()
      }
    },
    [account, onDismiss]
  )

  return (
    <Modal>
      <ModalTitle text={t('wallet.select_provider')} />

      <ModalContent>
        <StyledWalletsWrapper>
          <StyledWalletCard>
            {isStarMaskInstalled() ? 
              <WalletCard
                icon={<img src={starmaskLogo} style={{ height: 40 }} alt="Starmask" />}
                onConnect={() => connect()}
                title="Starmask"
              /> : 
              <WalletCard
                icon={<img src={starmaskLogo} style={{ height: 40 }} alt="Starmask" />}
                onConnect={() => { onBoarding.startOnboarding() }}
                title="Click Here To Install Starmask"
              />
            }
          </StyledWalletCard>
        </StyledWalletsWrapper>
      </ModalContent>

      <ModalActions>
        <StyledButton onClick={onDismiss}>{t('cancel')}</StyledButton>
      </ModalActions>
    </Modal>
  )
}

const StyledWalletsWrapper = styled.div``

const StyledWalletCard = styled.div`margin: 10px 0;`

const StyledButton = styled.div`
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
    background: linear-gradient(95.78deg, #41a558 -0.9%, #44a69b 100%);
  }
`

export default WalletProviderModal
