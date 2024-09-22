import { observer } from 'mobx-react-lite';
import React from 'react';
import styled, { css } from 'styled-components';

const selectedButtonStyles = css`
  background: #d9dffc;
  color: #3859ff;
`;

const disabledButtonStyles = css`
  background: #f2f2f2;
  color: #a0a0a0;
  cursor: not-allowed;

  &:hover {
    background: #ececec;
    color: #a0a0a0;
  }
`;

const defaultButtonStyles = css`
  background: white;
  color: black;

  &:hover {
    background: #e8ecfc;
    color: #314cd9;
  }
`;

const StyledButton = styled.button`
  border-radius: 4px;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0;

  ${props => props.selected && selectedButtonStyles}
  ${props => props.disabled && disabledButtonStyles}
  ${props => !props.selected && !props.disabled && defaultButtonStyles}
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: 48px;
  font-size: 18px;
  color: ${props => props.disabled ? '#a0a0a0' : 'inherit'};
`;

function Button({ icon, selected, disabled, ...props }) {
  return (
    <StyledButton selected={selected} disabled={disabled} {...props}>
      <IconContainer disabled={disabled}>
        {icon}
      </IconContainer>
    </StyledButton>
  );
}

export default observer(Button);
