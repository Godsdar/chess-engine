import { BISHOP, Chess, KNIGHT, Color, PAWN, QUEEN, ROOK, KING } from 'chess.js';

const MATE_SCORE = 1_000_000;

function evaluate (game: Chess, side: Color) : number {
  const material = (color: Color) => {
    const king = game.findPiece({type: KING, color }).length * 1000;
    const queens = game.findPiece({type: QUEEN, color }).length * 9;
    const rooks = game.findPiece({type: ROOK, color }).length * 5;
    const bishops = game.findPiece({type: BISHOP, color }).length * 3;
    const knights = game.findPiece({type: KNIGHT, color }).length * 3;
    const pawns = game.findPiece({type: PAWN, color }).length;
    return king + queens + rooks + bishops + knights + pawns;
  };

  return material(side) - material(side === 'w' ? 'b' : 'w');
}

function MiniMax (game: Chess, depth: number, alpha: number, beta: number) : number {
  if (game.isCheckmate()) {
    return -MATE_SCORE - depth;
  }
  if (game.isDraw()) {
    return 0;
  }
  if (depth === 0) {
    return evaluate(game, game.turn());
  }

  const moves = game.moves();
  let value = -Infinity;
  for (const move of moves) {
    game.move(move);
    const score = -MiniMax(game, depth - 1, -beta, -alpha);
    game.undo();
    if (score > value) {
      value = score;
    }
    if (value > alpha) {
      alpha = value;
    }
    if (alpha >= beta) {
      break;
    }
  }

  return value;
}

export default function searchBestMove (game: Chess, side: Color, alpha: number, beta: number, depth: number) : String {
  const moves = game.moves();
  if (moves.length === 0) {
    return '';
  }

  let bestMove : String = moves[0];
  let bestValue = -Infinity;
  for (const move of moves) {
    game.move(move);
    const value = -MiniMax(game, depth - 1, -beta, -alpha);
    game.undo();
    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }

  return bestMove;
}
