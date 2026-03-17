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
        <div className="mt-4 h-full max-w-full px-4">
            <div className="grid h-full grid-cols-3 gap-4 rounded-xl border border-slate-200 bg-white/80 p-3 shadow-sm">
                <div className="col-span-3 lg:col-span-2">
                    <div className="h-full overflow-hidden rounded-xl">
                        <Swiper
                            navigation
                            modules={[Navigation]}
                            className="h-full w-full"
                        >
                            {listMainBanner.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={img}
                                        className="h-full w-full object-cover"
                                        alt={`Slide ${index + 1}`}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                <div className="hidden h-full flex-col gap-3 lg:flex">
                    <div className="flex-1 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 p-4 text-white shadow-sm">
                        <p className="text-xs uppercase tracking-wide opacity-80">
                            Ưu đãi hôm nay
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                            Giảm đến 50% sách bestseller
                        </p>
                        <p className="mt-2 text-xs opacity-80">
                            Số lượng có hạn, áp dụng cho một số đầu sách.
                        </p>
                    </div>
                    <div className="flex-1 rounded-xl bg-slate-900/90 p-4 text-slate-50 shadow-sm">
                        <p className="text-xs uppercase tracking-wide opacity-80">
                            Thành viên mới
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                            Tặng voucher 30K cho đơn đầu tiên
                        </p>
                        <p className="mt-2 text-xs opacity-80">
                            Đăng ký tài khoản và nhận ưu đãi ngay.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Banner