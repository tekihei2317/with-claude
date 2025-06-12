import React from "react";
import type { Board as BoardType, Tetromino } from "../types/tetris";
import { BOARD_WIDTH, BOARD_HEIGHT } from "../types/tetris";

interface BoardProps {
  board: BoardType;
  currentPiece: Tetromino | null;
}

const Board: React.FC<BoardProps> = ({ board, currentPiece }) => {
  const renderBoard = () => {
    const displayBoard = board.map((row) => [...row]);

    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardX = currentPiece.position.x + x;
            const boardY = currentPiece.position.y + y;

            if (
              boardY >= 0 &&
              boardY < BOARD_HEIGHT &&
              boardX >= 0 &&
              boardX < BOARD_WIDTH
            ) {
              displayBoard[boardY][boardX] = currentPiece.color;
            }
          }
        }
      }
    }

    return displayBoard.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, cellIndex) => (
          <div
            key={cellIndex}
            className={`board-cell ${cell ? "filled" : "empty"}`}
            style={{
              backgroundColor: cell || "#333",
              border: "1px solid #555",
            }}
          />
        ))}
      </div>
    ));
  };

  return <div className="board">{renderBoard()}</div>;
};

export default Board;
