import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'



const Editproduct = ({products}) => {
    const index = useParams().ind
    const navigate = useNavigate()
    const [productData, setProductData] = useState({...products[index]})
    const [editing, setEditing] = useState(false)


    const uploadImage = (e) => {
        const image = e.target.files[0]
        
        const reader = new FileReader()
        reader.onload = (e) =>{
            setProductData({...productData, category: {...productData.category, image: e.target.result}})
        }
        reader.readAsDataURL(image)
    }
    
    

    const saveEdit = () => {
        axios.post(`http://localhost:9000/admin/editproduct/${productData._id}`, productData)
        .then((res) => {
            setEditing(true)
            toast.success('Product updated successfully')
            setTimeout(() => {
                navigate('/glammx/admin/products')
            }, 2000);
            setProductData({
                category: {
                    name: "",
                    image: ""
                },
                gender: "",
                images: [""],
                price: "",
                sleeve: "",
                _id: ""
            })
            setEditing(false)
        }).catch((error) => {
            toast.error('Error updating product')
            navigate('/glammx/admin/products')
            setEditing(false)
        })
    }

  return (
    <div>
        <ToastContainer />  
        <div className='product-display w-100 my-5 d-flex justify-content-center align-items-start gap-5'>
            <div className='w-25'>
                <img className='w-100' src={productData.category.image} alt="" />
            </div>
            <div className='d-flex flex-column justify-content-center align-items-start gap-3'>
                <h4 className=''>{productData.title}</h4>
                <div className='fw-semibold orange fs-5'><span className='text-dark'>Price:</span> #{productData.price}</div>
                <div className='fw-semibold orange fs-5'><span className='text-dark'>Stock:</span> {productData.stock}</div>
                <div className='d-flex gap-5'>
                    {productData.images && productData.images.map((img, ind) => 
                    (
                        <img key = {ind} src={img} className='rounded-3' style={{width: "100px", height: " 100px"}} />
                    ))}
                </div>
            </div>
        </div>

        {/* {Modal} */}
        <div className="modal fade" tabIndex="-1" id='editModal' data-bs-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header border-0">
                    <h5 className="modal-title">Save edit</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body border-0">
                    <p>Do you want to save changes?</p>
                </div>
                <div className="modal-footer border-0">
                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={saveEdit}>Save changes</button>
                </div>
            </div>
        </div>
    </div>
    {/* {Modal ends} */}

        <div className='edit-container'>
        <form className='rounded-3 shadow-lg mx-auto d-flex flex-column gap-3 bg-white p-4' style={{width: '450px'}}>
                <div className='mx-auto'><h3 className='text-black-50'>Edit Product</h3></div>

                {/* Basic Inputs */}
                <label htmlFor="title">Product title</label>
                <input type="text" id='title' name="title" placeholder="Product Title" value={productData.title} onChange={(e) => setProductData({...productData, title: e.target.value})} className='inputstyle shadow-sm' required/>
                <label htmlFor="price">Price</label>
                <input type="text" id='price' name="price" placeholder="Price" value={productData.price} onChange ={(e) => setProductData({...productData, price: e.target.value})} className="inputstyle shadow-sm" required/>
                <label htmlFor="stock"></label>
                <input type="number" id='stock' name="stock" placeholder="Stock Quantity" value={productData.stock} onChange={(e) => setProductData({...productData, stock: e.target.value})} className="inputstyle shadow-sm" required/>

      {/* New Inputs */}
                <label htmlFor="gender">Gender</label>
                <select name="gender" value={productData.gender} onChange={(e) => setProductData({...productData, gender: e.target.value})} className="inputstyle shadow-sm">
                    <option value="" className='text-muted'>{productData.gender}</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">Unisex</option>
                </select>

                {productData.category.name.toLowerCase().includes('cloth') && <div>
                    <label htmlFor="sleeve">Sleeve</label>
                    <select name="sleeve" value={productData.sleeve} onChange={(e) => setProductData({...productData, sleeve: e.target.value})} className="inputstyle shadow-sm">
                    <option value="" className='text-muted'>Select Sleeve Type</option>
                    <option value="short">Short</option>
                    <option value="long">Long</option>
                    <option value="sleeveless">Sleeveless</option>
                </select></div>}

                {/* Category Inputs */}
                <label htmlFor="catname">Product category</label>
                <input type="text" name="categoryName" placeholder="Category Name" value={productData.category.name} onChange={(e) => setProductData({...productData, category: {...productData.category, name: e.target.value}})} className="inputstyle shadow-sm" required/>
                <input type="file" name="CategoryImage" placeholder="Category Image URL" onChange={uploadImage} className="inputstyle shadow-sm" required />

                {/* Dynamic Images Input */}
                <label htmlFor="productimg" className='btn btn-success w-75 mx-auto px-3 py-2 fw-semibold'>Upload product images</label>
                <input type="file" id='productimg' onChange={uploadImages} className="inputStyle shadow-sm d-none" multiple/>
                <button className='buttonStyle btn my-3 btn-dark py-2 fw-bold' disabled={editing} onClick={(e) => e.preventDefault() } data-bs-toggle="modal" data-bs-target="#editModal">{editing ?'Updating...' :'Edit Product'}</button>
            </form>
        </div>
    </div>
  )
}

export default Editproduct