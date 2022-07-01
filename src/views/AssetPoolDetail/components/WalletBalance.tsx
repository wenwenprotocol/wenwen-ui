import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import useWallet from '../../../hooks/useWallet'
import useTokenBalance from '../../../hooks/useTokenBalance'
import DataItem from '../../../components/DataItem'
import CardTitle from '../../../components/CardTitle'
import CardContent from '../../../components/CardContent'
import Coins from '../../../components/Coins'
import { getAsset, getWen } from '../../../utils/contract'

interface WalletBalanceProps {
  assetName: string
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ assetName })=> {
  const { t } = useTranslation()
  const { chainId, account } = useWallet()
  const { tokenAddress, symbol } = getAsset(assetName, chainId)
  const wenAddress = getWen(chainId)

  const { data: assetBalance } = useTokenBalance(tokenAddress)
  const { data: wenBalance } = useTokenBalance(wenAddress)

  return (
    <StyledCard>
      <CardTitle text={t('borrow.wallet_balance')} />
      <CardContent>
        <DataItem
          indicator={<Coins coins={[symbol]}>{symbol}</Coins>}
          value={account ? assetBalance && assetBalance.toFormat(4) : '-'}
        />
        <DataItem
          indicator={<Coins coins={['WEN']}>WEN</Coins>}
          value={account ? wenBalance && wenBalance.toFormat(4) : '-'}
        />
      </CardContent>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  height: 350px;
  border: 1px solid ${props => props.theme.color.divider};
  display: flex;
  flex-direction: column;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    height: 260px;
  }
`
export default WalletBalance