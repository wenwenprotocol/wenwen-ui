import React from 'react'
import { IconProps } from '../Icon'

const CloseIcon: React.FC<IconProps> = ({ color, size = 24 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none"
      viewBox="0 0 24 24" 
      stroke={color || 'currentColor'}
      width={size}
      height={size}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default CloseIcon
