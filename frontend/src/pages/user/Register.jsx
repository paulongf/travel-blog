import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../redux/features/auth/authApi';


const Register = () => {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");
    const [registerUser, { isLoading }] = useRegisterUserMutation();
  
    const navigate = useNavigate();
  
    const handleRegister = async (e) => {
      e.preventDefault();
      const data = {
        username,
        email,
        password,
      };
  
      console.log(data);
      try {
        await registerUser(data).unwrap();
        alert("Registration successful");
        navigate('/login');
      } catch (err) {
        alert("Registration failed");
      }
    };
  
  return (
    <div className='max-w-sm bg-white mx-auto p-8 mt-36'>
        <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>
        <form
         onSubmit={handleRegister}
         className='space-y-5 max-w-sm mx-auto pt-8'>
            <input 
            className='w-full bgPrimary focus:outline-blue-700  px-5 py-4'
            placeholder='Username'
            required
            onChange={(e) => setUserName(e.target.value)}
            type='text' value={username}/>
             <input 
            className='w-full bgPrimary focus:outline-blue-700  px-5 py-4'
            placeholder='Email'
            required
            onChange={(e) => setEmail(e.target.value)}
            type='email' value={email}/>
             <input 
            className='w-full bgPrimary focus:outline-blue-700 px-5 py-4'
            placeholder='Password'
            required
            onChange={(e) => setPassword(e.target.value)}
            type='password' value={password}/>
            {
                message && <p className='text-red-500'>{message}</p>
            }
            <button disabled={isLoading} className='w-full mt-5 buttonColor text-white font-medium
            py-3 rounded-md cursor-pointer'>Submit</button>
        </form>
        <p className='my-5 text-center'>Already have an account? Please 
            <Link className='cursor-pointer text-blue-700 italic' to="/login"> Login</Link>
        </p>
    </div>
  )
}

export default Register