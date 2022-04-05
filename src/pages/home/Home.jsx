import Navbar from '../../components/navbar/Navbar';
import { useEffect, useRef, useState } from 'react';
import HomeAside from '../../components/home/homeAside/HomeAside';
import Slides from '../../components/home/slides/Slides';

export default function Home() {
  const TYPELIST = ['Categories', 'Area', 'Ingredients'];
  const [activeType, setActiveType] = useState('Categories');

  const tags = [];

  // for testing tags
  for (let i = 0; i < 30; i++) {
    const item = ['amet', 'disease', 'food', 'foods', 'pc'];
    const x = Math.abs(Math.round(Math.random() * 10 - 6));
    tags.push(item[x]);
  }

  const activeTagList = useRef(null);
  const [activeTag, setActivetag] = useState(tags[0]);

  // handle the lime no bg food type buttons
  function handleTypeList(target) {
    // check if the clicked target matches one of the items in the list
    TYPELIST.forEach((type) => type === target && setActiveType(target));
  }

  // handle the lime with bg tags buttons
  function handleActiveTagList(target) {
    const listItems = Array.from(activeTagList.current.children);

    // check if the clicked target matches one of the items in the list
    listItems.forEach(
      (item) => item.textContent === target && setActivetag(target)
    );
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left">
        <header className="text-center lg:text-left">
          <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
            Make
          </h1>
          <p className="font-ssp text-lg font-light">
            Your Next <span className="font-semibold">Dish !</span>
          </p>
          {/* find by type */}
          <ul className="flex gap-8 text-sm mt-9 mb-6 font-roboto justify-center lg:justify-start">
            {TYPELIST.map((type) =>
              type === activeType ? (
                <li
                  key={Date.now() + Math.random()}
                  onClick={(e) => handleTypeList(e.target.textContent)}
                  className=" cursor-pointer rounded-full text-lime-700"
                >
                  {type}
                </li>
              ) : (
                <li
                  key={Date.now() + Math.random()}
                  onClick={(e) => handleTypeList(e.target.textContent)}
                  className=" cursor-pointer rounded-full text-lime-500"
                >
                  {type}
                </li>
              )
            )}
          </ul>
        </header>
        <div className="relative">
          {/* aside */}
          <HomeAside />
          <section className="relative flex lg:m-3 xl:m-5 gap-6 lg:gap-12 flex-col-reverse lg:flex-row">
            {/* tags */}
            <article className="lg:basis-3/12 w-full lg:w-20 flex flex-col justify-center max-h-[650px] overflow-auto">
              <div ref={activeTagList}>
                {tags.map((tag) =>
                  tag === activeTag ? (
                    <span
                      key={Date.now() + Math.random()}
                      onClick={(e) => handleActiveTagList(e.target.textContent)}
                      className="inline-block py-1 px-2 duration-200 bg-lime-500 text-white rounded font-ssp text-xs cursor-pointer ml-1 mb-1"
                    >
                      {tag}
                    </span>
                  ) : (
                    <span
                      key={Date.now() + Math.random()}
                      onClick={(e) => handleActiveTagList(e.target.textContent)}
                      className="inline-block bg-lime-300 py-1 px-2 duration-200 hover:bg-lime-400 active:bg-lime-500 text-lime-800 hover:text-lime-700 active:text-white rounded font-ssp text-xs cursor-pointer ml-1 mb-1"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </article>
            {/* food slide show */}
            <article className="lg:basis-9/12 overflow-hidden flex gap-3 items-center">
              <Slides />
              {/* pop-up */}
              <div className="group text-2xl text-lime-700 relative">
                <p className="animate-blink-right relative z-20 cursor-default">
                  &raquo;
                </p>
                <div
                  className="
                hidden group-hover:block shadow-xl absolute text-[12px] -left-[130px] top-[-4px] rounded w-fit bg-lime-400 z-10 p-[6px] font-bold"
                >
                  <p>Swipe For More !</p>
                </div>
              </div>
            </article>
          </section>
        </div>
      </main>
    </>
  );
}
