import React, {useState} from 'react'
import logoimage from '../assets/glogo.png'
import { Link } from 'react-router-dom';
import '../App.css'
import "../glow.css";
import Nav from './Nav';
import { LuShoppingCart } from "react-icons/lu"
import Scalebutton from './Scalebutton';
import StarBorder from './Starborder';
import { AiOutlineMenu } from "react-icons/ai";




const style1 = {display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: 'center'}
const style2 = {display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'start'}



const Navbar = ({loggedin, setloggedin, products, myuser, showCart, setShowCart}) => {

const [showmenu, setShowmenu] = useState(false)

    const showHideCart = () => {
        if (showCart) {
            setShowCart(false)
        }else{
            setShowCart(true)
        }
    }

    const displayMenu = () =>{
        if (showmenu) {
            setShowmenu(false)
            }else{
                setShowmenu(true)
                }
    }
    
  return (
    <div className='navbar-z bg-light position-fixed top-0 w-100 shadow'>
    <div className='container-nav min-w-100vw d-flex justify-content-between align-items-center py-2'>
        <div className='logo d-flex justify-content-start align-items-center gap-3'>
            <img src={logoimage} alt="" className='rounded-circle' style={{height: "50px", width: "50px"}} />
            <div className='logo-name fw-bold fs-4 text-dark'>Glammx</div>
            <div className='menu position-relative fs-5 fw-semibold' style={{display: 'none'}} onClick={displayMenu}><AiOutlineMenu />
            { showmenu &&
                <div className='position-absolute bg-white py-2 pe-4 rounded-2 shadow-sm'>
                    <Nav loggedin = {loggedin} setloggedin = {setloggedin} products = {products} myuser = {myuser} style={style2} />
                </div>
}
            </div>
        </div>
        <div className='thenav'><Nav loggedin = {loggedin} setloggedin = {setloggedin} products = {products} myuser = {myuser} style={style1} /></div>
       <div className='nav ms-5 d-flex justify-content-start align-items-center gap-3'>
                <Link className='glow fs-3 text-dark ms-4' onClick={showHideCart}><LuShoppingCart /></Link>
                {loggedin ?
                <Link to={'/user/account/profile'}>
                    <img src={myuser.profilepic && myuser.profilepic} alt="" className='rounded-circle' style={{width: "40px", height: "40px"}} />
                </Link>
                : <>
                <Link to='/user/signin'><Scalebutton text={"Sign in"} style={"btn btn-outline-dark rounded-2 fw-semibold ms-3"} /></Link>
                <Link to='/user/signup'><Scalebutton text={"Sign up"} style={"btn btn-dark rounded-2 fw-semibold ms-3"} /></Link></>
             }
            </div>
    </div>
    </div>
  )
}

export default Navbar