import { atom } from 'recoil';

export const gameIsActiveState = atom({
  key: 'game-is-active-state',
  default: false,
});

export const clickNumber = atom({
  key: 'click-number',
  default: 0,
});

export const cardsToCompare = atom({
  key: 'cards-to-compare',
  default: [],
});

export const currentBoardState = atom({
  key: 'current-board-state',
  default: [],
});

export const matchedObjects = atom({
  key: 'matched-objects',
  default: [],
});

export const toggleButtonState = atom({
  key: 'toggle-button-state',
  default: 'none',
});

export const levelNumberState = atom({
  key: 'round-number-state',
  default: 1,
});
export const totalNumberOfLevelsState = atom({
  key: 'total-number-of-levels-state',
  default: 2,
});

export const volumeState = atom({
  key: 'volume-state',
  default: true,
});

export const timerState = atom({
  key: 'timer-state',
  default: false,
});
