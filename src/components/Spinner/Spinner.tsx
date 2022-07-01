import React from 'react'
import styled, { keyframes } from 'styled-components'

interface SpinnerProps {
  size?: number
  strokeWidth?: number
}

const Spinner: React.FC<SpinnerProps> = ({ size = 80, strokeWidth = 4 }) => {
  return (
    <Ring size={size} strokeWidth={strokeWidth}><div></div><div></div><div></div><div></div></Ring>
  )
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Ring = styled.div<SpinnerProps>`
  display: inline-block;
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${props => props.size - props.size * 0.2}px;
    height: ${props => props.size - props.size * 0.2}px;
    margin: ${props => props.size * 0.1}px;
    border: ${props => props.strokeWidth}px solid #41A558;
    border-radius: 50%;
    animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #41A558 transparent transparent transparent;
  }

  & div:nth-child(1) {
  animation-delay: -0.45s;
  }

  & div:nth-child(2) {
    animation-delay: -0.3s;
  }

  & div:nth-child(3) {
    animation-delay: -0.15s;
  }
`

export default Spinner
