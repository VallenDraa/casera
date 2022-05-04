import Header from '../../components/header/Header';
import { useContext, useEffect, useState } from 'react';
import RecipeCardWrapper from '../../components/card/Recipe/RecipeCardWrapper';
import {
  fetchRecipeResults,
  fetchUserResults,
} from '../../fetch/fetchSearchResults';
import Loading from '../../components/loading/Loading';
import HomeAside from '../../components/home/homeAside/HomeAside';
import { loadingContext } from '../../context/Context';
import { useLocation } from 'react-router-dom';
import UserCard from '../../components/card/User/UserCard';

export default function Search() {
  const { search } = useLocation();
  const searchType = search.split('=')[0];
  const urlQuery = search.split('=')[1];
  const query = urlQuery.includes('%20')
    ? urlQuery.replace('%20', ' ')
    : urlQuery;
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useContext(loadingContext);

  useEffect(() => {
    setLoading(true);

    switch (searchType) {
      case '?r':
        fetchRecipeResults(urlQuery)
          .then((res) => setResults(res))
          .finally(() => setLoading(false));
        break;
      case '?u':
        fetchUserResults(urlQuery)
          .then((res) => setResults(res))
          .finally(() => setLoading(false));
        break;
      default:
        break;
    }
  }, []);

  const RenderResults = ({ searchType, results }) => {
    switch (searchType) {
      case '?r':
        return results.map((recipe, i) =>
          i !== 0 ? (
            <RecipeCardWrapper key={i} recipe={recipe} lazyload={true} />
          ) : (
            <RecipeCardWrapper key={i} recipe={recipe} lazyload={false} />
          )
        );
      case '?u':
        return results.map(({ username, profilePic }, i) => {
          return <UserCard key={i} username={username} picture={profilePic} />;
        });

      default:
        return;
    }
  };

  return (
    <>
      <Header />
      <main className="bg-slate-100">
        <HomeAside />
        <div
          className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto pb-5"
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
              : `There are ${results.length} results`}
          </p>
          <article className="mt-16 ">
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 pb-5">
              <RenderResults searchType={searchType} results={results} />
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
