import React from 'react'
import styled from 'styled-components'
import Coins from '../../../components/Coins'
import { useTranslation } from 'react-i18next'

interface FarmPoolAssetProps {
  name: string
  source: string
  inputTokenSymbol: string
  inputTokenAddress: string
  outputTokenSymbol: string
  outputTokenAddress: string
  baseLink: string
}

const FarmPoolAsset: React.FC<FarmPoolAssetProps> = ({ 
  name,
  source,
  inputTokenSymbol,
  inputTokenAddress,
  outputTokenSymbol,
  outputTokenAddress,
  baseLink,
}) => {
  const { t } = useTranslation()

  const href = source === 'StarSwap' ? `${baseLink}/${inputTokenAddress}/${outputTokenAddress}` : baseLink

  return (
    <PoolAsset>
      <Coins coins={[inputTokenSymbol, outputTokenSymbol]} />
      <PoolAssetInfo>
        <AssetName>{name}</AssetName>
        <SourceName>{t('farm.source')}: {source}</SourceName>
        <StyledLink target="_blank" href={href}>
          {t('farm.add_liquidity')}
        </StyledLink>
      </PoolAssetInfo>
    </PoolAsset>
  )
}

const PoolAsset = styled.div`
  display: flex;
  align-items: center;
`

const PoolAssetInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const AssetName = styled.div``

const SourceName = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
  font-family: 'Roboto', 'Noto Sans', sans-serif;
  font-size: 14px;
  margin-top: 5px;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[200]};
  text-decoration: none;
  font-family: 'Roboto', 'Noto Sans', sans-serif;
  font-size: 16px;
  margin-top: 5px;
  &:hover {
    color: ${(props) => props.theme.color.grey[50]};
  }
`

export default FarmPoolAsset