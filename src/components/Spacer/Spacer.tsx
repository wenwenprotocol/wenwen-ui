import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'

interface SpacerProps {
  size?: 'sm' | 'md' | 'lg'
  width?: string
}

const Spacer: React.FC<SpacerProps> = ({ size = 'md', width }) => {
  const { spacing } = useContext(ThemeContext)
  
  let s: number
  switch (size) {
    case 'lg':
      s = spacing[6]
      break
    case 'sm':
      s = spacing[2]
      break
    case 'md':
    default:
      s = spacing[4]
  }
  
  return (
    <StyledSpacer size={s} width={width} />
  )
}

interface StyledSpacerProps {
  size: number,
  width: string
}

const StyledSpacer = styled.div<StyledSpacerProps>`
  height: ${props => props.size}px;
  width: ${props => props.width || `${props.size}px`};
`

export default Spacer