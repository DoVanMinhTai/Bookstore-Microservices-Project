import React from 'react'
import mainBanner1 from '../../../assets/images/main-banner-1.jpg'
import mainBanner2 from '../../../assets/images/main-banner-2.jpg'
import mainBanner3 from '../../../assets/images/main-banner-3.jpg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import "swiper/css";
import "swiper/css/navigation";

const listMainBanner = [mainBanner1.src, mainBanner2.src, mainBanner3.src]
const Banner = () => {
    return (
        <div className='max-w-full px-4 mt-3 h-full '>
            <div className='grid grid-cols-3 gap-4 p-1  border-2 border-gray-600 rounded-lg h-full'>
                <div className='col-span-2 h-full '>
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        className="w-full h-full"
                    >
                        {listMainBanner.map((img, index) => (

                            <SwiperSlide key={index}>
                                <img src={img} className="w-full" alt={`Slide ${index + 1}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="h-full flex flex-col gap-4" >
                    <div className="flex-1 bg-slate-500">
                        {/* <img src="" alt="" /> */}
                    </div>
                    <div className="flex-1 bg-gray-300"></div>
                </div>
            </div>

        </div>
    )
}
export default Banner