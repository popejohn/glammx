import React from 'react'
import Navbar from './Navbar'
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'
import Searchbar from './Searchbar'
import CategoryIcons from './Categories';
import { MdOutlineFavorite, MdAddCircle } from "react-icons/md"
import { FaAngleRight, FaAngleLeft, FaStar  } from "react-icons/fa6";
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import Chaticon from './Chaticon'
import Chatpage from './Chatpage'


const Landingpage = ({products, loggedin, loading, altProducts, allproducts, setAllProducts, setloggedin, setuser, enlarged, setEnlarged, message, setMessage, messages, setMessages, userId, cartItems, setCartItems, socket}) => {

    setEnlarged(false)
    
     
    const token = localStorage.getItem('token')
    const [favorites, setFavorites] = useState([])
    const [advert, setAdvert] = useState(true)
    const [showChat, setShowChat] = useState(false)
    const navigate = useNavigate()
        
    const scrollRefs = useRef({});
    
    useEffect(() => {
  const fetchuser = async() => {
    if (token) {
      setloggedin(true);
      await axios.get('http://localhost:9000/user/verify', {
         headers:{
           'Authorization': `Bearer ${token}`
         }
       })
        .then((res) => {
         setuser(res.data.user);
         
        }).catch((error) => {
         setloggedin(false)
        })
       // Optionally fetch user data here if needed
     }
  }
  fetchuser()
  
}, [loggedin])

    // Get favorite
    useEffect(() => {
        axios.get('http://localhost:9000/getfavorites', {
            headers: {
                'Authorization': `Bearer ${token}`
                }
        })
        .then((res) => {
            
            setFavorites(res.data)
        }).catch((err) => {
            console.log(err.message);
            
        })
    }, [])
    

    const scrollLeft = (cat) => {
        const el = scrollRefs.current[cat];
        if (el) {
          el.scrollBy({ left: -500, behavior: 'smooth' });
        }
      };
      
      const scrollRight = (cat) => {
        const el = scrollRefs.current[cat];
        if (el) {
          el.scrollBy({ left: 500, behavior: 'smooth' });
        }
      };


    //   Toggle favorite
      const toggleFavorite = (productId) => {
            if (favorites.some((product) => product._id === productId)) {
                toast.success('product removed from favorites')
                setFavorites(favorites.filter((product) => product._id !== productId))
            }else{
                setFavorites((prev) => 
                    [...prev, allproducts.find((product) => product._id === productId)]
                );
                toast.success('product added to favorites')
            }
      }


    // Add to favorites
      useEffect(() => {
        axios.post('http://localhost:9000/addfavorites', {products: favorites}, {
            headers: {
                'Authorization': `Bearer ${token}`
                }
        })
        .then((res) => {}
        ).catch((err) =>
            console.log(err.message, 'favorite not added')
            )
      }, [favorites])

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

  return (
    <div className=''>
        <ToastContainer/>
        {
            !loading
            ? (<div>
                <div className="display-container position-relative d-flex justify-content-center align-items-center">
                    <div className='w-100 d-flex justify-content-center align-items-center border border-2 border-primary left' style={{height: '550px'}}>
                        <div className='left'></div>
                        <video src="5889058-uhd_3840_2160_25fps.mp4" autoPlay loop muted playsInline className='w-100' style={{height: '550px'}}></video>
                        <div className='right'></div>
                    </div>
                    <div className='overlay w-100 h-100 position-absolute top-0 left-0 d-flex flex-column justify-content-center align-items-center text-center'>
                        <h1 className='fw-bold'>Find Great Deals and Exceed Your Expectations</h1>
                        <div className='mt-2 d-flex flex-column justify-content-center align-items-center'>
                            <p className='first-p'>We offer you what an amazing person like you deserve, <span className='fw-bold'>THE BEST</span></p>
                            <p className='second-p'>You deserve a life of greatness, regardless of what you earn</p>
                        </div>
                    </div>
                    <Searchbar products={products} altProducts = {altProducts} setAllProducts={setAllProducts} advert ={advert} setAdvert = {setAdvert}/>
                </div>
                <div className='another-font container-categories mt-5 pt-4'>
                    <div className='d-flex justify-content-between align-items-center mt-5'>
                        <div className='fw-bold fs-5'>Categories</div>
                        <Link className='glowing fw-semibold text-decoration-none'>See all</Link>
                    </div>
                    <CategoryIcons />
                </div>
                
            
                <div className='product-container'>
                    {Object.entries(products).slice(0,4).map(([categoryname, productArray], ind) => (
                    <div key={categoryname} className='mt-5'>
                        <div className='another-font product-title d-flex justify-content-between align-items-center fw-bold fs-5 text-dark'><div className='glow'>{categoryname}</div>
                            <div>
                                <button className='button-background px-2 py-1 border-0 outline-0 shadow rounded-circle text-black' onClick={() => scrollLeft(categoryname)}> <FaAngleLeft /> </button>
                                <button className='button-background px-2 py-1 border-0 outline-0 shadow rounded-circle text-black ms-2' onClick={() => scrollRight(categoryname)}> <FaAngleRight /> </button>
                            </div>
                        </div>
                        <div className='d-flex py-3 scroll-container justify-content-between align-items-start'  ref={(el) => (scrollRefs.current[categoryname] = el)}>{productArray.map((anyproduct, index) => (
                            <div className='d-flex flex-column mt-3 justify-content-center shadow align-items-start bg-white' style={{width: "320px"}} key={index}>
                                
                                <div className='product-card position-relative px-4 py-3 bg-secondary-subtle' style={{width: "320px", height: "320px"}}>
                                    <button className='favorite rounded-circle position-absolute outline-0 border-0 shadow-lg ms-2 mt-2 d-flex justify-content-center align-items-center bg-dark' onClick={() => toggleFavorite(anyproduct._id)} style={{color: favorites.some((product)=> product._id === anyproduct._id) ? "pink" : "white", height: '30px', width: '30px'}}>
                                        < MdOutlineFavorite className='fs-5'/>
                                    </button>
                                    <img src={anyproduct.images[0]} className='rounded' alt="" style={{width: "100%", height: "100%"}} />
                                </div>
                                <div className='another-font product-details mt-2 px-3 ms-1 d-flex justify-content-between align-items-start'>
                                    <div style={{width: "82%"}}>
                                        <div className='fw-bolder fs-5'>Product Name</div>
                                        <div className='small-font'><p>{anyproduct.title}</p></div>
                                        <div className='rating text-dark fw-semibold w-75'>
                                            <div className='text-muted d-flex justify-content-start align-items-center w-50 gap-2 border border-start-0 border-top-0 border-bottom-0 border-secondary'>
                                                <FaStar style={{color: "rgb(234, 193, 8)"}} /> 4.5
                                            </div>
                                            <div className='stock'>

                                            </div>
                                        </div>
                                        <div className='orange fw-bold fs-4'>#{anyproduct.price}</div>
                                    </div>
                                    <div>
                                        <button className='orange bg-transparent border-0 outline-0 me-2' onClick={() => addToCart(anyproduct)}>
                                            <MdAddCircle  className='fs-1'/>
                                        </button>
                                    </div>
                                    
                                </div>
                                <div className='another-font fs-6 fw-bold text-white bg-dark w-100 py-3 mt-1 text-center' onClick = {() => navigate(`/viewproduct/${anyproduct._id}`)}>
                                    See more
                                </div>
                               
                            </div>
                        ))}</div>
                        <div className='w-100 d-flex justify-content-end px-5 mt-4'>
                        </div>
                    </div>
                   ) )}
                </div>
                {advert && <div className='adverts-posters my-5'>
                    <div className='advert-image mx-auto'>
                        <img src="5764026.jpg" alt="" className='w-100' />
                    </div>
                </div>}
                <div className='product-container'>
                {Object.entries(products).slice(4,11).map(([categoryname, productArray], ind) => (
                    <div key={categoryname} className='mt-5'>
                        <div className='another-font product-title d-flex justify-content-between align-items-center fw-bold fs-5 text-dark'><div className='glow'>{categoryname}</div>
                            <div>
                                <button className='button-background px-2 py-1 border-0 outline-0 shadow rounded-circle text-black' onClick={() => scrollLeft(categoryname)}> <FaAngleLeft /> </button>
                                <button className='button-background px-2 py-1 border-0 outline-0 shadow rounded-circle text-black ms-2' onClick={() => scrollRight(categoryname)}> <FaAngleRight /> </button>
                            </div>
                        </div>
                        <div className='d-flex py-3 scroll-container justify-content-between align-items-start'  ref={(el) => (scrollRefs.current[categoryname] = el)}>{productArray.map((anyproduct, index) => (
                            <div className='d-flex flex-column mt-3 justify-content-center shadow align-items-start bg-white' style={{width: "320px"}} key={index}>
                                
                                <div className='product-card position-relative px-4 py-3 bg-secondary-subtle' style={{width: "320px", height: "320px"}}>
                                <button className='favorite rounded-circle position-absolute outline-0 border-0 shadow-lg ms-2 mt-2 d-flex justify-content-center align-items-center bg-dark' onClick={() => toggleFavorite(anyproduct._id)} style={{color: favorites.some((product)=> product._id === anyproduct._id) ? "pink" : "white", height: '30px', width: '30px'}}>
                                        < MdOutlineFavorite className='fs-5'/>
                                    </button>
                                    <img src={anyproduct.images[0]} className='rounded' alt="" style={{width: "100%", height: "100%"}} />
                                </div>
                                <div className='another-font product-details mt-2 px-3 ms-1 d-flex justify-content-between align-items-start'>
                                    <div style={{width: "82%"}}>
                                        <div className='fw-bolder fs-5'>Product Name</div>
                                        <div className='small-font'><p>{anyproduct.title}</p></div>
                                        <div className='rating text-dark fw-semibold w-75'>
                                            <div className='text-muted d-flex justify-content-start align-items-center w-50 gap-2 border border-start-0 border-top-0 border-bottom-0 border-secondary'>
                                                <FaStar style={{color: "rgb(234, 193, 8)"}} /> 4.5
                                            </div>
                                            <div className='stock'>

                                            </div>
                                        </div>
                                        <div className='orange fw-bold fs-4'>#{anyproduct.price}</div>
                                    </div>
                                    <div>
                                        <button className='orange bg-transparent border-0 outline-0 me-2' onClick={() => addToCart(anyproduct)}>
                                            <MdAddCircle  className='fs-1'/>
                                        </button>
                                    </div>
                                    
                                </div>
                                <div className='another-font fs-6 fw-bold text-white bg-dark w-100 py-3 mt-1 text-center'>
                                    See more
                                </div>
                               
                            </div>
                        ))}</div>
                        <div className='w-100 d-flex justify-content-end px-5 mt-4'>
                        </div>
                    </div>
                   ) )}
                </div>
                {showChat && <Chatpage enlarged={enlarged} setEnlarged={setEnlarged} message={message} setMessage={setMessage} messages={messages} setMessages={setMessages} userId={userId} socket={socket}/>}
                {<Chaticon showChat={showChat} setShowChat={setShowChat} />}
                <Footer />
            </div>) :( <div className='bg-light pt-3 px-3 text-info fw-semibold d-flex flex-column justify-content-center align-items-center' style={{minHeight: "99vh"}}>
            <div className="spinner-border text-dark opacity-75" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>)
        }
    
    </div>
  )
}

export default Landingpage