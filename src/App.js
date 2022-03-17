import './index.css';

import React, { useEffect } from 'react';
import {
  cardsToCompare,
  currentBoardState,
  gameIsActiveState,
  matchedObjects,
  timeInSecondsSelector,
  timeRecordsState,
  timerState,
  volumeState,
} from './data/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Board from './Components/Board';
import LockPicturePack from './Components/LockPicturePack';
import LogoImg from './images/logo.jpg';
import PicturePackSelector from './Components/PicturePackSelector';
import RoundSummary from './Components/RoundSummary';
import Timer from './Components/Timer';
import VolumeButton from './Components/VolumeButton';
import flip2 from './sounds/flip2.mp3';
import match from './sounds/matchBell.mp3';
import spin from './sounds/spin.mp3';
import styled from 'styled-components';
import useSound from 'use-sound';
// import { tada } from 'react-animations';
import { useState } from 'react';

const Logo = styled.img`
  // text-align: center;
  // font-family: 'Luckiest Guy', sans;
  // font-weight: 200;
  margin: 20px auto 0 auto;
  // color: #2dc4f6;
  // border: 1px solid purple;
`;

const GameContainer = styled.section`
  display: flex;
  // width: inherit;
  height: fit-content;
  min-width: 225px;
  flex-flow: row wrap;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: center;
  // border: 1px solid red;

  @media (max-width: 600px) {
    width: inherit;
  }
`;

const SettingsContainer = styled.ul`
  margin: 5px auto 20px auto;
  display: flex;
  flex-flow: row nowrap;
  list-style-type: none;
  align-items: flex-start;
  justify-content: center;
  // margin-right: 10px;
`;

export default function App() {
  const [playFlip] = useSound(flip2);
  const [playSpin] = useSound(spin);
  const [playMatch] = useSound(match);
  const volumeUp = useRecoilValue(volumeState);
  const setTimerIsOn = useSetRecoilState(timerState);
  const [showSubmitButton, setShowSubmitButton] = useState('none');
  const [cardsToCompareState, setCardsToCompareState] =
    useRecoilState(cardsToCompare);
  const [currentBoard, setCurrentBoard] = useRecoilState(currentBoardState);
  const [answerCreated, setAnswerCreated] = useState(false);
  const [matchedObjectsState, setMatchedObjectsState] =
    useRecoilState(matchedObjects);
  const [gameIsActive, setGameIsActive] = useRecoilState(gameIsActiveState);
  const setTimeRecord = useSetRecoilState(timeRecordsState);
  const time = useRecoilValue(timeInSecondsSelector);

  //starts initial game
  useEffect(() => {
    // setGameIsActive(true);

    function generateAnswer() {
      // if we haven't already created an answer
      if (!answerCreated && gameIsActive) {
        console.log('generateAnswer fired');
        const answer = [];

        //increase is there because the list of colors needs to be looped over twice so it has matches
        let increase = 0;
        for (let h = 0; h < 2; h++) {
          for (let i = 0; i < cardColors.length; i++) {
            // console.log(i);
            //create and push an object for each color
            answer.push({
              color: cardColors[i],
              image: i,
              // we're addingincrease to i so we have sequential id's to call later
              id: i + increase,
            });
          }
          increase = cardColors.length;
        }
        //return array
        // console.log(answer);

        // use the Fisher-yates shuffle to create a random answer
        shuffle(answer);
        setCurrentBoard(answer);

        // set to true so answer won't run again and cause an infinite loop
        setAnswerCreated(true);
      }
      // return;}
    }

    generateAnswer();
  });

  //constant checking for matches
  //pushes to a matchedObjects array if they match
  useEffect(() => {
    if (gameIsActive) {
      //if you've flipped 2 cards
      if (cardsToCompareState.length === 2) {
        console.log('useEffect fired to compare cards');
        //if the colors don't match
        if (cardsToCompareState[0].color !== cardsToCompareState[1].color) {
          cardsToCompareState.forEach((card) => {
            //wait a secondbefore flipping them back
            // console.log(document.getElementById(`${card.id}`));
            setTimeout(() => {
              document.getElementById(`${card.id}`).firstChild.style.transform =
                'rotateY(0deg)';
              if (volumeUp) {
                playFlip();
              }
            }, 800);
            setTimeout(() => {
              document.getElementById(
                `${card.id}`
              ).firstChild.lastChild.style.backgroundColor = 'transparent';
            }, 1200);
          });
          console.log('NO MATCH');
        } else {
          // if they match, throw the objects into an array of solved objects
          console.log('THEY MATCH');
          cardsToCompareState.forEach((card) => {
            setTimeout(() => {
              document.getElementById(`${card.id}`).firstChild.style.transform =
                'rotateY(540deg)';
              if (volumeUp) {
                playSpin();
                playMatch();
              }
            }, 800);
            setMatchedObjectsState((matchedObjectsState) => [
              ...matchedObjectsState,
              card,
            ]);
          });
          console.log(matchedObjectsState);
        }
        // });

        setCardsToCompareState([]);
        // setFlippedCount(0);
      }
    }
  }, [
    cardsToCompareState,
    setCardsToCompareState,
    currentBoard,
    matchedObjectsState,
    setMatchedObjectsState,
    gameIsActive,
    playFlip,
    playMatch,
    playSpin,
    volumeUp,
  ]);

  // checking for the end of the game
  useEffect(() => {
    console.log('useEffect fired to check end of game');
    // if the amount of answered boxes === the amount of boxes
    if (matchedObjectsState.length === 16) {
      // end the game
      console.log('game is over');
      setTimeRecord((timeRecord) => [...timeRecord, time]);
      let increaseTime = 0;
      for (let i = 0; i < currentBoard.length; i++) {
        // console.log(matchedObjectsState.indexOf(matchedObjectsState[i]));
        console.log(currentBoard[i].id);
        setTimeout(() => {
          // currentBoard[i].firstChild.style.transform = 'rotateY(0deg)';
          document.getElementById(
            `${[currentBoard[i].id]}`
          ).firstChild.style.transform = 'rotateY(0deg)';
        }, 800 + increaseTime);
        increaseTime += 20;
      }
      setTimeout(() => {
        setShowSubmitButton('flex');
        console.log('this is the timed button turning on. ');
      }, 1500);

      setMatchedObjectsState([]);
      setTimerIsOn(false);
      setGameIsActive(false);
    }
  }, [
    matchedObjectsState,
    currentBoard,
    showSubmitButton,
    setCurrentBoard,
    setMatchedObjectsState,
    setGameIsActive,
    gameIsActive,
    setTimerIsOn,
    setTimeRecord,
    time,
  ]);

  const cardColors = [
    'red',
    'orange',
    'green',
    'blue',
    'purple',
    'pink',
    'greenyellow',
    'darkred',
  ];

  // Fisher-Yates shuffle code found here:  https://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
    var m = array.length,
      t,
      i;

    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  }

  // /** @showBoard takes the answer array and displays it by plugging the values into Card components
  //  */
  // function showBoard() {
  //   // document.getElementById('playAgain').style.display = 'flex';

  //   let board = [];
  //   if (answerCreated && gameIsActive) {
  //     currentBoard.forEach((card, index) => {
  //       // console.log(card.color);
  //       board.push(<Card key={index} index={index} card={card} />);
  //     });
  //   }
  //   console.log('showBoard fired');
  //   return board;
  // }

  // function runs to initiate game start
  // function startGame() {
  //   // setGameIsActive(true);
  //   setTimerIsOn(true);
  //   setCurrentBoard([]);
  //   setAnswerCreated(false);
  //   setShowSubmitButton('none');
  //   generateAnswer();
  // }

  return (
    <div className="App">
      <RoundSummary />

      <Logo src={LogoImg} alt="Btty Butts" />
      {/* <Subtitle>Picture Pack: {levelNumber}</Subtitle> */}

      <SettingsContainer>
        <li style={{ marginRight: '20px' }}>
          <VolumeButton />
        </li>
        <li style={{ marginRight: '20px' }}>
          <PicturePackSelector />
        </li>
        <li>
          <LockPicturePack />
        </li>
      </SettingsContainer>
      <GameContainer id="gameContainer">
        <Board />
      </GameContainer>
      {/* {submitButton()} */}

      <Timer />
    </div>
  );
}
