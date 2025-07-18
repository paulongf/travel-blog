import React from 'react'
import { formatDate } from '../../../utils/formatDate';
import edjsHTML from 'editorjs-html'

const edjsParser = edjsHTML();
const SingleBlogCard = ({blog}) => {
    const { title, createdAt, author, content, coverImg, rating } = blog || {};
   // const parsedContent = edjsParser.parse(content);
   // console.log("Conteúdo parseado:", parsedContent);
    const htmlContent = content ? edjsParser.parse(content) : ''; 

    
  return (
    <>
     <div className="bg-white p-8">
             {/* header */}
             <div>
             <h1 className="md:text-4xl text-3xl font-medium mb-4">{title}</h1>
             <p className="mb-6">{formatDate(createdAt)} by<span className="text-blue-400 cursor-pointer"> {author?.username}</span></p>
             </div>
              <div>
                <img src={coverImg} alt="" className="w-full md:h-[520px] bg-cover" />
              </div>

              {/* details */}
              <div className="mt-8 space-y-4">
                {/* <p>{blog.conent & <span>{content}</span>}</p> */}
                
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} className='space-y-3 editorjsdiv'/>
                <div>
                    <span className="text-lg font-medium">Rating: </span>
                    <span>{rating}  (based on 2,370 reviews)</span>
                </div>
                <h3 className="text-lg font-medium">Key Features: </h3>
                <div>
                    <ul className="space-y-2 pl-5">
                        <li>1. Rooftop Pool: Ascend to our rooftop oasis and bask in the sun as you savor panoramic vistas of Los Angeles’s captivating skyline.</li>
                        <li>2. Spacious Accommodations: Our meticulously designed rooms and suites provide the perfect fusion of comfort and style, ensuring a truly rejuvenating stay.</li>
                        <li>3. Dining Excellence: Embark on a gastronomic journey at our on-site restaurant, where a diverse menu featuring local and international delicacies awaits your palate.</li>
                    </ul>
                </div>
              </div>
    </div>
    </>
  )
}

export default SingleBlogCard