# chess-engine

A playable chess board with a small engine that searches for its own moves.
You drag a piece as White; the app answers as Black by running a minimax
search with alpha-beta pruning over the position.

<!-- Add a screenshot/GIF here once captured: docs/engine.gif -->

## What it does

- Full chess rules via `chess.js` (castling, en passant, promotion, draws).
- Drag-and-drop board via `react-chessboard`.
- Engine answers every player move and evaluates material to pick its reply.
- Mate is scored explicitly, so it finishes short forced lines.

## How the engine works

`src/gameLogic.ts` implements:

- **Material evaluation** — pawn 1, knight/bishop 3, rook 5, queen 9,
  king 1000, summed as `side - opponent`.
- **Minimax with alpha-beta pruning** — recursive search to a fixed depth,
  cutting branches once `alpha >= beta`.
- **Mate scoring** — checkmate returns `-1_000_000 - depth`, so shorter mates
  are preferred to longer ones.

The UI calls `searchBestMove(game, 'w', -Infinity, Infinity, DEPTH)` with
`DEPTH = 6` after each human move.

## Tech stack

- React 19 + TypeScript
- `chess.js` (rules and move generation)
- `react-chessboard` (board UI)
- Create React App (`react-scripts`) for dev/build/test
- Jest + Testing Library

## Run it (3 commands)

```bash
npm install
npm start          # http://localhost:3000
npm test           # unit tests for the engine
```

Production build: `npm run build`.

## Project structure

```
src/
  App.tsx          # board wiring, drag handler, engine turn
  gameLogic.ts     # evaluation + minimax/alpha-beta search
  gameLogic.test.ts# engine tests (legal move, mate-in-1, capture)
  App.test.tsx     # render smoke test
```

## What was tricky

- **Deepening the search without freezing the UI** — the engine runs inside a
  `setTimeout` after a move so the board repaints first, and the search is
  capped at a fixed depth.
- **Undo correctness** — minimax makes and undoes moves on the shared `Chess`
  instance; every branch must `undo()` exactly once or the position drifts.
  The tests cover the search returning to the original position.

## Development notes (AI-assisted)

This project was built with AI agents doing a large part of the first draft and
the author steering and verifying:

- The engine algorithm was planned first (evaluation, alpha-beta, mate score),
  then generated, then corrected — the first version answered with random moves.
- Verification is automated: `gameLogic.test.ts` pins a legal-move property, a
  mate-in-one, and a hanging-queen capture. CI runs lint + tests + build.
- Anything the tests could not assert (drag interaction feel, board rendering
  with `react-chessboard` v5) was checked manually in the browser.

## License

MIT — see [LICENSE](LICENSE).
