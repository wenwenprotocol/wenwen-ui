import React from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import Container from '../../components/Container'
import PageHeader from '../../components/PageHeader'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Link, useRouteMatch } from 'react-router-dom'
import AssetPool from './components/AssetPool'
import { getAssets } from '../../utils/contract'
import useWallet from '../../hooks/useWallet'

const AssetPools: React.FC = () => {
  const { t } = useTranslation()
  const { url } = useRouteMatch()
  const { chainId } = useWallet()
  const assets = getAssets(chainId)
  
  return (
    <Page>
      <Helmet>
        <title>Borrow</title>
      </Helmet>
      <PageHeader title={t('borrow.title')} subtitle={t('borrow.subtitle')}/>
      <Container size="lg">
        <PoolContainer>
          {assets.map(({ symbol, poolAddress, name }) => (
            <StyledLink to={`${url}borrow/${name}`} key={name}>
              <AssetPool symbol={symbol} poolAddress={poolAddress} name={name} />
            </StyledLink>
          ))}
        </PoolContainer>
      </Container>
    </Page>
  )
}

const PoolContainer = styled.div`
  width: 100%;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

export default AssetPools