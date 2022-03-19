import React, { useEffect, useRef } from 'react';

import ClockBg from '../images/clockbg.gif';
import SecondHand from '../images/second-hand.svg';
import { TimeInSecondsSelector } from '../data/atoms';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

const ClockContainer = styled.div`
  display: flex;
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 25px;
  border: 3px solid #1b7096;
  background-color: white;
  justify-content: center;
  background-image: url('${ClockBg}');
  background-size: 100%;
  z-index: 15;
`;

const SecondHandImg = styled.img`
  height: 18px;
  transform: rotate(360deg);
  transform-origin: bottom center;
  color: var(--darkBlue);
  //   transition: 0.2s ease-in-out;
`;

export default function Clock() {
  const secondHandRef = useRef(null);
  const seconds = useRecoilValue(TimeInSecondsSelector);

  

  useEffect(() => {
    console.log(secondHandRef.current.style);

    secondHandRef.current.style.transform = `rotate(${seconds * 6}deg)`;
  }, [seconds]);

  return (
    <ClockContainer>
      <SecondHandImg ref={secondHandRef} src={SecondHand} alt="" />
    </ClockContainer>
  );
}
