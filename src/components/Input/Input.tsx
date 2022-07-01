import React, { useState } from 'react'
import styled from 'styled-components'

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  startAdornment?: React.ReactNode
  value: string
  error?: string
  disabled?: boolean
}

const Input: React.FC<InputProps> = ({
  endAdornment,
  onChange,
  placeholder,
  startAdornment,
  value,
  error,
  disabled,
}) => {
  const [focus, setFocus] = useState(false)

  return (
    <StyledInputWrapper className={`${focus ? 'focus' : ''} ${error ? 'error' : ''} ${disabled ? 'disabled' : ''}`}>
      {!!startAdornment && <StartAdornment>{startAdornment}</StartAdornment>}
      <StyledInput
        type='text'
        pattern='^[0-9]*[.,]?[0-9]*$'
        minLength={1}
        maxLength={79}
        spellCheck={false}
        autoComplete='off'
        autoCorrect='off'
        inputMode='decimal'
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        disabled={disabled}
      />
      {!!endAdornment && <EndAdornment>{endAdornment}</EndAdornment>}
    </StyledInputWrapper>
  )
}

const StyledInputWrapper = styled.div`
  border: 1px solid ${props => props.theme.color.grey[600]};
  background: ${props => props.theme.color.grey[800]};
  align-items: center;
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 ${props => props.theme.spacing[3]}px;
  box-sizing: border-box;
  transition: all 0.2s ease-in;
  &.focus {
    background: ${props => props.theme.color.grey[900]};
    border: 1px solid ${props => props.theme.color.primary.main};
  }
  &.error {
    border: 1px solid ${props => props.theme.color.red[500]};
  }
  &.disabled {
    opacity: 0.7;
  }
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 10px;
    padding: 0 ${props => props.theme.spacing[2]}px;
  }
`

const StyledInput = styled.input`
  background: none;
  border: 0;
  color: #fff;
  font-family: 'DDIN';
  font-size: 24px;
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    grid-column: span 5 / span 5;
  }
`

const StartAdornment = styled.div`
  color: #fff;
  // margin-right: ${props => props.theme.spacing[4]}px;
  flex-basis: 30%;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    grid-column: span 5 / span 5;
  }
`

const EndAdornment = styled.div`
  flex-basis: 10%;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    grid-column: span 2 / span 2;
  }
`

export default Input