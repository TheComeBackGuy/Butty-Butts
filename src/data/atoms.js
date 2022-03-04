import { atom, selector } from 'recoil';

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
  default: false,
});

export const isButtonActiveSelector = selector({
  key: 'is-button-active-selector',
  get: ({ get }) => {
    const toggle = get(toggleButtonState);
    if (toggle) {
      return get('flex');
    } else {
      return get('none');
    }
  },
});

export const levelNumberState = atom({
  key: 'round-number-state',
  default: 1,
});
export const totalNumberOfLevelsState = atom({
  key: 'total-number-of-levels-state',
  default: 2,
});
