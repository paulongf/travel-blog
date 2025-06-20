import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetchRelatedBlogsQuery } from '../../../redux/features/blogs/blogsApi';

const RelatedBlogs = () => {
    const {id} = useParams();
    const {data: blogs = [], erros, isLoading} = useFetchRelatedBlogsQuery(id);

  return (
    <div>
        <h3 className="text-2xl font-medium pt-8 px-8 pb-5">Related Blogs</h3>
        <hr/>
        {
            blogs.length > 0 ? 
             
            (<div className='space-y-4 mt-5'>
                {
                    blogs.map((blog) => (
                        <Link key={blog._id}
                        to={`/blogs/${blog?._id}`}
                        className='flex flex-col sm:flex-row sm:items-center gap-4
                         shadow-sm px-8 py-4'>
                        <div className='size-14'>
                            <img src={blog.coverImg} alt="Images Related Blogs" className='h-full w-full
                            ring-2 ring-blue-700 rounded-full'/>
                        </div>
                        <div>
                            <h4 className='font-medium text-[#1E73BE]'>{blog?.title.substring(0, 50)}</h4>
                            <p>{blog?.description.substring(0, 50)}...</p>
                        </div>
                        </Link>
                    ))
                }

            </div>) : (<div className='p-8'>No related blogs found</div>) 
        }
    </div>
  )
}

export default RelatedBlogs