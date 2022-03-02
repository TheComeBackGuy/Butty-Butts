import './index.css';

import React, { useEffect } from 'react';
import {
  cardsToCompare,
  currentBoardState,
  matchedObjects,
} from './data/atoms';

import Card from './Components/Card';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useState } from 'react';

const Logo = styled.h1`
  font-family: Oswald, sans;
  font-weight: 200;
  margin: 0 auto;
`;
const GameContainer = styled.section`
  display: flex;
  width: 500px;
  // aspect-ratio: 1/1;
  flex-flow: row wrap;
  margin: 0 auto;
  align-items: flex-start;
  justify-content: center;
`;

export default function App() {
  const [cardsToCompareState, setCardsToCompareState] =
    useRecoilState(cardsToCompare);
  const [currentBoard, setCurrentBoard] = useRecoilState(currentBoardState);
  const [answerCreated, setAnswerCreated] = useState(false);
  const [matchedObjectsState, setMatchedObjectsState] =
    useRecoilState(matchedObjects);

  useEffect(() => {
    // console.log('Count: ' + flippedCount);
    // console.log(cardsToCompareState);
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

  useEffect(() => {
    console.log(`MatchedObjects:  ${matchedObjectsState.length}`);
    console.log(`CurrentBoard:  ${currentBoard.length}`);

    // if the amount of answered boxes === the amount of boxes
    if (matchedObjectsState.length === currentBoard.length) {
      // end the game

      console.log('game is over');

      // causes delay in animation
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
    }
  }, [matchedObjectsState, currentBoard]);

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
    let board = [];
    if (answerCreated) {
      currentBoard.forEach((card, index) => {
        // console.log(card.color);
        board.push(<Card key={index} index={index} card={card} />);
      });
    }

    return board;
  }

  return (
    <div className="App">
      <Logo>FLIP</Logo>
      <GameContainer id="gameContainer">{showBoard()}</GameContainer>
      <button
        onClick={() => {
          generateAnswer();
        }}
      >
        Generate Answer
      </button>
    </div>
  );
}
