import { currentBoardState, gameIsActiveState } from '../data/atoms';

import Card from './Card';
import React from 'react';
import { useRecoilValue } from 'recoil';

export default function Board() {
  //   const answerCreated = useRecoilValue(answerCreated);
  const gameIsActive = useRecoilValue(gameIsActiveState);
  const currentBoard = useRecoilValue(currentBoardState);
  // document.getElementById('playAgain').style.display = 'flex';

  let board = [];
  //   if (gameIsActive) {
  currentBoard.forEach((card, index) => {
    // console.log(card.color);
    board.push(<Card key={index} index={index} card={card} />);
  });
  //   }
  console.log('showBoard component re-fired');
  return board;
}
