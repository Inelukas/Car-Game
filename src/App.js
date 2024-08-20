import { GlobalStyle } from "./components/GlobalStyles/GlobalStyles";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Game } from "./components/Game/Game";
import styled from "styled-components";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

const StyledBody = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;
`;

function App() {
  const [level, setLevel] = useState(1);
  const [gameOn, setGameOn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highscore, setHighscore] = useLocalStorageState("highscore", {
    defaultValue: "",
  });

  function handleGameLost(state) {
    if (level > highscore) {
      setHighscore(level);
    }
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
          highscore={highscore}
        />
        <Footer gameOn={gameOn} />
      </StyledBody>
    </>
  );
}

export default App;
