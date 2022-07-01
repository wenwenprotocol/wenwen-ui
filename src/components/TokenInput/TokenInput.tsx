import React from 'react'
import styled from 'styled-components'

import Button from '../Button'
import Input, { InputProps } from '../Input'
import { useTranslation } from 'react-i18next'

interface TokenInputProps extends InputProps {
  max?: number | string,
  symbol: string,
  onSelectMax?: () => void,
  link?: string
  label?: string
  icon?: React.ReactNode,
  error?: string
}

const TokenInput: React.FC<TokenInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  link,
  label,
  icon,
  error,
  disabled,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <StyledHd>
        {max ? <BalanceBox>
          <StyledMaxText>{label ? label : t('farm.available', { symbol })}</StyledMaxText>
          <StyledBalance>{max.toLocaleString()}</StyledBalance>
        </BalanceBox> : null}
        { link
          ? <StyledLink><a href={link} target="_blank" rel="noopener noreferrer">{t('farm.add_liquidity')}</a></StyledLink> 
          : null
        }
      </StyledHd>
      <StyledBd>
        <StyledInput>
          <Input
            onChange={onChange}
            placeholder="0.0"
            value={value}
            startAdornment={icon || symbol}
            endAdornment={
              onSelectMax ? 
              <StyledBtn>
                <Button text={t('max')} onClick={onSelectMax} size='sm' variant="flat"/>
              </StyledBtn> : null
            }
            error={error}
            disabled={disabled}
          />
          <ErrorMessage>{error}</ErrorMessage>
        </StyledInput>
      </StyledBd>
    </>
  )
}

const StyledHd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledInput = styled.div`
  width: 100%;
`

const BalanceBox = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
`

const StyledBalance = styled.div`
  font-family: 'DDIN';
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    font-size: 16px;
  }
  margin-left: 10px;
`

const StyledLink = styled.div`
  padding-top: 32px;

  a {
    color: #fff;
    // text-decoration: none;
  }
`

const StyledBd = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledMaxText = styled.div`
  font-size: 12px;
  line-height: 14px;
  color: #A8B0C1;
  margin-bottom: 10px;
`

const StyledBtn = styled.div`
`

const ErrorMessage = styled.div`
  line-height: 2;
  font-size: 12px;
  color: ${props => props.theme.color.red[500]}
`

export default TokenInput
