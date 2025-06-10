import { div } from 'motion/react-client'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { MdOutlineFavorite, MdAddCircle } from "react-icons/md"
import { FaAngleRight, FaAngleLeft, FaStar  } from "react-icons/fa6";


const Favorites = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const [favoriteProducts, setFavoriteProducts] = useState([])
    useEffect(() => {
        axios.get("https://glammx-ecommerce-backend.onrender.com/user/favorites", {
            headers: {
                'Authorization': `Bearer ${token}`
                }        
        })
        .then((res) => {
            setFavoriteProducts(res.data)
        }).catch((err) => {
            alert('You must be logged in to view your favorites')
            setTimeout(() => {
                navigate('/user/signin')
            }, 2000);
           
        })
    }, [])
    
if (!token) {
    navigate('/user/signin')
} 

if (favoriteProducts.length === 0) {
    return (
            <div>
                You have not added any product to your favorites yet
            </div>
    )
}

  return (
    <div className='d-flex gap-4 flex-wrap'>
        {
           favoriteProducts.length && favoriteProducts.map((product, index) => (
            <div className='d-flex flex-column mt-3 justify-content-center shadow align-items-start bg-white' style={{width: "320px"}} key={index}>
                                            
                                            <div className='product-card position-relative px-4 py-3 bg-secondary-subtle' style={{width: "320px", height: "320px"}}>
                                                <img src={product.images[0]} className='rounded' alt="" style={{width: "100%", height: "100%"}} />
                                            </div>
                                            <div className='another-font product-details mt-2 px-3 ms-1 d-flex justify-content-between align-items-start'>
                                                <div style={{width: "82%"}}>
                                                    <div className='fw-bolder fs-5'>Product Name</div>
                                                    <div className='small-font'><p>{product.title}</p></div>
                                                    <div className='rating text-dark fw-semibold w-75'>
                                                        <div className='text-muted d-flex justify-content-start align-items-center w-50 gap-2 border border-start-0 border-top-0 border-bottom-0 border-secondary'>
                                                            <FaStar style={{color: "rgb(234, 193, 8)"}} /> 4.5
                                                        </div>
                                                        <div className='stock'>
            
                                                        </div>
                                                    </div>
                                                    <div className='orange fw-bold fs-4'>#{product.price}</div>
                                                </div>
                                                <div>
                                                    <button className='orange bg-transparent border-0 outline-0 me-2'>
                                                        <MdAddCircle  className='fs-1'/>
                                                    </button>
                                                </div>
                                                
                                            </div>
                                            <div className='another-font fs-6 fw-bold text-white bg-dark w-100 py-3 mt-1 text-center'>
                                                Add to Cart
                                            </div>
                                           
                                        </div>
           )
           )
        }
    </div>
  )
}

export default Favorites