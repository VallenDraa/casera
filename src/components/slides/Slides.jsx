import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardContent from '../card/CardContent';

export default function Slides({ recipes }) {
  console.log(recipes);
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
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                loading={i !== 0 ? 'lazy' : 'eager'}
                className="object-cover w-full h-full rounded-lg"
              />
              <CardContent recipe={recipe} />
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
}
