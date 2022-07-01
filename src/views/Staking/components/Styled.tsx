import styled from 'styled-components'

export const InputSwicher = styled.div`
  display: flex;
  justify-content: center;
` 

export const ArrowButton = styled.div`
  color: ${props => props.theme.color.white};
  display: flex;
  justify-content: center;
  margin: 20px;
  background: linear-gradient(95.78deg, #41A558 -0.9%, #44A69B 100%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.2s ease-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`

export const Tip = styled.div`
  color: ${props => props.theme.color.grey[200]};
  font-size: 14px;
`

export const StyledButton = styled.div`
  flex-basis: 50%;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    flex-basis: 100%;
  }
`