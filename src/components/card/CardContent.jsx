import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext, toastContext } from '../../context/Context';
import { setStatePro } from '../../utils/utils';
import SaveRecipeBtn from '../saveRecipeBtn/SaveRecipeBtn';

export default function CardContent({ recipe }) {
  const [firstWord, ...theRest] = recipe.strMeal.split(' ');
  const { idMeal } = recipe;
  const { userState, dispatch } = useContext(userContext);
  const [saved, setSaved] = useState(true);
  const { setToastData } = useContext(toastContext);

  useEffect(() => {
    const isSaved = () => {
      setStatePro(setToastData, null).finally(async () => {
        try {
          const { data } = await axios.get(
            `/api/recipe/is_saved?username=${userState.username}&idMeal=${idMeal}`
          );
          setSaved(data.containIdMeal);
        } catch (error) {
          setToastData({ ok: false, msg: 'Fail To Make Connection !' });
        }
      });
    };

    isSaved();
  }, []);

  return (
    <div className="duration-300 shadow-inner absolute inset-0 opacity-0 hover:opacity-100 rounded-lg w-full h-full bg-gradient-to-b from-neutral-500/40 to-neutral-900/60 flex flex-col justify-between font-bold z-20">
      <div className="relative w-full h-full">
        <Link
          to={`/recipe/${idMeal}`}
          className=" cursor-grab absolute inset-0 "
        ></Link>
        <SaveRecipeBtn id={idMeal} saved={saved} />
      </div>

      {/* name */}
      <Link
        to={`/recipe/${idMeal}`}
        className=" cursor-grab block font-ssp text-slate-100 p-2 border-t-2 border-red-500"
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
  );
}
