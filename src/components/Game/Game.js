import styled from "styled-components";
import { Car } from "../Car/Car";
import { Player } from "../Player/Player";
import { useEffect, useState } from "react";
import { uid } from "uid";

const StyledScreen = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;

  .countdown {
    display: flex;
    height: 50vh;
    justify-content: center;
    align-items: center;
    font-size: 80px;
    z-index: 2;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    gap: 10vh;

    .button {
      display: grid;
      place-content: center;
      font-size: 30px;
      width: 60px;
      height: 60px;
      background: white;
      border-radius: 100px;
      cursor: pointer;
    }
    @media screen and (max-width: 1200px) {
      flex-direction: row;
      position: absolute;
      bottom: -5vh;
      left: 35%;
      z-index: 2;
      gap: 20vw;
    }

    @media screen and (max-width: 900px) {
      gap: 30vw;
    }
    @media screen and (max-width: 600px) {
      gap: 40vw;
    }
  }

  @media screen and (max-width: 1200px) {
    transform: scale(0.9);
  }

  @media screen and (max-width: 900px) {
    transform: scale(0.6);
  }

  @media screen and (max-width: 600px) {
    transform: scale(0.5);
  }
`;

const StyledGame = styled.div`
  height: 500px;
  width: 1000px;
  border-radius: 20px;
  background-color: var(--secondary-color);
  background-image: var(--custom-image-2);
  position: relative;
`;

const GameOverScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 10vh;
  color: var(--side-color);

  .gameover-buttons {
    display: flex;
    gap: 100px;

    button {
      width: 50px;
      height: 30px;
      border-radius: 20px;
      background: var(--side-color);
    }
  }
`;

const StartingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8vh;
  color: var(--side-color);

  button {
    width: 150px;
    height: 60px;
    border-radius: 20px;
    background: var(--side-color);
  }
`;

export function Game({
  level,
  onLevel,
  gameOn,
  gameOver,
  onGameLost,
  onNewGame,
  highscore,
}) {
  const [cars, setCars] = useState([]);
  const [playerPosition, setPlayerPosition] = useState(-50);
  const [canMove, setCanMove] = useState(false);
  const [seconds, setSeconds] = useState(3);

  const colorArray = [
    "red",
    "blue",
    "yellow",
    "green",
    "orange",
    "black",
    "white",
    "purple",
    "pink",
    "gray",
  ];

  useEffect(() => {
    if (seconds <= 0) {
      setCanMove(true);
    }
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  useEffect(() => {
    function createCar() {
      if (cars.length < 40) {
        const randomColor = Math.floor(Math.random() * 10);
        const randomSide = Math.floor(Math.random() * 2);
        const randomPosition = Math.floor(Math.random() * 10);
        const carId = uid();
        const newCar = {
          pos: randomPosition * 50,
          id: carId,
          color: colorArray[randomColor],
          side: randomSide,
        };
        setCars((prevCars) => [...prevCars, newCar]);
      }
    }

    const carInterval = setInterval(createCar, 800 / (level / 2));
    return () => clearInterval(carInterval);
  }, [level, cars]);

  function handleDeleteCar(id) {
    setCars(cars.filter((car) => car.id !== id));
  }

  function handleButtonMove(direction) {
    if (!canMove) return;
    if (direction === "Up") {
      if (playerPosition >= 450) {
        setPlayerPosition(-50);
        onLevel(1);
      } else {
        setPlayerPosition((prevValue) => prevValue + 50);
      }
    } else if (direction === "Down" && playerPosition > 0) {
      setPlayerPosition((prevValue) => prevValue - 50);
    }
  }

  function handleMove(event) {
    if (!canMove) return;
    const currentKey = event.key;
    if (currentKey === "ArrowUp") {
      if (playerPosition >= 450) {
        setPlayerPosition(-50);
        onLevel(1);
      } else {
        setPlayerPosition((prevValue) => prevValue + 50);
      }
    } else if (currentKey === "ArrowDown" && playerPosition > 0) {
      setPlayerPosition((prevValue) => prevValue - 50);
    }
    setCanMove(false);
    setTimeout(() => setCanMove(true), 200);
  }

  function handleReset() {
    onLevel(0);
    setPlayerPosition(-50);
    setCars([]);
    onGameLost(false);
    setCanMove(false);
    setSeconds(3);
  }

  function handleGameOn() {
    onNewGame();
    handleReset();
  }

  return (
    <>
      {!gameOver && gameOn ? (
        <StyledScreen>
          <div className="buttons">
            <button onClick={() => handleButtonMove("Up")} className="button">
              ↑
            </button>
            <button onClick={() => handleButtonMove("Down")} className="button">
              ↓
            </button>
          </div>
          <div className="game-and-level">
            <StyledGame>
              {seconds >= 0 && <div className="countdown">{seconds}</div>}
              {cars.map((car) => {
                return (
                  <Car
                    key={car.id}
                    id={car.id}
                    positionCoor={car.pos}
                    color={car.color}
                    side={car.side}
                    onDeleteCar={handleDeleteCar}
                    playerPosition={playerPosition}
                    onGameLost={() => onGameLost(true)}
                    level={level}
                  />
                );
              })}
              <Player
                onMove={handleMove}
                playerPosition={playerPosition}
                level={level}
              />
            </StyledGame>
            <h1 style={{ color: "var(--side-color)", marginLeft: "5vw" }}>
              Level: {level}{" "}
              <span style={{ marginLeft: "3vw" }}>Highscore: {highscore}</span>
            </h1>
          </div>
        </StyledScreen>
      ) : gameOver && gameOn ? (
        <GameOverScreen>
          <h1>Game Over! 🫡 You have reached level {level}.</h1>
          <h2>Play Again?</h2>
          <div className="gameover-buttons">
            <button onClick={handleReset}>Yes</button>
            <button onClick={handleGameOn}>No</button>
          </div>
        </GameOverScreen>
      ) : (
        <StartingScreen>
          <h1>Welcome to the epic car Game!</h1>
          <h3>
            Use the Arrow Keys (Up & Down) or the buttons to cross the road.
          </h3>
          <h2>Start Playing?</h2>
          <button onClick={handleGameOn}>Confirm</button>
        </StartingScreen>
      )}
    </>
  );
}
