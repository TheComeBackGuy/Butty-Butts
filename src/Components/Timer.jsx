import React, { useEffect } from 'react';
import {
  TimerResultSelector,
  currentTimerState,
  timerState,
} from '../data/atoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Clock from './Clock';
import styled from 'styled-components';

const TimerStyle = styled.div`
  width: fit-content;
  background-color: var(--blue);
  color: white;
  margin-left: -20px;
  border: 3px solid #1b7096;
  border-radius: 10px;
  padding: 7px 7px 7px 25px;
`;

const TimerContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 20px auto;
  align-items: center;
  justify-content: center;
`;

export default function Timer() {
  const timer = useRecoilValue(timerState);
  const setCurrentTimer = useSetRecoilState(currentTimerState);
  const time = useRecoilValue(TimerResultSelector);

  useEffect(() => {
    if (timer) {
      const timer = setInterval(() => {
        setCurrentTimer(new Date().getTime());
        // console.log('timer fired');
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  if (timer) {
    return (
      <TimerContainer>
        <Clock />
        <TimerStyle>{time}</TimerStyle>
      </TimerContainer>
    );
  } else {
    return <></>;
  }
}
