// src/components/KoPapirOllo.jsx
import React, { useState } from "react";

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
        <div style={{ fontSize: 64, margin: "20px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <span
          style={{
            width: "1em",
            display: "inline-block",
            textAlign: "center",
            ...(animacioAktiv ? animacioStilus : {})
          }}
        >
          {jatekos.emoji}
        </span>
        <span style={{ margin: "0 20px" }}>vs</span>
        <span
          style={{
            width: "1em",
            display: "inline-block",
            textAlign: "center",
            ...(animacioAktiv ? animacioStilus : {})
          }}
        >
          {gep.emoji}
        </span>
      </div>
      
      )}
      <p style={{ minHeight: "1.5em" }}>{eredmeny}</p>
    </div>
  );
}

export default KoPapirOllo;
