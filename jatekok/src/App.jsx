import React, { useState, useEffect } from "react";

const szinek = ["#008a3a", "#00ae49", "#333", "#005603", "#d3d5d1"];

const animacioStilus = {
  animation: "felLeMozgas 1s ease-in-out",
  display: "inline-block",
};

function App() {
  const [view, setView] = useState("menu");

  const goBack = () => setView("menu");

  return (
    <div style={{ textAlign: "center", backgroundColor: szinek[4], minHeight: "100vh", padding: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <style>
        {`
          @keyframes felLeMozgas {
            0% { transform: translateY(0); }
            15% { transform: translateY(-20px); }
            30% { transform: translateY(0); }
            45% { transform: translateY(-20px); }
            60% { transform: translateY(0); }
            75% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
      <div style={{ width: "100%", maxWidth: 800 }}>
        {view === "menu" && (
          <div>
            <h1 style={{ color: szinek[2] }}>Válassz játékot</h1>
            <button style={{ backgroundColor: szinek[0], color: "white", margin: 10, padding: 10 }} onClick={() => setView("kockapoker")}>Kockapóker</button>
            <button style={{ backgroundColor: szinek[1], color: "white", margin: 10, padding: 10 }} onClick={() => setView("kpo")}>Kő-Papír-Olló</button>
          </div>
        )}

        {view === "kockapoker" && (
          <div>
            <button style={{ backgroundColor: szinek[0], color: "white", margin: 10, padding: 10 }} onClick={goBack}>Vissza a menübe</button>
            <Kockapoker szinek={szinek} />
          </div>
        )}

        {view === "kpo" && (
          <div>
            <button style={{ backgroundColor: szinek[0], color: "white", margin: 10, padding: 10 }} onClick={goBack}>Vissza a menübe</button>
            <KoPapirOllo szinek={szinek} animacioStilus={animacioStilus} />
          </div>
        )}
      </div>
    </div>
  );
}

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
          {["Egyesek", "Kettesek", "Hármasok", "Négyesek", "Ötösök", "Hatosok"].map(
            (label, i) => (
              <tr
                key={i}
                onClick={() => handleRowClick(i)}
                style={{
                  backgroundColor:
                    scores[i] !== null ? szinek[4] : selectedRow === i ? "yellow" : "white",
                  cursor: scores[i] !== null ? "default" : "pointer",
                }}
              >
                <td style={{ border: "1px solid black", padding: 10 }}>{label}</td>
                <td style={{ border: "1px solid black", padding: 10 }}>
                  {scores[i] !== null ? scores[i] : ""}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <button style={{ backgroundColor: szinek[1], color: "white", padding: 10 }} onClick={writeScore}>Beír</button>
      {finalScore !== null && <p>Végső pontszám: {finalScore}</p>}
    </div>
  );
}


function KoPapirOllo({ szinek, animacioStilus }) {
  const [eredmeny, setEredmeny] = useState("");
  const [jatekos, setJatekos] = useState(null);
  const [gep, setGep] = useState(null);
  const [animacioAktiv, setAnimacioAktiv] = useState(false);

  const valasztasok = [
    { nev: "Kő", emoji: "✊" },
    { nev: "Papír", emoji: "✋" },
    { nev: "Olló", emoji: "✌️" }
  ];

  const jatek = (valasztas) => {
    setAnimacioAktiv(true);
    setJatekos({ nev: "Kő", emoji: "✊" });
    setGep({ nev: "Kő", emoji: "✊" });
    setEredmeny("");

    setTimeout(() => {
      const gepValasztas = valasztasok[Math.floor(Math.random() * 3)];
      setJatekos(valasztas);
      setGep(gepValasztas);
      setAnimacioAktiv(false);

      if (valasztas.nev === gepValasztas.nev) {
        setEredmeny(`Döntetlen! Mindkettő: ${gepValasztas.nev}`);
      } else if (
        (valasztas.nev === "Kő" && gepValasztas.nev === "Olló") ||
        (valasztas.nev === "Papír" && gepValasztas.nev === "Kő") ||
        (valasztas.nev === "Olló" && gepValasztas.nev === "Papír")
      ) {
        setEredmeny(`Nyertél! Gép: ${gepValasztas.nev}`);
      } else {
        setEredmeny(`Vesztettél! Gép: ${gepValasztas.nev}`);
      }
    }, 1000);
  };

  return (
    <div style={{ color: szinek[2] }}>
      <h2>Kő-Papír-Olló</h2>
      <div>
        {valasztasok.map((valasztas) => (
          <button
            key={valasztas.nev}
            onClick={() => jatek(valasztas)}
            style={{ margin: 10, padding: 10, backgroundColor: szinek[0], color: "white" }}
          >
            {valasztas.nev}
          </button>
        ))}
      </div>

      {jatekos && gep && (
        <div style={{ fontSize: 64, margin: "20px 0" }}>
          <span style={animacioAktiv ? animacioStilus : {}}>{jatekos.emoji}</span>
          <span style={{ margin: "0 20px" }}>vs</span>
          <span style={animacioAktiv ? animacioStilus : {}}>{gep.emoji}</span>
        </div>
      )}
      <p>{eredmeny}</p>
    </div>
  );
}

export default App;
