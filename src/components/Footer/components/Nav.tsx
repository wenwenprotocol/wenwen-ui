import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { getDocUrl } from '../../../utils'

const Nav: React.FC = () => {
  const { i18n } = useTranslation()
  return (
    <StyledNav>
      <StyledLink target="_blank" href={getDocUrl(i18n)}>
        +Docs
      </StyledLink>        
      <StyledLink target="_blank" href="https://twitter.com/wenwenprotocol">
        +Twitter
      </StyledLink>
      <StyledLink target="_blank" href="https://medium.com/@wenwenprotocol">
        +Medium
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.gg/dVfkF3HgEh">
        +Discord
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/wenwenprotocol">
        +Github
      </StyledLink>
      <StyledLink target="_blank" href="https://t.me/+pA5OnphR76Q5OWNl">
        +Telegram
      </StyledLink>
      <StyledLink target="_blank" href="https://forms.gle/fUUKXfd8W4odgexj7">
        +Bug Bounty
      </StyledLink>
      {/* <StyledLink target="_blank" href="https://legacy.wenwen.money">
        +Legacy
      </StyledLink> */}
    </StyledNav>
  )
}



const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    margin-top: 40px;
    align-items: start;
  }
`

const StyledLink = styled.a`
  color: #A8B0C1;
  padding: 0 40px 0 0;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[50]};
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    padding: 10px 0;
  }
`

export default Nav
