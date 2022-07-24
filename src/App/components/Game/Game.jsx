import React, { useEffect, useState } from "react";
import Board from "../Board";
import baloes from './baloes.png';
import "./game.css";

export default function Game() {
  const [squares, setQuares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(calculateWinner(squares));
  const [players, setPlayers] = useState([
    {
      name: "Walisson",
      winners: 0,
    },
    {
      name: "Victor",
      winners: 0,
    },
  ]);

  function whatsIsNext() {
    return xIsNext ? "X" : "O";
  }

  const status = winner ? `Winner: ${winner}` : `Next player: ${whatsIsNext()}`;

  function incrementHistory() {
    const _players = [...players];
    if (winner === "X") _players[0].winners = _players[0].winners + 1;
    else if (winner === "O") _players[1].winners = _players[1].winners + 1;
    setPlayers(_players);
  }

  function resetGame() {
    setQuares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  }

  function incrementNextPlay(index) {
    const newSquares = [...squares];
    newSquares[index] = whatsIsNext();
    setQuares(newSquares);
    setXIsNext(!xIsNext);
  }

  function handleClick(index) {
    if (winner) {
      return resetGame();
    }
    incrementNextPlay(index);
  }

  useEffect(() => {
    setWinner(calculateWinner(squares));    
  }, [squares]);

  useEffect(() => {
    if (winner === "X" || winner === "O") incrementHistory();
  }, [winner])

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="game-board">
        <Board handleClick={(i) => handleClick(i)} squares={squares} />
      </div>
      <div className="game-info">
        <>
          {players.map((player, index) => (
            <ul key={index}>
              <li>
                {player.name} - Venceu: {player.winners} vezes
              </li>
            </ul>
          ))}
        </>
      </div>
      <div className="winner">
            <img src={baloes} alt="Baloes" width={200} className={winner ? 'winner-effect': 'no-winner'}/>
      </div>
    </div>
  );
}
