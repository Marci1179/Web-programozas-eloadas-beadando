// src/components/Kockapoker.jsx
import React, { useState, useEffect } from "react";

function Kockapoker({ szinek }) {
  const diceSymbols = ["🎲", "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  const [rollsLeft, setRollsLeft] = useState(2);
  const [heldDice, setHeldDice] = useState([false, false, false, false, false]);
  const [currentRolls, setCurrentRolls] = useState([1, 1, 1, 1, 1]);
  const [scores, setScores] = useState(Array(6).fill(null));
  const [selectedRow, setSelectedRow] = useState(null);
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    firstRoll();
  }, []);

  const firstRoll = () => {
    const newRolls = currentRolls.map(() => Math.floor(Math.random() * 6) + 1);
    setCurrentRolls(newRolls);
  };

  const rollDice = () => {
    if (rollsLeft > 0) {
      const newRolls = currentRolls.map((val, i) =>
        heldDice[i] ? val : Math.floor(Math.random() * 6) + 1
      );
      setCurrentRolls(newRolls);
      setRollsLeft((prev) => prev - 1);
    }
  };

  const toggleHold = (index) => {
    const updated = [...heldDice];
    updated[index] = !updated[index];
    setHeldDice(updated);
  };

  const handleRowClick = (index) => {
    if (scores[index] !== null) return;
    setSelectedRow(index);
  };

  const writeScore = () => {
    if (selectedRow !== null && scores[selectedRow] === null) {
      const number = selectedRow + 1;
      const score = currentRolls.filter((v) => v === number).length * number;
      const updatedScores = [...scores];
      updatedScores[selectedRow] = score;
      setScores(updatedScores);
      setSelectedRow(null);
      resetRound();

      if (updatedScores.every((v) => v !== null)) {
        const total = updatedScores.reduce((a, b) => a + b, 0);
        setFinalScore(total);
      }
    }
  };

  const resetRound = () => {
    setRollsLeft(2);
    setHeldDice([false, false, false, false, false]);
    setTimeout(() => firstRoll(), 100);
  };

  return (
    <div style={{ color: szinek[2] }}>
      <h1>Kockapóker</h1>
      <div style={{ fontSize: 48, margin: "20px 0" }}>
        {currentRolls.map((val, i) => (
          <span
            key={i}
            onClick={() => toggleHold(i)}
            style={{
              margin: 10,
              cursor: "pointer",
              padding: 10,
              border: "3px solid",
              borderColor: heldDice[i] ? szinek[0] : "transparent",
              borderRadius: 10,
            }}
          >
            {diceSymbols[val]}
          </span>
        ))}
      </div>
      <button style={{ backgroundColor: szinek[3], color: "white", padding: 10 }} onClick={rollDice} disabled={rollsLeft === 0}>
        Dobás
      </button>
      <p>Hátralévő dobások: {rollsLeft}</p>

      <table style={{ margin: "20px auto", borderCollapse: "collapse", width: "60%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: 10 }}>Kategória</th>
            <th style={{ border: "1px solid black", padding: 10 }}>Eredmény</th>
          </tr>
        </thead>
        <tbody>
          {["Egyesek", "Kettesek", "Hármasok", "Négyesek", "Ötösök", "Hatosok"].map((label, i) => (
            <tr
              key={i}
              onClick={() => handleRowClick(i)}
              style={{
                backgroundColor: scores[i] !== null ? szinek[4] : selectedRow === i ? "yellow" : "white",
                cursor: scores[i] !== null ? "default" : "pointer",
              }}
            >
              <td style={{ border: "1px solid black", padding: 10 }}>{label}</td>
              <td style={{ border: "1px solid black", padding: 10 }}>{scores[i] !== null ? scores[i] : ""}</td>
            </tr>
          ))}
          <tr>
            <td>
            <button style={{ backgroundColor: szinek[1], color: "white", padding: 10}} onClick={writeScore}>Beír</button>
            </td>
            <td>
            {finalScore !== null && <p style={{ minHeight: "1.5em", fontSize: 18}}>Végső pontszám: {finalScore}</p>}
            </td>
          </tr>
        </tbody>
      </table>
      
      
      
    </div>
  );
}

export default Kockapoker;
