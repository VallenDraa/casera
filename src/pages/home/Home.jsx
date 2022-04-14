import Navbar from '../../components/navbar/Navbar';
import { useRef, useState, useEffect } from 'react';
import HomeAside from '../../components/home/homeAside/HomeAside';
import Slides from '../../components/home/slides/Slides';
import { fetchCat, fetchArea, fetchIngredients } from '../../fetch/fetchTags';
import { fetchRecipesByTypes } from '../../fetch/fetchRecipe';
import Loading from '../../components/loading/Loading';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const TYPELIST = ['Categories', 'Area', 'Ingredients'];
  const [activeType, setActiveType] = useState('Categories');
  const [tags, setTags] = useState([]);
  const activeTagList = useRef(null);
  const [activeTag, setActiveTag] = useState(tags[0]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      switch (activeType) {
        case 'Categories':
          ApplyTagsByType(setTags, setActiveTag, fetchCat);
          break;
        case 'Area':
          ApplyTagsByType(setTags, setActiveTag, fetchArea);
          break;
        case 'Ingredients':
          ApplyTagsByType(setTags, setActiveTag, fetchIngredients);
          break;
        default:
          ApplyTagsByType(setTags, setActiveTag, fetchCat);
          break;
      }
    };

    fetchTags();
  }, [activeType]);

  const ApplyTagsByType = async (setTags, setActivetag, type = fetchCat) => {
    setLoading(true);

    const res = await type();
    setTags(res.tags);
    setActivetag(res.active);
    // set recipe after changing the type

    fetchRecipesByTypes(res.type, res.active)
      .then((rec) => setRecipes(rec))
      .finally(() => setLoading(false))
      .catch(() => setLoading(false));
  };

  // handle the lime no bg food type buttons
  function handleTypeList(target) {
    setLoading(true);
    // check if the clicked target matches one of the items in the list
    TYPELIST.forEach((type) => type === target && setActiveType(target));
    setLoading(false);
  }

  // handle the lime with bg tags buttons
  async function handleActiveTagList(target) {
    setLoading(true);
    const listItems = Array.from(activeTagList.current.children);

    // check if the clicked target matches one of the items in the list
    listItems.forEach((item) => {
      item.textContent === target && setActiveTag(target);
    });

    // refresh the recipe slide
    fetchRecipesByTypes(activeType, target)
      .then((rec) => setRecipes(rec))
      .finally(() => setLoading(false))
      .catch(() => setLoading(false));
  }

  // generate random key for tags
  function genTagKey(tag) {
    return (
      tag +
      '_' +
      (
        (Math.random() * 1000 * Math.random() * 1000) /
        ((Math.random() + 1) * 234)
      ).toString()
    );
  }

  return (
    <>
      {loading && <Loading />}
      <header>
        <Navbar />
      </header>
      <main className="bg-slate-100">
        <section className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left">
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
                    onClick={async (e) =>
                      await handleTypeList(e.target.textContent)
                    }
                    className=" cursor-pointer rounded-full text-lime-700"
                  >
                    {type}
                  </li>
                ) : (
                  <li
                    key={type}
                    onClick={async (e) =>
                      await handleTypeList(e.target.textContent)
                    }
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
                        key={genTagKey(tag)}
                        onClick={(e) =>
                          handleActiveTagList(e.target.textContent)
                        }
                        className="inline-block py-1 px-2 duration-200 bg-lime-500 text-white rounded font-ssp text-xs cursor-pointer ml-1 mb-1"
                      >
                        {tag}
                      </span>
                    ) : (
                      <span
                        key={genTagKey(tag)}
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
                {/* slide for more pop up*/}
                <div className="group absolute lg:relative right-0 text-2xl ">
                  <p className="animate-blink-right relative z-20 cursor-default text-lime-500 lg:text-lime-700">
                    &raquo;
                  </p>
                  <div
                    className="
                hidden group-hover:block shadow-xl absolute text-[12px] -left-[130px] top-[-4px] rounded bg-lime-400 text-lime-700 z-10 p-[6px] font-bold"
                  >
                    <p>Swipe For More !</p>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
