import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { FiUsers} from "react-icons/fi";
import {FaBlog, FaRegComment} from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { useFetchBlogsQuery } from "../../../redux/features/blogs/blogsApi";
import { useGetUserQuery } from "../../../redux/features/auth/authApi";
import { useGetCommentsQuery } from "../../../redux/features/comments/commentApi";
import BlogsChart from './BlogsChart';

const Dashboard = () => {
  const [query, setQuery] = useState({search: '', category: ''})
  const {user} = useSelector((state) => state.auth);
  const {data: blogs=[], error, isLoading} = useFetchBlogsQuery(query);
  const {data: comments=[]} = useGetCommentsQuery(query);
  const { data: userData = {} } = useGetUserQuery();
  const users = userData.users ?? [];
  const adminCount = users.filter(user => user.role === "admin").length;
  //const adminCount = users.filter(user => user.role === "admin").length;


  return (
    <>
    {isLoading && (<div>Loading...</div>)}
    <div className='space-y-6'>
      <div className='bgPrimary p-5 shadow-md'>
        <h1> Hi, {user.username}</h1>
        <p> Welcome to the admin dashboard!</p>
        <p>Here you can manage your posts.</p>
      </div>
      {/* Cards grid */}
      <div className='flex flex-col md:flex-row justify-center gap-8 pt-8'>
          <div className='bg-indigo-100 py-6 w-full rounded-sm
          space-y-1 flex flex-col items-center'>
            <FiUsers className='size-8 text-indigo-600' />
            <p>{users.length} User{users.length !== 1 ? 's' : ''}</p>
          </div>
          <div className='bg-red-100 py-6 w-full rounded-sm
          space-y-1 flex flex-col items-center'>
            <FaBlog className='size-8 text-red-600' />
            <p>{blogs.length} Blog{blogs.length !== 1 ? 's' : ''}</p>
          </div>
          <div className='bg-lime-100 py-6 w-full rounded-sm
          space-y-1 flex flex-col items-center'>
            <RiAdminLine className='size-8 text-lime-600' />
            <p>{adminCount} Admin{adminCount !== 1 ? 's': ''}</p>
          </div>
          <div className='bg-orange-100 py-6 w-full rounded-sm
          space-y-1 flex flex-col items-center'>
            <FaRegComment className='size-8 text-orange-600' />
            <p>{comments?.totalComments} Comment{comments?.length !== 1 ? 's' : ''}</p>
          </div>
      </div>
      {/* Graphs and chart */}
      <div className='pt-5 pb-5'>
        <BlogsChart blogs={blogs}/>
      </div>
    </div>
    </>
  )
}

export default Dashboard