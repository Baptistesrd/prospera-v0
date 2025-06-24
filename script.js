let chartInstance;

async function launchSimulation() {
  const pmt = parseFloat(document.getElementById("pmt").value);
  const rate = parseFloat(document.getElementById("rate").value) / 100;
  const duration = parseInt(document.getElementById("duration").value);
  const fireTarget = parseFloat(document.getElementById("fireTarget").value);

  const response = await fetch('http://127.0.0.1:5000/simulate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pmt, rate, duration, fireTarget })
  });

  const data = await response.json();
  document.getElementById("result").innerHTML = generateSummary(data);
  renderChart(data);
}

function renderChart(data) {
  const labels = data.projection.map((_, i) => `Mois ${i + 1}`);
  const ctx = document.getElementById("projectionChart").getContext("2d");

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Patrimoine simulé (€)',
        data: data.projection,
        borderWidth: 2,
        borderColor: 'blue',
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: {
        annotation: {
          annotations: data.fire_month !== null ? {
            fireLine: {
              type: 'line',
              xMin: data.fire_month,
              xMax: data.fire_month,
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: true,
                content: `🔥 FIRE: Mois ${data.fire_month + 1}`,
                position: 'start',
                backgroundColor: 'rgba(255,0,0,0.6)',
                color: 'white',
                font: {
                  weight: 'bold'
                }
              }
            }
          } : {}
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Patrimoine (€)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Temps (mois)'
          }
        }
      }
    }
  });
}

function generateSummary(data) {
  if (data.fire_month === null) {
    return `
      <p><strong>🎯 Résultat :</strong> L'objectif FIRE n'est pas atteint dans la période simulée.</p>
      <p>Patrimoine final après ${data.projection.length} mois : <strong>${formatCurrency(data.projection.at(-1))}</strong></p>
    `;
  } else {
    const years = Math.floor(data.fire_month / 12);
    const months = data.fire_month % 12;
    return `
      <p><strong>🔥 Objectif FIRE atteint !</strong></p>
      <p>Temps pour l’atteindre : <strong>${years} ans et ${months} mois</strong></p>
      <p>Patrimoine au moment FIRE : <strong>${formatCurrency(data.projection[data.fire_month])}</strong></p>
    `;
  }
}

function formatCurrency(value) {
  return value.toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0
  });
}
