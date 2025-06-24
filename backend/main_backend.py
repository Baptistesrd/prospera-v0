from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Autorise les requêtes depuis ton HTML local

def simulate_projection(pmt, rate, months, fire_target=0):
    patrimoine = []
    total = 0
    fire_month = None

    for t in range(months):
        total = (total + pmt) * (1 + rate)
        patrimoine.append(round(total, 2))

        if fire_target and fire_month is None and total >= fire_target:
            fire_month = t  # Premier mois où FIRE est atteint

    return {
        "projection": patrimoine,
        "fire_month": fire_month
    }

@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json()
    pmt = float(data['pmt'])
    rate = float(data['rate']) / 12  # taux mensuel
    months = int(data['duration'])
    fire_target = float(data.get('fireTarget', 0))  # récupère l’objectif FIRE

    result = simulate_projection(pmt, rate, months, fire_target=fire_target)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)

