import type { 
  Board, 
  Tetromino, 
  Position
} from '../types/tetris';
import { 
  BOARD_WIDTH, 
  BOARD_HEIGHT, 
  TETROMINO_SHAPES, 
  TETROMINO_COLORS 
} from '../types/tetris';

export const createEmptyBoard = (): Board => {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
};

export const createRandomTetromino = (): Tetromino => {
  const shapes = Object.keys(TETROMINO_SHAPES) as (keyof typeof TETROMINO_SHAPES)[];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  
  return {
    shape: TETROMINO_SHAPES[randomShape],
    color: TETROMINO_COLORS[randomShape],
    position: { x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 }
  };
};

export const rotateTetromino = (tetromino: Tetromino): Tetromino => {
  const rotated = tetromino.shape[0].map((_, index) =>
    tetromino.shape.map(row => row[index]).reverse()
  );
  
  return {
    ...tetromino,
    shape: rotated
  };
};

export const isValidPosition = (board: Board, tetromino: Tetromino, position: Position): boolean => {
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x]) {
        const newX = position.x + x;
        const newY = position.y + y;
        
        if (
          newX < 0 || 
          newX >= BOARD_WIDTH || 
          newY >= BOARD_HEIGHT ||
          (newY >= 0 && board[newY][newX])
        ) {
          return false;
        }
      }
    }
  }
  return true;
};

export const placeTetromino = (board: Board, tetromino: Tetromino): Board => {
  const newBoard = board.map(row => [...row]);
  
  for (let y = 0; y < tetromino.shape.length; y++) {
    for (let x = 0; x < tetromino.shape[y].length; x++) {
      if (tetromino.shape[y][x]) {
        const boardX = tetromino.position.x + x;
        const boardY = tetromino.position.y + y;
        
        if (boardY >= 0) {
          newBoard[boardY][boardX] = tetromino.color;
        }
      }
    }
  }
  
  return newBoard;
};

export const clearLines = (board: Board): { newBoard: Board; linesCleared: number } => {
  const newBoard = board.filter(row => row.some(cell => cell === null));
  const linesCleared = BOARD_HEIGHT - newBoard.length;
  
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(null));
  }
  
  return { newBoard, linesCleared };
};

export const calculateScore = (linesCleared: number, level: number): number => {
  const lineScores = [0, 40, 100, 300, 1200];
  return lineScores[linesCleared] * (level + 1);
};