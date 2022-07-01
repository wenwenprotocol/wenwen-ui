import { useContext, useMemo } from 'react'
import { Context as WalletContext } from '../contexts/Wallet' 

const useWallet = () => {
  const walletContext = useContext(WalletContext)

  if (walletContext === null) {
    throw new Error(
      'useWallet() can only be used inside of <WalletProvider />, ' +
        'please declare it at a higher level.'
    )
  }

  const { wallet } = walletContext

  return useMemo(() => {
    return { ...wallet }
  }, [wallet])
}

export default useWallet