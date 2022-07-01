import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import useWallet from '../../../hooks/useWallet'
import Dropdown from '../../Dropdown'

const Nav: React.FC = () => {
  const { t } = useTranslation()
  const { chainId } = useWallet()
  const swaps = [
    { value: 'starswap', name: 'StarSwap' },
    { value: 'kikoswap', name: 'KikoSwap' }
  ]
  return (
    <StyledNav>  
      <StyledLink to="/">
        {t('nav.borrow')}
      </StyledLink>
      <DropdownLink>
        <Dropdown
          list={swaps}
          placeholder={t('nav.exchange')}
          onClick={(swap) => swap.value === 'kikoswap' ? window.open('https://kikoswap.com/swap') :  window.open('https://starswap.xyz/#/swap')}
          border={false}
          width='110px'
        />
      </DropdownLink>
      {chainId === 251 ? <>
        <StyledLink to="/farm">
          {t('nav.farm')}
        </StyledLink>
        <StyledLink to="/stake">
          {t('nav.stake')}
        </StyledLink>
      </> : null}
      <StyledLink to="/dashboard">
        {t('nav.dashboard')}
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  height: 100px;
`

const StyledLink = styled(Link)`
  font-size: 16px;
  line-height: 17px;
  color: #A8B0C1;
  padding-right: 60px;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    color: ${(props) => props.theme.color.grey[50]};
  }
`

const DropdownLink = styled.div`
  padding-right: 60px;
  & button > span {
    font-size: 16px;
    text-transform: uppercase;
  }
  &:hover {
    color: ${(props) => props.theme.color.grey[50]};
  }
`

// const Link = styled.a`
//   font-weight: 600;
//   font-size: 14px;
//   line-height: 17px;
//   color: #A8B0C1;
//   padding-right: 90px;
//   text-decoration: none;
// `

export default Nav
