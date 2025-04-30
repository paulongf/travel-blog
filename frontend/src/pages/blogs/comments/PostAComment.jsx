import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const PostAComment = () => {
    const {id} = useParams();
    const [comment, setComment] = useState('');

    // TODO: handle posting 

  return (
    <div className='mt-8'>
        <h3 className='text-lg font-medium mb-8'>Leave a Comment</h3>
        <form>
            <textarea name='text'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            cols="30"
            rows="10"
            placeholder='Share your opinion about this post...'
            className='w-full bgPrimary focus:outline-none p-5'
            />
            <button className='w-full buttonColor text-white hover:bg-indigo-500 cursor-pointer font-medium py-3 rounded-md
            ' type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default PostAComment