# 📄 Spécification API – /api/simulate

## 🧠 Objectif de l’API

Permet à un utilisateur de **simuler l’évolution mensuelle de son patrimoine net** en fonction de ses :
- revenus mensuels
- dépenses mensuelles
- taux d’intérêt annuel (rendement)
- durée de projection (en années)

---

## 🔁 Endpoint

- **Route** : `/api/simulate`
- **Méthode** : `POST`
- **Content-Type** : `application/json`

---

## 📥 Payload attendu (Input JSON)

Exemple d’appel :

```json
{
  "monthly_income": 2500,
  "monthly_expenses": 1800,
  "investment_rate": 0.05,
  "duration_years": 10
}
