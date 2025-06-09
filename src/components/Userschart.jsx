import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import axios from 'axios'


const Userschart = () => {

    const [data, setData] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:9000/userschart')
    .then(res => {
      const chartData = res.data.map(item => ({
        month: item.month ?`${item.year}-${item.month.toString().padStart(2, '0')}` :'2025-02',
        newusers: item.newusers
      }));
      setData(chartData);
      
    })
    .catch(err => console.error(err));
}, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-2">Number of New Users Per Month</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="month" stroke='green' />
            <YAxis stroke='green' />
            <Tooltip />
            <Bar dataKey="newusers" fill="orange" />
        </BarChart>
        </ResponsiveContainer>
    </div>
  );

}

export default Userschart