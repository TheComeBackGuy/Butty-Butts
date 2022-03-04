import './index.css';

import React, { useEffect } from 'react';
import {
  cardsToCompare,
  currentBoardState,
  levelNumberState,
  matchedObjects,
  totalNumberOfLevelsState,
} from './data/atoms';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import Card from './Components/Card';
import LogoImg from './images/logo.jpg';
import styled from 'styled-components';
import { useState } from 'react';

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

const Logo = styled.img`
  // text-align: center;
  // font-family: 'Luckiest Guy', sans;
  // font-weight: 200;
  margin: 20px auto 0 auto;
  // color: #2dc4f6;
  // border: 1px solid purple;
`;

const Subtitle = styled.h2`
  text-align: center;
  font-family: Oswald, sans;
  font-size: 17px;
  font-weight: 100;
  margin: -10px auto 10px auto;
  color: #2dc4f6;
`;

const GameContainer = styled.section`
  display: flex;
  width: 100%;
  min-width: 225px;
  // aspect-ratio: 1/1;
  flex-flow: row wrap;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: center;
  // border: 1px solid red;
  @media (max-width: 600px) {
    width: inherit;
  }
`;

export default function App() {
  const [showSubmitButton, setShowSubmitButton] = useState('none');
  const [cardsToCompareState, setCardsToCompareState] =
    useRecoilState(cardsToCompare);
  const [currentBoard, setCurrentBoard] = useRecoilState(currentBoardState);
  const [answerCreated, setAnswerCreated] = useState(false);
  const [matchedObjectsState, setMatchedObjectsState] =
    useRecoilState(matchedObjects);
  const [levelNumber, setLevelNumber] = useRecoilState(levelNumberState);
  const resetLevels = useResetRecoilState(levelNumberState);
  const totalNumberOfLevels = useRecoilValue(totalNumberOfLevelsState);

  //constant checking for matches
  useEffect(() => {
    //if you've flipped 2 cards
    if (cardsToCompareState.length === 2) {
      //if the colors don't match
      if (cardsToCompareState[0].color !== cardsToCompareState[1].color) {
        cardsToCompareState.forEach((card) => {
          //wait a secondbefore flipping them back
          console.log(document.getElementById(`${card.id}`));
          setTimeout(() => {
            document.getElementById(`${card.id}`).firstChild.style.transform =
              'rotateY(0deg)';
          }, 800);
          setTimeout(() => {
            document.getElementById(
              `${card.id}`
            ).firstChild.lastChild.style.backgroundColor = 'transparent';
          }, 1200);
        });
        // console.log('NO MATCH');
      } else {
        // if they match, throw the objects into an array of solved objects
        // console.log('THEY MATCH');
        cardsToCompareState.forEach((card) => {
          setMatchedObjectsState((matchedObjectsState) => [
            ...matchedObjectsState,
            card,
          ]);
        });
      }
      // });

      setCardsToCompareState([]);
      // setFlippedCount(0);
    }
  }, [
    cardsToCompareState,
    setCardsToCompareState,
    currentBoard,
    matchedObjectsState,
    setMatchedObjectsState,
  ]);

  // checking for the end of the game
  useEffect(() => {
    console.log('useEffect fired again');
    // if the amount of answered boxes === the amount of boxes
    if (matchedObjectsState.length === 16) {
      // end the game
      console.log('game is over');

      setAnswerCreated(false);
      // causes delay in animation of tiles
      let increaseTime = 0;
      for (let i = 0; i < matchedObjectsState.length; i++) {
        // console.log(matchedObjectsState.indexOf(matchedObjectsState[i]));
        setTimeout(() => {
          document.getElementById(
            `${[currentBoard[i].id]}`
          ).firstChild.style.transform = 'rotateY(0deg)';
        }, 800 + increaseTime);
        increaseTime += 25;
      }
      setTimeout(() => {
        setShowSubmitButton('flex');
        console.log('this is the timed button turning on. ');
      }, 1500);
      setCurrentBoard([]);
      setMatchedObjectsState([]);
    }
  }, [
    matchedObjectsState,
    currentBoard,
    showSubmitButton,
    setCurrentBoard,
    setMatchedObjectsState,
  ]);

  useEffect(() => []);

  function handleLevelNumber() {
    if (levelNumber < totalNumberOfLevels) {
      setLevelNumber(levelNumber + 1);
    } else if (levelNumber === totalNumberOfLevels) {
      resetLevels();
    }
  }

  // function submitButton() {
  //   if (showSubmitButton) {
  //     return (
  //       <Button
  //         id="playAgain"
  //         onClick={() => {
  //           // generateAnswer();

  //         }}
  //       >
  //         Play Again?
  //       </Button>
  //     );
  //   }
  // }

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

  // const butts = [
  //   'butt(1)',
  //   'butt(2)',
  //   'butt(3)',
  //   'butt(4)',
  //   'butt(5)',
  //   'butt(6)',
  //   'butt(7)',
  //   'butt(8)',
  // ];

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

  function generateAnswer() {
    // if we haven't already created an answer
    if (!answerCreated) {
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
      console.log(answer);

      // use the Fisher-yates shuffle to create a random answer
      shuffle(answer);
      setCurrentBoard(answer);

      // set to true so answer won't run again and cause an infinite loop
      setAnswerCreated(true);
    }
    // return;}
  }
  generateAnswer();

  /** @showBoard takes the answer array and displays it by plugging the values into Card components
   */
  function showBoard() {
    // document.getElementById('playAgain').style.display = 'flex';

    let board = [];
    if (answerCreated) {
      currentBoard.forEach((card, index) => {
        // console.log(card.color);
        board.push(<Card key={index} index={index} card={card} />);
      });
    }
    console.log('showBoard fired');
    return board;
  }

  return (
    <div className="App">
      <Logo src={LogoImg} alt="Btty Butts" />
      <Subtitle>Picture Pack: {levelNumber}</Subtitle>

      <GameContainer id="gameContainer">{showBoard()}</GameContainer>
      {/* {submitButton()} */}
      <Button
        onClick={() => {
          setShowSubmitButton('none');
          handleLevelNumber();
          generateAnswer();
          showBoard();
          console.log('just shut button off');
        }}
        style={{ display: showSubmitButton }}
      >
        Keep Playing?
      </Button>
    </div>
  );
}
