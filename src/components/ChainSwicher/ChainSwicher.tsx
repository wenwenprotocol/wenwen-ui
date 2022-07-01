import React from 'react'
import styled from 'styled-components'
import useWallet from '../../hooks/useWallet'
// import Dropdown from '../Dropdown'
// import { DropdownItem } from '../Dropdown/Dropdown'
import { supportedChainIds } from '../../constants/supportedChain'

const ChainSwicher: React.FC = () => {
  const { chainId } = useWallet()
  // const chains: DropdownItem[] = []
  // supportedChainIds.forEach((value, key) => {
  //   chains.push({ 
  //     name: value, 
  //     value: key,
  //   })
  // })

  
  return (
    // <Dropdown
    //   width="140px"
    //   list={chains}
    //   placeholder={curChain || 'Unknown'}
    //   onClick={({ name, value }) => window.location.href = `https://${value === 1 ? 'app' : name}.wenwen.money`}
    // />
    <ChainLabel chainId={chainId}>
      {supportedChainIds.get(chainId)}
    </ChainLabel>
  )
}

interface ChainLabelProps {
  chainId: number
}

const ChainLabel = styled.div<ChainLabelProps>`
  display: ${({ chainId }) => chainId && chainId !== 1 ? 'flex' : 'none'};
  padding: 0 16px;
  height: 34px;
  align-items: center;
  color: rgb(243, 132, 30);
  background-color: rgba(243, 132, 30, 0.1);
  border: solid 1px rgba(243, 132, 30, 0.2);
`

export default ChainSwicher