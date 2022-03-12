import '../index.css';

import React, { useEffect, useRef } from 'react';
import {
  gameIsActiveState,
  levelNumberState,
  timeRecordsState,
  totalNumberOfLevelsState,
} from '../data/atoms';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import styled from 'styled-components';

const Summary = styled.section`
  position: absolute;
  top: 0px;
  left: 0px;
  display: none;
  background-color: rgba(255, 255, 255, 0.85);
  width: 100vw;
  height: 100vh;
  padding: 20px;
  border-radius: 15px;
  //   border: 3px solid red;

  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  z-index: 100;
  @media (max-width: 600px) {
    width: inherit;
  }
`;

const Congrats = styled.h1`
  color: var(--blue);
  font-size: 40px;
`;

const Button = styled.button`
  display: flex;
  margin: 30px auto;
  padding: 10px;
  border: 1px solid pink;
  background-color: white;
  color: pink;
  border-radius: 4px;
  cursor: pointer;
  transition: 1s ease-in-out;
  &:disabled {
    transition: 1s ease-in-out;
    display: none;
    // border: 1px solid lightgrey;
    // color: lightgrey;
  }
`;

export default function RoundSummary() {
  const [gameIsActive, setGameIsActive] = useRecoilState(gameIsActiveState);
  const level = useRecoilValue(levelNumberState);
  const time = useRecoilValue(timeRecordsState);
  const resetLevels = useResetRecoilState(levelNumberState);
  const totalNumberOfLevels = useRecoilValue(totalNumberOfLevelsState);
  const [levelNumber, setLevelNumber] = useRecoilState(levelNumberState);

  function handleLevelNumber() {
    if (levelNumber < totalNumberOfLevels) {
      setLevelNumber(levelNumber + 1);
    } else if (levelNumber === totalNumberOfLevels) {
      resetLevels();
    }
  }

  const successPage = useRef(null);

  useEffect(() => {
    if (gameIsActive) {
      console.log(`gameIsActive: true`);
      successPage.current.style.display = 'none';
    } else {
      successPage.current.style.display = 'flex';
      console.log(`gameIsActive: false`);
    }
  });

  return (
    <Summary ref={successPage}>
      <Congrats>Congratulations!</Congrats>
      <p>{`You beat level ${level}`}</p>
      <p>Time: {time[time.length - 1]}</p>
      <Button
        onClick={() => {
          setGameIsActive(true);
          handleLevelNumber();
        }}
      >
        Play Again
      </Button>
    </Summary>
  );
}
