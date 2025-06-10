import React, { useState } from 'react'
import { useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { BiShow, BiHide } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





const Resetpassword = ({load, setload}) => {

    const {otp} = useParams()

    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)

    const [show, setshow] = useState(false)
    const [show2, setshow2] = useState(false)

    const showPassword = (input) =>{
        if (!input.value){
          return
        }
          if (show) {
            setshow(false)
          }else{
            setshow(true)
          }
       }
        
      const showPassword2 = (input) =>{
        if (!input.value){
          return
          }
        if (show2) {
          setshow2(false)
        }else{
          setshow2(true)
        }
      }
      const navigate = useNavigate()
      
const formik = useFormik({
    initialValues: {
      password:"",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      password:yup.string().required("All fields are mandatory").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        "Password must contain at least one special character, upper case, lower case, number and must have at least eight characters "
      ),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
    }),
    onSubmit: (value) => {
        const { password, confirmPassword } = value
      axios.post('https://glammx-ecommerce-backend.onrender.com/user/resetpassword', {password, otp})
      .then((resp) => {
        setload(true)
        toast.success('Password reset successful')
        setTimeout(() => {
            navigate('/user/signin')
        }, 1500);
        setload(false)
      })
      .catch((error) => {
        console.log(error.message);
        setload(false)
      })
    }
  })

  
  return (
      <div className='w-100 h-100 d-flex flex-column justify-content-start align-items-center py-5'>
        <form action="" onSubmit={formik.handleSubmit} className='form shadow-lg mt-4 p-4 col-8 col-sm-6 col-md-5 col-lg-4 col-xl-3 rounded-3 border border-3'  style={{backgroundColor: "white"}}>
          <h5 className='text-black fw-bold text-center'>Reset Password</h5>
          <div className='w-100 text-center'><p>Please provide your new password</p></div>
          <label htmlFor="password" className='form-label mt-2 text-muted opacity-75'>New password</label>
           <div className='position-relative'>
            <input type= {show ?"text" :"password"} ref={inputRef1} id='password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
            <button type='button' className='position-absolute end-0 outline-0 border-0 bg-transparent' style={{top: "10%"}} onClick={() => showPassword(inputRef1.current)}>{show ?<BiHide /> :<BiShow />}</button>
           </div>
          <div className='text-warning fst-italic'><small>{formik.touched.password ?formik.errors.password :""}</small></div>
          <label htmlFor="confirm-password" className='form-label mt-2 text-muted opacity-75'>Confirm password</label>
          <div className='position-relative'>
            <input type= {show2 ?"text" :"password"} ref={inputRef2} id='confirm-password' name='confirmPassword' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control'/>
            <button type='button' className='position-absolute end-0 outline-0 border-0 bg-transparent' style={{top: "10%"}} onClick={() => showPassword2(inputRef2.current)}>{show2 ?<BiHide /> :<BiShow />}</button>
           </div>
          <div className='text-warning fst-italic'><small>{formik.touched.confirmPassword ?formik.errors.confirmPassword :""}</small></div>
          <div className='mx-auto'><button disabled={load} type='submit' className='rounded-2 btn btn-dark fw-bold px-3 py-2 w-100 my-4'>Reset password</button></div>
        </form>
        <ToastContainer position='top-right' />
      </div>
  )
}



export default Resetpassword