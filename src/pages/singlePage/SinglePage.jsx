import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import HomeAside from '../../components/home/homeAside/HomeAside';
import Loading from '../../components/loading/Loading';
import {
  loadingContext,
  toastContext,
  userContext,
} from '../../context/Context';
import Missing404 from '../../components/errorComps/Missing404';
import SaveRecipeBtn from '../../components/saveRecipeBtn/SaveRecipeBtn';
import { isSaved } from '../../fetch/fetchRecipeFromServer';

export default function SinglePage() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [iframeWidth, setIframeWidth] = useState(400);
  const [loading, setLoading] = useContext(loadingContext);
  const { userState } = useContext(userContext);
  const { idMeal } = useParams();
  const [saveBtn, setSaveBtn] = useState(null);
  const { setToastData } = useContext(toastContext);

  // resize iframe according to screen size
  const iframeWidthChange = () => {
    return window.innerWidth >= 1024
      ? setIframeWidth(400)
      : setIframeWidth((window.innerWidth * 90) / 100);
  };
  window.addEventListener('resize', iframeWidthChange);

  useEffect(() => {
    setLoading(true);
    // get recipe datas
    const getRecipes = () => {
      return axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
    };

    getRecipes()
      .then((res) => {
        if (res.data.meals !== null) {
          const ingredientsTemp = [];
          for (let i = 0; i < 20; i++) {
            const ingredient = res.data.meals[0]['strIngredient' + i];
            const measurement = res.data.meals[0]['strMeasure' + i];

            ingredient &&
              measurement &&
              ingredientsTemp.push({
                name: ingredient,
                amount: measurement,
              });
          }

          // set the recipes state
          setRecipes(res.data.meals);
          setIngredients(ingredientsTemp);
        } else {
          setRecipes(['n/a']);
        }
      })
      .finally(() => {
        isSaved(
          setToastData,
          userState,
          idMeal,
          setSaveBtn,
          SaveRecipeBtn,
          true
        ).finally(() => setLoading(false));
      });
    iframeWidthChange();
  }, []);

  return (
    <>
      <Header />

      <main className="bg-slate-100 pb-5">
        <article
          className="relative max-w-screen-xl px-3 mt-12 lg:mt-20 mx-auto lg:text-left text-slate-800"
          style={{
            height: loading ? 'calc(100vh - 150px)' : 'auto',
          }}
        >
          {loading && <Loading />}
          {recipes.map((recipe) =>
            recipes[0] !== 'n/a' ? (
              <section
                key={recipe.idMeal}
                className="animate-fade-in flex flex-col-reverse lg:flex-row gap-12 lg:gap-10"
              >
                {/* preview */}
                <div>
                  <div className="text-center sticky top-20 space-y-10">
                    <div className="w-fit mx-auto">
                      <img
                        className="h-[400px] object-cover animate-fade-in"
                        src={recipe.strMealThumb}
                        alt=""
                      />
                      <span className="text-sm font-roboto font-bold">
                        Photo Preview
                      </span>
                    </div>
                    <div className="w-fit mx-auto animate-fade-in">
                      <ReactPlayer
                        height={400}
                        width={iframeWidth}
                        controls={true}
                        url={recipe.strYoutube}
                        title={recipe.strMeal + ' Recipe Instruction Video'}
                      />
                      <span className="text-sm font-roboto font-bold">
                        Video Tutorial
                      </span>
                    </div>
                  </div>
                </div>
                {/* desc */}
                <div className="space-y-10">
                  {/* header */}
                  <header>
                    <div className="flex gap-3 justify-between">
                      <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
                        {recipe.strMeal}
                      </h1>
                    </div>
                    {/* sub header */}
                    <div className="text-lg mt-3 flex gap-10 font-roboto tracking-wide text-lime-600">
                      <Link to={`/search?q=${recipe.strCategory}`}>
                        <div className="flex items-center gap-5">
                          <i className="fa-solid fa-bowl-rice relative bottom-1  h-3 w-3" />
                          <p>{recipe.strCategory}</p>
                        </div>
                      </Link>
                      <Link to={`/search?q=${recipe.strArea}`}>
                        <div className="flex items-center gap-5">
                          <i className="fa-solid fa-map-location relative bottom-1 h-3 w-3" />
                          <p>{recipe.strArea}</p>
                        </div>
                      </Link>
                    </div>
                    {/* tags */}
                    <div className="mt-5 text-lg font-ssp text-slate-800/60 border-b-2 border-slate-800/60 pb-5">
                      <p className="mb-1">Tags: </p>
                      <ul className="flex space-x-2">
                        {recipe.strTags &&
                          recipe.strTags.split(',').map((tag) => (
                            <li
                              key={tag}
                              className="bg-lime-300 py-1 px-2 duration-200 text-lime-700 rounded font-ssp text-xs cursor-pointer "
                            >
                              {tag}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </header>
                  {/* body */}
                  <main className="px-2 mt-10 space-y-10">
                    {/* ingredients */}
                    <div>
                      <h2 className="tracking-wide text-2xl font-ssp first-letter:text-3xl font-semibold mb-2">
                        Ingredients:
                      </h2>
                      <ol className="list-decimal ml-6 space-y-2">
                        {ingredients.map(
                          (ingredient, i) =>
                            ingredient && (
                              <li key={i} className="tracking-wide font-roboto">
                                <span>{ingredient.name}</span>
                                <span className="italic font-bold">{` (${ingredient.amount})`}</span>
                              </li>
                            )
                        )}
                      </ol>
                    </div>
                    {/* instructions */}
                    <div>
                      <h2 className="tracking-wide text-2xl font-ssp first-letter:text-3xl font-semibold mb-2">
                        Instructions:
                      </h2>
                      <ol className="list-decimal ml-6 space-y-2">
                        {recipe.strInstructions.split('.').map(
                          (instruction, i) =>
                            instruction !== '' && (
                              <li key={i} className="tracking-wide font-roboto">
                                {instruction}.
                              </li>
                            )
                        )}
                      </ol>
                    </div>
                  </main>
                  <footer className="h-10">
                    {/* save dish */}
                    {saveBtn}
                  </footer>
                </div>
              </section>
            ) : (
              <Missing404 msg="The recipe you were looking for is not available or has been deleted." />
            )
          )}
        </article>
      </main>
    </>
  );
}
