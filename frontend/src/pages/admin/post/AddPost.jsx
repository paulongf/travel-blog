import React, { useState } from 'react'

const AddPost = () => {
  const [title, setTitle] = useState('');
  return (
    <div className='bg-white md:p-8 p-2'>
      <h2 className='text-2xl font-semibold'>Create A New Blog Post</h2>
      <form className='space-y-5 pt-8'>
        <div className='space-y-4'>
          <label className='font-semibold text-xl'>Blog Title: </label>
          <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full inline-block bgPrimary focus:outline-none px-5 py-3'
           type='text' placeholder='Ex: Marina del Rey Marriot...' required/>
        </div>
        {/* Blog Details */}
        <div>

        </div>
      </form>
    </div>
  )
}

export default AddPost