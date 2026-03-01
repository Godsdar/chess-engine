import { BISHOP, Chess, KNIGHT, Color, PAWN, QUEEN, ROOK, Move, KING } from 'chess.js';

function evaluate (game: Chess, side: Color) : number {
  const king = game.findPiece({type: KING, color: side }).length * 1000;
  const queens = game.findPiece({type: QUEEN, color: side }).length * 9;
  const rooks = game.findPiece({type: ROOK, color: side }).length * 5;
  const bishops = game.findPiece({type: BISHOP, color: side }).length * 3;
  const knights = game.findPiece({type: KNIGHT, color: side }).length * 3;
  const pawns = game.findPiece({type: PAWN, color: side }).length;

  const evaluation = king * queens + rooks + bishops + knights + pawns;
  return evaluation * (side == 'b' ? -1: 1);
}

function MiniMax (game: Chess, moves: Array<String>, side: Color, bestMove: String, alpha: number, beta: number, depth: number) : number {
  if (!depth) {
    return evaluate(game, side);
  }

  let i = 0;
  while (i < moves.length && alpha < beta) {
    game.move(String(moves[i]));
    const temp = -MiniMax(game, game.moves(), game.turn(), bestMove, -beta, -alpha, depth - 1);
    if (temp > alpha) {
      alpha = temp;
      bestMove = moves[i];
    }
    if (temp >= beta) {
      game.undo();
      bestMove = moves[i];
      return beta;
    }
    bestMove = moves[i];
    game.undo();
    i++;
  }

  return alpha;
}

export default function searchBestMove (game: Chess, side: Color, alpha: number, beta: number, depth: number) : String {
  const moves = game.moves();
  let bestMove : String = moves[Math.floor(Math.random() * moves.length)];
  let temp = MiniMax(game, game.moves(), game.turn(), bestMove, -Infinity, Infinity, depth);
  console.log(temp);
  return bestMove;
}