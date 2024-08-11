import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledCar = styled.div`
  height: 50px;
  width: 100px;
  background: var(--tertiary-color);
  position: absolute;
  border-radius: 20px;
  bottom: ${({ $bottomcoor }) => $bottomcoor};
  left: ${({ $leftcoor }) => $leftcoor};
`;

function Car({
  id,
  positionCoor,
  onDeleteCar,
  playerPosition,
  onGameLost,
  level,
}) {
  const [leftcoor, setLeftCoor] = useState(0);

  useEffect(() => {
    function moveCar() {
      setLeftCoor(leftcoor + 10 * level);
    }

    if (leftcoor >= 375 && leftcoor <= 525 && playerPosition === positionCoor) {
      onGameLost();
    }

    if (leftcoor >= 910) {
      onDeleteCar(id);
    }

    const moveInterval = setInterval(moveCar, 100);
    return () => clearInterval(moveInterval);
  }, [
    leftcoor,
    id,
    onDeleteCar,
    onGameLost,
    playerPosition,
    positionCoor,
    level,
  ]);

  return (
    <StyledCar
      $bottomcoor={`${positionCoor}px`}
      $leftcoor={`${leftcoor}px`}
    ></StyledCar>
  );
}

export default Car;
