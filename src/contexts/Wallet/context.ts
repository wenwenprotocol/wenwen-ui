import { createContext } from 'react'
import { Wallet } from './types'

interface WalletContext {
  wallet: Wallet
} 

const context = createContext<WalletContext>({
  wallet: null
})

export default context
