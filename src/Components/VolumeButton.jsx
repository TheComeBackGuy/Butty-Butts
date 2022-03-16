import { RiVolumeMuteLine, RiVolumeUpLine } from 'react-icons/ri';

import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { volumeState } from '../data/atoms';

const Volume = styled.button`
  border: none;
  background-color: transparent;
  color: #46b9ee;
  font-size: 20px;
  margin-right: 20px;
`;

export default function VolumeButton() {
  const [volumeUp, setVolumeUp] = useRecoilState(volumeState);

  function handleIcon() {
    if (volumeUp) {
      return <RiVolumeUpLine />;
    } else {
      return <RiVolumeMuteLine />;
    }
  }

  return (
    <Volume
      onClick={() => {
        setVolumeUp(!volumeUp);
        console.log(volumeUp);
      }}
    >
      {handleIcon()}
    </Volume>
  );
}
