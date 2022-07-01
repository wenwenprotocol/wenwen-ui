import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import Badge from '../../../components/Badge'

interface PositionHealthProps {
  liqPrice: BigNumber
  price: BigNumber
  displayBar?: boolean
  onlyBar?: boolean
  barWidth?: string
}

const PositionHealth: React.FC<PositionHealthProps> = ({ liqPrice, price, displayBar = false, onlyBar = false, barWidth }) => {

  const value = useMemo(() => {
    return liqPrice && price ? new BigNumber(1).minus(liqPrice.div(price)) : new BigNumber(0)
  }, [liqPrice, price])

  const getClassName = useCallback(() => {
    if (value.lt(0.3) && value.gte(0.1)) return 'medium'
    else if (value.lt(0.1)) return 'danger'
    else if (value.gte(0.3)) return 'safe'
    else return ''
  }, [value])

  const healthVal = !value.isNaN() && value.isFinite() ? value.times(100).toFixed(2): '0'

  return (
    <HealthWrapper>
      {!onlyBar && <Badge className={getClassName()}>
        {getClassName() || ''}
      </Badge>}
      {displayBar ? 
        <ProgressBarBg barWidth={barWidth} onlyBar={onlyBar}>
          <ProgressBar style={ { width: `${value.gte(0) ? healthVal : '0'}%` }} className={getClassName()}/>
        </ProgressBarBg> : null}
      {!onlyBar && <HealthValue className={getClassName()}>
        {healthVal}%
      </HealthValue>}
    </HealthWrapper>

  )
}

const HealthWrapper = styled.div`
  display: flex;
  align-items: center;
`

const HealthValue = styled.div`
  margin-left: 10px;
  &.safe {
    color: ${props => props.theme.color.safe};
  }
  &.medium {
    color: ${props => props.theme.color.medium};
  }
  &.danger {
    color: ${props => props.theme.color.danger};
  }
`

interface ProgressBarBgProps {
  barWidth?: string
  onlyBar?: boolean
}

const ProgressBarBg = styled.div<ProgressBarBgProps>`
  margin-left: ${props => props.onlyBar ? '0' : '10px'};
  width: ${props => props.barWidth || '120px'};
  background: ${props => props.theme.color.grey[700]};
  height: 4px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    width: ${props => props.barWidth || '80px'};
  }
`

const ProgressBar = styled.div`
  text-align: center;
  height: 4px;
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

export default PositionHealth