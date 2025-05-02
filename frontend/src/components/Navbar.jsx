import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoMenuSharp, IoClose } from "react-icons/io5";
import AvaterImg from "../assets/commentor.png";
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { logout } from '../redux/features/auth/authSlice';
import { FaPowerOff } from "react-icons/fa6";

const navLists = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about-us" },
  { name: "Provacy Policy", path: "/privacy-policy" },
  { name: "Contact Us", path: "/contact-us" }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <header className='bg-white py-6 borderNav'>
      <nav className='container mx-auto flex justify-between px-5'>
        <a href='/'>
          <img src='/logo.png' className='h-12' alt='Logo' />
        </a>

        <ul className='sm:flex hidden items-center gap-8'>
          {navLists.map((list, index) => (
            <li key={index}>
              <NavLink
                to={list.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {list.name}
              </NavLink>
            </li>
          ))}

          {user ? (
            <li className='flex gap-3 items-center'>
              <img src={AvaterImg} alt="" title={user.username} className='size-8' />
              {user.role === 'admin' && (
                <Link to="/dashboard">
                  <button className='bg-[#1E73BE] px-4 py-1.5 text-white cursor-pointer rounded-sm'>Dashboard</button>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className='bg-[#1E73BE] px-4 py-2.5 cursor-pointer text-white rounded-sm'
                title='Logout'
              >
                <FaPowerOff className='size-4' />
              </button>
            </li>
          ) : (
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          )}
        </ul>

        {/* toggle menu */}
        <div className='flex items-center sm:hidden'>
          <button
            onClick={toggleMenu}
            className='flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900'
          >
            {isMenuOpen ? <IoClose className='size-6' /> : <IoMenuSharp className='size-6' />}
          </button>
        </div>
      </nav>

      {/* mobile menu items */}
      {isMenuOpen && (
        <ul className='fixed top-[108px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50'>
          {navLists.map((list, index) => (
            <li className='mt-5 px-4' key={index}>
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to={list.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {list.name}
              </NavLink>
            </li>
          ))}

          {user ? (
            <>
              {user.role === 'admin' && (
                <li className='px-4 mt-5'>
                  <NavLink onClick={() => setIsMenuOpen(false)} to="/dashboard">Dashboard</NavLink>
                </li>
              )}
              <li className='px-4 mt-5'>
                <button
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                  className='text-left w-full'
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className='px-4 mt-5'>
              <NavLink onClick={() => setIsMenuOpen(false)} to="/login">Login</NavLink>
            </li>
          )}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
