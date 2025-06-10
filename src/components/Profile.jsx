import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Profile = ({loggedin}) => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);



  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://glammx-ecommerce-frontend.onrender.com/user/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => {       
          setUser(res.data.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

const uploadpic = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async(e) => {
    await axios.post('https://glammx-ecommerce-frontend.onrender.com/user/uploadimage', {
        profilepic: e.target.result,
        user
      })
      .then((res) => {
        setUser(res.data.user);
        alert("Profile picture uploaded successfully");
      }).catch((err) => {
        alert("Error uploading profile picture");
      })
    };

  }

const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

const editProfile = (e) => {
  e.preventDefault();
  if (!editing)  {
  setEditing(true);
  return
}
  axios.post('https://glammx-ecommerce-frontend.onrender.com/user/edit', user)
  .then((res) => {
      alert("Profile updated successfully");
      window.location.reload();
      setEditing(false);
    })
    .catch((err) => {
      alert("Error updating profile");
    });
};

if(!loggedin){
  return (
    <div>
      <h1>Please login to view your profile</h1>
    </div>
  )
}

  return (
    <div className='d-flex justify-content-center align-items-center mx-auto' style={{width: '500px'}}>
      <form action="" className='mt-5 w-100'>
          <div className='mx-auto w-100 d-flex flex-column justify-content-center align-items-center'>
            <label htmlFor="profilePic">
              <img src={user && user.profilepic} alt="" className='rounded-circle' style={{width: "250px", height: "250px"}} />
            </label>
            <input type="file" id='profilePic' className='d-none' onChange={uploadpic}/>
          </div>
          <div className='mt-3 d-flex flex-column py-1'>
            <label htmlFor="firstname" className='fw-bold'>First name</label>
            <input type="text" id='firstname' name='firstname' value={user && user.firstname} onChange={handleChange} className='border-0 outline-0' disabled= {!editing} style={{height: "40px"}} />
          </div>
          <div className='mt-3 d-flex flex-column'>
            <label htmlFor="lastname" className='fw-bold'>Last name</label>
            <input type="text" name='lastname' id='lastname' value={user && user.lastname} onChange={handleChange} className='border-0 outline-0' disabled= {!editing} style={{height: "40px"}} />
          </div>
          <div className='mt-3 d-flex flex-column'>
            <label htmlFor="email" className='fw-bold'>Email</label>
            <input type="email" name='email' id='email' value={user && user.email} onChange={handleChange} className='border-0 outline-0' disabled= {!editing} style={{height: "40px"}} />
          </div>
          <div className='mx-auto w-100 d-flex justify-content-center align-items-center mt-3'>
        <button className='btn btn-dark fw-bold py-2 px-3 rounded-3 w-75' onClick={editProfile}>{editing ?"Edit" :"Edit Profile"}</button>
        </div>
        </form>
    </div>
  )
}




export default Profile