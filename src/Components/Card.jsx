import { cardsToCompare, matchedObjects } from '../data/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

import React from 'react';
import styled from 'styled-components';

// import { useState } from 'react';

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

const CardContainer = styled.button`
  position: relative;
  background-color: transparent;
  width: 100px;
  height: 100px;
  border: 2px solid black;
  perspective: 1000px;
  transition: 0.8s;
  transform-style: preserve-3d;
  border: none;
  margin: 5px 5px;
  &:hover ${CardInner} {
    cursor: pointer;
    /* transform: rotateY(180deg); */
    /* border: 3px solid red; */
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
  border: 1px solid lightblue;
  border-radius: 15px;
  backface-visibility: hidden;
`;

const CardBack = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg);
  border-radius: 15px;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
`;

export default function Card({ index, card }) {
  //   const [numberClicked, setNumberClicked] = useRecoilState(clickNumber);
  const [compareCards, setCompareCards] = useRecoilState(cardsToCompare);
  const matchedObjectsState = useRecoilValue(matchedObjects);

  const childRef = React.useRef();

  const currentlyClicked = compareCards.find(
    (element) => element.id === card.id
  );

  const alreadySolved = matchedObjectsState.find(
    (element) => element.id === card.id
  );

  return (
    <CardContainer
      id={card.id}
      onClick={(e) => {
        if (compareCards.length < 2 && !currentlyClicked && !alreadySolved) {
          //   setNumberClicked(numberClicked + 1);
          console.log(index);
          console.log(e);
          console.log('compareCards Array============');
          console.log(compareCards);
          setCompareCards((compareCards) => [...compareCards, card]);
          e.currentTarget.firstChild.style.transform = 'rotateY(180deg)';
        }
        // console.log(e.currentTarget.firstChild.style.transform);
      }}
    >
      <CardInner id="inner" innerRef={childRef}>
        <CardFront
          style={{
            color: card.color,
            // backgroundColor: card
          }}
        ></CardFront>
        <CardBack style={{ backgroundColor: card.color }}>
          {/* <h1> {card[0].toUpperCase()}</h1> */}
        </CardBack>
      </CardInner>
    </CardContainer>
  );
}
