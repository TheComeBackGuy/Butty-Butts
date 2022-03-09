import React from 'react';
import styled from 'styled-components';
import { timerState } from '../data/atoms';
import { useRecoilValue } from 'recoil';

const TimerStyle = styled.div`
  margin: 20px 0 0 0;
  color: #46b9ee;
`;

export default function Timer() {
  const timer = useRecoilValue(timerState);

  if (timer) {
    return <TimerStyle>Timer is on</TimerStyle>;
  } else {
    return <TimerStyle>Timer is off</TimerStyle>;
  }
}
