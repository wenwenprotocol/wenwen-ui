import React from 'react'
import styled, { keyframes } from 'styled-components'

export interface ModalProps {
  onDismiss?: () => void
}

const Modal: React.FC = ({ children }) => {
  return (
    <StyledResponsiveWrapper>
      <StyledModal>{children}</StyledModal>
    </StyledResponsiveWrapper>
  )
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

const StyledResponsiveWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  max-width: 512px;

  @media (max-width: ${(props) => props.theme.breakpoints.phone}px) {
    flex: 1;
    position: absolute;
    top: 100%;
    right: 0;
    left: 0;
    max-height: calc(100% - ${(props) => props.theme.spacing[4]}px);
    animation: ${mobileKeyframes} 0.3s forwards ease-out;
  }
`

const StyledModal = styled.div`
  padding: 20px;
  // background: ${(props) => props.theme.color.grey[50]};
  // border: 1px solid ${(props) => props.theme.color.grey[100]}ff;
  // background: #0E0D16;
  background: rgba(14, 13, 22, 0.5);
  backdrop-filter: blur(40px);
  border: 1px solid #41a558;
  // border-radius: 12px;
  // box-shadow: inset 1px 1px 0px ${(props) => props.theme.color.grey[50]};
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 0;
`

export default Modal
