import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardContent from '../../card/CardContent';

export default function Slides({ recipes }) {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      className="w-full h-[650px] cursor-grab"
    >
      {recipes ? (
        recipes.map(
          (recipe, i) =>
            recipe && (
              <SwiperSlide
                key={i}
                className="relative rounded-lg min-w-full max-w-md font-ssp"
                style={{
                  backgroundImage: `url('${recipe.strMealThumb}')`,
                  backgroundSize: 'cover',
                }}
              >
                <CardContent saved={true} recipe={recipe} />
              </SwiperSlide>
            )
        )
      ) : (
        <SwiperSlide className="relative rounded-lg min-w-full max-w-md font-ssp flex items-center justify-center border-2 border-slate-300 ">
          <p className="font-ssp italic">Results Not Available Or Missing !</p>
        </SwiperSlide>
      )}
    </Swiper>
  );
}
