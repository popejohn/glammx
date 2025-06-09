import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import axios from 'axios'


const Saleschart = () => {

    const [data, setData] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:9000/saleschart')
    .then(res => {
      const chartData = res.data.map(item => ({
        month: `${item._id.year}-${item._id.month.toString().padStart(2, "0")}`,
        totalSales: item.monthlySales
      }));
      setData(chartData);
    })
    .catch(err => console.error(err));
}, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2">Total Monthly Sales</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="month" stroke='green' />
            <YAxis stroke='green' />
            <Tooltip />
            <Line type="monotone" dataKey="totalSales" stroke="blue" />
        </LineChart>
        </ResponsiveContainer>
    </div>
  );

}

export default Saleschart