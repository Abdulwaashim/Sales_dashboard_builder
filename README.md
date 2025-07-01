# 🧮 Sales Dashboard Builder

A web-based data visualization tool that allows users to upload an Excel file and automatically generates key sales visualizations using pre-set patterns.

---

## 📌 Features

- Upload `.xlsx` file directly from the browser.
- Extracts key columns automatically and visualizes:
  - Sales trend (Line Chart)
  - Gender-wise distribution (Donut Chart)
  - City-wise and Age group-wise analysis
- Displays summary cards: Total Sales, Quantity Sold, Units, Avg Price
- Built using React (Frontend), Flask (Backend), deployed with Netlify and Render.

---

## 🛠️ Tech Stack

| Layer       | Technology      |
|-------------|-----------------|
| Frontend    | React.js        |
| Backend     | Flask (Python)  |
| Deployment  | Netlify (Frontend), Render (Backend)
| Charting    | Chart.js        |
| File Format | Excel (.xlsx)   |

---

## 🚀 How It Works

1. User uploads an Excel file (`.xlsx`).
2. Flask backend reads the file using `pandas`, extracts data.
3. Backend sends cleaned/structured data as JSON to frontend.
4. React frontend renders:
   - Line Chart for Sales trend
   - Donut Chart for Gender
   - Bar Charts for City and Age Group
   - Metric Cards with key KPIs

---

## 📁 Project Structure
<pre lang="bash"> Sales_Dashboard/ │ ├── backend/ │ ├── app.py # Flask backend logic │ ├── requirements.txt # Python dependencies │ └── render.yaml # Render deployment config │ ├── frontend/ │ ├── public/ │ │ ├── favicon.ico # Custom React favicon │ ├── src/ │ │ ├── App.js # React frontend logic │ │ └── components/ │ ├── .env # Backend URL variable │ └── package.json # React app metadata </pre>
---

## 🌍 Deployment

### Frontend (Netlify)
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/build`
- Set `REACT_APP_BACKEND_URL` in Netlify Environment Variables.

### Backend (Render)
- `render.yaml` for configuration:
```yaml
services:
  - type: web
    name: sales-flask-backend
    env: python
    startCommand: gunicorn app:app
    envVars:
      - key: MAX_CONTENT_LENGTH
        value: "5242880"  # 5MB
```

### Common errors
```
| Error Message              | Cause                                            | Fix                                                            |
|---------------------------|--------------------------------------------------|----------------------------------------------------------------|
| Upload failed: Network Error | Backend URL misconfigured or CORS blocked     | ✅ Check `REACT_APP_BACKEND_URL` in frontend `.env`            |
| 404 Not Found (Render)    | Route `/upload` not found or wrong `startCommand` | ✅ Ensure Flask has `@app.route('/upload')` and uses `gunicorn app:app` |
| File too large            | Flask rejects files larger than default limit   | ✅ Set `app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024`     |
| Localhost works, deployed fails | Backend not reachable by frontend         | ✅ Ensure CORS is configured and both frontend/backend URLs are set correctly |
```

## 📸 Sample Output

### 📈 Dashboard Preview

![Line Chart - Daily Sales](assets/sales_line_chart.png)
*Line chart shows total sales by date.*

![Donut Chart - Gender Distribution](assets/gender_donut_chart.png)
*Donut chart shows male vs female customers.*

![KPIs - Summary Cards](assets/kpi_cards.png)
*Key metrics like Total Sales, Orders, Avg. Sale.*

# License
```
MIT License


---

You can copy this into your `README.md` file directly. Let me know if you want to add badges, screenshots, or a live demo link too.

