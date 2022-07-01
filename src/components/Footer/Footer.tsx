import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/img/wen-text-white.svg'
import Nav from './components/Nav'
import { isBrowser } from 'react-device-detect'

const Footer: React.FC = () => (
  <StyledFooter>
    <StyledTitle>
      <img src={logo} height="36" alt="wenwen-logo"/>
    </StyledTitle>
    <StyledMod>
      <StyledFooterInner>
        {isBrowser ? <Nav /> : null}
      </StyledFooterInner>
      <StyledCopyright>
          © 2022 WENWEN All rights reserved
      </StyledCopyright>
    </StyledMod>
  </StyledFooter>
)

const StyledFooter = styled.footer`
  box-sizing: border-box;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 50px;
  margin-top: ${props => props.theme.spacing[6]}px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 24px 24px;
  }
`

const StyledTitle = styled.div`
  font-style: italic;
  font-weight: 800;
  font-size: 24px;
  line-height: 29px;
  text-transform: capitalize;
  color: #FFFFFF;
`

const StyledFooterInner = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`

const StyledCopyright = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #A8B0C1;
  white-space: nowrap;
`
const StyledMod = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: 36px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    margin-top: 10px;
  }
`
export default Footer