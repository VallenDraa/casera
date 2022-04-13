import Navbar from '../../components/navbar/Navbar';
import { useEffect, useState } from 'react';
import { fetchSearchResult } from '../../fetch/fetchSearchResult';
import HomeAside from '../../components/home/homeAside/HomeAside';
import Card from '../../components/card/Card';
import Loading from '../../components/loading/Loading';

export default function Search() {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const query = window.location.href.split('=')[1];
  useEffect(() => {
    const fetchRecipes = () => {
      fetchSearchResult(query)
        .then((res) => (res ? setRecipes(res) : setRecipes([])))
        .finally(() => setLoading(false));
    };

    fetchRecipes();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <header>
        <Navbar />
      </header>
      <main className="bg-slate-100">
        <div className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left">
          <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
            Results for <span className="italic">{query}</span>
          </h1>
          <p className="font-ssp text-lg font-light">
            There are {recipes.length} recipes available
          </p>
          <article className="mt-16 ">
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 pb-5">
              {recipes.map((recipe, i) => (
                <Card key={i} recipe={recipe} saved={true} />
              ))}
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
