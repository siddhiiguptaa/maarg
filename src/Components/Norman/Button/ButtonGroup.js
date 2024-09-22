import React from 'react';
import styled from 'styled-components';

const ButtonGroupContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: ${(props) => props.direction };
`;

function ButtonGroup({ direction = 'row', ...props }) {
  return (
    <ButtonGroupContainer direction={direction}>
      {props.children}
    </ButtonGroupContainer>
  );
}

export default ButtonGroup;
