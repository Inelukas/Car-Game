import { GlobalStyle } from "./components/GlobalStyles/GlobalStyles";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Game } from "./components/Game/Game";
import styled from "styled-components";

const StyledBody = styled.div`
  display: grid;
  place-content: center;
  height: 100vh;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <StyledBody>
        <Header />
        <Game />
        <Footer />
      </StyledBody>
    </>
  );
}

export default App;
