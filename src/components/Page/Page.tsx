import React from 'react'
import styled from 'styled-components'

import Footer from '../Footer'

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <StyledMain>{children}</StyledMain>
    <Footer />
  </StyledPage>
)

const StyledPage = styled.div`
`

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 137px);
  padding-top: 140px;
  box-sizing: border-box;

  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    padding-top: 0px;
  }
`

export default Page
