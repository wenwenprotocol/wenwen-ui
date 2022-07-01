import React from 'react'
import styled from 'styled-components'

interface CardProps {
  height?: number
}

const Card: React.FC<CardProps> = ({ children, height }) => <StyledCard height={height}>{children}</StyledCard>

interface StyleProps {
  height?: number
}

const StyledCard = styled.div<StyleProps>`
  /* border: 1px solid ${(props) => props.theme.color.primary.main}; */
  border: 1px solid ${props => props.theme.color.divider};
  display: flex;
  flex-direction: column;
  height: ${props => props.height ? `${props.height}px` : 'auto' };
`

export default Card
