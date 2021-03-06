import React from 'react'
import styled from 'styled-components'

interface CardTitleProps {
  text?: string | React.ReactNode
}

const CardTitle: React.FC<CardTitleProps> = ({ text }) => (
  <StyledCardTitle>{text}</StyledCardTitle>
)

const StyledCardTitle = styled.div`
  color: ${(props) => props.theme.color.white};
  font-size: 18px;
  padding: ${(props) => props.theme.spacing[4]}px;
`

export default CardTitle
