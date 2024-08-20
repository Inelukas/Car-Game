import { useEffect, useRef } from "react";
import styled from "styled-components";

const StyledPlayer = styled.div`
  height: 50px;
  width: 50px;
  position: absolute;
  outline: none;
  bottom: ${({ $bottomcoor }) => $bottomcoor};
  left: 475px;
  font-size: 50px;

  .icon {
    position: absolute;
    top: -6px;
  }
`;

export function Player({ playerPosition, onMove, level }) {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.focus();
    }
  }, [playerPosition]);

  useEffect(() => {
    function handleBlur() {
      if (playerRef.current) {
        playerRef.current.focus();
      }
    }

    const playerElement = playerRef.current;
    if (playerElement) {
      playerElement.addEventListener("blur", handleBlur);
    }

    return () => {
      if (playerElement) {
        playerElement.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

  return (
    <StyledPlayer
      ref={playerRef}
      tabIndex={0}
      onKeyDown={onMove}
      $bottomcoor={`${playerPosition}px`}
    >
      <div className="icon">
        {level < 4 && "😎"}
        {level >= 4 && level < 6 && "😳"}
        {level >= 6 && level < 9 && "😨"}
        {level >= 9 && "😱"}
      </div>
    </StyledPlayer>
  );
}
