import { BsFillLockFill, BsFillUnlockFill } from 'react-icons/bs';

import { PicturePackLockState } from '../data/atoms';
import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

const Button = styled.button`
  color: var(--darkBlue);
  background-color: transparent;
  border-radius: 5px;
  border: none;
  font-size: 17px;
  padding: 3px;
`;

export default function LockPicturePack() {
  const [picturePack, setPicturePack] = useRecoilState(PicturePackLockState);

  function displayLock() {
    if (picturePack) {
      return <BsFillLockFill style={{ backgroundColor: 'transparent' }} />;
    }
    return <BsFillUnlockFill style={{ backgroundColor: 'transparent' }} />;
  }

  return (
    <Button onClick={() => setPicturePack(!picturePack)}>
      {displayLock()}
    </Button>
  );
}
