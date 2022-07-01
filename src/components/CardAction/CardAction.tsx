import React from 'react'
import styled from 'styled-components'

const CardAction: React.FC = ({ children }) => (
  <StyledCardAction>{children}</StyledCardAction>
)

const StyledCardAction = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-direction: row-reverse;
  padding: ${(props) => props.theme.spacing[4]}px;
`

export default CardAction
