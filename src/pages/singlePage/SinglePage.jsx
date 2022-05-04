import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import {
  loadingContext,
  toastContext,
  userContext,
} from '../../context/Context';
import Missing404 from '../../components/errorComps/Missing404';
import SaveRecipeBtn from '../../components/saveRecipeBtn/SaveRecipeBtn';
import { isSaved } from '../../fetch/fetchRecipeFromServer';
import { setStatePro } from '../../utils/utils';
import {
  addRating,
  fetchTotalRating,
  updateRating,
} from '../../fetch/fetchRatingsFromServer';
import { USERACTIONS } from '../../context/Actions';

export default function SinglePage() {
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [iframeWidth, setIframeWidth] = useState(400);
  const [loading, setLoading] = useContext(loadingContext);
  const { userState, dispatch } = useContext(userContext);
  const { idMeal } = useParams();
  const [saveBtn, setSaveBtn] = useState(null);
  const { setToastData } = useContext(toastContext);
  const ratingStars = useRef(null);
  const [userHasRated, setUserHasRated] = useState();
  const [totalRating, setTotalRating] = useState(null);
  const RATING_MESSAGES = [
    '🤮 Bad',
    '😕 Meh',
    '🙂 Ok',
    '😋 Good',
    '🤩 Delicious',
  ];

  // resize iframe according to screen size
  const iframeWidthChange = () => {
    return window.innerWidth >= 1024
      ? setIframeWidth(400)
      : setIframeWidth((window.innerWidth * 90) / 100);
  };
  window.addEventListener('resize', iframeWidthChange);

  // handle user rating
  const handleRate = (e) => {
    setStatePro(setToastData, null).finally(() => {
      // check if the user is logged in
      if (!userState)
        return setToastData({
          ok: false,
          msg: 'Login / Register To Rate This Recipe !',
        });

      // determine the user rating
      const target = e.target;
      if (!target.classList.contains('fa-star')) return;
      const stars = [...ratingStars.current.children];
      const newUserRating = stars.includes(target) && stars.indexOf(target) + 1;
      for (const i in stars) {
        i < newUserRating
          ? stars[i].classList.replace('fa-regular', 'fa-solid')
          : stars[i].classList.replace('fa-solid', 'fa-regular');
      }

      // check if there is a user rating before continuing
      if (!newUserRating) return;

      // turn the empty stars into filled ones according to the newUserRating value

      const ratingByUserExists = userState.ratingsByUser.find(
        (rating) => rating.idMeal === idMeal
      );

      ratingByUserExists
        ? updateRating(newUserRating, userState, idMeal)
            .then((data) => {
              setTotalRating(data.mealRatingData);
              const newUserData = JSON.parse(sessionStorage.getItem('user'));
              newUserData.ratingsByUser = data.ratingsByUser;
              dispatch({ type: USERACTIONS.updateUser, payload: newUserData });
            })
            .catch(() => {
              setToastData({
                code: 500,
                ok: false,
                msg: 'Fail To Make Connection !',
              });
            })
        : addRating(newUserRating, userState, idMeal)
            .then((data) => {
              setTotalRating(data.mealRatingData);
              const newUserData = JSON.parse(sessionStorage.getItem('user'));
              newUserData.ratingsByUser = data.ratingsByUser;
              dispatch({ type: USERACTIONS.updateUser, payload: newUserData });
            })
            .catch(() => {
              setToastData({
                code: 500,
                ok: false,
                msg: 'Fail To Make Connection !',
              });
            });
    });
  };

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
  }, []);

  useEffect(iframeWidthChange, []);

  useEffect(() => {
    fetchTotalRating(idMeal)
      .then((res) => {
        res.getRating
          ? setTotalRating(res.mealRatingData[0])
          : setTotalRating(null);
      })
      .catch(() => {
        setToastData({
          code: 500,
          ok: false,
          msg: 'Fail To Make Connection !',
        });
      });
  }, []);

  useEffect(() => {
    const changeStarValue = (rating, stars) => {
      for (const i in stars) {
        i < rating
          ? stars[i].classList.replace('fa-regular', 'fa-solid')
          : stars[i].classList.replace('fa-solid', 'fa-regular');
      }
    };

    // check if user rated the current meal
    if (userState) {
      const { ratingsByUser } = userState;
      const ratingData = ratingsByUser.find(
        (rtng) => Number(rtng.idMeal) === Number(idMeal)
      );
      if (!ratingData) return;
      const { rating } = ratingData;

      console.log({ rated: true, rating });
      setUserHasRated({ rated: true, rating });
      setTimeout(() => {
        const stars = [...ratingStars.current.children];
        changeStarValue(rating, stars);
      }, 600);
    }
  }, [userState]);

  return (
    <>
      <Header />

      <main className="bg-slate-100 pb-5">
        <article
          className="relative max-w-screen-xl  mt-12 lg:mt-20 mx-auto lg:text-left text-slate-800"
          style={{
            height: loading ? 'calc(100vh - 150px)' : 'auto',
          }}
        >
          {loading && <Loading />}
          {recipes.map((recipe) =>
            recipes[0] !== 'n/a' ? (
              <section key={recipe.idMeal} className="animate-fade-in ">
                {/* body */}
                <main className="px-3 xl:px-0 mt-10 flex flex-col-reverse lg:flex-row gap-12 lg:gap-10">
                  {/* preview */}
                  <section>
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
                  </section>
                  {/* desc */}
                  <section className="space-y-10">
                    {/* header */}
                    <header className="text-center sm:text-left">
                      {/* dish name */}
                      <div className="w-fit sm:w-full mx-auto flex gap-3 justify-between">
                        <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
                          {recipe.strMeal}
                        </h1>
                      </div>
                      {/* sub header */}
                      <div className="text-lg mt-3 sm:mt-5 flex gap-10 flex-col-reverse sm:flex-row items-center sm:justify-between font-roboto tracking-wide text-lime-600">
                        {/* types */}
                        <div className="flex gap-10 w-fit">
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
                        {/* rating */}
                        <div className="bg-slate-700 rounded sm:px-2 py-1 w-full sm:w-fit font-light text-yellow-400 font-ssp text-sm">
                          <i className="pr-1 fa-solid fa-star" />
                          <span>
                            {totalRating &&
                            totalRating.totalRating &&
                            totalRating.byHowMany
                              ? `${totalRating.totalRating} / 5  
                                (${`${totalRating.byHowMany}`})`
                              : 'Not Rated'}
                          </span>
                        </div>
                      </div>
                      {/* tags */}
                      <div className="text-left mt-1 sm:mt-5 text-lg font-ssp text-slate-800/60 border-b-2 border-slate-800/60 pb-5">
                        {recipe.strTags &&
                          recipe.strTags.split(',').map((tag) => (
                            <span
                              key={tag}
                              className="bg-lime-300 mr-1 py-1 px-2 duration-200 text-lime-700 rounded font-ssp text-xs cursor-pointer "
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </header>
                    {/* datas of the dish */}
                    <main className="space-y-10">
                      {/* ingredients */}
                      <section>
                        <h2 className="tracking-wide text-2xl font-ssp first-letter:text-3xl font-semibold mb-2">
                          Ingredients:
                        </h2>
                        <ol className="list-decimal ml-6 space-y-2">
                          {ingredients.map(
                            (ingredient, i) =>
                              ingredient && (
                                <li
                                  key={i}
                                  className="tracking-wide font-roboto"
                                >
                                  <span>{ingredient.name}</span>
                                  <span className="italic font-bold">{` (${ingredient.amount})`}</span>
                                </li>
                              )
                          )}
                        </ol>
                      </section>
                      {/* instructions */}
                      <section>
                        <h2 className="tracking-wide text-2xl font-ssp first-letter:text-3xl font-semibold mb-2">
                          Instructions:
                        </h2>
                        <ol className="list-decimal ml-6 space-y-2">
                          {recipe.strInstructions.split('.').map(
                            (instruction, i) =>
                              instruction !== '' && (
                                <li
                                  key={i}
                                  className="tracking-wide font-roboto"
                                >
                                  {instruction}.
                                </li>
                              )
                          )}
                        </ol>
                      </section>
                    </main>
                    {/* cta's */}
                    <footer className="mt-10">
                      {/* save dish */}
                      {saveBtn}
                      <div className="bg-slate-700 text-center rounded sm:px-2 py-1 w-full font-light text-yellow-400 font-ssp mt-3">
                        <div
                          ref={ratingStars}
                          onClick={(e) => handleRate(e)}
                          className="space-x-1 text-xl mb-1 cursor-pointer w-fit mx-auto"
                        >
                          <i id="1" className="fa-regular fa-star" />
                          <i id="2" className="fa-regular fa-star" />
                          <i id="3" className="fa-regular fa-star" />
                          <i id="4" className="fa-regular fa-star" />
                          <i id="5" className="fa-regular fa-star" />
                        </div>
                        <p className="text-sm pt-1">
                          {userHasRated
                            ? `${RATING_MESSAGES[userHasRated.rating - 1]} (${
                                userHasRated.rating
                              } / 5)`
                            : 'Rate This Recipe !'}
                        </p>
                      </div>
                    </footer>
                  </section>
                </main>
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
