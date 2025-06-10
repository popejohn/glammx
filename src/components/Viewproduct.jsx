import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { MdOutlineFavorite } from "react-icons/md"
import { IoMdAdd } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import '../App.css'


const Viewproduct = ({products}) => {
    const [myproduct, setProduct] = useState({})
    const [number, setNumber] = useState(0)
    const params = useParams().id
    
    const navigate = useNavigate()
    useEffect(() => {
      axios.get(`https://glammx-ecommerce-backend.onrender.com/viewproduct/${params}`)
        .then((res) => {
            setProduct(res.data.product)
            
        }).catch((error) => {
            toast.error('Cannot show product details now')
            navigate('/')
        })
    }, [])



  return (
    <div className='d-flex justify-content-center align-items-center px-5' style={{height: '100vh'}}>
        <ToastContainer />
        <div className='view-container d-flex justify-content-center align-items-center gap-4'>
            <div className='w-50'>
                <img className='w-100' src= {myproduct.images && myproduct.images[number]} alt="" style={{maxHeight: '600px'}}/>
            </div>
            <div className='h-100 d-flex flex-column justify-content-evenly align-items-start gap-4'>
                <h4 className=''>{myproduct.title}</h4>
                <div className='fw-semibold orange fs-5'><span className='text-dark'>Price:</span> #{myproduct.price}</div>
                <div className='fw-semibold orange fs-5'><span className='text-dark'>Stock:</span> {myproduct.stock} pcs</div>
                <div className='d-flex flex-wrap justify-content-around gap-2'>
                    {myproduct.images && myproduct.images.map((img, ind) => 
                    (
                        <img key = {ind} src={img} className='rounded-3' style={{width: "200px", height: " 200px"}} onClick={() => setNumber(ind)} />
                    ))}
                </div>
                <div className='w-100 d-flex flex-wrap justify-content-center align-items-center gap-4'>
                    <button className='btn btn-dark fw-semibold py-3 d-flex justify-content-center align-items-center gap-3'><MdOutlineFavorite /> Add to favorites</button>
                    <button className='btn btn-dark fw-semibold py-3 d-flex justify-content-center align-items-center gap-3'> <IoMdAdd />Add to Cart</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Viewproduct