import React from 'react'
import styled from 'styled-components'
import Container from '../Container'
import Icon from '../Icon'
import Button from '../Button'

interface Props {
  text: string
  icon?: React.ReactNode
  buttonText?: string
  buttonLink?: string
}

const Announcement: React.FC<Props> = ({ text, icon, buttonText, buttonLink }) => {
  return (
    <StyledTopBarNotice >        
      <Container size="lg">
        <StyledNoticeContent>
          <StyledNoticeText>
            {icon && <StyledNoticeTextIcon>
              <Icon color='white'>{icon}</Icon>
            </StyledNoticeTextIcon>}
            {text}
          </StyledNoticeText>
          <div>
            {buttonText && <Button text={buttonText} href={buttonLink} size="sm" variant="whiteframe" />}
          </div>
        </StyledNoticeContent>
      </Container>
    </StyledTopBarNotice>
  )
}


const StyledTopBarNotice = styled.div`
  padding: 15px 0px;
  background: linear-gradient(95.78deg, #41A558 -0.9%, #44A69B 100%);
  color: white;
`

const StyledNoticeContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    flex-direction: column;
    align-items: start;
  }
`

const StyledNoticeText = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    margin-bottom: 20px;
  }
`

const StyledNoticeTextIcon = styled.div`
  margin-right: 10px;
  @media (max-width: ${props => props.theme.breakpoints.mobile}px) {
    display: none;
  }
`

export default Announcement
