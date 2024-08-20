import styled from "styled-components";
import { answers } from "../../lib/data";
import { useEffect, useState } from "react";

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
  text-align: center;
  padding: 10px;

  .text-container {
    width: 100%;
    max-width: 90%;
    margin: 0 auto;
    word-wrap: break-word;
  }

  h1 {
    font-size: clamp(0.75rem, 3vw, 1.5rem);
    margin: 0;
    padding: 0;
    white-space: normal;
    overflow: hidden;
    width: 100%;
    line-height: 1.2;
  }
`;

export function Header({ level, gameOn, gameOver }) {
  const [answer, setAnswer] = useState();

  useEffect(() => {
    const currentAnswer = answers[Math.floor(Math.random() * answers.length)];
    setAnswer(currentAnswer);
  }, [level]);

  return (
    <StyledHeader>
      <div className="text-container">
        {!gameOn ? (
          <h1>Why did the smiley cross the road?</h1>
        ) : !gameOver && level > 1 ? (
          <h1 className="answer">{answer}</h1>
        ) : gameOver ? (
          <h1>ERNEST HEMINGWAY: To die. In the rain. Alone.</h1>
        ) : null}
      </div>
    </StyledHeader>
  );
}
