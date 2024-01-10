import HandButton from "./HandButton";
import Button from "./Button";
import HandIcon from "./HandIcon";
import { compareHand, generateRandomHand } from "./utils";
import { useState } from "react";
import "./appText.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";

const INITIAL_VALUE = "rock";

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return "승리";
  if (comparison < 0) return "패배";
  return "무승부";
}

function App() {
  const [hand, setHand] = useState(INITIAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITIAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  const handleButtonClick = (nextHand) => {
    //현재 nextHand는 HandButton.js에서 value값을 가지고 온거임.
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) setScore(score + bet);
    if (comparison < 0) setOtherScore(otherScore + bet);
  };

  const handleClearClick = () => {
    setHand(INITIAL_VALUE);
    setOtherHand(INITIAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  };

  const handleBetChange = (e) => {
    let num = Number(e.target.value); //현재 입력값을 받아와서 숫자로 변환
    if (num > 9) num %= 10; //9보다 크면 10으로 나눈 나머지를 가져와서 0부터 9까지의 숫자로 만듬(예: 12 -> 2)
    if (num < 1) num = 1;
    num = Math.floor(num); //소수점 이하를 버리는
    setBet(num);
  };

  return (
    <div>
      <div className="button-container">
        <Button onClick={handleClearClick}>
          <FontAwesomeIcon icon={faRepeat} className="icon-style" />
        </Button>
      </div>
      <div className="App-scores">
        <div className="Score">
          <div className="Score-num">{score}</div>
          <div className="Score-name">나</div>
        </div>
        <div className="App-versus">:</div>
        <div className="Score">
          <div className="Score-num">{otherScore}</div>
          <div className="Score-name">상대</div>
        </div>
      </div>

      <div className="Box App-box">
        <div className="Box-inner">
          <div className="App-hands">
            <HandIcon value={hand} />
            <div className="App-versus">VS</div>
            <HandIcon value={otherHand} />
          </div>
        </div>
        <div className="App-bet">
          <input
            type="number"
            value={bet}
            min={1}
            max={9}
            onChange={handleBetChange}
          ></input>
        </div>
        <div className="App-history">
          <h2>승부 기록</h2>
          <p>{gameHistory.join(", ")}</p>
        </div>
      </div>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
