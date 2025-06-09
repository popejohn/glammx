import React from 'react'
import { useParams } from 'react-router-dom'
import { MdOutlineFavorite, MdAddCircle } from "react-icons/md"
import { FaStar  } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiMinus } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const Productview = ({products}) => {    
    const category = useParams().cat
    const navigate = useNavigate()
    const filteredProducts = products.filter((product) =>{
        return   product.category.name.toLowerCase() === category.toLowerCase()
    })
    
    
  return (
    <div className='d-flex flex-wrap gap-3'>
        {filteredProducts.length && filteredProducts.map((product, index) => (
            <>
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
                                                    <button className='orange bg-transparent border-0 outline-0 me-2' onClick={() => addToCart(product)}>
                                                        <MdAddCircle  className='fs-1'/>
                                                    </button>
                                                </div>
                                                
                                            </div>
                                            <div className='another-font fs-6 fw-bold text-white bg-dark w-100 py-3 mt-1 text-center' onClick = {() => navigate(`/viewproduct/${product._id}`)}>
                                                See more
                                            </div>
                                    </div>  
            </>
        ) )}
    </div>
  )
}

export default Productview