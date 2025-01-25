import React, { useState } from "react";
import "./App.css";

const App = () => {
  const choices = ["Rock", "Paper", "Scissors"];
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);

  const determineWinner = (player, computer) => {
    if (player === computer) return "It's a tie!";
    if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Scissors" && computer === "Paper") ||
      (player === "Paper" && computer === "Rock")
    ) {
      setPlayerScore(playerScore + 1);
      return "You Win!";
    }
    setComputerScore(computerScore + 1);
    return "Computer Wins!";
  };

  const handleChoiceClick = (choice) => {
    const computerRandomChoice =
      choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(computerRandomChoice);
    const gameResult = determineWinner(choice, computerRandomChoice);
    setResult(gameResult);

    setGameHistory([
      ...gameHistory,
      {
        round: gameHistory.length + 1,
        player: choice,
        computer: computerRandomChoice,
        result: gameResult,
      },
    ]);
  };

  const handleReset = () => {
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
    setPlayerScore(0);
    setComputerScore(0);
    setGameHistory([]);
  };

  return (
    <div className="app">
      <div className="header-image">
        <img src="th (1).jpg" alt="Rock Paper Scissors" className="game-image" />
      </div>

      <div className="scoreboard">
        <p>Player Score: {playerScore}</p>
        <p>Computer Score: {computerScore}</p>
      </div>

      <div className="choices">
        <button onClick={() => handleChoiceClick("Rock")}>
          <img src="fist.png" alt="Rock" className="icon" />
        </button>
        <button onClick={() => handleChoiceClick("Paper")}>
          <img src="hand-paper.png" alt="Paper" className="icon" />
        </button>
        <button onClick={() => handleChoiceClick("Scissors")}>
          <img src="scissors.png" alt="Scissors" className="icon" />
        </button>
      </div>

      <div className="results">
        <p>Player Chose: {playerChoice}</p>
        <p>Computer Chose: {computerChoice}</p>
        <h2>{result}</h2>
        <button onClick={handleReset}>
          <img src="restart.png" alt="Reset" className="reset-icon" />
        </button>
      </div>

      <h2>Game History</h2>
      <ul>
        {gameHistory.map((game, index) => (
          <li key={index}>
            Round {game.round}: Player chose {game.player}, Computer chose{" "}
            {game.computer} — {game.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
