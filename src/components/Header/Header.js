import styled from "styled-components";

const StyledHeader = styled.header`
  display: grid;
  place-content: center;
  position: fixed;
  top: 0px;
  width: 100%;
  height: 10%;
  background: var(--side-color);
  color: var(--primary-color);
  z-index: 3;
`;

export function Header() {
  return (
    <StyledHeader>
      <h1>Car Game</h1>
    </StyledHeader>
  );
}
