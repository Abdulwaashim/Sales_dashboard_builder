import pandas as pd

from datetime import datetime, timedelta

import random


dates = [datetime(2023, 1, 1) + timedelta(days=i) for i in range(60)]

data = []

genders = ['Male', 'Female']

products = ['Pen', 'Notebook', 'Backpack', 'Calculator', 'File']


for date in dates:

    for _ in range(random.randint(5, 20)):

        data.append({

            'Date': date.strftime('%Y-%m-%d'),

            'Product': random.choice(products),

            'Amount': round(random.uniform(50, 1000), 2),

            'Customer Gender': random.choice(genders)

        })


df = pd.DataFrame(data)

df.to_excel('store_sales.xlsx', index=False)
