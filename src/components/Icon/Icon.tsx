import React from 'react'
import styled from 'styled-components'

export interface IconProps {
  color?: string
  children?: React.ReactNode
  size?: number
  onClick?: () => void
}

const Icon: React.FC<IconProps> = ({ children, color, size = 24, onClick }) => {
  return (
    <StyledIcon onClick={onClick}>
      {React.isValidElement(children) && React.cloneElement(children, {
        color: color || 'currentColor',
        size,
      })}
    </StyledIcon>
  )
}

const StyledIcon = styled.div`
  display: flex;
  align-items: center;
`

export default Icon