import React, { useState, useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import glammxlogo from '../assets/glogo.png'
import axios from 'axios'
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import '../App.css'






const Signup = ({show, show2, setshow2, setshow, load, setLoad}) => {
  const navigate = useNavigate()
  const [allusers, setallusers] = useState([])
  
  const inputRef1 = useRef(null)
  const inputRef2 = useRef(null)
  

  useEffect(() => {
    axios.get('https://glammx-ecommerce-backend.onrender.com/users')
    .then((res) => {
      setallusers(res.data.allUsers)
    })
  }, [load])
  
  
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



  const formik = useFormik({
    initialValues: {
      firstname:"",
      lastname:"",
      email:"",
      password:"",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      firstname:yup.string().required("All fields are mandatory"),
      lastname:yup.string().required("All fields are mandatory"),
      email:yup.string().email("Enter a valid email address").required("All fields are mandatory"),
      password:yup.string().required("All fields are mandatory").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        "Password must contain at least one special character, upper case, lower case, number and must have at least eight characters "
      ),
      confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Please confirm your password'),
    }),
    onSubmit: (value) => {
      setLoad(true)
      let {firstname, lastname, email, password, confirmPassword} = value
      if (allusers.length){
           let existingUser = allusers.find((user) => user.email === email)
          if (existingUser) {
            toast.info('User with this email already exists. Please register with a different email')
            setLoad(true)
            setTimeout(() => {
              navigate('/user/signin')
              setLoad(false)
            }, 3000);
          }else{
            axios.post('https://glammx-ecommerce-backend.onrender.com/user/signup', value)
          .then((res) => {
          toast.success("Sign up successful")
          setLoad(true)
            setTimeout(() => {
              navigate('/user/signin')
            }, 3000);
            setLoad(false)
        }).catch((err) => {
          toast.error('An error occured, try again later')
          setTimeout(() => {
            navigate('/user/signup')
          }, 3000);
          setLoad(false)
        })
            setLoad(false)
          }
          
         
      }else{    
        axios.post('https://glammx-ecommerce-backend.onrender.com/user/signup', value)
        .then((res) => {
          alert("Sign up successful")
          setLoad(false)
          navigate('/user/signin')
        }).catch((err) => {
          alert('An error occured, try again later')
          setLoad(false)
        })
      }
    }
  })

  
  return (
    <>
      <div className='w-100 h-100 d-flex flex-column justify-content-start align-items-center py-5'>
        <div className='d-flex justify-content-center align-items-center gap-3 mt-3'>
          <img src={glammxlogo} alt="" className='rounded-circle' style={{height: "40px"}} />
          <h4 className='fw-bold opacity-75 text-muted'>Glammx</h4>
        </div>
        <form action="" onSubmit={formik.handleSubmit} className='form mt-4 p-4 rounded-3 border border-3'  style={{backgroundColor: "white"}}>
          <h5 className='text-black fw-bold text-center'>Create an Account</h5>
          <label htmlFor="firstname" className='form-label mt-3 text-muted opacity-75'>First name</label>
          <input type="text" id='firstname' name='firstname' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
          <div className='text-warning fst-italic'><small>{formik.touched.firstname ?formik.errors.firstname :""}</small></div>
          <label htmlFor="lastname" className='form-label mt-2 text-muted opacity-75'>Last name</label>
          <input type="text" id='lastname' name='lastname' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
          <div className='text-warning fst-italic'><small>{formik.touched.lastname ?formik.errors.lastname :""}</small></div>
          <label htmlFor="email" className='form-label mt-2 text-muted opacity-75'>Email</label>
          <input type="text" id='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control' />
          <div className='text-warning fst-italic'><small>{formik.touched.email ?formik.errors.email :""}</small></div>
          <label htmlFor="password" className='form-label mt-2 text-muted opacity-75'>Password</label>
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
          <div className='mx-auto'><button disabled={load} type='submit' className='rounded-2 btn btn-dark fw-bold px-3 py-2 w-100 my-4'>Submit</button></div>
          <p className='another-font text-center fw-semibold opacity-75'>Already have an account? <Link to={'/user/signin'} className='orange'>Sign in</Link></p>
        </form>
        <ToastContainer position='top-right' />
      </div>
    </>
  )
}

export default Signup