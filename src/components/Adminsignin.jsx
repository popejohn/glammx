import React, { useState, useRef } from 'react'
import { Formik, useFormik } from 'formik'
import * as yup from 'yup'
import glammxlogo from '../assets/glogo.png'
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from 'react-router-dom'
import '../glow.css'
import '../App.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'








const Adminsignin = ({}) => {
   const navigate = useNavigate() 
  const [show, setshow] = useState(false)
  const [adminload, setadminload] = useState(false)
  const inputRef = useRef(null)
  
 const showPassword = (input) =>{
  if (!input.value) {
    return
  }
   
  if (show) {
      setshow(false)
    }else{
      setshow(true)
    }
 }

  

  const formik = useFormik({
    initialValues: {
      companyid:"",
      password:"",
    },
    validationSchema: yup.object({
      companyid:yup.string().required("All fields are mandatory"),
      password:yup.string().required("All fields are mandatory").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        "Password must contain at least one special character, upper case, lower case, number and must have at least eight characters "
      ),
    }),
    onSubmit: (value) => {
        setadminload(true)
      axios.post("http://localhost:9000/admin/signin", value)
      .then((res) => {
        localStorage.setItem('admin-token', res.data.adminToken)
        setTimeout(() => {
            navigate('/glammx/admin/dashboard')
        }, 2000);
        toast.success('Admin login successful')
        setadminload(false)
      }).catch((error) => {
        toast.error("Login failed. Please check your credentials and try again.");
        setadminload(false)
      })
    }
  })

  
  return (
    <>
      <div className='w-100 h-100 d-flex flex-column justify-content-start align-items-center py-5'>
        <form action="" onSubmit={formik.handleSubmit} className='form mt-4 p-4 rounded-3 border border-3'  style={{backgroundColor: "white"}}>
          <h5 className='text-black fw-bold text-center'>Sign in as an Admin</h5>
          <label htmlFor="companyid" className='form-label mt-4 text-muted opacity-75'>Company-ID</label>
          <input type="text" id='companyid' name='companyid' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
          <div className='text-warning fst-italic'><small>{formik.touched.email ?formik.errors.email :""}</small></div>
          <label htmlFor="password" className='form-label mt-2 text-muted opacity-75'>Password</label>
           <div className='position-relative'>
            <input type= {show ?"text" :"password"} id='password' name='password' ref={inputRef} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
            <button type='button' className='position-absolute end-0 outline-0 border-0 bg-transparent' style={{top: "10%"}} onClick={() => showPassword(inputRef.current)}>{show ?<BiHide /> :<BiShow />}</button>
           </div>
          <div className='text-warning fst-italic'><small>{formik.touched.password ?formik.errors.password :""}</small></div>
          <div className='mx-auto'><button disabled={adminload} type='submit' className='rounded-2 btn btn-dark fw-bold px-3 py-2 w-100 my-4'>{adminload ?"loading..." :"Submit"}</button></div>
          <p className='text-center'><Link to={'/user/forgotpassword'} className='glow text-muted fw-semibold'>Forget password?</Link></p>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}

export default Adminsignin