import { useContext, useEffect, useState } from 'react';
import { toastContext, userContext } from '../../context/Context';
import { recipeSave, recipeUnsave } from '../../fetch/fetchRecipeFromServer';
import { setStatePro } from '../../utils/utils';

export default function SaveRecipeBtn({
  idMeal,
  initSaved = false,
  big = false,
}) {
  const { userState } = useContext(userContext);
  const { setToastData } = useContext(toastContext);
  const [saved, setSaved] = useState(initSaved);
  useEffect(() => {
    setToastData(null);
  }, []);

  const handleSave = () => {
    setStatePro(setToastData, null).finally(() => {
      // return if userState is empty
      if (!userState) {
        return setToastData({ ok: false, msg: 'Login To Save Recipe !' });
      }

      // setting up the body content
      const { _id } = userState;
      const bodyContent = { _id, idMeal };

      // execute different function depending on the saved state
      !saved
        ? recipeSave(setToastData, setSaved, bodyContent)
        : recipeUnsave(setToastData, setSaved, bodyContent);
    });
  };

  return (
    <>
      {!big ? (
        <button
          type="button"
          className="w-fit rounded-tl-lg rounded-bl-none rounded-br-lg p-2 flex items-center gap-1 bg-red-500 hover:bg-red-600 focus:bg-red-700 duration-200 text-white hover:text-slate-100 focus:text-slate-200 font-roboto absolute z-40 cursor-pointer"
        >
          {saved ? (
            <i className="fa-solid fa-heart" />
          ) : (
            <i className="fa-regular fa-heart" />
          )}
          <div
            onClick={(e) => handleSave(e)}
            className="absolute z-20 inset-0"
          ></div>
          <span className="text-[12px]">{saved ? 'Saved' : 'Save Dish'}</span>
        </button>
      ) : (
        <button
          type="button"
          className="cursor-pointer h-full w-full rounded p-2 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:ring-4 focus:ring-red-300 duration-200 text-white hover:text-slate-100 focus:text-slate-200 font-roboto relative text-lg"
        >
          {saved ? (
            <i className=" fa-solid fa-heart" />
          ) : (
            <i className=" fa-regular fa-heart" />
          )}
          <div
            onClick={(e) => handleSave(e)}
            className="absolute z-20 inset-0"
          ></div>
          <span className="font-light">{saved ? 'Saved' : 'Save Dish'}</span>
        </button>
      )}
    </>
  );
}
