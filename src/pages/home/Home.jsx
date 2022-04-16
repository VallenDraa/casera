import Navbar from '../../components/navbar/Navbar';
import { useRef, useState, useEffect } from 'react';
import HomeAside from '../../components/home/homeAside/HomeAside';
import Slides from '../../components/home/slides/Slides';
import { fetchCat, fetchArea, fetchIngredients } from '../../fetch/fetchTags';
import { fetchRecipesByTypes } from '../../fetch/fetchRecipes';
import Loading from '../../components/loading/Loading';

export default function Home() {
  const TYPELIST = ['Categories', 'Area', 'Ingredients'];
  const [activeType, setActiveType] = useState(TYPELIST[0]);
  const [tags, setTags] = useState([]);
  const activeTagList = useRef(null);
  const [activeTag, setActiveTag] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTagsByType = (fetchFunc) =>
      fetchFunc().then(({ tags, active }) => {
        setTags(tags);
        setActiveTag(active);
        fetchRecipesByTypes(activeType, active)
          .then((res) => setRecipes(res))
          .finally(() => setLoading(false))
          .catch((e) => console.log(e));
      });

    const fetchTags = () => {
      switch (activeType) {
        case 'Categories':
          fetchTagsByType(fetchCat);
          break;
        case 'Area':
          fetchTagsByType(fetchArea);
          break;
        case 'Ingredients':
          fetchTagsByType(fetchIngredients);
          break;
      }
    };

    fetchTags();
  }, [activeType]);

  // handle the lime no bg food type buttons
  function handleTypeList(target) {
    setLoading(true);
    // check if the clicked target matches one of the items in the list
    TYPELIST.map((type) => type === target && setActiveType(target));
  }

  // handle the lime with bg tags buttons
  function handleActiveTagList(target) {
    setLoading(true);
    const listItems = Array.from(activeTagList.current.children);

    // check if the clicked target matches one of the items in the list
    listItems.forEach(
      (item) => item.textContent === target && setActiveTag(target)
    );

    // refetch recipes after new tag is activated
    fetchRecipesByTypes(activeType, target)
      .then((res) => setRecipes(res))
      .finally(() => setLoading(false))
      .catch((e) => console.error(e));
  }

  return (
    <>
      {loading && <Loading />}
      <header>
        <Navbar />
      </header>
      <main className="bg-slate-100 ">
        <div className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left">
          <header className="text-center lg:text-left">
            <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
              Home
            </h1>
            <p className="font-ssp text-lg font-light">
              Make Your Next <span className="font-semibold">Dish !</span>
            </p>
            {/* find by type */}
            <ul className="flex gap-8 text-sm mt-9 mb-6 font-roboto justify-center lg:justify-start">
              {TYPELIST.map((type) =>
                type === activeType ? (
                  <li
                    key={type}
                    onClick={(e) => handleTypeList(e.target.textContent)}
                    className=" cursor-pointer rounded-full text-lime-700"
                  >
                    {type}
                  </li>
                ) : (
                  <li
                    key={type}
                    onClick={(e) => handleTypeList(e.target.textContent)}
                    className=" cursor-pointer rounded-full text-lime-500"
                  >
                    {type}
                  </li>
                )
              )}
            </ul>
          </header>
          <div className="relative pb-5">
            {/* aside */}
            <HomeAside />
            <section className="relative flex lg:m-3 xl:m-5 gap-6 lg:gap-12 flex-col-reverse lg:flex-row">
              {/* tags */}
              <article className="lg:basis-3/12 w-full lg:w-20 flex flex-col justify-center max-h-[650px] overflow-auto">
                <div ref={activeTagList}>
                  {tags.map((tag) =>
                    tag === activeTag ? (
                      <span
                        key={tag}
                        onClick={(e) =>
                          handleActiveTagList(e.target.textContent)
                        }
                        className="inline-block py-1 px-2 duration-200 bg-lime-500 text-white rounded font-ssp text-xs cursor-pointer ml-1 mb-1"
                      >
                        {tag}
                      </span>
                    ) : (
                      <span
                        key={tag}
                        onClick={(e) =>
                          handleActiveTagList(e.target.textContent)
                        }
                        className="inline-block bg-lime-300 py-1 px-2 duration-200 hover:bg-lime-400 active:bg-lime-500 text-lime-700 hover:text-lime-600 active:text-white rounded font-ssp text-xs cursor-pointer ml-1 mb-1"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </article>
              {/* food slide show */}
              <article className="lg:basis-9/12 overflow-hidden flex gap-3 items-center">
                <Slides recipes={recipes} />
                {/* pop-up */}
                <div className="group text-2xl text-lime-500 lg:text-lime-700 absolute right-0 lg:relative">
                  <p className="animate-blink-right relative z-20 cursor-default">
                    &raquo;
                  </p>
                  <div
                    className="
                hidden group-hover:block shadow-xl absolute text-[12px] -left-[130px] top-[-4px] rounded bg-lime-400 z-10 p-[6px] font-bold text-lime-700"
                  >
                    <p>Swipe For More !</p>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
