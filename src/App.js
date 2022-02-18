import './index.css'

import styled from 'styled-components'

export default function App() {

  const Logo = styled.h1`
  font-family: 'Oswald', sans-serif;
    transform-origin: 50% 50%;
  `
  function LogoFlip(word) {
    return <Logo>{word}</Logo>;
  }

  return (
    <div className="App">
      <header className="App-header">
    {LogoFlip('FLIP')}
      </header>
    </div>
  );
}
