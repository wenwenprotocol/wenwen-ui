import React, { ReactNode } from 'react'
import styled from 'styled-components'
import Icon from '../Icon'
import { ChevronUp, ChevronDown } from '../icons'
import Spinner from '../Spinner'
interface PoolItem {
  label: string
  value: string | number | ReactNode
}

interface PoolProps {
  items: PoolItem[]
  onClick?: () => void
  displayChevron?: boolean
  active?: boolean
}

const Pool: React.FC<PoolProps> = ({ items, onClick, displayChevron, active }) => {
  return (
    <PoolWrapper onClick={onClick}>
      {items.map((item, i) => (
        <PoolItem key={i}>
          { item.label && <ItemLabel>{item.label}</ItemLabel> }
          <ItemValue>{item.value || <Spinner size={16} strokeWidth={2}/>}</ItemValue>
        </PoolItem>
      ))}
      {displayChevron ? 
        <StyledIcon>
          {active ? <Icon><ChevronUp /></Icon> : <Icon><ChevronDown /></Icon>}
        </StyledIcon>
        : null}
    </PoolWrapper>
  )
}

const PoolWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: ${props => props.theme.color.grey[200]};
  cursor: pointer;
  border-bottom: 1px solid ${props => props.theme.color.divider};
  & > div:first-child {
    flex-basis: 17%;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    & > div:first-child {
      grid-column: span 2 / span 2;
    }
  }
`

const PoolItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 36px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    padding: 15px;
  }
`

const ItemLabel = styled.div`
  font-size: 12px;
  line-height: 24px;
  color: ${props => props.theme.color.grey[200]};
`

const ItemValue = styled.div`
  color: #fff;
  font-family: 'DDIN';
  font-size: 20px;
`

const StyledIcon = styled.div`
  display: flex;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    display: none;
  }
`

export default Pool