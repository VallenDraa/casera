import 'swiper/css';
import 'swiper/css/pagination';
import Img from '../img/Img';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardContent from '../card/CardContent';

export default function Slides({ recipes }) {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      className="w-full h-[650px] cursor-grab rounded-lg "
    >
      {recipes.map(
        (recipe, i) =>
          recipe && (
            <SwiperSlide
              key={i}
              // className="relative rounded-lg min-w-full max-w-md font-ssp"
            >
              <Img
                lazyload={i !== 0 ? true : false}
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
              />
              <CardContent recipe={recipe} />
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
}
