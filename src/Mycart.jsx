import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { PaystackButton } from 'react-paystack'
import { header } from 'motion/react-client'

const Mycart = ({cartItems, setCartItems, user}) => {
        const publicKey = 'pk_test_6b14b30835e35c307b7970c12d936e2f82e1775e'
        const navigate = useNavigate()

    const token = localStorage.getItem('token')
    

    const checkOutCart = () => {
        navigate('/user/signin')
    }

    const checkOutStack = () => {
       
        axios.post('https://glammx-ecommerce-frontend.onrender.com/checkout', {cartItems}, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
            setCartItems([])
             toast.success('check out successful')
             localStorage.removeItem('offline_cart')
        }).catch(err => {
            if (err.includes('Quantity exceeds')){
                toast.error('One or more of the products is no longer in stock or quantity higher than what\'s available')
            }else{
            toast.error('Check out failed. Please try again after login')
            }
        })
         setTimeout(() => {
            navigate('/')
        }, 1500);
    }

  return (
    <div>
        <div className='d-flex gap-4 flex-wrap'>
                {
                   cartItems.length && cartItems.map((product, index) => (
                    <div className='d-flex flex-column mt-3 justify-content-center shadow align-items-start bg-white' style={{width: "300px"}} key={index}>
                                                    
                                                    <div className='product-card position-relative px-4 py-3 bg-secondary-subtle' style={{width: "300px", height: "300px"}}>
                                                        <img src={product.images[0]} className='rounded' alt="" style={{width: "100%", height: "100%"}} />
                                                    </div>
                                                    <div className='another-font product-details mt-2 px-3 ms-1 d-flex justify-content-between align-items-start'>
                                                        <div style={{width: "82%"}}>
                                                            <div className='fw-bolder fs-5'>Product Name</div>
                                                            <div className='small-font'>{product.title}</div>
                                                            <div className='w-100 d-flex justify-content-between'><span className='small-font fw-semibold text-warning'>price: #{product.price} </span> <span className='fw-semibold small-font text-success'>Qty: <span>{product.quantity}</span></span></div>
                                                        </div>
                                                    </div>
                                                    <div className='another-font fs-6 fw-bold text-white bg-dark w-100 py-3 mt-1 text-center'>
                                                        Total: #{product.price * product.quantity} 
                                                    </div>
                                                   
                                                </div>
                   )
                   )
                }
                
            </div>
            <div className='mx-auto text-center fs-4 text-primary fw-semibold mt-3'>Order Total = <span className='ms-4'>#{cartItems.reduce((acc, item) =>{
                    return acc + item.price * item.quantity
                }, 0)}</span></div>
            <div className='w-100 my-5 d-flex justify-content-center'>{token ?<PaystackButton className='w-75 py-3 btn btn-success fw-bold'
            email={user.email} 
            amount={cartItems.reduce((acc, item) =>{
                    return (acc + item.price * item.quantity)
                }, 0)}
            publicKey = {publicKey}
            metadata={{name: user.name}}
            text='Check Out'
            onClose={()=> toast.success('Are you sure you want to cancel order?')}
            onSuccess={checkOutStack}
            /> :<button className='w-75 py-3 btn btn-success fw-bold' onClick={checkOutCart}>Check Out</button>}</div>
    </div>
  )
}

export default Mycart