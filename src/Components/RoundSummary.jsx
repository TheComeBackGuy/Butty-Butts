import '../index.css';

import {
  PicturePackLockState,
  gameIsActiveState,
  levelNumberState,
  timeRecordsState,
  totalNumberOfLevelsState,
} from '../data/atoms';
import React, { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import Confetti from 'canvas-confetti';
import Firework1 from '../sounds/firework1.mp3';
import Firework2 from '../sounds/firework2.mp3';
import Firework3 from '../sounds/firework3.mp3';
import styled from 'styled-components';
import useSound from 'use-sound';

// import useWindowSize from 'react-use/lib/useWindowSize';

const Summary = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  color: var(--blue);
  font-size: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  width: 100vw;
  height: 100vh;
  //   line-height: 2em;
  //   border: 1px solid red;
  padding: 20px;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  z-index: 100;
  trasition: 0.25s ease-in;
`;

const Congrats = styled.h1`
  color: var(--blue);
  font-size: 50px;
  margin-bottom: 0.5em;
`;

const Button = styled.button`
  display: flex;
  margin: 30px auto;
  padding: 10px;
  border: 3px solid white;
  background-color: #d75af2;
  color: white;
  font-size: 30px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.1s ease-in-out;

  &:hover {
    // transition: 1s ease-in-out;
    background-color: #9e5af2;
    // border: 3px solid white;
  }
`;

export default function RoundSummary() {
  const [gameIsActive, setGameIsActive] = useRecoilState(gameIsActiveState);
  const level = useRecoilValue(levelNumberState);
  const time = useRecoilValue(timeRecordsState);
  const resetLevels = useResetRecoilState(levelNumberState);
  const totalNumberOfLevels = useRecoilValue(totalNumberOfLevelsState);
  const [levelNumber, setLevelNumber] = useRecoilState(levelNumberState);
  const picturePack = useRecoilValue(PicturePackLockState);

  //explosions found here: www.fesliyanstudios.com
  const [playExplosion1] = useSound(Firework1);
  const [playExplosion2] = useSound(Firework2);
  const [playExplosion3] = useSound(Firework3);

  function handleLevelNumber() {
    console.log(`handleLevelNumber just ran and changed ${levelNumber}`);
    if (!picturePack) {
      if (parseInt(levelNumber) < totalNumberOfLevels) {
        setLevelNumber(parseInt(levelNumber) + 1);
      } else if (parseInt(levelNumber) === totalNumberOfLevels) {
        resetLevels();
      }
    }
    console.log(`to ${levelNumber}`);
  }

  const successPage = useRef(null);

  useEffect(() => {
    // setConfettiIsOn(false);
    // const confettiTimer = setInterval(() => {}, 1000);

    function playRandomFirework() {
      const firework = Math.floor(Math.random() * 3);
      switch (firework) {
        case 0:
          playExplosion1();
          break;
        case 1:
          playExplosion2();
          break;
        case 2:
          playExplosion3();
          break;
        default:
          break;
      }
    }

    function runFireworks() {
      console.log('FiIREWORKS!!!!');
      let duration = 2 * 1000;
      let animationEnd = Date.now() + duration;
      let defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
      };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }
      let interval = setInterval(function () {
        let timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        //   playExplosion();
        playRandomFirework();
        let particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        Confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            zIndex: 100,
          })
        );
        Confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            zIndex: 100,
          })
        );
      }, 250);
    }

    if (gameIsActive) {
      successPage.current.style.display = 'none';
    } else {
      successPage.current.style.display = 'flex';
      runFireworks();
    }
  }, [
    gameIsActive,
    playExplosion1,
    playExplosion2,
    playExplosion3,
    levelNumber,
  ]);

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
        PLAY AGAIN
      </Button>
    </Summary>
  );
}
