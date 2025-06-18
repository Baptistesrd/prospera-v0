import React, { useState } from "react";
import ChartComponent from "./ChartComponent";

function App() {
  const [pmt, setPmt] = useState(100);
  const [rate, setRate] = useState(10);
  const [duration, setDuration] = useState(12);
  const [projection, setProjection] = useState([]);

  const simulate = async () => {
    const res = await fetch("http://127.0.0.1:5000/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pmt,
        rate: rate / 100,
        duration,
      }),
    });

    const data = await res.json();
    setProjection(data.projection);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>💰 Simulateur de patrimoine</h1>

      <label>Épargne mensuelle : {pmt} €</label>
      <input type="range" min="50" max="2000" step="50" value={pmt} onChange={(e) => setPmt(+e.target.value)} /><br /><br />

      <label>Taux annuel : {rate} %</label>
      <input type="range" min="0" max="15" step="0.1" value={rate} onChange={(e) => setRate(+e.target.value)} /><br /><br />

      <label>Durée : {duration} mois</label>
      <input type="range" min="6" max="360" step="1" value={duration} onChange={(e) => setDuration(+e.target.value)} /><br /><br />

      <button onClick={simulate}>Simuler</button>

      {projection.length > 0 && (
        <>
          <h2>Résultat :</h2>
          <ChartComponent data={projection} />
          <p>Total investi : {pmt * duration} €</p>
          <p>Valeur finale : {projection.at(-1)} €</p>
          <p>Intérêts générés : {Math.round(projection.at(-1) - pmt * duration)} €</p>
        </>
      )}
    </div>
  );
}

export default App;
