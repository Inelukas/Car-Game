import styled from "styled-components";

const StyledFooter = styled.footer`
  display: grid;
  place-content: center;
  position: fixed;
  text-align: center;
  bottom: 0px;
  width: 100vw;
  height: 10vh;
  background: var(--side-color);
  color: var(--primary-color);
  z-index: 2;
`;

export function Footer({ gameOn }) {
  return (
    <StyledFooter>
      {!gameOn ? (
        <h2>Copyright by Lukas Klipp</h2>
      ) : (
        <h1>Why did the smiley cross the road?</h1>
      )}
    </StyledFooter>
  );
}
