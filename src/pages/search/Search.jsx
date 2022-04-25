import Navbar from '../../components/navbar/Navbar';
import { useContext, useEffect, useState } from 'react';
import CardWrapper from '../../components/card/CardWrapper';
import fetchSearchResult from '../../fetch/fetchSearchResults';
import Loading from '../../components/loading/Loading';
import { loadingContext } from '../../context/Context';

export default function Search() {
  const query = window.location.href.split('=')[1];
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useContext(loadingContext);
  useEffect(() => {
    setLoading(true);
    fetchSearchResult(query)
      .then((res) => setRecipes(res))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <>
      {loading && <Loading />}
      <header>
        <Navbar />
      </header>
      <main className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left pb-5">
        <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
          Result for <span className="italic">{query}</span>
        </h1>
        <p className="font-ssp text-lg font-light">
          There are {recipes.length} recipes
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
      </main>
    </>
  );
}
