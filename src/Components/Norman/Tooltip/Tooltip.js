import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const getPositionStyles = position => {
  switch (position) {
    case 'top':
      return css`
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 8px;
        &::before {
          top: 100%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        }
      `;
    case 'bottom':
      return css`
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        margin-top: 8px;
        &::before {
          bottom: 100%;
          left: 50%;
          transform: translate(-50%, 50%) rotate(45deg);
        }
      `;
    case 'left':
      return css`
        top: 50%;
        right: calc(100% + 8px);
        transform: translateY(-50%);
        margin-right: 8px;
        &::before {
          left: 100%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        }
      `;
    case 'right':
      return css`
        top: 50%;
        left: calc(100% + 8px);
        transform: translateY(-50%);
        margin-left: 8px;
        &::before {
          right: 100%;
          top: 50%;
          transform: translate(50%, -50%) rotate(45deg);
        }
      `;
    default:
      return '';
  }
};

const TooltipTextContainer = styled.div`
  --tooltip-color: rgb(41, 41, 41);
  position: absolute;
  background-color: var(--tooltip-color);
  color: white;
  border-radius: 5px;
  height: 48px;
  padding: 12px;
  font-size: 14px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.105);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  z-index: 1;
  pointer-events: none;
  white-space: nowrap;
  box-sizing: border-box;

  ${({ position }) => getPositionStyles(position)}

  &::before {
    position: absolute;
    width: 8px;
    height: 8px;
    content: "";
    background-color: var(--tooltip-color);
  }
`;

const Tooltip = ({ children, text, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  return (
    <TooltipWrapper
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <TooltipTextContainer position={position} style={{ opacity: visible ? 1 : 0 }}>
        {text}
      </TooltipTextContainer>
    </TooltipWrapper>
  );
};

export default Tooltip;
