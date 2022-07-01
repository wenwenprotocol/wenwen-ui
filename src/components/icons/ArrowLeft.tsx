import React from 'react'
import { IconProps } from '../Icon'

const ArrowLeft: React.FC<IconProps> = ({ color, size = 24 }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke={color || 'currentColor'}
      width={size}
      height={size}
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  )
}

export default ArrowLeft
