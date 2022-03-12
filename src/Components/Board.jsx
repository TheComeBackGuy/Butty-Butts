import { useRecoilValue, useSetRecoilState } from 'recoil';

import Card from './Card';
import React from 'react';
import { boardCreatedState } from '../data/atoms';
import { currentBoardState } from '../data/atoms';

/*** @Board is always running */
export default function Board() {
  const currentBoard = useRecoilValue(currentBoardState);
  const setBoardCreated = useSetRecoilState(boardCreatedState);
  let board = [];

  currentBoard.forEach((card, index) => {
    board.push(<Card key={index} index={index} card={card} />);
  });
  console.log('showBoard component re-fired');
  setBoardCreated(true);
  return board;
}
