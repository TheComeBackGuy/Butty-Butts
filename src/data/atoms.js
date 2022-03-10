import { atom, selector } from 'recoil';

export const boardCreatedState = atom({
  key: 'board-created-state',
  default: true,
});

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

//timer atoms
export const timerState = atom({
  key: 'timer-state',
  default: false,
});

export const startTimerState = atom({
  key: 'start-timer-state',
  default: null,
});

export const endTimerState = atom({
  key: 'end-timer-state',
  default: null,
});

export const currentTimerState = atom({
  key: 'current-timer-state',
  default: null,
});

export const timeInSecondsSelector = selector({
  key: 'time-in-seconds-selector',
  get: ({ get }) => {
    let currentTime = get(currentTimerState);
    const timerStart = get(startTimerState);
    // const startSeconds = Math.floor((timerStart / 1000) % 60);
    const difference = currentTime - timerStart;
    let seconds = Math.floor((difference / 1000) % 60);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (seconds <= 0) {
      seconds = '00';
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (minutes <= 0) {
      minutes = '00';
    }

    return `${minutes}:${seconds}`;
  },
});

// export const timeInMinutesSelector = selector({
//   key: 'time-in-minutes-selector',
//   get: ({ get }) => {
//     const currentTime = get(currentTimerState);
//     const timerStart = get(startTimerState);
//     const difference = currentTime - timerStart;

//     return Math.round(difference);
//   },
// });
