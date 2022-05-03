import CardContent from './RecipeCardContent';
import Img from '../../img/Img';
import { useContext, useEffect, useState } from 'react';
import { toastContext } from '../../../context/Context';
import { fetchTotalRating } from '../../../fetch/fetchRatingsFromServer';

export default function CardWrapper({ recipe, lazyload = false }) {
  const [rating, setRating] = useState([]);
  const { setToastData } = useContext(toastContext);

  useEffect(() => {
    const { idMeal } = recipe;
    fetchTotalRating(idMeal)
      .then((res) => {
        res.getRating ? setRating(res.mealRatingData) : setRating(null);
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
    <>
      <div className="shadow-md animate-fade-in h-[500px] relative rounded-lg min-w-full max-w-md lg:max-w-lg font-ssp resize">
        <Img
          lazyload={lazyload}
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
        />

        <CardContent recipe={recipe} rating={rating && rating[0]} />
      </div>
    </>
  );
}
