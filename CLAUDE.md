# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a learning project to experiment with Claude Code, following a Japanese article about getting started with Claude Code on the Pro plan. The goal is to build a Tetris game using React + TypeScript.

## Project Structure

The main Tetris game is located in the `tetris-game/` directory, which is a Vite + React + TypeScript project.

### Key Files and Components

- `src/types/tetris.ts` - Type definitions for the game (GameState, Tetromino, Board, etc.)
- `src/utils/tetris.ts` - Core game logic utilities (piece creation, validation, line clearing)
- `src/hooks/useTetris.ts` - Main game state management hook
- `src/hooks/useKeyboard.ts` - Keyboard input handling
- `src/components/Board.tsx` - Game board rendering component
- `src/components/GameInfo.tsx` - Score and next piece display component

## Development Commands

To work with the Tetris game:
```bash
cd tetris-game
npm install          # Install dependencies
npm run dev         # Start development server (usually on http://localhost:5173 or 5174)
npm run build       # Build for production
npm run preview     # Preview production build
```

## Game Controls

- Arrow Left/Right: Move piece horizontally
- Arrow Up: Rotate piece
- Arrow Down: Soft drop (faster fall)
- Space: Hard drop (instant fall)
- P: Pause/unpause game
- R: Reset game (when game over)

## Architecture Notes

The game follows a React hooks-based architecture:
- `useTetris` manages all game state and logic
- `useKeyboard` handles input mapping
- Components are purely presentational
- Game logic is separated into utility functions for testability