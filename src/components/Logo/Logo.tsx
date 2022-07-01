import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/img/wen-logo-white.svg'

const Logo: React.FC = () => {
  return (
    <StyledLogo href="https://wenwen.money/">
      <img src={logo} height="48" style={{ marginTop: -4 }}  alt="wenwen-logo"/>
    </StyledLogo>
  )
}

const StyledLogo = styled.a`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0;
  min-height: 44px;
  min-width: 44px;
  padding: 0;
  text-decoration: none;
`

export default Logo
