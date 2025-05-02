import React from 'react';
import AdminImg from "../../assets/admin.png"
import { NavLink } from 'react-router-dom';
import { FaPowerOff } from "react-icons/fa6";
import { useLogoutUserMutation } from '../../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/features/auth/authSlice";

const AdminNavigation = () => {

    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const handleLogout = async() => {
        try {
            await logoutUser().unwrap();
            dispatch(logout())
            
        } catch (error) {
            console.log("Failed to log out.")
        }
    }
  return (
    <div className='space-y-5 bg-white p-8 md:h-[calc(90vh-98px)]
    flex flex-col justify-between'>
        <div>
            {/* Header part */}
        <div className='mb-5'>
            <img src={AdminImg} alt='Admin Image' className='size-14'/>
            <p className='font-semibold'>Admin</p>
        </div>
        <hr />
        <ul className='space-y-5 pt-5'>
            <li><NavLink to="/dashboard"
            end
             className={({isActive}) => isActive ? "text-blue-600 font-bold" : "text-black"}>
                    Dashboard
                </NavLink>
            </li>
            <li><NavLink to="/dashboard/add-new-post" className={({isActive}) => isActive ? "text-blue-600 font-bold" : "text-black"}>
                    Add New Post
                </NavLink>
            </li>
            <li><NavLink to="/dashboard/manage-items" className={({isActive}) => isActive ? "text-blue-600 font-bold" : "text-black"}>
                    Manage Items
                </NavLink>
            </li>
            <li><NavLink to="/dashboard/users" className={({isActive}) => isActive ? "text-blue-600 font-bold" : "text-black"}>
                    Users
                </NavLink>
            </li>
        </ul>
        </div>
        <div>
        <hr className='mb-3' />
            <button
             onClick={handleLogout}
             className='text-white flex justify-center items-center gap-2 bg-red-500 
             font-medium py-2 px-5 cursor-pointer'>
                <FaPowerOff className='size-4' />
                Logout
            </button>
        </div>
    </div>
  )
}

export default AdminNavigation