import { useCallback, useContext } from 'react'
import useModal from './useModal'
import { Context } from '../contexts/Transaction'
import { TransactionStatus } from '../contexts/Transaction/Transaction'

interface ActionFn {
  (...args: any[]): Promise<string | void>
}

const useTxModal = <T extends ActionFn>(fn: T, modal: React.ReactNode): [TransactionStatus, T] => {
  const [onPresentTxModal, onDismiss] = useModal(modal, 'txModal')
  const { txStatus, handleStatus } = useContext(Context)

  const submitTransaction = useCallback<any>(async (...args: any[]) => {
    handleStatus('pending')
    onPresentTxModal()
    try {
      const txHash = await fn(...args)
      handleStatus('submitted')
      return txHash
    }
    catch (e) {
      console.error(e)
      handleStatus('rejected')
      onDismiss()
    }
  }, [fn, onPresentTxModal, onDismiss, handleStatus])

  return [txStatus, submitTransaction]
}

export default useTxModal
