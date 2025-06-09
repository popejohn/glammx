import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import glogo from '../glogo.png'
import '../App.css'
import { MdDashboard, MdSell } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";
import { BsBuildingAdd } from "react-icons/bs";
import { SiHiveBlockchain } from "react-icons/si";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { MdOutlineContactSupport } from "react-icons/md";




const Admindashboard = () => {
    const [admin, setAdmin] = useState(null)

    const token = localStorage.getItem('admin-token')
    const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://localhost:9000/admin/dashboard", {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      setAdmin(res.data.companyid)
    }).catch((error) => {
      console.log(error.message);
      localStorage.removeItem('admin-token')
      navigate('/glammx/admin/signin')
    })
  }, [])
  

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className='pt-5 ps-3 d-flex flex-column justify-content-between pb-5 position-fixed left-0 top-0' style={{ width: '200px', background: '#1e293b', color: '#fff', height: '100vh'}}>
        <div>
        <div className='d-flex align-items-end gap-2 ps-4'>
          <img className='rounded-circle' src={glogo} alt="" style={{width: "25px", height: '25px'}} />
          <div className='another-font fw-bold'>Glammx</div>
        </div>
        <nav className="admin-nav mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className='d-flex flex-column justify-content-start align-items-start gap-3'>
            <Link className="navlinks py-2 ps-4 text-light text-decoration-none w-100" to="dashboard" ><MdDashboard /> Dashboard</Link>
            <Link className="navlinks py-2 ps-4 text-light text-decoration-none w-100" to="orders" ><SlNotebook /> Manage Orders</Link>
            <Link className="navlinks py-2 ps-4 text-light text-decoration-none w-100" to="products" ><BsBuildingAdd /> Products</Link>
            <Link className="navlinks py-2 ps-4 text-light text-decoration-none w-100" to="vendors" ><MdSell /> Vendors</Link>
            <Link className="navlinks py-2 ps-4 text-light text-decoration-none w-100" to="support" ><MdOutlineContactSupport /> Support</Link>
            <Link className='navlinks py-2 ps-4 text-light text-decoration-none w-100 mt-3' to="settings"><IoSettingsSharp /> Settings</Link>
          </div>
        </nav>
        </div>
        <div className=''>
            <div>Welcome! <span style={{color: "orange"}}>{admin}</span></div>
          </div>
      </aside>

      {/* Main Content */}
      <div style={{ flexGrow: 1 }}>
        {/* Top Toolbar *)

        {/* Main Body - Nested Routes Render Here */}
        <main style={{ padding: '25px 25px 25px 250px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};


export default Admindashboard;
