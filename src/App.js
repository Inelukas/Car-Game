import { GlobalStyle } from "./components/GlobalStyles/GlobalStyles";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Game } from "./components/Game/Game";
import styled from "styled-components";
import { useState } from "react";

const StyledBody = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;

  @media screen and (max-width: 900px) {
    width: 90vw;
    height: calc(90vw / 2);
    transform: rotate(90deg) translate(-50%, -50%);
    transform-origin: center;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%; /* Center after rotation */
  }
`;

function App() {
  const [level, setLevel] = useState(1);
  const [gameOn, setGameOn] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function handleGameLost(state) {
    setGameOver(state);
  }

  function handleNewGame() {
    setGameOn(!gameOn);
  }

  function handleLevel(state) {
    state === 1 ? setLevel(level + 1) : setLevel(1);
  }

  return (
    <>
      <GlobalStyle />
      <StyledBody>
        <Header level={level} gameOn={gameOn} gameOver={gameOver} />
        <Game
          onLevel={handleLevel}
          level={level}
          gameOn={gameOn}
          gameOver={gameOver}
          onGameLost={handleGameLost}
          onNewGame={handleNewGame}
        />
        <Footer gameOn={gameOn} />
      </StyledBody>
    </>
  );
}

export default App;
