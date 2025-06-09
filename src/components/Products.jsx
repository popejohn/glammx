import React from 'react'
import { useState } from 'react';
import '../App.css'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';







const Product = ({products}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [addproduct, setaddproduct] = useState(false);
    const [upload, setUpload] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState({})
    const [productData, setProductData] =  useState({
        category: {
            name: "",
            image: ""
        },
        gender: "",
        images: [""],
        price: "",
        sleeve: "",
        stock: "",
        title: ""
      });

  
    // Filtered products
    const filteredProducts = products.filter(product => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  

    //Functions
    const handleChange = (e) => {
        const {name, value} = e.target
        if (name.includes('category')) {
                setProductData({...productData, category: {...productData.category, 'name': value}})
                
        }else {
            setProductData({...productData, [name]: e.target.value})
            
        }
    }

    const uploadImage = (e) => {
        const image = e.target.files[0]
        
        const reader = new FileReader()
        reader.onload = (e) =>{
            setProductData({...productData, category: {...productData.category, 'image': e.target.result}})
        }
        reader.readAsDataURL(image)
    }

    const uploadImages = (e) => {
        const images = e.target.files
        const imageURLS = []
        Array.from(images).map((image) => {
            const reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onload = (e) => {
                imageURLS.push(e.target.result)
            }
        })
        setProductData({...productData, images: imageURLS})
    }

const deleteProduct = (id) => {
    axios.post(`http://localhost:9000/admin/deleteproduct/${products[id]._id}`)
    .then((res) => {
        toast.success('Product deleted successfully')
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }).catch((error) => {
        toast.error('Error deleting product')
    })
}

    const handleSubmit = (e) => {
        e.preventDefault()
        setUpload(true)
        axios.post('http://localhost:9000/admin/productupload', productData)
        .then((res) => {
            toast.success('Product added successfully')
            setProductData({
                category: {
                    name: "",
                    image: ""
                },
                gender: "",
                images: [""],
                price: "",
                sleeve: "",
                stock: "",
                title: ""
            })
            setTimeout(() => {
                setaddproduct(false)
                setUpload(false)
            }, 1000);
        }).catch((error) => {
            toast.error('Error adding product')
            setProductData({
                category: {
                    name: "",
                    image: ""
                },
                gender: "",
                images: [""],
                price: "",
                sleeve: "",
                stock: "",
                title: ""
            })
            setTimeout(() => {
                setaddproduct(false)
                setUpload(false)
            }, 1000);
        })
    }


    

    return (
      <div className='' style={{ padding: '1.0rem', height: "100vh"}}>
        {/* Top Bar */}
       {!addproduct && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{padding: '0.5rem', width: '250px', borderRadius: '5px', border: '1px solid #ccc'}}/>
          <Link 
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#22d3ee',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}

            onClick={() => setaddproduct(true)}
          >
            Add Product
          </Link>
        </div> }
  
        {addproduct ? 
        
        <div className='mt-5'>
            <form className='rounded-3 shadow-lg mx-auto d-flex flex-column gap-3 bg-white p-4 text-center' style={{width: '450px'}}>
                <h3 className='text-black-50'>Add New Product</h3>

                {/* Basic Inputs */}
                <input type="text" name="title" placeholder="Product Title" value={productData.name} onChange={handleChange} className='inputstyle shadow-sm' required/>
                <input type="text" name="price" placeholder="Price" value={productData.price} onChange={handleChange} className="inputstyle shadow-sm" required/>
                <input type="number" name="stock" placeholder="Stock Quantity" value={productData.stock} onChange={handleChange} className="inputstyle shadow-sm" required/>

      {/* New Inputs */}
                <select name="gender" value={productData.gender} onChange={handleChange} className="inputstyle shadow-sm">
                    <option value="" className='text-muted'>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">Unisex</option>
                </select>

                {productData.category.name.toLowerCase().includes('cloth') && <select name="sleeve" value={productData.sleeve} onChange={handleChange} className="inputstyle shadow-sm">
                    <option value="" className='text-muted'>Select Sleeve Type</option>
                    <option value="short">Short</option>
                    <option value="long">Long</option>
                    <option value="sleeveless">Sleeveless</option>
                </select>}

                {/* Category Inputs */}
                <input type="text" name="categoryName" placeholder="Category Name" value={productData.category.name} onChange={handleChange} className="inputstyle shadow-sm" required/>
                <input type="file" name="CategoryImage" placeholder="Category Image URL" onChange={uploadImage} className="inputstyle shadow-sm" required />

                {/* Dynamic Images Input */}
                <label htmlFor="productimg" className='btn btn-success w-75 mx-auto px-3 py-2 fw-semibold'>Upload product images</label>
                <input type="file" id='productimg' onChange={uploadImages} className="inputStyle shadow-sm d-none" multiple/>
                <button className='buttonStyle btn my-3 btn-dark py-2 fw-bold' onClick={handleSubmit}>{upload ?'Saving product...' :'Add Product'}</button>
            </form>
        </div>
        :
        <div className='scroll-container mt-5 overflow-auto h-100'>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f1f5f9' }}>
            <tr>
              <th style={tableHeaderStyle}>Product</th>
              <th style={tableHeaderStyle}>Price</th>
              <th style={tableHeaderStyle}>Stock</th>
              <th style={tableHeaderStyle}>Edit</th>
              <th style={tableHeaderStyle}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, ind) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={tableCellStyle}>{product.title.slice(0,10)}</td>
                <td style={tableCellStyle}>₦{product.price.toLocaleString()}</td>
                <td style={tableCellStyle}>{product.stock}</td>
                <td style={tableCellStyle}>
                  <Link to={`edit/${ind}`} className='text-decoration-none' style={editButtonStyle} >Edit</Link>
                </td>
                <td style={tableCellStyle}>
                  <button style={deleteButtonStyle} onClick={() => deleteProduct(ind)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
            }
            <ToastContainer />
      </div>
    );
  };
  
  // Styles
  const tableHeaderStyle = {
    padding: '1rem',
    textAlign: 'left',
    fontWeight: 'bold'
  };
  
  const tableCellStyle = {
    padding: '0.75rem',
  };
  
  const editButtonStyle = {
    padding: '0.3rem 0.7rem',
    backgroundColor: '#4ade80',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };
  
  const deleteButtonStyle = {
    padding: '0.3rem 0.7rem',
    backgroundColor: '#f87171',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  };
  
  export default Product;