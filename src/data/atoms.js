import { atom, selector } from 'recoil';

export const PicturePackLockState = atom({
  key: 'picture-pack-lock-state',
  default: false,
});

export const boardCreatedState = atom({
  key: 'board-created-state',
  default: true,
});

export const gameIsActiveState = atom({
  key: 'game-is-active-state',
  default: true,
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
  default: 3,
});

export const LevelThemeSelector = selector({
  key: 'level-theme-selector',
  get: ({ get }) => {
    const currrentLevel = get(levelNumberState);

    switch (currrentLevel) {
      case 1:
        return 'Butts 1';
      case 2:
        return 'Butts 2';
      case 3:
        return 'Animal Butts';
      default:
        break;
    }
  },
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

export const TimeInSecondsSelector = selector({
  key: 'time-in-seconds-selector',
  get: ({ get }) => {
    let currentTime = get(currentTimerState);
    const timerStart = get(startTimerState);
    const difference = currentTime - timerStart;

    let seconds = Math.floor((difference / 1000) % 60);

    return seconds;
  },
});

export const TimerResultSelector = selector({
  key: 'time-results-selector',
  get: ({ get }) => {
    let currentTime = get(currentTimerState);
    const timerStart = get(startTimerState);
    // const startSeconds = Math.floor((timerStart / 1000) % 60);
    const difference = currentTime - timerStart;
    let seconds = Math.floor((difference / 1000) % 60);
    let minutes = Math.floor((difference / (1000 * 60)) % 60);

    /*** 
    a negative number initially displays, so seconds and minutes
    have to be seet to zero 
    * */
    if (seconds <= 0) {
      seconds = '0';
    }
    if (minutes <= 0) {
      minutes = '0';
    }

    //a zero is added if either number is lower than ten
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    return `${minutes}:${seconds}`;
  },
});

export const timeRecordsState = atom({
  key: 'time-records-state',
  default: [],
});
