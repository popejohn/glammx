import React from 'react'
import { Link } from 'react-router-dom';
import '../App.css'
import "../glow.css"
import DropdownMenu from './Dropdown';
import AccountDropdown from './AccountDropdown';

const Nav = ({loggedin, setloggedin, products, myuser, style, accountName}) => {
    const showHideCart = () => {
        if (showCart) {
            setShowCart(false)
        }else{
            setShowCart(true)
        }
    }
  return (
    <div>
        <div className='d-flex w-75 justify-content-between align-items-center'>
            <div className='gap-3' style={style}>
                <div><Link to={'/'} className='glow text-dark text-decoration-none fw-semibold ps-3'>Home</Link></div>
                <div><Link className='glow text-dark text-decoration-none fw-semibold ps-3'>Saved</Link></div>
                <DropdownMenu products={products} />
                <div className='ps-3'><AccountDropdown myuser={myuser}  login={loggedin} setloggin={setloggedin}/></div>
            </div>
            
            
        </div>
    </div>
  )
}

export default Nav