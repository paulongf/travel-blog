import React, { useEffect, useRef, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'; 
import List from '@editorjs/list'; 
import { usePostBlogMutation } from '../../../redux/features/blogs/blogsApi';

const AddPost = () => {
  const editorRef = useRef(null);
  const {user} = useSelector((state) => state.auth);
  const [title, setTitle] = useState('');
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const [postBlog, {isLoading}] = usePostBlogMutation()

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      tools: { 
        header: {
          class: Header, 
          inlineToolbar: ['link'] 
        }, 
        list: { 
          class: List, 
          inlineToolbar: true ,
          config: {
            defaultStyle: 'unordered'
          }
        } 
      }, 
    })

    return () => editor.destroy();
    editorRef.current = null;
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = await editorRef.current.save();
      const newPost = {
        title,
        coverImg,
        content,
        description: metaDescription,
        author: user?._id,
        rating
      }
      // console.log(newPost);
      const response = await postBlog(newPost).unwrap();
      console.log(response);
      alert("Blog is posted successfullt!");
      navigate('/');
      
    } catch (error) {
      console.log("Failed to submit post", error);
      setMessage("Failed to submit post. Please try again.")
    }
  }

  return (
    <div className='bg-white md:p-8 p-2'>
      <h2 className='text-2xl font-semibold'>Create A New Blog Post</h2>
      <form onSubmit={handleSubmit} className='space-y-5 pt-8'>
        <div className='space-y-4'>
          <label className='font-semibold text-xl mb-2'>Blog Title: </label>
          <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full inline-block bgPrimary focus:outline-none mt-3 px-5 py-2'
           type='text' placeholder='Ex: Marina del Rey Marriot...' required/>
        </div>
        {/* Blog Details */}
        <div className='flex flex-col md:flex-row justify-between items-start gap-4'>
        {/* Left side */}
        <div className='md:w-2/3 w-full'>
        <p className='font-semibold text-xl mb-5'>Content Section</p>
        <p className='text-xs italic'>Write your post below here...</p>
        <div id="editorjs"></div>
        </div>
        {/* Right side */}
        <div className='md:w-1/3 w-full borderColor p-5 space-y-5'>
          <p className='text-xl font-semibold'>Choose Blog Format</p>
          {/* Images */}
          <div className='space-y-4'>
            <label className='font-semibold text-xl mb-2'>Blog Cover: </label>
            <input
            value={coverImg}
            onChange={(e) => setCoverImg(e.target.value)}
            className='w-full inline-block bgPrimary focus:outline-none mt-3 px-5 py-2'
            type='text' placeholder='http://unplash.com/image/cover-photo.png' required/>
        </div>
         {/* Category */}
         <div className='space-y-4'>
            <label className='font-semibold text-xl mb-2'>Category: </label>
            <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='w-full inline-block bgPrimary focus:outline-none mt-3 px-5 py-2'
            type='text' placeholder='Rooftop/Travel/Natural' required/>
        </div>
         {/* MetaDescription */}
         <div className='space-y-4'>
            <label className='font-semibold text-xl mb-2'>Meta Description: </label>
            <textarea
            value={metaDescription}
            cols={4}
            rows={4}
            onChange={(e) => setMetaDescription(e.target.value)}
            className='w-full inline-block bgPrimary focus:outline-none mt-3 px-5 py-2'
            type='text' placeholder='Write your blog meta description' required/>
        </div>
         {/* Rating */}
         <div className='space-y-4'>
            <label className='font-semibold text-xl mb-2'>Rating: </label>
            <input
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className='w-full inline-block bgPrimary focus:outline-none mt-3 px-5 py-2'
            type='number'  required/>
        </div>
        {/* Author */}
        <div className='space-y-4'>
            <label className='font-semibold text-xl mb-2'>Author: </label>
            <input
            value={user.username}
            className='w-full inline-block bgPrimary focus:outline-none mt-3 px-5 py-2'
            type='text'  disabled placeholder={`user.username (not editable)`}/>
        </div>

        </div>
        </div>

        {
          message && <p className='text-red-500'>{message}</p>
        }
        <button disabled={isLoading} type='submit' className="w-full mt-5 buttonColor hover:bg-indigo-500 text-white font-medium py-3 rounded-md">Add New Blog</button>
      </form>
    </div>
  )
}

export default AddPost