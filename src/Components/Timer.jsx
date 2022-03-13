import React, { useEffect } from 'react';
import {
  currentTimerState,
  timeInSecondsSelector,
  timerState,
} from '../data/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import styled from 'styled-components';

const TimerStyle = styled.div`
  margin: 20px 0 0 0;
  color: #46b9ee;
`;

export default function Timer() {
  const timer = useRecoilValue(timerState);
  const setCurrentTimer = useSetRecoilState(currentTimerState);
  const time = useRecoilValue(timeInSecondsSelector);

  useEffect(() => {
    if (timer) {
      const timer = setInterval(() => {
        setCurrentTimer(new Date().getTime());
        console.log('timer fired');
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  if (timer) {
    return <TimerStyle>{time}</TimerStyle>;
  } else {
    return <TimerStyle></TimerStyle>;
  }
}
