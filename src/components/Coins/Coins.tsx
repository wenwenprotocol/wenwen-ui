import React from 'react'
import styled from 'styled-components'
import WBTC from '../../assets/img/WBTC.svg'
import STC from '../../assets/img/starcoin.svg'
import WEN from '../../assets/img/WEN.svg'
import SHARE from '../../assets/img/SHARE.svg'
import sSHARE from '../../assets/img/sSHARE.svg'

interface CoinProps {
  coins: string[]
}

const Coins: React.FC<CoinProps> = ({ coins, children }) => {

  const coinUrls: any = {
    WBTC,
    STC,
    WEN,
    SHARE,
    sSHARE,
  }

  return (
    <CoinsWrapper>
      { coins.length ? 
        coins.map(coin => (
          coinUrls[coin] ? <CoinImg src={coinUrls[coin] || null} key={coin} alt={coin} /> : null
        ))
      : null}
      <CoinName>{children}</CoinName>
    </CoinsWrapper>
  )
}

const CoinsWrapper = styled.div`
  display: flex;
  align-items: center;
`

const CoinImg = styled.img`
  height: 36px;
  width: 36px;
  &~img {
    margin-left: -15px;
  }
`

const CoinName = styled.div`
  margin-left: 10px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    max-width: 60px;
    word-wrap: break-word;
  }
`

export default Coins