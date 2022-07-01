import React, { useCallback } from 'react'
import styled from 'styled-components'

// import { useWallet } from 'use-wallet'
import useWallet from '../../../hooks/useWallet'

import useModal from '../../../hooks/useModal'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import { formatAddress } from '../../../utils'
import { useTranslation } from 'react-i18next'
import Icon from '../../Icon'
import Disconnect from '../../icons/Disconnect'
import { isSupportedChainId } from '../../../utils/chain'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const { t } = useTranslation()

  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const { account, chainId } = useWallet()

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  // useEffect(() => {
  //   if (window.starcoin && !account) {
  //     connect()
  //   }
  //   handleWrongNetwork()
  // })

  // const handleWrongNetwork = () => {
  //   if (window.starcoin && chainId && chainId !== supportedChainId) {
  //     window.starcoin
  //       .request({
  //         method: 'wallet_switchEthereumChain',
  //         params: [{ chainId: `0x${Number(supportedChainId).toString(16)}` }],
  //       })
  //       .then(() => {
  //         connect()
  //       })
  //       .catch((e: any) => console.error('AccountButton Wrong Network', e))
  //   }
  // }

  return (
    <StyledAccountButton>
      {!chainId || isSupportedChainId(chainId) ? 
        <>
          {!account ? (
            <Button onClick={handleUnlockClick} size="sm" text={t('wallet.unlock')} />
          ) : (
            <Button onClick={onPresentAccountModal} size="sm" text={formatAddress(account)} />
          )}
        </> : 
        <Button onClick={null} size="sm" text="Wrong Network" variant="danger">
          <StyledIcon><Icon size={18}><Disconnect /></Icon></StyledIcon>
        </Button>
      }
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div``

const StyledIcon = styled.div`
  margin-right: 5px;
`

export default AccountButton
