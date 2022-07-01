import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup'

import styled from 'styled-components'

interface ValueProps {
  value: string | number
  decimals?: number,
  prefix?: string
}

const Value: React.FC<ValueProps> = ({ value, decimals, prefix = '' }) => {
  const [start, updateStart] = useState(0)
  const [end, updateEnd] = useState(0)

  useEffect(() => {
    if (typeof value === 'number' && end !== value) {
      updateStart(end)
      updateEnd(value)
    }
  }, [value, end])

  return (
    <StyledValue>
      {prefix}{typeof value == 'string' ? (
        value
      ) : (
        <CountUp
          start={start}
          end={end}
          decimals={
            decimals !== undefined ? decimals : end < 0 ? 4 : end > 1e1 ? 2 : 8
          }
          duration={1}
          separator=","
        />
      )}
    </StyledValue>
  )
}

const StyledValue = styled.div`
  font-family: 'DDIN', 'Roboto Mono', monospace;
  font-size: 36px;
  font-weight: 700;
  line-height: 43px;
  color: #FFFFFF;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    font-size: 24px;
    line-height: 32px;
  }
`

export default Value
