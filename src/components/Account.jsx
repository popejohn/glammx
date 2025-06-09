import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import glogo from '../glogo.png'
import '../App.css'
import { MdOutlineFavorite } from "react-icons/md";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';



const Account = () => {

  return (
    <div className="admin-layout mt-5" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside className='pt-5 ps-3 mt-5 d-flex flex-column justify-content-between pb-5 position-fixed left-0 top-0' style={{ width: '200px', background: '#1e293b', color: '#fff', height: '100vh'}}>
        <div>
        <Link className='d-flex align-items-end gap-2 ps-4 text-decoration-none text-white' to={'/'}>
          <img className='rounded-circle' src={glogo} alt="" style={{width: "25px", height: '25px'}} />
          <div className='another-font fw-bold'>Glammx</div>
        </Link>
        <nav className="admin-nav mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className='d-flex flex-column justify-content-start align-items-start gap-3'>
            <Link className="navlinks py-2 ps-4 text-light text-decoration-none w-100 d-flex align-items-center gap-2" to="profile" ><CgProfile />My Profile</Link>
            <Link className="navlinks py-2 ps-4 text-light text-decoration-none w-100 d-flex align-items-center gap-2" to="favorites" ><MdOutlineFavorite /> My Favorites</Link>
            <Link className="navlinks py-2 ps-4 text-light text-decoration-none w-100 d-flex align-items-center gap-2" to="cart" ><BiSolidPurchaseTagAlt />My cart</Link>
            {/* <Link className='navlinks py-2 ps-4 text-light text-decoration-none w-100 d-flex align-items-center gap-2' to='products/:cat'>Products</Link> */}
            <button className='py-2 ps-4 text-light btn btn-dark text-decoration-none w-100 mt-3 d-flex align-items-center gap-2' to="settings"><IoSettingsSharp />Logout</button>
          </div>
        </nav>
        </div>
        <div className=''>
            <div><span style={{color: "orange"}}></span></div>
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



export default Account
