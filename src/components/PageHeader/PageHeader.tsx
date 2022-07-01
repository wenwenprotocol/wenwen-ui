import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

interface PageHeaderProps {
  children?: React.ReactNode
  subtitle?: string
  title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ children, subtitle, title }) => {
  return (
    <Container size="lg">
      <StyledPageHeader>
        { title && subtitle ? <StyledPageTitle>
          <StyledTitle>{title}</StyledTitle>
          <StyledSubtitle>{subtitle}</StyledSubtitle>
        </StyledPageTitle> : null}
        {children}
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[4]}px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    justify-content: start;
    align-items: start;
    padding-bottom: ${(props) => props.theme.spacing[4]}px;
  }
`

const StyledPageTitle = styled.div`
  align-items: start;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    padding-bottom: ${(props) => props.theme.spacing[4]}px;
  }
`

const StyledTitle = styled.h1`
  font-family: 'Kaushan Script', sans-serif;
  color: ${(props) => props.theme.color.white};
  font-size: 36px;
  text-align: center;
  font-weight: 700;
  margin: 0;
  padding: 0;
  line-height: 60px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    font-size: 28px;
    line-height: 50px;
  }
`

const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
`

export default PageHeader
