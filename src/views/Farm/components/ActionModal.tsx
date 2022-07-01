import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect } from 'react'
import useTokenInput from '../../../hooks/useTokenInput'
import useTxModal from '../../../hooks/useTxModal'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import ModalContent from '../../../components/ModalContent'
import TokenInput from '../../../components/TokenInput'
import TransactionModal from '../../../components/TransactionModal'
import { useTranslation } from 'react-i18next'
import { isValid } from '../../../utils'

interface ActionModalProps extends ModalProps {
  title: string
  max: BigNumber
  onConfirm: (amount: string) => Promise<string | void>
  tokenName?: string,
}

const ActionModal: React.FC<ActionModalProps> = ({
  max,
  onConfirm,
  onDismiss,
  title,
  tokenName = ''
}) => {
  const { t } = useTranslation()

  const {
    val,
    maxVal,
    setMaxVal,
    handleInputChange,
    handleSelectMax,
  } = useTokenInput()

  const inputError = useCallback(() => {
    if (new BigNumber(maxVal).lt(val)) {
      return `${t('farm.cannot_gt')} ${maxVal}`
    }
    else return ''
  }, [maxVal, val, t])


  const [txStatus, confirm] = useTxModal(onConfirm, <TransactionModal />)

  const handleConfirm = async () => {
    if (isValid(val) && !inputError()) {
      const txHash = await confirm(val)
      return txHash
    }
  }

  useEffect(() => {
    setMaxVal(max.toString())
  }, [max, setMaxVal])

  return (
    <Modal>
      <ModalTitle text={title} />
      <ModalContent>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleInputChange}
          max={maxVal}
          symbol={tokenName}
          error={inputError()}
        />
        <ModalActions>
          <Button text={t('cancel')} variant="secondary" onClick={onDismiss} />
          <Button
            disabled={!isValid(val) || !!inputError() || txStatus === 'pending'}
            text={txStatus === 'pending' ? t('pending') : t('confirm')}
            onClick={handleConfirm}
          />
        </ModalActions>
      </ModalContent>
    </Modal>
  )
}


export default ActionModal
