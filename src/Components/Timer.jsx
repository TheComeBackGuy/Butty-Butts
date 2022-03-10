import React, { useEffect, useState } from 'react';
import {
  currentTimerState,
  gameIsActiveState,
  startTimerState,
  timeInSecondsSelector,
  timerState,
} from '../data/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

import styled from 'styled-components';

const TimerStyle = styled.div`
  margin: 20px 0 0 0;
  color: #46b9ee;
`;

export default function Timer() {
  const timer = useRecoilValue(timerState);
  const [startTime, setStartTime] = useRecoilState(startTimerState);
  const [currentTimer, setCurrentTimer] = useRecoilState(currentTimerState);
  const time = useRecoilValue(timeInSecondsSelector);
  //   const gameIsActive = useRecoilValue(gameIsActiveState);

  //   const [manualSecond, setManualSecond] = useState(0);
  //   const [manualMinute, setManualMinute] = useState(0);

  useEffect(() => {
    if (timer) {
      const timer = setInterval(() => {
        console.log('secondAdded fired x ' + currentTimer);
        setCurrentTimer(new Date().getTime());
        // setCurrentTimer(currentTimer + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  });

  if (timer) {
    return (
      <>
        {/* <TimerStyle>{manualMinute}</TimerStyle> */}

        <TimerStyle>{time}</TimerStyle>
      </>
    );
  } else {
    return <TimerStyle>Timer is off</TimerStyle>;
  }
}
