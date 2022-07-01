import React from "react"
import styled from "styled-components"
import Tooltip from '../Tooltip'
import Spinner from '../Spinner' 

interface DataItemProps {
  indicator: string | React.ReactNode
  value: string | React.ReactNode
  tip?: string
}

const DataItem: React.FC<DataItemProps> = ({ indicator, value, tip }) => (
  <DataItemWrapper>
    <DataIndicator>
      <span>{indicator}</span>
      {tip && <Tooltip tip={tip} />}
    </DataIndicator>
    <DataValue>{value || <Spinner size={16} strokeWidth={2}/>}</DataValue>
  </DataItemWrapper>
)

const DataItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing[3]}px 0;
`

const DataIndicator = styled.div`
  color: ${props => props.theme.color.grey[200]};
  display: flex;
  align-items: center;
  span {
    margin-right: 7px;
  }
`

const DataValue = styled.div`
  color: ${props => props.theme.color.white};
  font-family: 'DDIN';
  font-size: 18px;
`

export default DataItem