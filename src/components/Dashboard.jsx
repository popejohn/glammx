import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Saleschart from './Saleschart';
import CategoryStockChart from './Trackstock';
import Userschart from './Userschart';


const Dashboard = () => {

const [totalSales, setTotalSales] = useState('');
const [totalUsers, setTotalUsers] = useState('');
const [pendingOrders, setPendingOrders] = useState('');
const [soldProducts, setSoldProducts] = useState('');
const [totalStock, setTotalStock] = useState('');

  useEffect(() => {
    axios.get('http://localhost:9000/displays')
    .then((res) => {
      setTotalSales(res.data.totalSold);
      setTotalUsers(res.data.totalUsers);
      setPendingOrders(res.data.pendingOrders);
      setSoldProducts(res.data.productsSold);
      setTotalStock(res.data.allStock);
    }).catch(err => {
        console.log(err.message);
        
    })
  }, [])
  

  return (
    <div className='px-3 py-5'>
      <div className='row d-flex gx-5'>
        <div className='col'>
          <div className='rounded-2 shadow-sm border border-info py-4 text-center'>
            <div className='fs-5 text-danger fw-bold'>
            Total Sales: <span className='text-primary'>{totalSales}</span>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='rounded-2 shadow-sm border border-info py-4 text-center'>
            <div className='fs-5 text-danger fw-bold'>
            Registered users: <span className='text-success'>{totalUsers}</span>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='rounded-2 shadow-sm border border-info py-4 text-center'>
            <div className='fs-5 text-warning fw-bold'>
            Total items: <span className='text-success'>{totalStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='row mt-5'>
        <div className='col'>
          <div className='rounded-2 shadow-sm bg-danger-subtle border border-3 border-white py-4 text-center'>
            <div className='fs-5 text-daek fw-bold'>
            Sold Items: <span className='text-primary'>{soldProducts}</span>
            </div>
          </div>
        </div>
        <div className='col'>
          <div className='rounded-2 shadow-sm bg-success-subtle border border-3 border-white py-4 text-center'>
            <div className='fs-5 text-daek fw-bold'>
              Pending Orders: <span className='text-warning'>{pendingOrders}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5'><Saleschart /></div>
      <div className='mt-5'><CategoryStockChart /></div>
      <div className='mt-5'><Userschart /></div>
    </div>
  )
}

export default Dashboard