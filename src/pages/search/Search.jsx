import Header from '../../components/header/Header';
import { useContext, useEffect, useState } from 'react';
import CardWrapper from '../../components/card/CardWrapper';
import fetchSearchResult from '../../fetch/fetchSearchResults';
import Loading from '../../components/loading/Loading';
import HomeAside from '../../components/home/homeAside/HomeAside';
import { loadingContext } from '../../context/Context';

export default function Search() {
  const urlQuery = window.location.href.split('=')[1];
  const query = urlQuery.includes('%20')
    ? urlQuery.replace('%20', ' ')
    : urlQuery;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useContext(loadingContext);

  useEffect(() => {
    setLoading(true);
    fetchSearchResult(urlQuery)
      .then((res) => setRecipes(res))
      .finally(() => setLoading(false));
  }, [urlQuery]);

  return (
    <>
      <Header />
      <main className="bg-slate-100">
        <HomeAside />
        <div
          className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left pb-5"
          style={{ height: loading ? 'calc(100vh - 110px)' : 'auto' }}
        >
          {loading && <Loading />}
          <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold text-slate-700">
            Results for <span className="italic">{query}</span>
          </h1>
          <p
            className={`font-ssp text-lg font-light ${
              loading
                ? 'animate-pulse text-slate-500'
                : 'animate-fade-in text-slate-600'
            }`}
          >
            {loading
              ? "Hang On It's Almost Done"
              : `There are ${recipes.length} recipes`}
          </p>
          <article className="mt-16 ">
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 pb-5">
              {recipes.map((recipe, i) =>
                i !== 0 ? (
                  <CardWrapper key={i} recipe={recipe} lazyload={true} />
                ) : (
                  <CardWrapper key={i} recipe={recipe} lazyload={false} />
                )
              )}
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
