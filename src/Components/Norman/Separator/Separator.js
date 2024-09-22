import React from 'react';
import styled, { css } from 'styled-components';
import { SEPARATOR } from '../../../Constants/Constants';

const SeparatorLine = styled.div`
  background: rgb(205, 204, 215);
  ${(props) => {
    switch (props.direction) {
      case SEPARATOR.VERTICAL:
        return css`
          width: ${props.width ?? '1px'};
          height: ${props.height ?? '32px'};
        `;
      case SEPARATOR.HORIZONTAL:
        return css`
          width: ${props.width ?? '32px'};
          height: ${props.height ?? '1px'};
        `;
      default:
        return;
    }
  }}
`;

function Separator({ direction = SEPARATOR.VERTICAL, height = undefined, width = undefined }) {
  return <SeparatorLine direction={direction} height={height} width={width} />;
}

export default Separator;
