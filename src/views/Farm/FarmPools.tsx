import React from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import Container from '../../components/Container'
import PageHeader from '../../components/PageHeader'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import useWallet from '../../hooks/useWallet'
import useSharePrice from '../../hooks/useSharePrice'
import useStcPrice from '../../hooks/useStcPrice'
import FarmPool from './components/FarmPool'
import { getFarmPools } from '../../utils/contract'

const AssetPools: React.FC = () => {
  const { t } = useTranslation()
  const { chainId } = useWallet()
  const farmPools = getFarmPools(chainId)
  const { data: sharePrice } = useSharePrice()
  const { data: stcPrice } = useStcPrice()

  return (
    <Page>
      <Helmet>
        <title>Farm</title>
      </Helmet>
      <PageHeader title={t('farm.title')} subtitle={t('farm.subtitle')}/>
      <Container size="lg">
        <PoolContainer>
          {farmPools.map(pool => (
            <FarmPool data={pool} key={pool.name} sharePrice={sharePrice} inputTokenPrice={stcPrice}/>
          ))}
        </PoolContainer>
      </Container>
    </Page>
  )
}

const PoolContainer = styled.div`
  width: 100%;
`

export default AssetPools