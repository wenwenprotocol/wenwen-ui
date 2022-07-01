import React, { useMemo } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

import useAllPositions from '../../hooks/useAllPositions'
import useWallet from '../../hooks/useWallet'
import useModal from '../../hooks/useModal'

import Page from '../../components/Page'
import Container from '../../components/Container'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/Card'
import CardTitle from '../../components/CardTitle'
import CardContent from '../../components/CardContent'
import Value from '../../components/Value'
import Coins from '../../components/Coins'
import PostionHealth from '../AssetPoolDetail/components/PositionHealth'
import DataItem from '../../components/DataItem'
import Button from '../../components/Button'
import CardAction from '../../components/CardAction'
import Tooltip from '../../components/Tooltip'
import WalletProviderModal from '../../components/WalletProviderModal'
import Spinner from '../../components/Spinner'

const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

  const { data: allPositions } = useAllPositions()

  const openPositions= useMemo(() => {
    return allPositions ? allPositions.filter(pos => pos.borrowed.gt(0.01) || pos.collatVal.gt(0.01)) : []
  }, [allPositions])

  const totalCollatVal= useMemo(() => {
    return openPositions.reduce((total, pos) => total.plus(pos.collatVal), new BigNumber(0))
  }, [openPositions])

  const totalBorrowed= useMemo(() => {
    return openPositions.reduce((total, pos) => total.plus(pos.borrowed), new BigNumber(0))
  }, [openPositions])

  const stats = [
    { indicator: t('dashboard.total_borrowed'), value: parseFloat(totalBorrowed.toFixed(2)), decimals: 2 },
    { indicator: t('dashboard.total_collat_val'), value: parseFloat(totalCollatVal.toFixed(2)), decimals: 2, prefix: '$' },
    { indicator: t('dashboard.open_positions'), value: openPositions.length, decimals: 0 },
  ]

  return (
    <Page>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageHeader title={t('dashboard.title')} subtitle={t('dashboard.subtitle')}/>
      <Container size="lg">
        <Grid>
          {stats.map(({ indicator, value, decimals, prefix }) => (
            <GridColumn key={indicator}>
              <Card>
                <CardContent>
                  <StatItem>
                    <Label>{indicator}</Label>
                    <Value value={value} decimals={decimals} prefix={prefix}/>
                  </StatItem>
                </CardContent>
              </Card>
            </GridColumn>
          ))}
        </Grid> 
        <PositionContainer>
          <Title>{t('dashboard.open_positions')}</Title>
          <Grid>
            {
              account ? 
                allPositions ? 
                  openPositions.length ? openPositions.map(pos => (
                    // <Link to={`/borrow/${pos.symbol}`} key={pos.symbol}>
                    <Card key={pos.name}>
                      <CardTitle text={
                        <CardTitleBox>
                          <Coins coins={[pos.symbol]}>{pos.name}</Coins>
                          {pos.deprecated ? 
                            <Tooltip tip={t('borrow.deprecated_tip')} placement='right'>
                              <DeprecatedLabel>{t('borrow.deprecated')}</DeprecatedLabel>
                            </Tooltip> : null}
                        </CardTitleBox>
                      } />
                      <CardContent>
                        <DataItem indicator={t('borrow.wen_borrowed')} value={pos.borrowed.toFormat(2)}/>
                        <DataItem indicator={t('borrow.collat_val')} value={`$${pos.collatVal.toFormat(2)}`}/>
                        <DataItem indicator={t('borrow.position_health')} value={
                          <PostionHealth liqPrice={pos.liqPrice} price={pos.price} />
                        }/>
                        <PostionHealth 
                          liqPrice={pos.liqPrice} 
                          price={pos.price} 
                          displayBar={true}
                          onlyBar={true}
                          barWidth='100%'
                        />
                      </CardContent>
                      <CardAction>
                        <CardButton>
                          <Button 
                            to={`/borrow/${pos.name}/repay`} 
                            text={t('borrow.repay')} 
                            size='sm'
                          />
                        </CardButton>
                        <CardButton>
                          <Button 
                            to={`/borrow/${pos.name}`} 
                            text={t('borrow.borrow')} 
                            size='sm'
                            variant='secondary' 
                          />
                        </CardButton>
                      </CardAction>
                    </Card>
                  )) : <EmptyHint>{t('dashboard.no_open_position')}</EmptyHint>
                : <EmptyHint><Spinner /></EmptyHint>
              : <WalletButton>
                <Button
                  onClick={onPresentWalletProviderModal}
                  text={t('wallet.unlock')}
                />
              </WalletButton>
            }
          </Grid>
        </PositionContainer>
      </Container>
    </Page>
  )
}

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    display: flex;
    flex-direction: column;
  }
`
const GridColumn = styled.div`
  grid-column: span 1 / span 1;
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    height: 50px;
  }
`

const Label = styled.div`
  margin-bottom: 15px;
  color: ${props => props.theme.color.grey[200]};
`

const PositionContainer = styled.div`
  margin-top: ${props => props.theme.spacing[4]}px;
`

const Title = styled.div`
  font-size: 20px;
  color: ${props => props.theme.color.white};
  padding: ${props => props.theme.spacing[4]}px 0;
  margin-bottom: ${props => props.theme.spacing[4]}px;
`

const CardButton = styled.div`
  flex-basis: 47%;
`

const WalletButton = styled.div`
  grid-column: span 1 / span 1;
  grid-column-start: 2;
`

const EmptyHint = styled.div`
  color: ${props => props.theme.color.grey[200]};
  text-align: center;
  grid-column: span 3 / span 3;
`

const CardTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export default Dashboard