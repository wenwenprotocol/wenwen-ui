import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import BigNumber from 'bignumber.js'
import useTokenBalance from '../../hooks/useTokenBalance'
import useStakingInfo from '../../hooks/useStakingInfo'
import useWallet from '../../hooks/useWallet'
import Page from '../../components/Page'
import Container from '../../components/Container'
import PageHeader from '../../components/PageHeader'
import Stake from './components/Stake'
import Unstake from './components/Unstake'
import StakingInfo from './components/StakingInfo'
import { getGovTokens, getStaking } from '../../utils/contract'

const Staking: React.FC = () => {
  const { t } = useTranslation()
  const { chainId } = useWallet()
  const stakingAddress = getStaking(chainId)
  const { share: shareAddress, sShare: sShareAddres } = getGovTokens(chainId)
  const { data: shareBalance } = useTokenBalance(shareAddress)
  const { data: sShareBalance } = useTokenBalance(sShareAddres)
  const { data: stakingInfo } = useStakingInfo(stakingAddress)

  let exchangeRate: BigNumber
  let shareTotalBalance: BigNumber
  if (stakingInfo) {
    ({ exchangeRate, shareTotalBalance } = stakingInfo)
  }

  const [status, setStatus] = useState('stake')

  const onSwitch = () => {
    setStatus(status === 'stake' ? 'unstake' : 'stake')
  }

  const info = { shareBalance, sShareBalance, exchangeRate, shareTotalBalance, onSwitch }

  return (
    <Page>
      <Helmet>
        <title>Stake</title>
      </Helmet>
      <PageHeader title={t('stake.title')} subtitle={t('stake.subtitle')}/>
      <Container size="lg">
        <StakingContainer>
          <StakingPool>
            {status === 'stake' ? <Stake {...info} /> : <Unstake {...info} />}
          </StakingPool>
          <StakingPoolInfo>
            <StakingInfo {...info} />
          </StakingPoolInfo>
        </StakingContainer>
      </Container>
    </Page>
  )
}

const StakingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
  }
`

const StakingPool = styled.div`
  flex-basis: 60%;
`

const StakingPoolInfo = styled.div`
  flex-basis: 38%;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    margin-top: 24px;
  }
`

export default Staking