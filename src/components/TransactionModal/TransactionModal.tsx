import React, { useEffect, useContext, useMemo } from 'react'
import { Context } from '../../contexts/Transaction'
import styled from 'styled-components'
import useWallet from '../../hooks/useWallet'
import Modal, { ModalProps } from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import Spinner from '../Spinner'
import Icon from '../Icon'
import Check from '../icons/Check'
import { useTranslation } from 'react-i18next'

const TransactionModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const { account } = useWallet()
  const { txStatus } = useContext(Context)

  useEffect(
    () => {
      if (!account) {
        onDismiss()
      }
    },
    [account, onDismiss]
  )

  const content = useMemo(() => {
    switch (txStatus) {
      case 'pending':
        return <><Spinner size={120}/><TxStatus>{t('transaction.pending')}</TxStatus></>
      case 'submitted':
        return <><Icon size={120}><Check /></Icon><TxStatus>{t('transaction.submitted')}</TxStatus></>
      case 'rejected':
        return <TxStatus>{t('transaction.rejected')}</TxStatus>
    }
  }, [txStatus, t])

  return (
    <Modal>
      <ModalContent>
        <TxContent>{content}</TxContent>
      </ModalContent>
      <ModalActions>
        <StyledButton onClick={onDismiss}>{t('dismiss')}</StyledButton>
      </ModalActions>
    </Modal>
  )
}

const TxContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 200px;
  color: ${props => props.theme.color.primary.main};
`

const TxStatus = styled.div`
  font-size: 24px;
  color: #fff;
`

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

export default TransactionModal
