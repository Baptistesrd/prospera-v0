# main.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Autorise les requêtes depuis ton HTML local

def simulate_projection(pmt, rate, months):
    patrimoine = []
    total = 0
    for t in range(months):
        total = (total + pmt) * (1 + rate)
        patrimoine.append(round(total, 2))
    return patrimoine


@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json()
    pmt = float(data['pmt'])
    rate = float(data['rate']) / 12  # taux mensuel
    months = int(data['duration'])

    result = simulate_projection(pmt, rate, months)
    return jsonify({"projection": result})

if __name__ == '__main__':
    app.run(debug=True)
