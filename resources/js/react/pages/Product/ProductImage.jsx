import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

export default function ProductImage({ images }) {
  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
      {images.map(e=>
        <SwiperSlide key={Math.random()} ><img src={e.path} alt={e.alt} className="w-100vw"/></SwiperSlide>
      )}
      </Swiper>
    </>
  );
}
