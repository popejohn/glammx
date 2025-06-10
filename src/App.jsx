import { Routes, Route, useLocation } from 'react-router-dom'
import Signup from './components/Signup'
import Signuppage from './components/Signuppage'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Landingpage from './components/Landingpage'
import Signin from './components/Signin'
import Forgotpassword from './components/Forgotpassword'
import Resetpassword from './components/Resetpassword'
import Admindashboard from './components/Admindashboard';
import Adminsignin from './components/Adminsignin'
import Dashboard from './components/Dashboard'
import Products from './components/Products'
import Myorders from './components/Myorders'
import Settings from './components/Settings'
import Vendors from './components/Vendors'
import Editproduct from './components/Editproduct'
import Account from './components/Account'
import Viewproduct from './components/Viewproduct'
import Profile from './components/Profile'
import Favorites from './components/Favorites'
import Chatpage from './components/Chatpage'
import Mycart from './Mycart'
import Productview from './components/Productview'
import Navbar from './components/Navbar'
import { Link } from 'react-router-dom'
import socketClient from 'socket.io-client'
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiMinus } from "react-icons/ti";
import SupportDashboard from './components/Supportdashboard'
import Saleschart from './components/Saleschart'
import CategoryStockChart from './components/Trackstock'


function App() {

  

  const [show, setshow] = useState(false)
  const [show2, setshow2] = useState(false)
  const [loading, setloading] = useState(false)
  const [load, setLoad] = useState(false)
  const [altallProducts, setAltAllProducts] = useState([])
  const [groupedproducts, setGroupedProducts] = useState({})
  const [loggedin, setloggedin] = useState(false)
  const [myuser, setuser] = useState({})
  const [allProducts, setAllProducts] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [enlarged, setEnlarged] = useState(false)
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
    const token = localStorage.getItem('token')

    const location = useLocation();
  const noNavbarRoutes = ['/user/signin', '/user/signup', '/user/forgotpassword', '/user/resetpassword', '/glammx/admin'];

  const shouldShowNavbar = !noNavbarRoutes.some((route) => location.pathname.toLowerCase().startsWith(route));

  const socket = useRef(socketClient('https://glammx-ecommerce-backend.onrender.com'));


  useEffect(() => {
    setloading(true)
    // Fetch products from backend API
    axios.get("https://glammx-ecommerce-backend.onrender.com/allproducts")
      .then(response => {
        setloading(true)
        const data = response.data;
        setAllProducts(data)
        setAltAllProducts(data)
        // Group products by category name
        setloading(false)
        
      })
      .catch(err => {
        console.log(err);
        setloading(true);
      });
  }, []);


useEffect(() => {
 if (allProducts.length) {
  const groups = allProducts.reduce((acc, product) => {
          const category = product.category.name;

          if (!acc[category]) {
            acc[category] = [];
          }

          acc[category].push(product);
          return acc;
        }, {});
        setGroupedProducts(groups);
 }
}, [allProducts])


 // Get cart
      useEffect(() => {
        if (!token) {
            const user_cart = JSON.parse(localStorage.getItem('offline_cart')) || [];
            setCartItems (user_cart);
        }else{
            axios.get('https://glammx-ecommerce-backend.onrender.com/getcart',  {
                headers: {
                'Authorization': `Bearer ${token}`
                } 
        })
                .then((res) => {
                    setCartItems(res.data)
                    console.log(res.data);
                    
                }
                )
                .catch((err) => {
                    console.log(err.message)
                }
                )
                }   
      }, [])
      
useEffect(() => {
            if (token) {
                axios.post('https://glammx-ecommerce-backend.onrender.com/savecart', cartItems, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                        }
                })
                .then((res) => {
                    localStorage.setItem('offline_cart', JSON.stringify(cartItems))
                }).catch((err) => {
                    console.log(err.message);
                })
            }
                localStorage.setItem('offline_cart', JSON.stringify(cartItems))
}, [cartItems])

      


    //   Add to cart
      const addToCart = (theproduct) => {
            const productexist = cartItems.find((product) => 
                product._id === theproduct._id
            );
            if (productexist) {
                
                setCartItems(cartItems.map((item) => {
                  return  item._id === theproduct._id ? {...item, quantity: item.quantity + 1} : item
                }))
            toast.success('product quantity increased successfully')
        }else{
            setCartItems([...cartItems, {...theproduct, quantity: 1}])
            toast.success('product added to cart successfully')
        }
        
    }   


    const increaseQuantity = (product) => {
        setCartItems(cartItems.map((item) =>
            item._id === product._id ? {...item, quantity: item.quantity + 1}
        : item
        ));
        toast.success('product quantity increased successfully')
    }

    const decreaseQuantity = (product) => {
        if (product.quantity <= 1) {
            deleteFromCart(product)
            toast.success('product removed from cart')
            return
        }
        setCartItems(cartItems.map((item) =>
            item._id === product._id ? {...item, quantity: item.quantity - 1}
        : item
        ));
       toast.success('product quantity decreased successfully')
    }
 const cartDisplay = () => {
    if (showCart) {
        setShowCart(false)
    }
 }

const deleteFromCart = (product) => {
    setCartItems(cartItems.filter((item) =>
        product._id !== item._id
    ));
    toast.success('product deleted from cart')
}

    
   

    
    

  return (
    <div className='position-relative'>
      {shouldShowNavbar && <Navbar products={groupedproducts} loggedin={loggedin} myuser={myuser} showCart={showCart} setShowCart={setShowCart} setloggedin={setloggedin}/>}
      {showCart && <>
                  <div className='thescroll position-fixed bg-bg-light-subtle d-flex flex-column gap-3 bg-white rounded-3 shadow overflow-hidden px-2 py-3' style={{top: '66px', zIndex: '1000', right: '0', width: '300px', maxHeight: "90vh", overflowY: "clip"}}>{
                      cartItems.length === 0 ?<div>Your cart is empty</div> 
                      : cartItems.map((item) => (
                          <div className=''>
                                  <div>{item.title.slice(0,30)}</div>
                                  <div className='d-flex justify-content-start align-items-center'>
                                  <div>
                                      <img src= {item.images[0]} alt="" style={{width: "50px"}} />
                                  </div>
                                  <div>
                                      <button className='bg-transparent text-warning border-0 outline-0' onClick={() => decreaseQuantity(item)}><TiMinus /></button>
                                      <span>{item.quantity} pcs</span>
                                      <button className='bg-transparent text-success border-0 outline-0'onClick={() => increaseQuantity(item)}><IoMdAdd className='fw-bold' /></button>
                                      <button className='ms-5 text-danger bg-transparent fs-5 border-0 outline-0' onClick={() => deleteFromCart(item)}><RiDeleteBin6Line /></button>
                                  </div>
                              </div>
                              <div>#{item.price * item.quantity}</div>
                          </div>
                      ))
                      }
                      <Link to={'/user/account/cart'} onClick={() => setShowCart(false)} className='mt-4 btn btn-success fw-bold'>Check-Out</Link>
                      </div>
              </>}
      <Routes>
        <Route path='/' element={<Landingpage products={groupedproducts} altProducts = {altallProducts} setAllProducts = {setAllProducts} loading={loading} loggedin={loggedin} setloggedin={setloggedin} userId={myuser} allproducts = {allProducts} setGroupedProducts = {setGroupedProducts} showCart={showCart} setuser={setuser} setShowCart={setShowCart} enlarged={enlarged} setEnlarged={setEnlarged} message={message} setMessage={setMessage} messages={messages} setMessages={setMessages} socket={socket.current} cartItems={cartItems} setCartItems={setCartItems}/>} />
          <Route path='/user' element={<Signuppage />}>
              <Route path='signup' element={<Signup show={show} setshow={setshow} load={load} setLoad={setLoad} show2={show2} setshow2={setshow2} />} />
              <Route path='signin' element={<Signin loading={loading} setloading={setloading} myuser={myuser} setuser={setuser} />} />
              <Route path='forgotpassword' element={<Forgotpassword loading={loading} setloading={setloading} />} />
              <Route path= '/user/resetpassword/:otp' element={<Resetpassword load={load} setload={setLoad} />} />
          </Route>
          <Route path = '/viewproduct/:id' element={<Viewproduct products={allProducts} />} />
          <Route path='/glammx/admin/signin' element={<Adminsignin />} />
          <Route path='/glammx/admin' element={<Admindashboard />}>
              <Route index element={<Dashboard />} />
              <Route path='dashboard' element={<Dashboard />}/>
              <Route path='products' element={<Products products={allProducts} />} />
              <Route path = '/glammx/admin/products/edit/:ind' element = {<Editproduct products={allProducts} />} />
              <Route path='orders' element= {<Myorders />} />
              <Route path='vendors' element= {<Vendors />} />
              <Route path='settings' element = {<Settings />} />
              <Route path = 'support' element = {<SupportDashboard socket = {socket.current} />} />
          </Route>
          <Route path='/user/account' element={<Account loggedin={loggedin} setloggedin={setloggedin} myuser={myuser} />}>
              <Route index element={<Profile loggedin={loggedin} setloggedin={setloggedin} />} />
              <Route path='profile' element={<Profile loggedin={loggedin} setloggedin={setloggedin} />} />
              <Route path= 'favorites' element= {<Favorites />} />
              <Route path='cart' element= { <Mycart cartItems={cartItems} setCartItems={ setCartItems } user = {myuser} />} />
              <Route path='products/:cat' element= {<Productview products={allProducts} />} />
             
          </Route>
          <Route path='/customercare/chat' element= {<Chatpage userId={myuser} enlarged={enlarged} setEnlarged={setEnlarged} message={message} setMessage={setMessage} messages={messages} setMessages={setMessages} socket={socket.current}/>} />
          <Route path= '/categorychart' element = {<CategoryStockChart />} />
      </Routes>
    </div>
  )
}

export default App
