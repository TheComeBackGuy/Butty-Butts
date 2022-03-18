import React, { useEffect } from 'react';
import { levelNumberState, timerState } from '../data/atoms';
import { useRecoilState, useRecoilValue } from 'recoil';

import styled from 'styled-components';

const Select = styled.select`
  border: none;
  color: #1b7096;
  border-radius: 5px;
  padding: 3px;
  &:disabled {
    // border: 1px solid lightgrey;
    color: lightgrey;
  }
`;

export default function PicturePackSelector() {
  const [level, setLevel] = useRecoilState(levelNumberState);
  const timer = useRecoilValue(timerState);
  useEffect(() => {
    console.log(`Level changed to  ${level} by PicturePackSelector`);
  }, [level]);

  function handlePack(e) {
    e.preventDefault();
    setLevel(e.target.value);
  }
  if (!timer) {
    return (
      <form>
        <label>
          <Select value={level} onChange={handlePack}>
            <option value={parseInt(1)}>Butts 1</option>
            <option value={parseInt(2)}>Butts 2</option>
            <option value={parseInt(3)}>Animal Butts</option>
          </Select>
        </label>
      </form>
    );
  }
  return (
    <form>
      <label>
        <Select value={level} disabled onChange={handlePack}>
          <option value={1}>Butts 1</option>
          <option value={2}>Butts 2</option>
          <option value={3}>Animal Butts</option>
        </Select>
      </label>
    </form>
  );
}
