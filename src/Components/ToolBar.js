import React from 'react';
import styled from 'styled-components';
import ButtonGroup from './Norman/Button/ButtonGroup';
import IconButton from './Norman/Button/IconButton';
import { ACTIVE_MODE } from '../Constants/Constants';
import { FaPersonWalkingLuggage } from "react-icons/fa6";
import { TbBarrierBlockFilled } from "react-icons/tb";
import { RiHome5Fill } from "react-icons/ri";
import Tooltip from './Norman/Tooltip/Tooltip';

const ToolBarLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 8px;
  height: 100%;
  box-sizing: border-box;
`;

const ToolBarContainer = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 4px;
  justify-content: space-between;
  pointer-events: auto;
  box-shadow: 0px 2px 10px rgba(5, 0, 56, 0.08);
`;

const CustomTooltipText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CodeText = styled.div`
  background: #343741;
  padding: 4px 8px;
  border-radius: 4px;
`;

function ToolBar({ setActiveMode, activeMode }) {
  return (
    <ToolBarLayout>
      <ToolBarContainer>
        <ButtonGroup
            direction='column'
        >
          <Tooltip
            text={
                <CustomTooltipText>
                <div>
                  Put start &nbsp;
                </div>
                <CodeText>
                  S
                </CodeText>
              </CustomTooltipText>
            } 
            position="right"
          >
            <IconButton
                icon={<FaPersonWalkingLuggage />}
                onClick={() => setActiveMode(ACTIVE_MODE.START)}
                selected={activeMode === ACTIVE_MODE.START}
            />
          </Tooltip>
          <Tooltip
            text={
                <CustomTooltipText>
                <div>
                  Put end &nbsp;
                </div>
                <CodeText>
                  E
                </CodeText>
              </CustomTooltipText>
            } 
            position="right"
          >
            <IconButton
                icon={<RiHome5Fill />}
                onClick={() => setActiveMode(ACTIVE_MODE.END)}
                selected={activeMode === ACTIVE_MODE.END}
            />
          </Tooltip>
          <Tooltip
            text={
                <CustomTooltipText>
                <div>
                  Put blockers &nbsp;
                </div>
                <CodeText>
                  B
                </CodeText>
              </CustomTooltipText>
            } 
            position="right"
          >
            <IconButton
                icon={<TbBarrierBlockFilled />}
                onClick={() => setActiveMode(ACTIVE_MODE.BLOCK)}
                selected={activeMode === ACTIVE_MODE.BLOCK}
            />
          </Tooltip>
        </ButtonGroup>
      </ToolBarContainer>
    </ToolBarLayout>
  );
}

export default ToolBar;
