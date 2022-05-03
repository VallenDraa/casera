import { useRef, useEffect, useState } from 'react';

export default function SearchBar() {
  const COLOURS = ['rgb(132 204 22)', 'rgb(249 115 22)'];
  const SEARCH_TYPES = { Recipes: 'Recipes', Users: 'Users' };
  const searchTypeList = useRef(null);
  const searchBar = useRef(null);
  const [activeSearchType, setActiveSearchType] = useState(
    SEARCH_TYPES.Recipes
  );

  // set default active search type
  useEffect(() => {
    const handleActiveSearchType = (active) => {
      const searchTypeListItems = [...searchTypeList.current.children];

      searchTypeListItems.forEach((item) => {
        if (active === item.textContent) {
          item.classList.replace('bg-slate-200/60', 'bg-white');
          item.classList.replace('text-slate-800/60', 'text-slate-800');
          item.classList.add('pt-1');
          if (item.classList.contains('animate-search-caret-c')) {
            item.classList.replace(
              'animate-search-caret-c',
              'animate-search-caret-o'
            );
          } else {
            item.classList.add('animate-search-caret-o');
          }
        } else {
          item.classList.replace('bg-white', 'bg-slate-200/60');
          item.classList.replace('text-slate-800', 'text-slate-800/60');
          item.classList.remove('pt-1');
          if (item.classList.contains('animate-search-caret-o')) {
            item.classList.replace(
              'animate-search-caret-o',
              'animate-search-caret-c'
            );
          } else {
            item.classList.add('animate-search-caret-c');
          }
        }
      });
      setActiveSearchType(active);
    };

    handleActiveSearchType(activeSearchType);
  }, [activeSearchType]);

  const RenderSearchType = () => {
    const TYPES = Object.values(SEARCH_TYPES);
    return TYPES.map((type, i) => {
      return (
        <li
          onClick={(e) => setActiveSearchType(e.target.textContent)}
          key={type}
          className={`capitalize h-fit px-2 mr-[2px] bg-slate-200/60 cursor-pointer text-slate-800/60 border-b-4 rounded-b`}
          style={{ borderColor: `${COLOURS[i]}` }}
        >
          {type}
        </li>
      );
    });
  };

  function handleSearch(e) {
    e.preventDefault();
    const link =
      `${
        activeSearchType === SEARCH_TYPES.Recipes ? '/search?r=' : '/search?u='
      }` + searchBar.current.value;
    window.location.href = link;
  }

  return (
    <div className="animate-fade-in h-screen fixed inset-0 bg-black/50 z-40">
      <form
        onSubmit={(e) => handleSearch(e)}
        className="absolute z-20 top-10 rounded font-roboto right-0 left-0  max-w-2xl mx-3 md:mx-auto"
      >
        <section>
          {/* search button */}
          <div className="flex items-center justify-between bg-white px-1 py-2 rounded-r">
            <input
              ref={searchBar}
              type="text"
              id="search-bar"
              className="focus:outline-none w-full px-1 font-light"
              autoFocus
              placeholder={`Search For ${activeSearchType} ....`}
            />
            <button type="submit">
              <i className="py-1 px-2 duration-150 text-slate-700  cursor-pointer fa-solid fa-magnifying-glass " />
            </button>
          </div>
          <ul ref={searchTypeList} className="flex text-sm">
            <RenderSearchType />
          </ul>
        </section>
      </form>
    </div>
  );
}
