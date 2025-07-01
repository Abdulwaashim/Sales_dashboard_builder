
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd



app = Flask(__name__)
CORS(app, supports_credentials=True, origins="*")
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5MB limit

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    try:
        df = pd.read_excel(file)
        df['Date'] = pd.to_datetime(df['Date'])
        df['Amount'] = pd.to_numeric(df['Amount'], errors='coerce')
        df.dropna(subset=['Amount'], inplace=True)

        # Line chart data: daily total sales
        line_chart = df.groupby('Date')['Amount'].sum().reset_index()
        line_chart_data = line_chart.to_dict(orient='records')

        # Donut chart: Customer Gender distribution
        gender_counts = df['Customer Gender'].value_counts().to_dict()

        # KPI Cards
        total_sales = round(df['Amount'].sum(), 2)
        total_orders = len(df)
        avg_sale = round(df['Amount'].mean(), 2)

        # Bar chart: Top 5 Products
        top_products = df.groupby('Product')['Amount'].sum().nlargest(5).reset_index()
        top_products_data = top_products.to_dict(orient='records')

        return jsonify({
            'line_chart': line_chart_data,
            'gender_distribution': gender_counts,
            'total_sales': total_sales,
            'total_orders': total_orders,
            'average_sale': avg_sale,
            'top_products': top_products_data
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
