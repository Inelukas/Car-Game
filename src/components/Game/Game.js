import styled from "styled-components";
import Car from "../Car/Car";
import { Player } from "../Player/Player";
import { useEffect, useState } from "react";
import { uid } from "uid";

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
  gap: 10vh;
  color: var(--side-color);

  button {
    width: 150px;
    height: 60px;
    border-radius: 20px;
    background: var(--side-color);
  }
`;

export function Game() {
  const [cars, setCars] = useState([]);
  const [level, setLevel] = useState(1);
  const [playerPosition, setPlayerPosition] = useState(-50);
  const [gameOn, setGameOn] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    function createCar() {
      if (cars.length < 40) {
        const randomNumber = Math.floor(Math.random() * 10);
        const carId = uid();
        const newCar = { pos: randomNumber * 50, id: carId };
        setCars((prevCars) => {
          return [...prevCars, newCar];
        });
      }
    }

    const carInterval = setInterval(createCar, 1000 / (level * 0.5 + 1));
    return () => clearInterval(carInterval);
  }, [level, cars]);

  function handleDeleteCar(id) {
    setCars(cars.filter((car) => car.id !== id));
  }

  function handleMove(event) {
    const currentKey = event.key;
    if (currentKey === "ArrowUp") {
      if (playerPosition >= 450) {
        setPlayerPosition(-50);
        setLevel(level + 1);
      } else {
        setPlayerPosition((prevValue) => prevValue + 50);
      }
    } else if (currentKey === "ArrowDown" && playerPosition > 0) {
      setPlayerPosition((prevValue) => prevValue - 50);
    }
  }

  function handleGameLost() {
    setGameOver(true);
  }

  function handleNewGame() {
    setLevel(1);
    setPlayerPosition(-50);
    setCars([]);
    setGameOver(false);
  }

  function handleStartNewGame() {
    setGameOn(false);
  }

  function handleGameOn() {
    setGameOn(true);
    handleNewGame();
    setGameOver(false);
  }

  return (
    <>
      {!gameOver && gameOn ? (
        <>
          <StyledGame>
            {cars.map((car) => {
              return (
                <Car
                  key={car.id}
                  id={car.id}
                  positionCoor={car.pos}
                  onDeleteCar={handleDeleteCar}
                  playerPosition={playerPosition}
                  onGameLost={handleGameLost}
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
          <h1 style={{ color: "var(--side-color)" }}>Level: {level}</h1>
        </>
      ) : gameOver && gameOn ? (
        <GameOverScreen>
          <h1>Game Over! 🫡 You have reached level {level}.</h1>
          <h2>Play Again?</h2>
          <div className="gameover-buttons">
            <button onClick={handleNewGame}>Yes</button>
            <button onClick={handleStartNewGame}>No</button>
          </div>
        </GameOverScreen>
      ) : (
        <StartingScreen>
          <h1>Welcome to the epic car Game!</h1>
          <h2>Start Playing?</h2>
          <button onClick={handleGameOn}>Confirm</button>
        </StartingScreen>
      )}
    </>
  );
}
