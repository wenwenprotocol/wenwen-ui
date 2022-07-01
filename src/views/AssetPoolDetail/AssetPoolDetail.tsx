import React, { useState, useEffect, useMemo } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Link, Route, Switch, useParams, useRouteMatch, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import usePosition from '../../hooks/usePosition'
import useBorrowInfo from '../../hooks/useBorrowInfo'
import useWallet from '../../hooks/useWallet'

import Page from '../../components/Page'
import Container from '../../components/Container'
import PageHeader from '../../components/PageHeader'
import Coins from '../../components/Coins'
import Icon from '../../components/Icon'
import ArrowLeft from '../../components/icons/ArrowLeft'
import Borrow from './components/Borrow'
import Repay from './components/Repay'
import Position from './components/Position'
import Button from '../../components/Button'
import Spacer from '../../components/Spacer'
import WalletBalance from './components/WalletBalance'
import DataItem from '../../components/DataItem'
import PositionHealth from './components/PositionHealth'
import PoolInfo from './components/PoolInfo'
import Tooltip from '../../components/Tooltip'
import { getAsset } from '../../utils/contract'

const AssetPool: React.FC = () => {
  const { t } = useTranslation()
  const { assetName } = useParams<any>()
  const { path, url } = useRouteMatch()
  const { pathname } = useLocation()
  const { chainId, account } = useWallet()
  const asset = getAsset(assetName, chainId)
  
  const [tabStatus, setTabStatus] = useState('borrow')
  useEffect(() => {
    if (pathname.includes('repay')) {
      setTabStatus('repay')
    }
  }, [pathname])


  const { data: position } = usePosition(assetName)
  const { data: borrowInfo } = useBorrowInfo(asset ? asset.poolAddress : '')

  let liqPrice: BigNumber
  let price: BigNumber
  let leftToBorrow: BigNumber
  let deprecated: boolean
  if (position) {
    ({ liqPrice, price, leftToBorrow, deprecated } = position)
  }

  const positionData = useMemo(() => {
    if (borrowInfo && leftToBorrow && borrowInfo.leftToBorrow.lt(leftToBorrow)) {
      return {
        ...position,
        leftToBorrow: borrowInfo.leftToBorrow,
      }
    }
    else return position
  }, [borrowInfo, leftToBorrow, position])

  return (
    <Page>
      <Helmet>
        <title>{assetName} Pool</title>
      </Helmet>
      <PageHeader>
        <PageHeaderContent>
          <StyledLink to='/borrow'>
            <Icon size={16}><ArrowLeft /></Icon>
            <span>{t('borrow.back')}</span>
          </StyledLink>
          <PageTitle>
            <Coins coins={[asset && asset.symbol]}><h2>{assetName}</h2></Coins>
            {deprecated ? 
              <Tooltip tip={t('borrow.deprecated_tip')} placement='right'>
                <DeprecatedLabel>{t('borrow.deprecated')}</DeprecatedLabel>
              </Tooltip> : null}
          </PageTitle>
        </PageHeaderContent>
      </PageHeader>

      <Container size="lg">
        {asset ? <ContentWrapper>
          <ContentHeader>
            <TabButtons>
              <TabButton>
                <Button 
                  to={url} 
                  text={t('borrow.borrow')} 
                  size='sm' 
                  variant={tabStatus === 'borrow' ? 'default' : 'secondary'}
                  onClick={() => setTabStatus('borrow')}
                />
              </TabButton>
              <TabButton>
                <Button 
                  to={`${url}/repay`} 
                  text={t('borrow.repay')} 
                  size='sm'
                  variant={tabStatus === 'repay' ? 'default' : 'secondary'}
                  onClick={() => setTabStatus('repay')}
                />
              </TabButton>
            </TabButtons>
            <PositionHeader>
              <DataItem
                indicator={t('borrow.position_health')} 
                value={account ? liqPrice && <PositionHealth liqPrice={liqPrice} price={price} displayBar={true} /> : '-'}
              />
            </PositionHeader>                      
          </ContentHeader>
          <ContentDetail>
            <ContentRow>
              <LeftContent>
                <Switch>
                  <Route path={`${path}/`} exact>
                    <Borrow 
                      positionData={positionData}  
                    />
                  </Route>
                  <Route path={`${path}/repay`}>
                    <Repay 
                      positionData={positionData}
                    />
                  </Route>
                </Switch>
              </LeftContent>
              <RightContent>
                <Position
                  assetSymbol={asset.symbol}
                  positionData={positionData}
                />
              </RightContent>
            </ContentRow>
            <Spacer />
            <ContentRow>
              <LeftContent>
                <WalletBalance assetName={assetName} />
              </LeftContent>
              <RightContent>
                <PoolInfo
                  poolData={positionData}
                />
              </RightContent>
            </ContentRow>
          </ContentDetail>
        </ContentWrapper> : null}
      </Container>
    </Page>
  )
}

const PageHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const PageTitle = styled.div`
  color: ${props => props.theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: ${(props) => props.theme.spacing[2]}px;
`

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.grey[200]};
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[50]};
  }
  span {
    margin-left: 5px;
  }
  width: 100px;
`

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 150px;
  }
`

const ContentDetail = styled.div``

const ContentRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
  }
`

const LeftContent = styled.div`
  flex-basis: 60%;
`

const RightContent = styled.div`
  flex-basis: 38%;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    margin-top: 24px;
  }
`

const TabButtons = styled.div`
  display: flex;
  flex-basis: 30%;
  justify-content: space-between;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    width: 80%;
    flex-basis: auto;
  }
`

const TabButton = styled.div`
  flex-basis: 47%;
`

const PositionHeader = styled.div`
  flex-basis: 38%;
  height: 70px;
  width: 100%;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    flex-basis: auto;
  }
`

const DeprecatedLabel = styled.div`
  display: flex;
  font-family: 'Roboto', 'Noto Sans', sans-serif;
  padding: 5px 7px;
  margin-left: 15px;
  height: 20px;
  font-size: 12px;
  align-items: center;
  color: #EF4444;
  background-color: rgba(239, 68, 68, 0.1);
  border: solid 1px rgba(239, 68, 68, 0.2);
`

export default AssetPool