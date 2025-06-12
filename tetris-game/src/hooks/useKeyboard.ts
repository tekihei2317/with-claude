import { useEffect } from 'react';

interface KeyboardControls {
  moveLeft: () => void;
  moveRight: () => void;
  rotate: () => void;
  softDrop: () => void;
  hardDrop: () => void;
  togglePause: () => void;
  resetGame: () => void;
}

export const useKeyboard = (controls: KeyboardControls) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'ArrowLeft':
          event.preventDefault();
          controls.moveLeft();
          break;
        case 'ArrowRight':
          event.preventDefault();
          controls.moveRight();
          break;
        case 'ArrowUp':
          event.preventDefault();
          controls.rotate();
          break;
        case 'ArrowDown':
          event.preventDefault();
          controls.softDrop();
          break;
        case 'Space':
          event.preventDefault();
          controls.hardDrop();
          break;
        case 'KeyP':
          event.preventDefault();
          controls.togglePause();
          break;
        case 'KeyR':
          event.preventDefault();
          controls.resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [controls]);
};