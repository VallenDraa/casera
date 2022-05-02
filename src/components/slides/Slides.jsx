import 'swiper/css';
import 'swiper/css/pagination';
import Img from '../img/Img';
import { Swiper, SwiperSlide } from 'swiper/react';
import CardContent from '../card/CardContent';
import { useContext, useEffect, useState } from 'react';
import { fetchTotalRating } from '../../fetch/fetchRatingsFromServer';
import { toastContext } from '../../context/Context';

export default function Slides({ recipes }) {
  const [ratings, setRatings] = useState(null);
  const { setToastData } = useContext(toastContext);

  useEffect(() => {
    const idMeals = recipes.map((recipe) => recipe && recipe.idMeal);

    fetchTotalRating(idMeals)
      .then((res) => {
        res.getRating ? setRatings(res.mealRatingData) : setRatings(null);
      })
      .catch(() => {
        setToastData({
          code: 500,
          ok: false,
          msg: 'Fail To Make Connection !',
        });
      });
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      className="shadow-lg w-full h-[650px] cursor-grab rounded-lg "
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
              <CardContent rating={ratings && ratings[i]} recipe={recipe} />
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
}
