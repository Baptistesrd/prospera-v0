async function launchSimulation() {
  const pmt = parseFloat(document.getElementById("pmt").value);
  const rate = parseFloat(document.getElementById("rate").value) / 100;
  const duration = parseInt(document.getElementById("duration").value);

  const response = await fetch('http://127.0.0.1:5000/simulate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pmt, rate, duration })
  });

  const data = await response.json();
  document.getElementById("result").innerText = JSON.stringify(data.projection, null, 2);
}
