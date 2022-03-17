import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs';
import React, { useEffect } from 'react';

import { PicturePackLockState } from '../data/atoms';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

const Button = styled.button`
  color: var(--blue);
  background-color: white;
  //   border-radius: 4px;
  border: none;
  font-size: 17px;
  padding: 3px;
`;

export default function LockPicturePack() {
  const [picturePack, setPicturePack] = useRecoilState(PicturePackLockState);

  function displayLock() {
    if (picturePack) {
      return <BsFillLockFill />;
    }
    return <BsFillUnlockFill />;
  }

  return (
    <Button onClick={() => setPicturePack(!picturePack)}>
      {displayLock()}
    </Button>
  );
}
