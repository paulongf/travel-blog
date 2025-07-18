import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import Img1 from '../../assets/hero-carousel/img1.jpg';
import Img2 from '../../assets/hero-carousel/img2.jpg';
import Img3 from '../../assets/hero-carousel/img3.jpg';
import Img4 from '../../assets/hero-carousel/img4.jpg';

const Hero = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8'>
        <div className='md:w-1/2 w-full text-center'>
            <h1 className='md:text-5xl text-3xl font-bold md:leading-tight'>Hotels With Rooftop Pools Near Me</h1> 
            <p className='py-4'>Discovering hotels with rooftop pools near you! Whether you’re planning
                 a luxurious staycation or a weekend getaway, our curated selection of hotels with 
                 rooftop pools will help you beat the heat and elevate your travel experience.</p>
        </div>
        <div className='md:w-1/2 w-full mx-auto'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img className='w-full lg:h-[420px] sm:h-96 h-80' src={Img1} alt='Carrousel Image'/>
        </SwiperSlide>
        <SwiperSlide>
            <img className='w-full lg:h-[420px] sm:h-96 h-80' src={Img2} alt='Carrousel Image'/>
        </SwiperSlide>
        <SwiperSlide>
            <img className='w-full lg:h-[420px] sm:h-96 h-80' src={Img3} alt='Carrousel Image'/>
        </SwiperSlide>
        <SwiperSlide>
            <img className='w-full lg:h-[420px] sm:h-96 h-80' src={Img4} alt='Carrousel Image'/>
        </SwiperSlide>
    
      </Swiper>
        </div>
    </div>
  )
}

export default Hero