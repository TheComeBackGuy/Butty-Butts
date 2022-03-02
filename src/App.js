import './index.css';

import React, { useEffect } from 'react';
import {
  cardsToCompare,
  currentBoardState,
  matchedObjects,
} from './data/atoms';
import { useRecoilSetState, useRecoilState } from 'recoil';

import Card from './Components/Card';
import styled from 'styled-components';
import { useState } from 'react';

const Logo = styled.h1`
  font-family: Oswald, sans;
  font-weight: 200;
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
  // const boardSize = 4;
  // const [flippedCount, setFlippedCount] = useState(0);
  const [cardsToCompareState, setCardsToCompareState] =
    useRecoilState(cardsToCompare);
  const [currentBoard, setCurrentBoard] = useRecoilState(currentBoardState);
  const [answerCreated, setAnswerCreated] = useState(false);
  const setMatchedObjectsState = useRecoilSetState(matchedObjects);

  useEffect(() => {
    // console.log('Count: ' + flippedCount);
    console.log(cardsToCompareState);
    //if you've flipped 2 cards
    if (cardsToCompareState.length === 2) {
      // cardsToCompareState.forEach((card) => {
      // console.log(document.querySelector(`#card${card[1]}`).firstChild);
      // console.log(card);
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
        console.log('NO MATCH');
      } else {
        // if they match, disable the buttons
        console.log('THEY MATCH');
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
  }, [cardsToCompareState, setCardsToCompareState, setMatchedObjectsState]);

  // useEffect(() => {
  //   console.log(currentBoard);
  // }, [currentBoard]);

  const cardColors = [
    'red',
    'orange',
    'green',
    'blue',
    'purple',
    'teal',
    'greenyellow',
    'darkred',
  ];

  function generateAnswer() {
    // create an answer array 16 entries long
    // each color gets 2 spaces
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
            id: i + increase,
            clicked: false,
            matched: false,
          });
        }
        increase = 8;
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

  /** @showBoard takes the answer array and displays it by plugging the values into Card components
   */
  function showBoard() {
    let board = [];
    if (answerCreated) {
      currentBoard.forEach((card, key) => {
        // console.log(card.color);
        board.push(<Card key={key} card={card} />);
      });
    }

    return board;
  }

  return (
    <div className="App">
      <Logo>FLIP</Logo>
      <GameContainer id="gameContainer">
        {showBoard()}
        {/* {cardColors.map((card, index) => (
          <CardContainer
            key={index}
            id={`card${index}`}
            onClick={(e) => {
              if (flippedCards.length < 2) {
                setFlippedCount(flippedCount + 1);
                console.log(card);
                setFlippedCards((flippedCards) => [
                  ...flippedCards,
                  [card, index],
                ]);
                e.currentTarget.firstChild.style.transform = 'rotateY(180deg)';
              }
              // console.log(e.currentTarget.firstChild.style.transform);
            }}
          >
            <CardInner id="inner" innerRef={childRef}>
              <CardFront
                style={{
                  color: card,
                  // backgroundColor: card
                }}
              ></CardFront>
              <CardBack style={{ backgroundColor: card }}>
                {/* <h1> {card[0].toUpperCase()}</h1> */}
        {/* </CardBack> */}
        {/* </CardInner> */}
        {/* // </CardContainer> */}
        {/* ))} */}
      </GameContainer>
    </div>
  );
}
