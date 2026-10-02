import { Chess } from 'chess.js';
import searchBestMove from './gameLogic';

test('returns a legal move from the start position', () => {
  const game = new Chess();
  const legalMoves = game.moves();
  const move = String(searchBestMove(game, 'w', -Infinity, Infinity, 1));
  expect(legalMoves).toContain(move);
});

test('finds a mate in one', () => {
  const game = new Chess('7k/6pp/8/8/8/8/8/R6K w - - 0 1');
  const move = String(searchBestMove(game, 'w', -Infinity, Infinity, 2));
  game.move(move);
  expect(game.isCheckmate()).toBe(true);
});

test('captures a hanging queen', () => {
  const game = new Chess('4k3/8/8/3q4/4P3/8/8/4K3 w - - 0 1');
  const move = String(searchBestMove(game, 'w', -Infinity, Infinity, 2));
  expect(move).toBe('exd5');
});
