import React from 'react';
import NavBar from './NavBar';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import ToolBar from './ToolBar';

const MainContainer = styled.div`
  grid-area: pageLayout; // this is an identifier so it can't be in quotes
  pointer-events: none;
  padding: 8px;

  display: grid;
  grid-template-columns: min-content 1fr; // min-content & auto work in the same way
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header header'
    'asideLeft content';
`;

const Header = styled.div`
  grid-area: header;
`;

const AsideLeft = styled.div`
  grid-area: asideLeft;
`;

function MainLayout({ handleFindPath, handleReset, setActiveMode, gridStore }) {
  return (
    <MainContainer>
      <Header>
        <NavBar
          handleFindPath={handleFindPath}
          handleReset={handleReset}
          gridStore={gridStore}
        />
      </Header>
      <AsideLeft>
        <ToolBar 
          setActiveMode={setActiveMode}
          activeMode={gridStore.activeMode}
        />
      </AsideLeft>
    </MainContainer>
  );
}

export default observer(MainLayout);
