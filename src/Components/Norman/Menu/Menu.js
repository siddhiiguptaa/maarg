import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  min-width: 100px;
`;

const SplitButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const SplitButtonUnit = styled.div`
  background: ${(props) => props.isOpen ? '#ebecf0' : '#f3f4f6'};
  border-radius: 0 4px 4px 0;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  border-left: 0.5px solid rgba(0,0,0,0.1);
  justify-content: center;
`;

const SplitButton = styled.div`
  cursor: pointer;
  border-radius: ${(props) => props.isSplit ? '4px 0  0 4px' : '4px'};
  border: none;
  outline: none;
  padding: 6px 16px;
  width: 100%;
  display: flex;
  background: ${(props) => props.isOpen ? '#ebecf0' : '#f3f4f6'};

  &:hover {
    background: #ebecf0;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + ${({ gap }) => gap || '16px'});
  left: 0;
  background-color: white;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 0px 2px 10px rgba(5, 0, 56, 0.08);
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 150px;
  z-index: 1;
`;

const MenuItem = styled.div`
  padding: 8px;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  border-radius: 4px;

  &:hover {
    background: #e8ecfc;
    color: #314cd9;
  }
`;

function Menu({ options = [], selectedOption, unit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(selectedOption);
  const containerRef = useRef(null);

  const toggleDropdown = (event) => {
    event.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleSelect = (index) => {
    setSelected(index);
    setIsOpen(false);
    options[index]?.onClick?.();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Container ref={containerRef} onClick={(e) => e.stopPropagation()}>
      <SplitButtonContainer>
        <SplitButton isOpen={isOpen} onClick={toggleDropdown} isSplit={Boolean(unit)}>
          {selected !== undefined ? options[selected].label : 'Menu'}
        </SplitButton>
        {unit && (
          <SplitButtonUnit isOpen={isOpen}>
            {unit}
          </SplitButtonUnit>
        )}
      </SplitButtonContainer>
      {isOpen && (
        <Dropdown gap="16px">
          {options.map((option, index) => (
            <MenuItem key={index} onClick={() => handleSelect(index)}>
              {option.label}
            </MenuItem>
          ))}
        </Dropdown>
      )}
    </Container>
  );
}

export default Menu;
