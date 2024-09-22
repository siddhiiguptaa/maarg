import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import IconButton from './Norman/Button/IconButton';
import ButtonGroup from './Norman/Button/ButtonGroup';
import Separator from './Norman/Separator/Separator';
import { FaPlay } from "react-icons/fa6";
import { BiReset } from "react-icons/bi";
import Tooltip from './Norman/Tooltip/Tooltip';
import Menu from './Norman/Menu/Menu';
import { ALGORITHMS } from '../Constants/Constants';

const NavBarLayout = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
`;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  gap: 12px;
  background: white;
  border-radius: 4px;
  pointer-events: auto;
  box-shadow: 0px 2px 10px rgba(5, 0, 56, 0.08);
`;

const TitleTextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  height: 48px;
  padding: 0 16px;
`;

const TitleText = styled.div`
  font-size: 26px;
`;

function NavBar({ gridStore, handleFindPath, handleReset, setActiveMode }) {
  const AlgoMenuOptions = [
    {
      label: 'BFS',
      onClick: () => { gridStore.setAlgo(ALGORITHMS.BFS) }
    },
    {
      label: 'DFS',
      onClick: () => { gridStore.setAlgo(ALGORITHMS.DFS) }
    },
    {
      label: 'Djikstra',
      onClick: () => { gridStore.setAlgo(ALGORITHMS.DJIKSTRA) }
    }
  ];

  const IntervalOptions = [
    {
      label: '1',
      onClick: () => { gridStore.setInterval(1) }
    },
    {
      label: '10',
      onClick: () => { gridStore.setInterval(10) }
    },
    {
      label: '20',
      onClick: () => { gridStore.setInterval(20) }
    },
    {
      label: '50',
      onClick: () => { gridStore.setInterval(50) }
    },
    {
      label: '100',
      onClick: () => { gridStore.setInterval(100) }
    },
    {
      label: '200',
      onClick: () => { gridStore.setInterval(200) }
    },
    {
      label: '500',
      onClick: () => { gridStore.setInterval(500) }
    },
    {
      label: '1000',
      onClick: () => { gridStore.setInterval(1000) }
    }
  ];

  return (
    <NavBarLayout>
      <NavBarContainer>
        <TitleTextContainer>
          <TitleText>maarg</TitleText>
        </TitleTextContainer>
        <Separator />
        <Menu 
          options={AlgoMenuOptions}
          selectedOption={0}
        />
        <Separator />
        <Menu 
          options={IntervalOptions}
          selectedOption={0}
          unit='ms'
        />
        <Separator />
        <ButtonGroup>
          <Tooltip 
            text='Start visualisation'
            position='bottom'
          >
            <IconButton
              icon={<FaPlay />}
              onClick={handleFindPath}
              disabled={gridStore.isAnimating}
            />
          </Tooltip>
          <Tooltip 
            text='Reset grid'
            position='bottom'
          >
            <IconButton 
              icon={<BiReset />}
              onClick={handleReset}   
            />
          </Tooltip>
        </ButtonGroup>
      </NavBarContainer>
    </NavBarLayout>
  );
}

export default observer(NavBar);
