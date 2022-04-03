import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Slides() {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      className="h-96 cursor-grab"
    >
      {/* https://source.unsplash.com/random/?1 */}
      <SwiperSlide className="bg-green-400 relative">
        <div className="bg-gradient-to-b from-neutral-300/40 to-neutral-900/60 duration-300 shadow-inner absolute inset-0 opacity-0 hover:opacity-100">
          <p>lorem</p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
