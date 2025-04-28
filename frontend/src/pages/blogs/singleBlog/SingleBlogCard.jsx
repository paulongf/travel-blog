import React from 'react'
import {formatDate} from '../../../utils/formatDate'

const SingleBlogCard = ({blog}) => {
    const {title, description, content, coverImg, author, rating, category, createdAt} = blog || {};

  return (
    <div>
        <div className='bg-white p-8'>
            {/* Blog header*/}
            <div>
                <h1 className='md:text-4x1 text-3x1 font-medium mb-4'>
                    {title}
                </h1>
                <p>{formatDate(createdAt)} by <span></span></p>
            </div>
        </div>
    </div>
  )
}

export default SingleBlogCard