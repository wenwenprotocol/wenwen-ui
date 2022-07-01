import React from 'react'
import styled from 'styled-components'

interface BadgeProps {
  className: string
}

const Badge: React.FC<BadgeProps> = ({ className, children }) => <StyledBadge className={className}>{children}</StyledBadge>

const StyledBadge = styled.div`
  font-size: 13px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 30px;
  text-transform: capitalize;
  &.safe {
    background: ${props => props.theme.color.safe};
  }
  &.medium {
    background: ${props => props.theme.color.medium};
  }
  &.danger {
    background: ${props => props.theme.color.danger};
  }
`

export default Badge
