import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  userContext,
  toastContext,
  loadingContext,
} from '../../context/Context';
import { isSaved } from '../../fetch/fetchRecipeFromServer';
import SaveRecipeBtn from '../saveRecipeBtn/SaveRecipeBtn';

export default function CardContent({ recipe }) {
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
      <div className="duration-300 shadow-inner absolute inset-0 opacity-0 hover:opacity-100 rounded-lg w-full h-full bg-gradient-to-b from-neutral-500/40 to-neutral-900/60 flex flex-col justify-between font-bold z-20">
        <div className="relative w-full h-full">
          <Link to={`/recipe/${idMeal}`} className="absolute inset-0 "></Link>
          {loading || saveBtn}
        </div>

        {/* name */}
        <Link
          to={`/recipe/${idMeal}`}
          className="block font-ssp text-slate-100 p-2 border-t-2 border-red-500"
        >
          <div className="text-lg font-semibold mt-1 p-2 flex items-center justify-between rounded">
            <div>
              <span className="text-2xl font-bold text-slate-200">
                {firstWord}
              </span>{' '}
              {theRest.join(' ')}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
