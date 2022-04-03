import React from 'react';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export default function Slides() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween: 10,
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  });
  return (
    <div className="swiper h-[600px]">
      <div className="swiper-wrapper">
        <div className="swiper-slide cursor-grab bg-red-400">Slide 1</div>
        <div className="swiper-slide cursor-grab bg-blue-400">Slide 2</div>
        <div className="swiper-slide cursor-grab bg-yellow-400">Slide 3</div>
        <div className="swiper-slide cursor-grab bg-teal-400">Slide 4</div>
        <div className="swiper-slide cursor-grab bg-purple-400">Slide 5</div>
        <div className="swiper-slide cursor-grab bg-gray-400">Slide 6</div>
      </div>
    </div>
  );
}
