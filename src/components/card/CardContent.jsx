import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  userContext,
  toastContext,
  loadingContext,
} from '../../context/Context';
import { isSaved } from '../../fetch/fetchRecipeFromServer';
import SaveRecipeBtn from '../saveRecipeBtn/SaveRecipeBtn';

// this render 3 times because of rating, please fix it
export default function CardContent({ recipe, rating }) {
  const [firstWord, ...theRest] = recipe.strMeal.split(' ');
  const { idMeal } = recipe;
  const { userState } = useContext(userContext);
  const { setToastData } = useContext(toastContext);
  const [loading, setLoading] = useContext(loadingContext);
  const [saveBtn, setSaveBtn] = useState(null);

  useEffect(() => {
    isSaved(setToastData, userState, idMeal, setSaveBtn, SaveRecipeBtn).finally(
      () => setLoading(false)
    );
  }, []);

  return (
    <>
      <div className="duration-300 shadow-inner absolute inset-0 opacity-0 hover:opacity-100 rounded-lg w-full h-full bg-gradient-to-b from-neutral-500/50 to-neutral-900/70 flex flex-col justify-between font-bold z-20">
        <div className="relative w-full h-full">
          {loading || saveBtn}

          {/* rating */}
          <div className="absolute bottom-2 inset-x-0 text-center font-light text-yellow-400 font-ssp text-sm">
            <i className="pr-1 fa-solid fa-star" />
            <span>
              {rating && rating.totalRating && rating.byHowMany
                ? `${rating.totalRating} / 5  
                  (${rating.byHowMany <= 100 ? `${rating.byHowMany}` : `100+`})`
                : 'Not Rated'}
            </span>
          </div>
        </div>
        {/* name */}
        <Link
          to={`/recipe/${idMeal}`}
          className="duration-300 group block font-ssp text-slate-100 p-2 border-t-2 border-red-500"
        >
          <div className="text-lg font-semibold mt-1 p-2 flex items-center justify-between rounded relative">
            {theRest.join(' ').length > 40 ? (
              <div className="md:max-w-[500px]">
                <span className="text-xl font-bold text-slate-200">
                  {firstWord}
                </span>{' '}
                <span className="text-sm">{theRest.join(' ')}</span>
              </div>
            ) : (
              <div>
                <span className="text-2xl font-bold text-slate-200">
                  {firstWord}
                </span>{' '}
                <span>{theRest.join(' ')}</span>
              </div>
            )}
            <p className="bg-slate-500/80 px-2 py-1 rounded text-lg text-slate-300 font-roboto font-light opacity-0 group-hover:opacity-100 group-hover:animate-fade-in-bottom animate-fade-out-bottom duration-300 absolute z-20 inset-0 flex items-center justify-center">
              Detail &raquo;
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
