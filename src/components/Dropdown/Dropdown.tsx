import React, { useRef } from 'react'
import styled from 'styled-components'
import useClickOutside from '../../hooks/useClickOutside'
import Triangle from '../Triangle'

export interface DropdownItem {
  name: string | number
  value: string | number
  icon?: React.ReactNode
}

interface DropdownProps {
  list: DropdownItem[]
  placeholder: string | DropdownItem
  onClick: (selected: DropdownItem) => void
  width?: string
  border?: boolean
  borderColor?: string
}

const Dropdown: React.FC<DropdownProps> = ({ list, placeholder, onClick, borderColor, border = true, width }) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useClickOutside(dropdownRef, false)
  const toggleMenu = () => setIsActive(!isActive)

  let selected: DropdownItem = typeof placeholder === 'object' ? placeholder : { name: placeholder, value: '' }
  const selectItem = (item: DropdownItem) => {
    selected = item
    toggleMenu()
  }

  return (
    <StyledContainer width={width}>
      <MenuButton onClick={toggleMenu} border={border} borderColor={borderColor}>
        {selected.icon ? <ItemIcon>{selected.icon}</ItemIcon> : null}
        <SelectedItem>{selected.name}</SelectedItem>
        <Triangle />
      </MenuButton>
      <StyledMenu ref={dropdownRef} className={`${isActive ? 'active' : 'inactive'}`}>
        <StyledList>
          {
            list.map((item) => {
              return (
                <StyledItem key={item.name}>
                  <StyledLink 
                    data-value={item.value} 
                    onClick={() => {
                      selectItem(item)
                      onClick(selected)
                    }}
                    >
                    {item.icon ? <ItemIcon>{item.icon}</ItemIcon> : null}
                    <span>{item.name}</span>
                  </StyledLink>
                </StyledItem>
              )
            })
          }
        </StyledList>
      </StyledMenu>      
    </StyledContainer>  
  )
}

interface ContainerProps {
  width?: string
}

const StyledContainer = styled.div<ContainerProps>`
  position: relative;
  min-width: 100px;
  width: ${props => props.width};
`

const StyledMenu = styled.nav`
  background: rgba(14, 13, 22, 0.5);
  backdrop-filter: blur(40px);
  border: 1px solid ${props => props.theme.color.divider};
  position: absolute;
  top: 120%;
  right: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  width: 100%;
  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);    
  }
`

const StyledList = styled.ul`
  padding: 0 20px;
  list-style: none;
  padding: 0;
  margin: 0;
`

const StyledItem = styled.li`
  &:hover {
    background: #41a558;
  }
`

const StyledLink = styled.a`
  text-decoration: none;
  color: ${props => props.theme.color.grey[50]};
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`

interface MenuButtonProps {
  border?: boolean
  borderColor?: string
}

const MenuButton = styled.button<MenuButtonProps>`
  border: ${props => props.border ? '1px solid' : 'none'};
  border-color: ${props => props.borderColor || props.theme.color.divider};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  height: 34px;
  width: 100%;
  background: none;
  transition: box-shadow 0.4s ease;
  color: ${props => props.theme.color.grey[200]};

  &:hover {
    color: ${props => props.theme.color.grey[50]};
  }

  & span {
    font-size: 14px;
  }
`

const SelectedItem = styled.span`
  margin-right: 5px;
`

const ItemIcon = styled.div`
  margin-right: 10px;
`

export default Dropdown