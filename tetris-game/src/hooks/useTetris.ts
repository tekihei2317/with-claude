import { useState, useEffect, useCallback } from 'react';
import type { 
  GameState, 
  Tetromino
} from '../types/tetris';
import { 
  BOARD_WIDTH,
  BOARD_HEIGHT 
} from '../types/tetris';
import {
  createEmptyBoard,
  createRandomTetromino,
  rotateTetromino,
  isValidPosition,
  placeTetromino,
  clearLines,
  calculateScore
} from '../utils/tetris';

const INITIAL_DROP_TIME = 1000;

export const useTetris = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    board: createEmptyBoard(),
    currentPiece: createRandomTetromino(),
    nextPiece: createRandomTetromino(),
    score: 0,
    level: 0,
    lines: 0,
    gameOver: false,
    paused: false
  }));

  const [dropTime, setDropTime] = useState(INITIAL_DROP_TIME);

  const moveLeft = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.paused) return;
    
    const newPosition = { 
      x: gameState.currentPiece.position.x - 1, 
      y: gameState.currentPiece.position.y 
    };
    
    if (isValidPosition(gameState.board, gameState.currentPiece, newPosition)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: prev.currentPiece ? {
          ...prev.currentPiece,
          position: newPosition
        } : null
      }));
    }
  }, [gameState.board, gameState.currentPiece, gameState.gameOver, gameState.paused]);

  const moveRight = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.paused) return;
    
    const newPosition = { 
      x: gameState.currentPiece.position.x + 1, 
      y: gameState.currentPiece.position.y 
    };
    
    if (isValidPosition(gameState.board, gameState.currentPiece, newPosition)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: prev.currentPiece ? {
          ...prev.currentPiece,
          position: newPosition
        } : null
      }));
    }
  }, [gameState.board, gameState.currentPiece, gameState.gameOver, gameState.paused]);

  const rotate = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.paused) return;
    
    const rotatedPiece = rotateTetromino(gameState.currentPiece);
    
    if (isValidPosition(gameState.board, rotatedPiece, rotatedPiece.position)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: rotatedPiece
      }));
    }
  }, [gameState.board, gameState.currentPiece, gameState.gameOver, gameState.paused]);

  const softDrop = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.paused) return;
    
    const newPosition = { 
      x: gameState.currentPiece.position.x, 
      y: gameState.currentPiece.position.y + 1 
    };
    
    if (isValidPosition(gameState.board, gameState.currentPiece, newPosition)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: prev.currentPiece ? {
          ...prev.currentPiece,
          position: newPosition
        } : null
      }));
    }
  }, [gameState.board, gameState.currentPiece, gameState.gameOver, gameState.paused]);

  const hardDrop = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.paused) return;
    
    let newY = gameState.currentPiece.position.y;
    while (isValidPosition(gameState.board, gameState.currentPiece, { 
      x: gameState.currentPiece.position.x, 
      y: newY + 1 
    })) {
      newY++;
    }
    
    setGameState(prev => ({
      ...prev,
      currentPiece: prev.currentPiece ? {
        ...prev.currentPiece,
        position: { x: prev.currentPiece.position.x, y: newY }
      } : null
    }));
  }, [gameState.board, gameState.currentPiece, gameState.gameOver, gameState.paused]);

  const dropPiece = useCallback(() => {
    if (!gameState.currentPiece || gameState.gameOver || gameState.paused) return;
    
    const newPosition = { 
      x: gameState.currentPiece.position.x, 
      y: gameState.currentPiece.position.y + 1 
    };
    
    if (isValidPosition(gameState.board, gameState.currentPiece, newPosition)) {
      setGameState(prev => ({
        ...prev,
        currentPiece: prev.currentPiece ? {
          ...prev.currentPiece,
          position: newPosition
        } : null
      }));
    } else {
      const newBoard = placeTetromino(gameState.board, gameState.currentPiece);
      const { newBoard: clearedBoard, linesCleared } = clearLines(newBoard);
      
      const newScore = gameState.score + calculateScore(linesCleared, gameState.level);
      const newLines = gameState.lines + linesCleared;
      const newLevel = Math.floor(newLines / 10);
      
      const nextPiece = createRandomTetromino();
      
      if (!isValidPosition(clearedBoard, nextPiece, nextPiece.position)) {
        setGameState(prev => ({
          ...prev,
          board: clearedBoard,
          gameOver: true
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          board: clearedBoard,
          currentPiece: prev.nextPiece,
          nextPiece,
          score: newScore,
          level: newLevel,
          lines: newLines
        }));
        
        setDropTime(Math.max(50, INITIAL_DROP_TIME - newLevel * 50));
      }
    }
  }, [gameState]);

  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      paused: !prev.paused
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      board: createEmptyBoard(),
      currentPiece: createRandomTetromino(),
      nextPiece: createRandomTetromino(),
      score: 0,
      level: 0,
      lines: 0,
      gameOver: false,
      paused: false
    });
    setDropTime(INITIAL_DROP_TIME);
  }, []);

  useEffect(() => {
    if (gameState.gameOver || gameState.paused) return;

    const interval = setInterval(() => {
      dropPiece();
    }, dropTime);

    return () => clearInterval(interval);
  }, [dropPiece, dropTime, gameState.gameOver, gameState.paused]);

  return {
    gameState,
    moveLeft,
    moveRight,
    rotate,
    softDrop,
    hardDrop,
    togglePause,
    resetGame
  };
};