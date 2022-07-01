import React, { createContext, useCallback, useState } from 'react'

export type TransactionStatus = 'pending' | 'submitted' | 'rejected' | undefined

interface TransactionContext {
  txStatus: TransactionStatus
  handleStatus: (status: TransactionStatus) => void
}

export const Context = createContext<TransactionContext>({
  txStatus: undefined,
  handleStatus: (status: TransactionStatus) => {}
})

const Transaction: React.FC = ({ children }) => {
  const [txStatus, setTxStatus] = useState<TransactionStatus>()

  const handleStatus = useCallback((status: TransactionStatus) => {
    setTxStatus(status)
  }, [setTxStatus])

  return (
    <Context.Provider value={{
      txStatus,
      handleStatus,
    }}>
      {children}
    </Context.Provider>
  )
}

export default Transaction