import React from 'react'
import { IconProps } from '../Icon'

const ChevronUp: React.FC<IconProps> = ({ color, size = 24 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      fill="none" 
      viewBox="0 0 24 24" 
      stroke={color || 'currentColor'}
      width={size}
      height={size}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>    
  )
}

export default ChevronUp