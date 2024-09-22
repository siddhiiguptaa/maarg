import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';

const StyledNode = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.05px 0.05px black inset, -0.05px -0.05px black inset;
  cursor: ${(props) => (props.isAnimating ? 'not-allowed' : 'pointer')};
  background-color: ${(props) => {
    switch (props.cell) {
      case 'S':
        return '#29ab87';
      case 'E':
        return '#e34234';
      case 'V':
        return '#00b4d8';
      case 1:
        return 'black';
      case 'P':
        return 'yellow';
      default:
        return '#F3F4F6';
    }
  }};
`;

const Node = ({ colIndex, rowIndex, isAnimating, handleMouseUp, handleMouseDown, handleMouseEnter }, ref) => {
  const [cell, setCell] = React.useState(0);

  // you can expose functions in the parent component of the children component ref 
  useImperativeHandle(ref, () => ({
    updateCell(newCell) {
      setCell(newCell);
    },
    getCell() {
      return cell;
    }
  }));

  return (
    <StyledNode
      cell={cell}
      isAnimating={isAnimating}
      onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
      onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
      onMouseUp={handleMouseUp}
    />
  );
};

export default forwardRef(Node);
