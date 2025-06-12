import React from "react";
import type { Tetromino } from "../types/tetris";

interface GameInfoProps {
  score: number;
  level: number;
  lines: number;
  nextPiece: Tetromino | null;
}

const GameInfo: React.FC<GameInfoProps> = ({
  score,
  level,
  lines,
  nextPiece,
}) => {
  const renderNextPiece = () => {
    if (!nextPiece) return null;

    return (
      <div className="next-piece">
        <h3>Next</h3>
        <div className="next-piece-preview">
          {nextPiece.shape.map((row, rowIndex) => (
            <div key={rowIndex} className="next-piece-row">
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={`next-piece-cell ${cell ? "filled" : "empty"}`}
                  style={{
                    backgroundColor: cell ? nextPiece.color : "transparent",
                    border: cell ? "1px solid #555" : "none",
                    width: "20px",
                    height: "20px",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="game-info">
      <div className="score-info">
        <div>Score: {score}</div>
        <div>Level: {level}</div>
        <div>Lines: {lines}</div>
      </div>
      {renderNextPiece()}
      <div className="controls">
        <h3>Controls</h3>
        <div>← → Move</div>
        <div>↓ Soft Drop</div>
        <div>↑ Rotate</div>
        <div>Space Hard Drop</div>
        <div>P Pause</div>
      </div>
    </div>
  );
};

export default GameInfo;
