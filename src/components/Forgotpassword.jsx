import React from 'react'
import { Formik, useFormik } from 'formik'
import '../App.css'
import '../glow.css'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'





const Forgotpassword = ({loading, setloading}) => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
          email:"",
        },
        validationSchema: yup.object({
          email:yup.string().email("Enter a valid email address").required("All fields are mandatory"),
        }),
        onSubmit: (value) => {
          setloading(true)
        setTimeout(() => {
            axios.post('http://localhost:9000/user/confirmemail', value)
            .then((res) => {
                console.log(res);
                toast.success('Email sent successfully')
                setTimeout(() => {
                  setloading(false)
                }, 2000);
                
            }).catch((err) => {
              alert("Email not found")
              navigate('/user/signup')
              console.log(err)
            }
            )
            
        }, 2000);
        }
      })

  return (
    <>
      <div className='w-100 h-100 d-flex flex-column justify-content-start align-items-center py-5'>   
        <form action="" onSubmit={formik.handleSubmit} className='form shadow-lg mt-4 p-4 col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3 rounded-3 border border-3'  style={{backgroundColor: "white"}}>
          <h5 className='text-black fw-bold text-center'>Email Confirmation</h5>
          <p className='text-center text-black-50'> A code will be sent to your email </p>
          <label htmlFor="email" className='form-label mt-2 text-muted opacity-75'>Email</label>
          <input type="text" id='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
          <div className='text-warning fst-italic'><small>{formik.touched.password ?formik.errors.password :""}</small></div>
          <div className='mx-auto'><button disabled={loading} type='submit' className='rounded-2 btn btn-dark fw-bold px-3 py-2 w-100 my-4'>{loading ?"Loading..." :"Reset password"} </button></div>
        </form>
        <ToastContainer />
      </div>
    </>
  )
}

export default Forgotpassword