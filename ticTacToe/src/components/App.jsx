import "../CSS/App.css";
import Player from "./Player.jsx";
import GameBoard from "./GameBoard.jsx";
import { useState } from "react";
import Log from "./Log.jsx";
import { WINNING_COMBINATIONS } from "../winning-combinations.js";
import GameOver from "./GameOver.jsx";

const initalGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initalGameBoard;
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combinantion of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combinantion[0].row][combinantion[0].column];
    const secondSquareSymbol =
      gameBoard[combinantion[1].row][combinantion[1].column];
    const thirdSquareSymbol =
      gameBoard[combinantion[2].row][combinantion[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;
  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevturns) => {
      const currentPlayer = deriveActivePlayer(prevturns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevturns,
      ];

      return updatedTurns;
    });
  };
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          activePlayerSymbol={activePlayer}
          board={gameBoard}
        />
      </div>
      <Log turn={gameTurns} />
    </main>
  );
}

export default App;
