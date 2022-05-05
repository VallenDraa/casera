import Header from '../../components/header/Header';
import HomeAside from '../../components/home/homeAside/HomeAside';
import CardWrapper from '../../components/card/Recipe/RecipeCardWrapper';
import LoginFirst from '../../components/errorComps/LoginFirst';
import { fetchSavedRecipes } from '../../fetch/fetchRecipeFromServer';
import { useContext, useState, useEffect } from 'react';
import {
  loadingContext,
  toastContext,
  userContext,
} from '../../context/Context';
import Loading from '../../components/loading/Loading';
import EmptySlides from '../../components/slides/EmptySlides';
import { setStatePro } from '../../utils/utils';

export default function Saved() {
  const { userState } = useContext(userContext);
  const [loading, setLoading] = useContext(loadingContext);
  const { setToastData } = useContext(toastContext);
  const [cards, setCards] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchSavedRecipes(userState, setToastData, false)
      .then((recipes) => {
        const temp = [];
        if (recipes) {
          recipes.length > 0 &&
            recipes.forEach((recipe, i) => {
              i > 0
                ? temp.push(
                    <CardWrapper key={i} recipe={recipe} lazyload={false} />
                  )
                : temp.push(
                    <CardWrapper key={i} recipe={recipe} lazyload={true} />
                  );
            });

          temp.length > 0
            ? setStatePro(setCards, temp).finally(() => setLoading(false))
            : setStatePro(setCards, null).finally(() => setLoading(false));
        }
      })
      .finally(() => setLoading(false));
  }, [userState, setLoading, setToastData]);

  return (
    <>
      <Header />
      <main>
        <HomeAside />
        <div className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto text-center md:text-left text-slate-700">
          <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
            Saved
          </h1>
          <p className="font-ssp text-lg font-light text-slate-600">
            Cook Your <span className="font-semibold">Favorites !</span>
          </p>
          <article
            className="mt-16 relative"
            style={{
              height: loading ? '500px' : 'auto',
            }}
          >
            {loading && <Loading />}

            {loading ||
              (userState ? (
                cards ? (
                  <section className="animate-fade-in grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 pb-5">
                    {cards}
                  </section>
                ) : (
                  <EmptySlides msg="You Don't Have Any Saved Recipes" />
                )
              ) : (
                <div className="max-w-xl mx-auto animate-fade-in">
                  <LoginFirst msg="Login / Register To Save Recipes" />
                </div>
              ))}
          </article>
        </div>
      </main>
    </>
  );
}
