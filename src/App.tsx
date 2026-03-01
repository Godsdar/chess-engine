import React, { useState } from 'react';
import { Chessboard, PieceDropHandlerArgs } from 'react-chessboard';
import { Chess } from 'chess.js';
import searchBestMove from './gameLogic';
import './App.css';

const DEPTH = 6;

function App() {
  const [game, setGame] = useState(new Chess());
  const [chessPosition, setChessPosition] = useState(game.fen());
  const chessBoardOptions = {
    position: chessPosition, onPieceDrop,
    id: 'hi'
  };

  function makeRandomMove () {
    const moves = game.moves();
    if (game.isGameOver()) return;
    const randomMove = moves[0];
    game.move(randomMove)
    setChessPosition(game.fen());
  }

  function makeBestMove () {
    if (game.isGameOver()) return;
    const bestMove = searchBestMove(game, 'w', -Infinity, Infinity, DEPTH);
    console.log(bestMove);
    game.move(String(bestMove));
    setChessPosition(game.fen());
  }

  function onPieceDrop ({
    sourceSquare,
    targetSquare
  }: PieceDropHandlerArgs) {
    try {
      if (!targetSquare) return false;
      game.move({
        from: sourceSquare,
        to: targetSquare
      });

      setChessPosition(game.fen());
      setTimeout(makeBestMove, 500);
      return true;
    } catch {
      return false;
    }
  }
  return (
    <div className="App">
      <div className="App-header">
        <div className="Chessboard-container">
          <Chessboard options={chessBoardOptions}></Chessboard>
        </div>
      </div>
    </div>
  );
}

export default App;
