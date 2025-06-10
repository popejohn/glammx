import React, { useState, useEffect } from 'react';
import {  PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import axios from 'axios';


const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c', '#d0ed57', '#fa8072'];

const CategoryStockChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://glammx-ecommerce-backend.onrender.com/categorychart")
      .then(res => {
        const formatted = res.data.map(item => ({
          category: item._id,
          stock: item.totalStock
        }));
        setData(formatted);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2">Stock by Product Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="category" stroke="#333" tick={{ fill: '#333' }} />
          <YAxis stroke="#333" tick={{ fill: '#333' }} />
          <Tooltip />
          <Bar dataKey="stock" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={data}
      dataKey="stock"
      nameKey="category"
      cx="50%"
      cy="50%"
      outerRadius={100}
      fill="#8884d8"
      label
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>
    </div>
  );
};

export default CategoryStockChart;