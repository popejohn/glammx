import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Accounts.css'; // CSS styles below
import "../glow.css"
import { CgProfile } from "react-icons/cg";
import { MdContactSupport } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { IoBagCheckOutline } from "react-icons/io5"
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaUserCheck, FaAngleDown, FaCartPlus } from "react-icons/fa6";
import axios from 'axios';

const AccountDropdown = ({myuser, login, setloggin, accountName}) => {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(prev => !prev);
  };

const logout =() => {
  axios.post('https://glammx-ecommerce-backend.onrender.com/logout', {email: myuser.email})
  localStorage.removeItem('token')
  localStorage.removeItem('offline_cart')
  setloggin(false)
  navigate('/user/signin')
}

  return (
    <div
      className="account-container"
      onClick={toggleDropdown}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{width: "200px"}}
    >
      <div className="glow d-flex justify-content-center align-items-center gap-2">
        <FaUserCheck />
        <div><Link className='glow text-dark text-decoration-none fw-semibold fst-italic'>{myuser.firstname ?`Hi ${myuser.firstname}` :"Account"}</Link></div>
        <FaAngleDown />
      </div>

     {myuser && <div className={`dropdown ${open ? 'open' : ''}`}>
        <Link to="/user/account/profile" className='d-flex justify-content-start align-items-center gap-2'><CgProfile className='fs-5'/> My Profile</Link>
        <Link to="/user/account/favorites" className='d-flex justify-content-start align-items-center gap-2'><MdFavorite className='fs-5'/> Favorites</Link>
        <Link to="/user/account/cart" className='d-flex justify-content-start align-items-center gap-2'><MdContactSupport  className='fs-5'/>My cart</Link>
        <Link to="/customercare/chat" className='d-flex justify-content-start align-items-center gap-2'><FaCartPlus className='fs-5'/>Chat support</Link>
        {login && <button className='d-flex justify-content-start align-items-center gap-2 btn btn-warning bg-black text-white' onClick={logout}>
         <IoMdLogOut className='fs-5'/> Logout
        </button>}
      </div> }
    </div>
  );
};

export default AccountDropdown;
