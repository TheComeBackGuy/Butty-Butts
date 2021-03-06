import '../index.css';

import {
  cardsToCompare,
  gameIsActiveState,
  levelNumberState,
  matchedObjects,
  startTimerState,
  timerState,
  volumeState,
} from '../data/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

import React from 'react';
import bgTile from '../images/card-front.jpg';
import flip from '../sounds/flip.mp3';
import styled from 'styled-components';
import useSound from 'use-sound';

// import CardIcon from '../images/card-back.gif';

// import { useState } from 'react';

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
  transition: 0.3s ease-out;
`;

const CardContainer = styled.button`
  position: relative;
  background-color: transparent;
  width: 20%;
  min-width: 25px;
  // height: 100px;
  aspect-ratio: 1/1;
  perspective: 1000px;
  transform-style: preserve-3d;
  border: none;
  margin: 5px 5px;
  border-radius: 15px;
  filter: drop-shadow(0 0.1rem 0.15rem #fe8855);
  /* border: 3px solid red; */
  &:hover ${CardInner} {
    cursor: pointer;
    /* transform: rotateY(180deg); */
  }
`;
const CardFront = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: white;
  -webkit-backface-visibility: hidden; /* Safari */
  border: 3px solid white;
  border-radius: 15px;
  backface-visibility: hidden;
  background-image: url(${bgTile});
  background-repeat: no-repeat;
  background-size: 101%;
`;

const CardBack = styled.div`
  // box-shadow: 0px 5px 5px lightgrey;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  border: 3px solid white;
  border-radius: 15px;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
`;

export default function Card({ index, card }) {
  const [playFlip] = useSound(flip);
  const volumeUp = useRecoilValue(volumeState);
  const gameIsActive = useRecoilValue(gameIsActiveState);
  //   const [numberClicked, setNumberClicked] = useRecoilState(clickNumber);
  const [compareCards, setCompareCards] = useRecoilState(cardsToCompare);
  const matchedObjectsState = useRecoilValue(matchedObjects);
  const roundNumber = useRecoilValue(levelNumberState);
  const [timerIsOn, setTimerIsOn] = useRecoilState(timerState);
  const [startTime, setStartTime] = useRecoilState(startTimerState);

  // const [bgImage, setBgImage] = useState('');

  // let bgImage = { backgroundImage: `url(${this.state})` };

  const childRef = React.useRef();

  // looks to see if the you already clicked a square
  const currentlyClicked = compareCards.find(
    (element) => element.id === card.id
  );

  // looks to see if you already solved the square
  const alreadySolved = matchedObjectsState.find(
    (element) => element.id === card.id
  );

  return (
    <CardContainer
      id={card.id}
      onClick={(e) => {
        // start timer on first click
        if (!timerIsOn) {
          setStartTime(new Date().getTime());
          console.log('Start Time set for: ' + startTime);
          setTimerIsOn(true);
          console.log('timerIsOn fired');
        }

        //   if you've clicked two cards
        // and the one you clicked isn't already active or you haven't already solved it
        if (
          compareCards.length < 2 &&
          !currentlyClicked &&
          !alreadySolved &&
          gameIsActive
        ) {
          // push the card into the set to compare
          setCompareCards((compareCards) => [...compareCards, card]);
          e.currentTarget.firstChild.style.transform = 'rotateY(180deg)';
          e.currentTarget.firstChild.lastChild.style.backgroundImage = `url('../images/round${roundNumber}/${card.image}.jpg')`;
          e.currentTarget.firstChild.lastChild.style.backgroundSize = '100%';
          e.currentTarget.firstChild.lastChild.style.backgroundColor =
            card.color;
          if (volumeUp) {
            playFlip();
          }
          // console.log(e.currentTarget.firstChild.lastChild.style);
        } else {
          // e.currentTarget.firstChild.style.transform = 'rotateZ(180deg)';
        }
        // console.log(e.currentTarget.firstChild.style.transform);
      }}
    >
      <CardInner id="inner" innerRef={childRef}>
        <CardFront
          style={
            {
              // color: card.color,
              // backgroundColor: card
            }
          }
        >
          {/* <img src={CardIcon} alt="Butt Icon" /> */}
        </CardFront>
        <CardBack>{/* <h1> {card[0].toUpperCase()}</h1> */}</CardBack>
      </CardInner>
    </CardContainer>
  );
}
