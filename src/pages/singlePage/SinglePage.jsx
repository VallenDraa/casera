import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import ReactPlayer from 'react-player';
import handleSave from '../../handleSave/handleSave.js';
import { Link } from 'react-router-dom';

export default function SinglePage({ saved }) {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    function getRecipes() {
      return axios.get(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
      );
    }

    getRecipes().then((res) => {
      // ingredients
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
    });
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-slate-100 pb-5">
        <article className="relative max-w-screen-xl px-3 mt-20 mx-auto lg:text-left text-slate-800">
          {recipes.map((recipe) => (
            <section
              key={recipe.idMeal}
              className="flex flex-col-reverse md:flex-row gap-12 md:gap-10"
            >
              {/* preview */}
              <div>
                <div className="text-center sticky top-20 space-y-10">
                  <div className="w-fit mx-auto">
                    <img
                      className="h-[400px] object-cover rounded-full"
                      src={recipe.strMealThumb}
                      alt=""
                    />
                    <span className="text-sm font-roboto font-bold">
                      Photo Preview
                    </span>
                  </div>
                  <div className="w-fit mx-auto">
                    <ReactPlayer
                      height={400}
                      width={400}
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
                    <Link to="/recipe">
                      <div className="flex items-center gap-5">
                        <i className="fa-solid fa-bowl-rice relative bottom-1  h-3 w-3" />
                        <p>{recipe.strCategory}</p>
                      </div>
                    </Link>
                    <Link to="/recipe">
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
                      {recipe.strTags.split(',').map((tag) => (
                        <li className="bg-lime-300 py-1 px-2 duration-200 hover:bg-lime-400 active:bg-lime-500 text-lime-700 hover:text-lime-600 active:text-white rounded font-ssp text-xs cursor-pointer ">
                          <Link to="/recipe">{tag}</Link>
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
                        (ingredient) =>
                          ingredient && (
                            <li className="tracking-wide font-roboto">
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
                      {recipe.strInstructions
                        .split('.')
                        .map(
                          (instruction) =>
                            instruction !== '' && (
                              <li className="tracking-wide font-roboto">
                                {instruction}.
                              </li>
                            )
                        )}
                    </ol>
                  </div>
                </main>
                <footer className="h-10">
                  {/* save dish */}
                  <div className="cursor-pointer h-full w-full rounded p-2 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 duration-200 text-white font-roboto relative text-lg">
                    {saved ? (
                      <i className=" fa-solid fa-heart" />
                    ) : (
                      <i className=" fa-regular fa-heart" />
                    )}
                    <div
                      onClick={(e) => handleSave(e)}
                      className="absolute z-20 inset-0"
                    ></div>
                    {saved ? <span>Saved</span> : <span>Save Dish</span>}
                  </div>
                </footer>
              </div>
            </section>
          ))}
        </article>
      </main>
    </>
  );
}