import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  return (
    <div className='max-w-sm bg-white mx-auto p-8 mt-36'>
        <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>
        <form className='space-y-5 max-w-sm mx-auto pt-8'>
            <input 
            className='w-full bgPrimary focus:outline-blue-700  px-5 py-4'
            placeholder='Username'
            required
            type='text' value={username}/>
             <input 
            className='w-full bgPrimary focus:outline-blue-700  px-5 py-4'
            placeholder='Email'
            required
            type='email' value={email}/>
             <input 
            className='w-full bgPrimary focus:outline-blue-700 px-5 py-4'
            placeholder='Password'
            required
            type='password' value={password}/>
            {
                message && <p className='text-red-500'>{message}</p>
            }
            <button className='w-full mt-5 buttonColor text-white font-medium
            py-3 rounded-md cursor-pointer'>Submit</button>
        </form>
        <p className='my-5 text-center'>Already have an account? Please 
            <Link className='cursor-pointer text-blue-700 italic' to="/login"> Login</Link>
        </p>
    </div>
  )
}

export default Register