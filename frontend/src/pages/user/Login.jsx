import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/auth/authSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loginUser, {isLoading: loginLoading}] = useLoginUserMutation()
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }
        
        try {
            const response = await loginUser(data).unwrap();
            console.log(response)
            const{token, user} = response;
            dispatch(setUser({ user }));
            alert("Login Successful!");
            navigate('/');
            
        } catch (error) {
            setMessage("Please provide a valid email and password")
        }
    }
  return (
    <div className='max-w-sm bg-white mx-auto p-8 mt-36'>
        <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
        <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
            <input 
            className='w-full bgPrimary focus:outline-blue-700 px-5 py-4'
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
            <button 
             disabled={loginLoading}
             className='w-full mt-5 buttonColor text-white font-medium
            py-3 rounded-md cursor-pointer'>Login</button>
        </form>
        <p className='my-5 text-center'>Don't have an account? 
            <Link className='cursor-pointer text-blue-700 italic' to="/register"> Register</Link> here.
        </p>
    </div>
  )
}

export default Login