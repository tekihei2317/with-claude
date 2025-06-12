import React from "react";
import Board from "./components/Board";
import GameInfo from "./components/GameInfo";
import { useTetris } from "./hooks/useTetris";
import { useKeyboard } from "./hooks/useKeyboard";
import "./App.css";

function App() {
  const {
    gameState,
    moveLeft,
    moveRight,
    rotate,
    softDrop,
    hardDrop,
    togglePause,
    resetGame,
  } = useTetris();

  useKeyboard({
    moveLeft,
    moveRight,
    rotate,
    softDrop,
    hardDrop,
    togglePause,
    resetGame,
  });

  return (
    <div className="app">
      <div className="tetris-container">
        <div className="game-area">
          <Board
            board={gameState.board}
            currentPiece={gameState.currentPiece}
          />
          {gameState.gameOver && (
            <div className="game-over-overlay">
              <div className="game-over-message">
                <h2>Game Over</h2>
                <p>Final Score: {gameState.score}</p>
                <button onClick={resetGame}>Play Again (R)</button>
              </div>
            </div>
          )}
          {gameState.paused && !gameState.gameOver && (
            <div className="pause-overlay">
              <div className="pause-message">
                <h2>Paused</h2>
                <p>Press P to continue</p>
              </div>
            </div>
          )}
        </div>
        <GameInfo
          score={gameState.score}
          level={gameState.level}
          lines={gameState.lines}
          nextPiece={gameState.nextPiece}
        />
      </div>
    </div>
  );
}

export default App;
