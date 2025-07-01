
import React, { useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);


    try {
      const res = await axios.post(`${BACKEND_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
        }
      });
      setData(res.data);
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Sales Dashboard</h1>
        <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} />
        <button
          onClick={handleUpload}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Upload
        </button>

        {data && (
          <div className="mt-8 space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <Card title="Total Sales" value={`₹${data.total_sales}`} />
              <Card title="Total Orders" value={data.total_orders} />
              <Card title="Avg Sale / Order" value={`₹${data.average_sale}`} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Sales Over Time</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={data.line_chart}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Amount" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Gender Distribution</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={Object.entries(data.gender_distribution).map(([name, value]) => ({ name, value }))}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {Object.entries(data.gender_distribution).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-2">Top Products</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.top_products}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Product" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Amount" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
