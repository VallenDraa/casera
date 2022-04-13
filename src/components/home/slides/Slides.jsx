import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import handleSave from '../../../handleSave/handleSave';

export default function Slides({ recipes, saved }) {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      className="w-full h-[650px] cursor-grab"
    >
      {recipes.map((recipe) => {
        if (!recipe) return;
        return (
          <SwiperSlide
            key={recipe.idMeal}
            style={{
              background: `url('${recipe.strMealThumb}')`,
              position: 'relative',
              borderRadius: '8px',
              minWidth: '100%',
              maxWidth: '448px',
              fontFamily: "'Source Serif Pro',serif",
              backgroundSize: 'cover',
            }}
          >
            <div
              className="duration-300 shadow-inner absolute inset-0 opacity-0 hover:opacity-100 rounded-lg w-full h-full bg-gradient-to-b from-neutral-500/40 to-neutral-900/60 flex flex-col justify-between
  font-bold"
            >
              {/* favorite */}
              <div className="cursor-pointer w-fit rounded-tl-lg rounded-bl-none rounded-br-lg p-2 flex items-center gap-1 bg-red-500 hover:bg-red-600 duration-200 text-white font-roboto relative">
                <i className=" fa-regular fa-heart" />
                <div
                  onClick={(e) => handleSave(e)}
                  className="absolute z-20 inset-0"
                ></div>
                <span className="text-[12px]">Save Dish</span>
              </div>
              {/* name */}
              <div className="font-ssp text-slate-100 mb-2 mx-2 border-t-2 border-red-500">
                <Link
                  to={`/recipe?q=${recipe.idMeal}`}
                  className="text-lg font-semibold mt-1 p-2 flex items-center justify-between duration-200 rounded hover:bg-slate-400/50"
                >
                  <div>
                    <span className="text-2xl font-bold text-slate-200">
                      {recipe.strMeal}
                    </span>{' '}
                  </div>
                  <i className="fa-solid fa-ellipsis-vertical" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
