import React, { useRef } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Djikstra from '../Algorithms/Djikstra';
import { useGridStore } from '../Stores/GridStoreContext';
import { ACTIVE_MODE, ALGORITHMS } from '../Constants/Constants';
import BFS from '../Algorithms/BFS';
import DFS from '../Algorithms/DFS';
import { HotKeys } from 'react-hotkeys';
import { GridHotKeyMaps } from '../Constants/KeyMapConstants';
import GridLayout from '../Components/GridLayout';
import MainLayout from '../Components/MainLayout';

// 
const PageLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  overflow: hidden;
  grid-template-areas: 'pageLayout';  // this is not an identifier meaning more sections can be added, and so it needs to be in quotes. 
`;

const PathVisualizer = () => {
  // it is the store of mobx where observables, observer, computed and action are defined 
  const gridStore = useGridStore();
  // contains the blocker values ()
  // 2d grid 
  const gridRef = useRef(gridStore.grid);
  // created a 2d array of node references 
  const nodeRefs = useRef(Array(gridStore.rows).fill().map(() => Array(gridStore.columns).fill(null)));

  const updateCellState = (row, col) => {
    if (gridStore.isAnimating) return;

    switch (gridStore.activeMode) {
      case ACTIVE_MODE.START:
        if (gridStore.start !== null) {
          const [prev_row, prev_col] = gridStore.start;
          nodeRefs.current[prev_row][prev_col].updateCell(0);
          gridStore.setStart(null);
        }
        gridStore.setStart([row, col]);
        nodeRefs.current[row][col].updateCell('S');
        break;
      case ACTIVE_MODE.END:
        if (gridStore.end !== null) {
          const [prev_row, prev_col] = gridStore.end;
          nodeRefs.current[prev_row][prev_col].updateCell(0);
          gridStore.setEnd(null);
        }
        gridStore.setEnd([row, col]);
        nodeRefs.current[row][col].updateCell('E');
        break;
      case ACTIVE_MODE.BLOCK:
        const nodeValue = nodeRefs.current[row][col].getCell();
        if (nodeValue === 'S' || nodeValue === 'E') {
          break;
        }
        const newValue = nodeValue === 0 ? 1 : 0;
        nodeRefs.current[row][col].updateCell(newValue);
        gridRef.current[row][col] = newValue;
        break;
      default:
        break;
    }
  };

  const animateNodes = async (nodes, value) => {
    for (const node of nodes) {
      if (!gridStore.isAnimating) return;
      const [row, col] = node;
      const cellValue = nodeRefs.current[row][col].getCell();
      if (cellValue !== 'S' && cellValue !== 'E' && cellValue !== 1) {
        nodeRefs.current[row][col].updateCell(value);
      }
      console.log(gridStore.interval);
      await new Promise((resolve) => setTimeout(resolve, gridStore.interval));
    }
  };

  const visualizePath = async (path, visitedNodes) => {
    gridStore.setIsAnimating(true);
    await animateNodes(visitedNodes, 'V');
    await animateNodes(path, 'P');
    gridStore.setIsAnimating(false);
  };

  const setActiveMode = (mode) => {
    gridStore.setActiveMode(mode);
  };

  const removeVisualisation = () => {
    for (let row = 0; row < gridStore.rows; row++) {
      for (let col = 0; col < gridStore.columns; col++) {
        const cellValue = nodeRefs.current[row][col].getCell();
        if (cellValue !== 'S' && cellValue !== 'E' && cellValue !== 1) {
          nodeRefs.current[row][col].updateCell(0);
        }
      }
    }
  };

  const handleMouseDown = (row, col) => {
    if (gridStore.isAnimating) return;
    gridStore.setIsMousePressed(true);
    removeVisualisation();
    updateCellState(row, col);
  };

  const handleMouseUp = () => {
    gridStore.setIsMousePressed(false);
  };

  const handleMouseEnter = (row, col) => {
    if (gridStore.isMousePressed && gridStore.activeMode === ACTIVE_MODE.BLOCK) {
      updateCellState(row, col);
    }
  };

  const applyAlgo = () => {
    switch (gridStore.algo) {
      case ALGORITHMS.BFS:
        return BFS(gridRef.current, gridStore.start, gridStore.end);
      case ALGORITHMS.DFS:
        return DFS(gridRef.current, gridStore.start, gridStore.end);
      case ALGORITHMS.DJIKSTRA:
        return Djikstra(gridRef.current, gridStore.start, gridStore.end);
      default:
        return {
          path: [],
          visitedNodes: []
        };
    }
  }

  const handleFindPath = () => {
    if (gridStore.start && gridStore.end) {
      removeVisualisation();
      const { path, visitedNodes } = applyAlgo();
      visualizePath(path, visitedNodes);
    }
  };

  const handleReset = () => {
    gridStore.resetGrid();
    for (let row = 0; row < gridStore.rows; row++) {
      for (let col = 0; col < gridStore.columns; col++) {
        if (nodeRefs.current[row][col]) {
          nodeRefs.current[row][col].updateCell(0);
          gridRef.current[row][col] = 0;
        }
      }
    }
  };

  const GridHotKeyHandlers = {
    PUT_START: () => {
      gridStore.setActiveMode(ACTIVE_MODE.START);
    },
    PUT_END: () => {
      gridStore.setActiveMode(ACTIVE_MODE.END);
    },
    PUT_BLOCK: () => {
      gridStore.setActiveMode(ACTIVE_MODE.BLOCK);
    }
  }

  return (
    <HotKeys keyMap={GridHotKeyMaps} handlers={GridHotKeyHandlers}>
      <PageLayout>
        {/* Contains the grid */}
        {/* Since we added grid first, it will go backward */}
        <GridLayout
          gridStore={gridStore}
          nodeRefs={nodeRefs}
          handleMouseEnter={handleMouseEnter}
          handleMouseUp={handleMouseUp}
          handleMouseDown={handleMouseDown}
        />
        {/* Contains the control buttons and menu basically */}
        {/* This will overlap Grid Layout and hence both will co-exist peacefully due to grid template area */}
        <MainLayout
          handleFindPath={handleFindPath}
          handleReset={handleReset}
          setActiveMode={setActiveMode}
          gridStore={gridStore}
        />
      </PageLayout>
    </HotKeys>
  );
};

export default observer(PathVisualizer);
