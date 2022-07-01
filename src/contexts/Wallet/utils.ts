export const requestAccounts = async (): Promise<string[]> => {
  return window.starcoin.request({
    method: 'stc_requestAccounts',
  })
}

export const getAccounts = async (): Promise<string[]> => {
  return window.starcoin.request({
    method: 'stc_accounts',
  })
}

export const getChainId = async (): Promise<{ id: number }> => {
  return window.starcoin.request({
    method: 'chain.id',
  })
}

export const onChainChanged = (callback: (id: string) => void) => {
  window.starcoin.on('chainChanged', callback)
}

export const onAccountsChanged = (callback: (accounts: string[]) => void) => {
  window.starcoin.on('accountsChanged', callback)
}