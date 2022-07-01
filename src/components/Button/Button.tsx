import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Link } from 'react-router-dom'

interface ButtonProps {
  children?: React.ReactNode,
  disabled?: boolean,
  href?: string,
  onClick?: () => void,
  size?: 'sm' | 'md' | 'lg',
  text?: string,
  to?: string,
  variant?: 'default' | 'secondary' | 'danger' | 'flat' | 'whiteframe'
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  href,
  onClick,
  size,
  text,
  to,
  variant,
}) => {
  const { color, spacing } = useContext(ThemeContext)

  let fontColor = '#fff'
  let buttonColor: string
  let buttonHoverColor: string
  let border: string = '0 none;'
  let fontWeight: number = 700
  const gradientColor = 'linear-gradient(95.78deg, #41A558 -0.9%, #44A69B 100%);'

  switch (variant) {
    case 'secondary':
      buttonColor = 'transparent'
      buttonHoverColor = gradientColor
      border = `1px solid ${color.primary.main}`
      break
    case 'danger':
      buttonColor = color.red[500]
      buttonHoverColor = color.red[600]
      break
    case 'flat':
      buttonColor = 'transparent'
      buttonHoverColor = color.grey[600]
      break
    case 'whiteframe':
      buttonColor = 'transparent'
      border = `1px solid ${color.white}`
      break
    case 'default':
    default:
      buttonColor = gradientColor
      buttonHoverColor = gradientColor
  }

  let boxShadow: string
  let buttonSize: number
  let buttonPadding: number
  let fontSize: number

  switch (size) {
    case 'sm':
      buttonPadding = spacing[3]
      buttonSize = 34
      fontSize = 14
      break
    case 'lg':
      buttonPadding = spacing[4]
      buttonSize = 100
      fontSize = 16
      break
    case 'md':
    default:
      buttonPadding = spacing[4]
      buttonSize = 56
      fontSize = 16
  }

  const ButtonChild = useMemo(() => {
    if (to) {
      return <StyledLink to={to}>{text}</StyledLink>
    } else if (href) {
      return <StyledExternalLink href={href} target="__blank">{text}</StyledExternalLink>
    } else {
      return text
    }
  }, [href, text, to])

  return (
    <StyledButton
      fontColor={fontColor}
      boxShadow={boxShadow}
      buttonColor={buttonColor}
      border={border}
      disabled={disabled}
      fontSize={fontSize}
      onClick={onClick}
      padding={buttonPadding}
      size={buttonSize}
      fontWeight={fontWeight}
      buttonHoverColor={buttonHoverColor}
    >
      {children}
      {ButtonChild}
    </StyledButton>
  )
}

interface StyledButtonProps {
  fontColor: string
  boxShadow: string
  buttonColor: string
  border: string
  disabled?: boolean
  fontSize: number
  padding: number
  size: number
  fontWeight: number
  buttonHoverColor: string
}

const StyledButton = styled.button<StyledButtonProps>`
  align-items: center;
  background: ${props => !props.disabled ? props.buttonColor : 'none'};
  border: ${props => !props.disabled ? props.border : `1px solid #41A558`};
  color: ${props => props.fontColor};
  opacity: ${props => !props.disabled ? 1 : 0.2};
  cursor: pointer;
  display: flex;
  font-size: ${props => props.fontSize}px;
  font-weight: ${props => props.fontWeight};
  height: ${props => props.size}px;
  justify-content: center;
  outline: none;
  padding-left: ${props => props.padding}px;
  padding-right: ${props => props.padding}px;
  pointer-events: ${props => !props.disabled ? undefined : 'none'};
  width: 100%;
  &:hover {
    background: ${props => props.buttonHoverColor};
  }
`

const StyledLink = styled(Link)`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

const StyledExternalLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  flex: 1;
  height: 56px;
  justify-content: center;
  margin: 0 ${props => -props.theme.spacing[4]}px;
  padding: 0 ${props => props.theme.spacing[4]}px;
  text-decoration: none;
`

export default Button