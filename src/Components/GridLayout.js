import React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Node from './Node';

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  grid-area: pageLayout;  // this is an identifier so it can't be in quotes
`;

const GridNodes = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-template-rows: repeat(${(props) => props.rows}, 1fr);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

function GridLayout({ gridStore, nodeRefs, handleMouseDown, handleMouseEnter, handleMouseUp }) {
  return (
    <GridContainer>
      {/* grid is a 2d array of 30x50 dimensions */}
      {/* flat() converts 2d array into 1d */}
      {/* This is done only to avoid dealing with 2 for loops, else we could have simply played around with 2d & done what we want */}
      <GridNodes rows={gridStore.rows} columns={gridStore.columns}>
        {gridStore.grid.flat().map((cell, index) => {
          // formula to convert 1d indices to 2d indices 
          const row = Math.floor(index / gridStore.columns);
          const col = index % gridStore.columns;
          return (
            <Node
              key={`${row}-${col}`}
              ref={(node) => (nodeRefs.current[row][col] = node)}
              cell={cell}
              handleMouseDown={handleMouseDown}
              handleMouseEnter={handleMouseEnter}
              handleMouseUp={handleMouseUp}
              colIndex={col}
              rowIndex={row}
              isAnimating={gridStore.isAnimating}
            />
          );
        })}
      </GridNodes>
    </GridContainer>
  );
}

export default observer(GridLayout);
