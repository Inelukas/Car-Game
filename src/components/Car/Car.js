import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledCar = styled.div`
  height: 50px;
  width: 100px;
  background: ${({ $color }) => $color};
  position: absolute;
  border-radius: 20px;
  bottom: ${({ $bottomcoor }) => $bottomcoor};
  left: ${({ $sidecoor, $side }) => ($side === 0 ? $sidecoor : "none")};
  right: ${({ $sidecoor, $side }) => ($side === 1 ? $sidecoor : "none")};
`;

export function Car({
  id,
  positionCoor,
  color,
  side,
  onDeleteCar,
  playerPosition,
  onGameLost,
  level,
}) {
  const [sidecoor, setLeftCoor] = useState(0);

  useEffect(() => {
    function moveCar() {
      setLeftCoor(sidecoor + 10 * level);
    }

    if (sidecoor >= 375 && sidecoor <= 525 && playerPosition === positionCoor) {
      onGameLost();
    }

    if (sidecoor >= 910) {
      onDeleteCar(id);
    }

    const moveInterval = setInterval(moveCar, 100);
    return () => clearInterval(moveInterval);
  }, [
    sidecoor,
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
      $sidecoor={`${sidecoor}px`}
      $color={color}
      $side={side}
    ></StyledCar>
  );
}
