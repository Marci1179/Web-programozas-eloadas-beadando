// src/App.jsx
import React, { useState } from "react";
import Kockapoker from "./components/Kockapoker";
import KoPapirOllo from "./components/KoPapirOllo";

const szinek = ["#008a3a", "#00ae49", "#333", "#005603", "#d3d5d1"];
const animacioStilus = {
  animation: "felLeMozgas 1s ease-in-out",
  display: "inline-block",
};

function App() {
  const [view, setView] = useState("menu");

  const goBack = () => setView("menu");

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: szinek[4],
        width: "100vw",
        height: "100vh",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        overflow: "hidden"
      }}
    >
      <style>
        {`
          @keyframes felLeMozgas {
            0% { transform: translateY(0); }
            17% { transform: translateY(-20px); }
            34% { transform: translateY(0); }
            51% { transform: translateY(-20px); }
            68% { transform: translateY(0); }
            85% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
	<div style={{ position: "absolute", top: 10, left: 10, color: szinek[2] }}>
        <a href="../index.html">
          <button style={{ backgroundColor: szinek[1], color: "white", padding: "8px 16px" }}>
            ← Táblázat menü
          </button>
        </a>
      </div>
      <div style={{ width: "100vw"}}>
        {view === "menu" && (
          <div>
            <h1 style={{ color: szinek[2] }}>Válassz játékot!</h1>
            <button
              style={{ backgroundColor: szinek[0], color: "white", margin: 10, padding: 10 }}
              onClick={() => setView("kockapoker")}
            >
              Kockapóker
            </button>
            <button
              style={{ backgroundColor: szinek[0], color: "white", margin: 10, padding: 10}}
              onClick={() => setView("kpo")}
            >
              Kő-Papír-Olló
            </button>
          </div>
        )}

        {view === "kockapoker" && (
          <div>
            <button
              style={{ backgroundColor: szinek[0], color: "white", margin: 10, padding: 10}}
              onClick={goBack}
            >
              Vissza a menübe
            </button>
            <Kockapoker szinek={szinek} />
          </div>
        )}

        {view === "kpo" && (
          <div>
            <button
              style={{ backgroundColor: szinek[0], color: "white", margin: 10, padding: 10 }}
              onClick={goBack}
            >
              Vissza a menübe
            </button>
            <KoPapirOllo szinek={szinek} animacioStilus={animacioStilus} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
